import { useEffect, useMemo, useState } from 'react';
import { medicamentos as mockMedicamentos } from '../data/mockData';
import { BellIcon } from '../assets/Icons';
import { createToma, getMedicamentos, getTomas, mergeMedsWithTomas } from '../services/api';

export function Reminder() {
  const [medicamentos, setMedicamentos] = useState(mockMedicamentos);

  useEffect(() => {
    let cancelled = false;

    async function loadData() {
      try {
        const [meds, tomas] = await Promise.all([getMedicamentos(), getTomas()]);
        if (!cancelled) {
          setMedicamentos(mergeMedsWithTomas(meds, tomas));
        }
      } catch {
        if (!cancelled) {
          setMedicamentos(mockMedicamentos);
        }
      }
    }

    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const pendiente = useMemo(
    () => medicamentos.find((m) => !m.tomado) || medicamentos[0],
    [medicamentos]
  );

  const handleTomado = async () => {
    if (!pendiente) return;

    try {
      await createToma({ medicamento: pendiente.id, tomado: true });
      setMedicamentos((prev) =>
        prev.map((m) => (m.id === pendiente.id ? { ...m, tomado: true } : m))
      );
      alert('¡Medicamento marcado como tomado!');
    } catch {
      alert('No se pudo registrar en la API.');
    }
  };

  const handlePosponer = async () => {
    if (!pendiente) return;

    try {
      await createToma({ medicamento: pendiente.id, tomado: false });
      // keep the medicamento as pendiente (no state change needed)
      alert('Recordatorio pospuesto 15 minutos');
    } catch (err) {
      console.error(err);
      alert('No se pudo posponer en la API; se mantendrá localmente.');
    }
  };

  return (
    <div className="screen reminder-screen d-flex align-items-center justify-content-center py-5 px-4">
      <div className="card border-0 shadow-sm text-center p-5" style={{ maxWidth: 480, width: '100%' }}>
        <div className="reminder-bell mb-4">
          <BellIcon />
        </div>

        <h2 className="reminder-title mb-2">¡Es hora de tomar</h2>
        <h3 className="reminder-med mb-5">
          {pendiente ? `${pendiente.nombre} ${pendiente.dosis}` : 'Sin medicamentos'}
        </h3>

        <div className="d-flex gap-3 justify-content-center">
          <button className="btn btn-accent btn-lg px-5 py-3" onClick={handleTomado}>
            Tomado
          </button>
          <button className="btn btn-primary-custom btn-lg px-5 py-3" onClick={handlePosponer}>
            Posponer
          </button>
        </div>
      </div>
    </div>
  );
}
