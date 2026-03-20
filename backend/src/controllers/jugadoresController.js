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
  const jugador = await JugadorModel.create(toDb(req.body));
  res.status(201).json(toApi(jugador));
}

async function update(req, res) {
  const jugador = await JugadorModel.update(req.params.id, toDb(req.body));

  if (!jugador) {
    return res.status(404).json({ error: 'Jugador no encontrado' });
  }

  res.json(toApi(jugador));
}

async function patch(req, res) {
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
