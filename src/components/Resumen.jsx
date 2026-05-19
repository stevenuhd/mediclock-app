import { useEffect, useMemo, useState } from 'react';
import { resumenSemanal as mockResumen, medicamentos as mockMedicamentos } from '../data/mockData';
import { ProgressRing } from '../assets/Icons';
import {
  computeWeeklySummary,
  getMedicamentos,
  getTomas,
  mergeMedsWithTomas,
} from '../services/api';

export function Resumen() {
  const [medicamentos, setMedicamentos] = useState(mockMedicamentos);
  const [resumenSemanal, setResumenSemanal] = useState(mockResumen);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const [meds, tomas] = await Promise.all([getMedicamentos(), getTomas()]);
        if (!cancelled) {
          setMedicamentos(mergeMedsWithTomas(meds, tomas));
          setResumenSemanal(computeWeeklySummary(tomas));
        }
      } catch {
        if (!cancelled) {
          setMedicamentos(mockMedicamentos);
          setResumenSemanal(mockResumen);
        }
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const pct = useMemo(() => resumenSemanal.porcentaje, [resumenSemanal]);

  return (
    <div className="screen resumen-screen py-5 px-4">
      <h2 className="screen-title mb-5">Resumen</h2>

      <div className="row g-5">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4 text-center">
            <h5 className="fw-bold mb-4">Cumplimiento semanal</h5>
            <div className="d-flex justify-content-center mb-4">
              <ProgressRing percentage={pct} />
            </div>
            <p className="text-muted">{resumenSemanal.mensaje}</p>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">Detalle de medicamentos</h5>
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Medicamento</th>
                    <th>Dosis</th>
                    <th>Hora</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {medicamentos.map((med) => (
                    <tr key={med.id}>
                      <td>{med.nombre}</td>
                      <td>{med.dosis}</td>
                      <td>{med.hora}</td>
                      <td>
                        <span className={`badge ${med.tomado ? 'bg-success' : 'bg-secondary'}`}>
                          {med.tomado ? 'Tomado' : 'Pendiente'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
