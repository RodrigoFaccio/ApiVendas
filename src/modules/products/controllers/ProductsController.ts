import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';

export default class ProductsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = listProducts.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const showProducts = new ShowProductService();

    const product = showProducts.execute({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProducts = new CreateProductService();

    const product = createProducts.execute({ name, price, quantity });

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProducts = new UpdateProductService();

    const product = updateProducts.execute({ name, price, quantity, id });

    return res.json(product);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProducts = new DeleteProductService();

    const product = deleteProducts.execute({ id });

    return res.json(product);
  }
}
