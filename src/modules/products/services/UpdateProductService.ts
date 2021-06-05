import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
class UpdateProductService {
  public async execute({
    name,
    price,
    quantity,
    id,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is aready one product with this name');
    }
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    await productsRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
