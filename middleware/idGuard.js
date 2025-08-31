export default function idGuard(findById, entityName = "entity") {
  return function (req, res, next) {
    const { id } = req.params;
    const item = findById(id);
    if (!item) return res.status(404).json({ error: `${entityName} not found` });
    req.__entity = item;
    next();
  };
}