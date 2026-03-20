function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

function errorHandler(err, req, res, _next) {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = { asyncHandler, errorHandler };
