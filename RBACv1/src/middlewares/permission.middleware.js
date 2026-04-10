import * as permissionRepo from "../repositories/permission.repository.js";

export const authorizePermissions = (...permissions) => {
  return async (req, res, next) => {
    const userId = req.user.id;

    const userPermissions = await permissionRepo.getPermissionsByUserId(userId);

    const hasPermission = permissions.some((p) => userPermissions.includes(p));

    if (!hasPermission) {
      return res.status(403).json({
        message: "Permission denied",
      });
    }

    next();
  };
};
