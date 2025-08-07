// src/modules/product/index.ts
import { Router } from "express";

import { createProductRoutes } from "./features/create_product";
import { editProductRoutes } from "./features/edit_product";
import { deleteProductRoutes } from "./features/delete_product";
import { getProductsRoutes } from "./features/get_products";

export const productRouter = Router();

productRouter.use("/", createProductRoutes);  
productRouter.use("/", editProductRoutes); 
productRouter.use("/", deleteProductRoutes);
productRouter.use("/", getProductsRoutes);
/**
 *  MATCHES:
 *  POST   /api/v1/products          → crear producto
 *  GET    /api/v1/products          → listar todos los productos
 *  GET    /api/v1/products?id=xxx   → detalle de un producto (query param)
 *  PUT    /api/v1/products/:id      → editar producto
 *  DELETE /api/v1/products/:id      → eliminar producto
 */

export default productRouter;
