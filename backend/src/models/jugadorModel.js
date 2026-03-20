const pool = require('../config/db');

async function findAll() {
  const { rows } = await pool.query('SELECT * FROM jugadores ORDER BY id ASC');
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query('SELECT * FROM jugadores WHERE id = $1', [id]);
  return rows[0] || null;
}

async function create({ nombre, posicion, equipo, dorsal, valor_mercado, activo }) {
  const { rows } = await pool.query(
    `INSERT INTO jugadores (nombre, posicion, equipo, dorsal, valor_mercado, activo)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nombre, posicion, equipo, dorsal, valor_mercado, activo]
  );
  return rows[0];
}

async function update(id, { nombre, posicion, equipo, dorsal, valor_mercado, activo }) {
  const { rows } = await pool.query(
    `UPDATE jugadores SET nombre = $1, posicion = $2, equipo = $3, dorsal = $4, valor_mercado = $5, activo = $6
     WHERE id = $7 RETURNING *`,
    [nombre, posicion, equipo, dorsal, valor_mercado, activo, id]
  );
  return rows[0] || null;
}

async function patch(id, fields) {
  const columns = Object.keys(fields);
  const values = Object.values(fields);
  const sets = columns.map((col, i) => `${col} = $${i + 1}`).join(', ');

  values.push(id);
  const { rows } = await pool.query(
    `UPDATE jugadores SET ${sets} WHERE id = $${values.length} RETURNING *`,
    values
  );
  return rows[0] || null;
}

async function remove(id) {
  const { rowCount } = await pool.query('DELETE FROM jugadores WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { findAll, findById, create, update, patch, remove };
