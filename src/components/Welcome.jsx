import { Link } from 'react-router-dom';
import { WelcomeIllustration } from '../assets/Icons';

export function Welcome() {
  return (
    <div className="screen welcome-screen d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <h1 className="welcome-logo mb-3">
              MEDI<span className="text-accent">CLOCK</span>
            </h1>
            <p className="welcome-text mb-4">Bienvenido a tu asistente de salud diaria.</p>
            <Link to="/registro" className="btn btn-primary-custom btn-lg px-5 py-3">
              Comenzar
            </Link>
          </div>
          <div className="col-lg-6 text-center">
            <div className="welcome-illustration mx-auto">
              <WelcomeIllustration className="w-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
