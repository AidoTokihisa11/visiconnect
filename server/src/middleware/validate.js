/**
 * Helper de validation Zod pour Express.
 *
 * Usage :
 *   router.post('/x', validateBody(myZodSchema), handler);
 *   // dans handler : req.validBody est garanti non-null et typ\u00e9.
 */
'use strict';

function validateBody(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body || {});
    if (!result.success) {
      return res.status(400).json({
        error: 'Payload invalide.',
        issues: result.error.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      });
    }
    req.validBody = result.data;
    return next();
  };
}

module.exports = { validateBody };
