import { useState } from 'react';
import { medicamentos as mockMeds } from '../data/mockData';

export function RegistroMedicamentos() {
  const [meds, setMeds] = useState(mockMeds);
  const [nombre, setNombre] = useState('');
  const [dosis, setDosis] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMed = {
      id: Date.now(),
      nombre,
      dosis,
      hora,
      tomado: false,
    };
    setMeds([...meds, newMed]);
    setNombre('');
    setDosis('');
    setHora('');
  };

  return (
    <div className="screen registro-screen py-5 px-4">
      <h2 className="screen-title mb-5">Registro de Medicamentos</h2>

      <div className="row g-5">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="mb-4 fw-bold">Agregar nuevo medicamento</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted small">Nombre</label>
                <input
                  type="text"
                  className="form-control form-control-lg input-custom"
                  placeholder="Nombre del medicamento"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted small">Dosis</label>
                <input
                  type="text"
                  className="form-control form-control-lg input-custom"
                  placeholder="Dosis"
                  value={dosis}
                  onChange={(e) => setDosis(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label text-muted small">Hora del día</label>
                <input
                  type="time"
                  className="form-control form-control-lg input-custom"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary-custom w-100 py-3">
                Agregar
              </button>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="mb-4 fw-bold">Medicamentos registrados</h5>
            <ul className="list-group list-group-flush">
              {meds.map((med) => (
                <li
                  key={med.id}
                  className="list-group-item d-flex justify-content-between align-items-center med-list-item"
                >
                  <div>
                    <strong>{med.nombre}</strong>
                    <small className="d-block text-muted">
                      {med.dosis} — {med.hora}
                    </small>
                  </div>
                  <span
                    className={`badge ${med.tomado ? 'bg-success' : 'bg-secondary'} rounded-pill`}
                  >
                    {med.tomado ? '✓' : 'Pendiente'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
