import { RegisterModel } from "./register.model";
import { TypeRegister } from "./types";

class RegisterService {
  constructor() {}

  async create(data: TypeRegister) {
    const signInModel = new RegisterModel(data);
    const result = await signInModel.save();
    return result;
  }
}

export default RegisterService;
