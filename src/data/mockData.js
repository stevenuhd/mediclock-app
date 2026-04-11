export const medicamentos = [
  { id: 1, nombre: 'Metformina', dosis: '50 mg', hora: '08:00', tomado: true },
  { id: 2, nombre: 'Losartán', dosis: '25 mg', hora: '09:00', tomado: true },
  { id: 3, nombre: 'Omeprazol', dosis: '20 mg', hora: '12:00', tomado: false },
  { id: 4, nombre: 'Atorvastatina', dosis: '10 mg', hora: '20:00', tomado: true },
  { id: 5, nombre: 'Aspirina', dosis: '100 mg', hora: '14:00', tomado: false },
];

export const resumenSemanal = {
  porcentaje: 90,
  mensaje: 'Has tomado el 80% de tus medicamentos esta semana',
};

export const ajustes = {
  notificacionesSonoras: true,
  recordatorioVoz: true,
  contactoMedico: {
    telefono: '',
    email: '',
  },
};
