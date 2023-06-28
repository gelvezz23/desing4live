import { ProductModel } from "./products.model";
import { TypeProduct } from "./types";

class ProductsService {
  constructor() {}

  async create(data: TypeProduct) {
    const productModel = new ProductModel(data);
    const result = await productModel.save();
    return result;
  }

  async listByCompany(id: string) {
    const result = await ProductModel.find({ company: id });
    return result;
  }

  async update(id: string, changes: TypeProduct) {
    const result = await ProductModel.findOneAndUpdate({ _id: id }, changes);
    return result;
  }

  async delete(id: string) {
    const result = await ProductModel.deleteOne({ _id: id });
    return result;
  }
}

export default ProductsService;
