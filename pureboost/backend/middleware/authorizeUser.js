function authorizeUser(req, res, next) {
  const userIdFromToken = req.user.user_id;
  const userIdFromParams = req.params.user_id;
  const userIdFromBody = req.body.user_id;

  if (userIdFromParams && parseInt(userIdFromParams) !== userIdFromToken) {
    return res.status(403).json({ message: "You are not authorized to access this resource" });
  }

  if (userIdFromBody && parseInt(userIdFromBody) !== userIdFromToken) {
    return res.status(403).json({ message: "You are not authorized to perform this action" });
  }

  next();
}

module.exports = authorizeUser;
