const jwt = require("jsonwebtoken");
const UserModel = require("../user/userModel");
const authenticateJWT =
  (roles = []) =>
  async (req, res, next) => {
    try {
      if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
      }
      if (!token) {
        return next(new createHttpError(401, "Token not passed"));
      }
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      // Check if role is authorized
      if (roles.length && !roles.includes(verified.role)) {
        return res.status(403).json({ message: "Not allowed" });
      }

      // Check if the user exists and is active
      const user = await UserModel.findByPk(verified.id);
      if (!user || !user.isActive) {
        return res.status(403).json({ message: "User not found or inactive" });
      }
      // Attach user info to request object
      req.user = user;
      req.userId = verified.id;
      next();
    } catch (err) {
      next(err);
    }
  };

module.exports = { authenticateJWT };
