const API_BASE =
  import.meta.env.VITE_API_URL ||
  "https://mediclock-back.onrender.com/api";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.status === 204 ? null : res.json();
}

function normalizeMedicamento(med) {
  return {
    id: med.id,
    nombre: med.nombre,
    dosis: med.dosis || "",
    hora: med.hora ? String(med.hora).slice(0, 5) : "--:--",
    tomado: Boolean(med.tomado),
  };
}

function tomaIsTomado(toma) {
  if (typeof toma.tomado === "boolean") return toma.tomado;
  if (typeof toma.estado === "string") {
    return toma.estado.toLowerCase() === "tomado";
  }
  return false;
}

function tomaMedicamentoId(toma) {
  if (typeof toma.medicamento === "number") return toma.medicamento;
  if (toma.medicamento && typeof toma.medicamento.id === "number") {
    return toma.medicamento.id;
  }
  return null;
}

export async function getMedicamentos() {
  const data = await request("/medicamentos/");
  const list = Array.isArray(data) ? data : data?.results ?? [];
  return Array.isArray(list) ? list.map(normalizeMedicamento) : [];
}

export async function createMedicamento(payload) {
  const data = await request("/medicamentos/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return normalizeMedicamento(data);
}

export async function getTomas() {
  const data = await request("/tomas/");
  // DRF paginates by default (returns { count, next, results: [...] })
  const list = Array.isArray(data) ? data : data?.results ?? [];
  return Array.isArray(list) ? list : [];
}

export async function createToma(payload) {
  return request("/tomas/", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function mergeMedsWithTomas(meds, tomas) {
  const takenIds = new Set(
    tomas
      .filter(tomaIsTomado)
      .map(tomaMedicamentoId)
      .filter((id) => id !== null)
  );

  return meds.map((med) => ({
    ...med,
    tomado: takenIds.has(med.id),
  }));
}

export function computeWeeklySummary(tomas) {
  const now = Date.now();
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const weekly = tomas.filter((toma) => {
    const rawDate = toma.fecha || toma.created_at || toma.createdAt;
    if (!rawDate) return false;
    const ts = new Date(rawDate).getTime();
    return Number.isFinite(ts) && now - ts <= weekMs;
  });

  const total = weekly.length;
  const taken = weekly.filter(tomaIsTomado).length;
  const porcentaje = total > 0 ? Math.round((taken / total) * 100) : 0;

  return {
    porcentaje,
    mensaje: `Has tomado el ${porcentaje}% de tus medicamentos esta semana`,
  };
}
