#Alumnos- grupo 3

anibal valderrama moya
jose hermosilla avila
miguel rojas otero
esteban perez castillo



# MediClock App - MEDICLOCK

Aplicación web de gestión de medicamentos desarrollada con React + Vite.

## Requisitos previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- npm (incluido con Node.js)

## Instalación luego de clonar el repositorio

```bash
npm install
```

## Ejecución de la app

```bash
npm run dev
```

Abre el navegador en la URL que aparece en la terminal (por defecto `http://localhost:5173`).

## Build para producción

```bash
npm run build
```

Los archivos generados estarán en la carpeta `dist/`.

## Vista previa del build

```bash
npm run preview
```

## Estructura del proyecto

```
src/
├── assets/          # Iconos y SVGs (Icons.jsx)
├── components/      # Componentes de cada pantalla
│   ├── Welcome.jsx
│   ├── RegistroMedicamentos.jsx
│   ├── Reminder.jsx
│   ├── Resumen.jsx
│   ├── Ajustes.jsx
│   └── Navbar.jsx
├── data/            # Datos mock (mockData.js)
├── App.jsx          # Router principal
├── main.jsx         # Punto de entrada
└── style.css        # Estilos personalizados
```

## Tecnologías

- React 19
- React Router DOM
- Bootstrap 5.3
- Vite
