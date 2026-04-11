import { useState } from 'react';
import { ajustes as mockAjustes } from '../data/mockData';

export function Ajustes() {
  const [notifSonoras, setNotifSonoras] = useState(mockAjustes.notificacionesSonoras);
  const [recVoz, setRecVoz] = useState(mockAjustes.recordatorioVoz);
  const [telefono, setTelefono] = useState(mockAjustes.contactoMedico.telefono);
  const [email, setEmail] = useState(mockAjustes.contactoMedico.email);

  return (
    <div className="screen ajustes-screen py-5 px-4">
      <h2 className="screen-title mb-5">Ajustes</h2>

      <div className="row g-5">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">Notificaciones</h5>

            <div className="setting-item d-flex justify-content-between align-items-center py-3">
              <span className="setting-label">Activar notificaciones sonoras</span>
              <div className="form-check form-switch">
                <input
                  className="form-check-input toggle-custom"
                  type="checkbox"
                  role="switch"
                  checked={notifSonoras}
                  onChange={(e) => setNotifSonoras(e.target.checked)}
                />
              </div>
            </div>

            <div className="setting-item d-flex justify-content-between align-items-center py-3">
              <span className="setting-label">Recordatoria por voz</span>
              <div className="form-check form-switch">
                <input
                  className="form-check-input toggle-custom"
                  type="checkbox"
                  role="switch"
                  checked={recVoz}
                  onChange={(e) => setRecVoz(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">Contacto médico</h5>
            <div className="mb-3">
              <label className="form-label text-muted small">Número de teléfono</label>
              <input
                type="tel"
                className="form-control input-custom"
                placeholder="Numero de telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-muted small">Email</label>
              <input
                type="email"
                className="form-control input-custom"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="btn btn-primary-custom w-100 py-2 mt-2">Guardar contacto</button>
          </div>
        </div>
      </div>
    </div>
  );
}
