import { RoleModel } from "../components/Role/role.model";

export const createRole = async () => {
  try {
    const countRoles = await RoleModel.estimatedDocumentCount();
    if (countRoles > 0) return;

    const values = await Promise.all([
      new RoleModel({ name: "admin" }).save(),
      new RoleModel({ name: "user" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
