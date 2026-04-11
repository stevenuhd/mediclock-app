import { Routes, Route, useLocation } from 'react-router-dom';
import { Welcome } from './components/Welcome';
import { RegistroMedicamentos } from './components/RegistroMedicamentos';
import { Reminder } from './components/Reminder';
import { Resumen } from './components/Resumen';
import { Ajustes } from './components/Ajustes';
import { Navbar } from './components/Navbar';

export default function App() {
  const location = useLocation();
  const showNav = location.pathname !== '/' && location.pathname !== '/welcome';

  return (
    <div className={`app-shell ${showNav ? 'with-sidebar' : ''}`}>
      {showNav && <Navbar />}
      <main className={`page-content ${showNav ? 'has-nav' : ''}`}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/registro" element={<RegistroMedicamentos />} />
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/resumen" element={<Resumen />} />
          <Route path="/ajustes" element={<Ajustes />} />
        </Routes>
      </main>
    </div>
  );
}
