import { medicamentos } from '../data/mockData';
import { BellIcon } from '../assets/Icons';

export function Reminder() {
  const pendiente = medicamentos.find((m) => !m.tomado) || medicamentos[0];

  const handleTomado = () => {
    alert('¡Medicamento marcado como tomado!');
  };

  const handlePosponer = () => {
    alert('Recordatorio pospuesto 15 minutos');
  };

  return (
    <div className="screen reminder-screen d-flex align-items-center justify-content-center py-5 px-4">
      <div className="card border-0 shadow-sm text-center p-5" style={{ maxWidth: 480, width: '100%' }}>
        <div className="reminder-bell mb-4">
          <BellIcon />
        </div>

        <h2 className="reminder-title mb-2">¡Es hora de tomar</h2>
        <h3 className="reminder-med mb-5">
          {pendiente.nombre} {pendiente.dosis}
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
