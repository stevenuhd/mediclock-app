import { useEffect, useState } from "react";
import { medicamentos as mockMeds } from "../data/mockData";
import { createMedicamento, getMedicamentos } from "../services/api";

export function RegistroMedicamentos() {
  const [meds, setMeds] = useState(mockMeds);
  const [nombre, setNombre] = useState("");
  const [dosis, setDosis] = useState("");
  const [hora, setHora] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadMeds() {
      try {
        const apiMeds = await getMedicamentos();
        if (!cancelled) {
          setMeds(apiMeds);
        }
      } catch {
        if (!cancelled) {
          setMeds(mockMeds);
        }
      }
    }

    loadMeds();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation: Ensure no inputs are empty or just whitespace
    if (!nombre.trim() || !dosis.trim() || !hora.trim()) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    // 2. Validation: Name should not contain numbers
    // This regex checks if there is any digit (0-9) in the string
    const containsNumbers = /\d/.test(nombre);
    if (containsNumbers) {
      alert("El nombre del medicamento no puede contener números.");
      return;
    }

    const payload = {
      nombre: nombre.trim(),
      dosis: dosis.trim(),
      hora: hora.trim(),
    };

    try {
      const created = await createMedicamento(payload);
      setMeds((prev) => [...prev, created]);
    } catch {
      const localNewMed = {
        id: Date.now(),
        ...payload,
        tomado: false,
      };
      setMeds((prev) => [...prev, localNewMed]);
    }

    // Reset form
    setNombre("");
    setDosis("");
    setHora("");
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
                  // The 'required' attribute handles basic empty checks,
                  // but our JS handles the whitespace-only case.
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-muted small">Dosis</label>
                <input
                  type="text"
                  className="form-control form-control-lg input-custom"
                  placeholder="Ej: 500mg o 1 tableta"
                  value={dosis}
                  onChange={(e) => setDosis(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="form-label text-muted small">
                  Hora del día
                </label>
                <input
                  type="time"
                  className="form-control form-control-lg input-custom"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary-custom w-100 py-3"
              >
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
                    className={`badge ${med.tomado ? "bg-success" : "bg-secondary"} rounded-pill`}
                  >
                    {med.tomado ? "✓" : "Pendiente"}
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
