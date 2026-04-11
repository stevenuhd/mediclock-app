import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HamburgerIcon } from '../assets/Icons';

const items = [
  { to: '/welcome', icon: 'house', label: 'Inicio' },
  { to: '/registro', icon: 'plus-circle', label: 'Registro' },
  { to: '/reminder', icon: 'bell', label: 'Alarma' },
  { to: '/resumen', icon: 'bar-chart', label: 'Resumen' },
  { to: '/ajustes', icon: 'gear', label: 'Ajustes' },
];

export function Navbar() {
  const location = useLocation();
  const offcanvasRef = useRef(null);

  const closeOffcanvas = () => {
    if (offcanvasRef.current && window.bootstrap) {
      const instance = window.bootstrap.Offcanvas.getInstance(offcanvasRef.current);
      if (instance) instance.hide();
    }
  };

  return (
    <>
      {/* Desktop sidebar (lg+) */}
      <nav className="sidebar-nav d-none d-lg-flex flex-column">
        <div className="sidebar-brand mb-4 px-3">
          <h4 className="mb-0">
            VITALITY<span className="text-accent">+</span>
          </h4>
        </div>
        <div className="sidebar-links d-flex flex-column gap-1 px-2">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item-custom ${location.pathname === item.to ? 'active' : ''}`}
            >
              <svg className="nav-icon" width="22" height="22">
                <use href={`#icon-${item.icon}`} />
              </svg>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile top bar (<lg) */}
      <header className="mobile-topbar d-lg-none d-flex align-items-center justify-content-between px-3">
        <span className="topbar-brand fw-bold">
          VITALITY<span className="text-accent">+</span>
        </span>
        <button
          className="btn mobile-menu-btn"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
          aria-label="Menu"
        >
          <HamburgerIcon />
        </button>
      </header>

      {/* Offcanvas menu (mobile) */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="mobileMenu" ref={offcanvasRef}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold">
            VITALITY<span className="text-accent">+</span>
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar" />
        </div>
        <div className="offcanvas-body d-flex flex-column gap-1 px-2">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`nav-item-custom ${location.pathname === item.to ? 'active' : ''}`}
              onClick={closeOffcanvas}
            >
              <svg className="nav-icon" width="22" height="22">
                <use href={`#icon-${item.icon}`} />
              </svg>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile bottom tab bar (<lg) */}
      <nav className="mobile-bottom-nav d-lg-none d-flex justify-content-around align-items-center">
        {items.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`bottom-nav-item ${location.pathname === item.to ? 'active' : ''}`}
          >
            <svg className="nav-icon" width="20" height="20">
              <use href={`#icon-${item.icon}`} />
            </svg>
            <span className="bottom-nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
