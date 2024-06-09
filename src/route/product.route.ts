import { Router } from "express";
import {
  GetAllProducts,
  GetProductById,
} from "../controller/product.controller.js";

const productRouter = Router();

productRouter.get("/products", GetAllProducts);

productRouter.get("/products/:id", GetProductById);

export default productRouter;
