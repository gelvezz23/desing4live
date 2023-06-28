import { CompanyModel } from "./company.model";
import { TypeCompany } from "./types";

class RegisterService {
  constructor() {}

  async create(data: TypeCompany) {
    const companyModel = new CompanyModel(data);
    const result = await companyModel.save();
    return result;
  }

  async listByUser(id: string) {
    const result = await CompanyModel.find({ user: id });
    return result;
  }

  async update(id: string, changes: TypeCompany) {
    const result = await CompanyModel.findOneAndUpdate({ _id: id }, changes);
    return result;
  }

  async delete(id: string) {
    const result = await CompanyModel.deleteOne({ _id: id });
    return result;
  }
}

export default RegisterService;
