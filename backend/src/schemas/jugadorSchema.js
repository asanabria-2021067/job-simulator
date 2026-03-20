const { z } = require('zod');

const jugadorFullSchema = z.object({
  campo1: z.string({ required_error: 'campo1 es requerido', invalid_type_error: 'campo1 debe ser un string' }).min(1, 'campo1 no puede estar vacío'),
  campo2: z.string({ required_error: 'campo2 es requerido', invalid_type_error: 'campo2 debe ser un string' }).min(1, 'campo2 no puede estar vacío'),
  campo3: z.string({ required_error: 'campo3 es requerido', invalid_type_error: 'campo3 debe ser un string' }).min(1, 'campo3 no puede estar vacío'),
  campo4: z.number({ required_error: 'campo4 es requerido', invalid_type_error: 'campo4 debe ser un número' }).int('campo4 debe ser un entero'),
  campo5: z.number({ required_error: 'campo5 es requerido', invalid_type_error: 'campo5 debe ser un número' }),
  campo6: z.boolean({ required_error: 'campo6 es requerido', invalid_type_error: 'campo6 debe ser un booleano' }),
});

const jugadorPatchSchema = z.object({
  campo1: z.string({ invalid_type_error: 'campo1 debe ser un string' }).min(1, 'campo1 no puede estar vacío').optional(),
  campo2: z.string({ invalid_type_error: 'campo2 debe ser un string' }).min(1, 'campo2 no puede estar vacío').optional(),
  campo3: z.string({ invalid_type_error: 'campo3 debe ser un string' }).min(1, 'campo3 no puede estar vacío').optional(),
  campo4: z.number({ invalid_type_error: 'campo4 debe ser un número' }).int('campo4 debe ser un entero').optional(),
  campo5: z.number({ invalid_type_error: 'campo5 debe ser un número' }).optional(),
  campo6: z.boolean({ invalid_type_error: 'campo6 debe ser un booleano' }).optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: 'Se debe enviar al menos un campo',
});

module.exports = { jugadorFullSchema, jugadorPatchSchema };
