import { RoleModel } from "./role.model";

export const searchRole = async (role: Object[]) => {
  const foundRoles = await RoleModel.find({ name: { $in: role } });
  const findRole = foundRoles.map((role) => role._id.valueOf());
  return findRole;
};
