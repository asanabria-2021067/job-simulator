const JugadorModel = require('../models/jugadorModel');

const FIELD_MAP = {
  campo1: 'nombre',
  campo2: 'posicion',
  campo3: 'equipo',
  campo4: 'dorsal',
  campo5: 'valor_mercado',
  campo6: 'activo',
};

const API_FIELDS = Object.keys(FIELD_MAP);

function toApi(row) {
  return {
    id: row.id,
    campo1: row.nombre,
    campo2: row.posicion,
    campo3: row.equipo,
    campo4: row.dorsal,
    campo5: parseFloat(row.valor_mercado),
    campo6: row.activo,
  };
}

function toDb(body) {
  const dbData = {};
  API_FIELDS.forEach(apiField => {
    if (body[apiField] !== undefined) {
      dbData[FIELD_MAP[apiField]] = body[apiField];
    }
  });
  return dbData;
}

function validateFull(body) {
  const errors = [];

  if (body.campo1 === undefined || body.campo1 === null || typeof body.campo1 !== 'string' || body.campo1.trim() === '') {
    errors.push('campo1 es requerido y debe ser un string no vacío');
  }
  if (body.campo2 === undefined || body.campo2 === null || typeof body.campo2 !== 'string' || body.campo2.trim() === '') {
    errors.push('campo2 es requerido y debe ser un string no vacío');
  }
  if (body.campo3 === undefined || body.campo3 === null || typeof body.campo3 !== 'string' || body.campo3.trim() === '') {
    errors.push('campo3 es requerido y debe ser un string no vacío');
  }
  if (body.campo4 === undefined || body.campo4 === null || typeof body.campo4 !== 'number' || !Number.isInteger(body.campo4)) {
    errors.push('campo4 es requerido y debe ser un entero');
  }
  if (body.campo5 === undefined || body.campo5 === null || typeof body.campo5 !== 'number' || isNaN(body.campo5)) {
    errors.push('campo5 es requerido y debe ser un número');
  }
  if (body.campo6 === undefined || body.campo6 === null || typeof body.campo6 !== 'boolean') {
    errors.push('campo6 es requerido y debe ser un booleano');
  }

  return errors;
}

function validatePartial(body) {
  const errors = [];
  const present = API_FIELDS.filter(f => body[f] !== undefined);

  if (present.length === 0) {
    errors.push('Se debe enviar al menos un campo');
    return errors;
  }

  if (body.campo1 !== undefined && (typeof body.campo1 !== 'string' || body.campo1.trim() === '')) {
    errors.push('campo1 debe ser un string no vacío');
  }
  if (body.campo2 !== undefined && (typeof body.campo2 !== 'string' || body.campo2.trim() === '')) {
    errors.push('campo2 debe ser un string no vacío');
  }
  if (body.campo3 !== undefined && (typeof body.campo3 !== 'string' || body.campo3.trim() === '')) {
    errors.push('campo3 debe ser un string no vacío');
  }
  if (body.campo4 !== undefined && (typeof body.campo4 !== 'number' || !Number.isInteger(body.campo4))) {
    errors.push('campo4 debe ser un entero');
  }
  if (body.campo5 !== undefined && (typeof body.campo5 !== 'number' || isNaN(body.campo5))) {
    errors.push('campo5 debe ser un número');
  }
  if (body.campo6 !== undefined && typeof body.campo6 !== 'boolean') {
    errors.push('campo6 debe ser un booleano');
  }

  return errors;
}

async function getAll(req, res) {
  const rows = await JugadorModel.findAll();
  res.json(rows.map(toApi));
}

async function getOne(req, res) {
  const jugador = await JugadorModel.findById(req.params.id);

  if (!jugador) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  res.json(toApi(jugador));
}

async function create(req, res) {
  const errors = validateFull(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const jugador = await JugadorModel.create(toDb(req.body));
  res.status(201).json(toApi(jugador));
}

async function update(req, res) {
  const errors = validateFull(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const jugador = await JugadorModel.update(req.params.id, toDb(req.body));

  if (!jugador) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  res.json(toApi(jugador));
}

async function patch(req, res) {
  const errors = validatePartial(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const jugador = await JugadorModel.patch(req.params.id, toDb(req.body));

  if (!jugador) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  res.json(toApi(jugador));
}

async function remove(req, res) {
  const deleted = await JugadorModel.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  res.status(204).send();
}

module.exports = { getAll, getOne, create, update, patch, remove };
