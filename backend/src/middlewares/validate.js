function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ errors: result.error.errors.map(e => e.message) });
    }
    req.body = result.data;
    next();
  };
}

function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID debe ser un entero positivo' });
  }
  next();
}

module.exports = { validateBody, validateId };
