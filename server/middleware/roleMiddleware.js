const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(401).json({
          message: "Unauthorized - No user found",
        });
      }

      const userRole = req.user.role;

      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Access denied (Forbidden)",
        });
      }

      next();

    } catch (error) {
      return res.status(500).json({
        message: "Role middleware error",
      });
    }
  };
};

export default roleMiddleware;