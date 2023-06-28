import { TypeLogin } from "./types";
import { RegisterModel } from "./../Register/register.model";
class LoginService {
  constructor() {}

  async create(data: TypeLogin) {
    const signInModel = new RegisterModel(data);
    const result = await signInModel.save();
    return result;
  }

  async find() {
    const result = await RegisterModel.find();
    return result;
  }

  async findOne(email: string) {
    const result = await RegisterModel.findOne({ email: email }).populate(
      "roles"
    );
    return result;
  }

  async findOneByUser(user?: any) {
    const result = await RegisterModel.find({ user: user });
    return result;
  }

  async update(id: string, changes: TypeLogin) {
    const result = await RegisterModel.findByIdAndUpdate(id, changes);
    return result;
  }

  async delete(id: string) {
    await RegisterModel.deleteOne({ _id: id });
    return { id };
  }
}

export default LoginService;
