// src/modules/product/index.ts
import { Router } from "express";

// PRODUCT CRUD ( /api/v1/products )
import { createProductRoutes } from "./features/crud/create_product";
import { editProductRoutes } from "./features/crud/edit_product";
import { deleteProductRoutes } from "./features/crud/delete_product";
import { getProductsRoutes } from "./features/crud/get_products";

export const productRouter = Router();

productRouter.use("/", createProductRoutes);
productRouter.use("/", editProductRoutes);
productRouter.use("/", deleteProductRoutes);
productRouter.use("/", getProductsRoutes);
/**
 *  MATCHES:
 *  POST   /api/v1/products             → crear producto
 *  GET    /api/v1/products             → listar productos (page=1, limit=10 por defecto)
 *  GET    /api/v1/products?page=2&limit=5
 *                                       → listar productos paginados (ejemplo)
 *  GET    /api/v1/products/:id         → detalle producto
 *  PUT    /api/v1/products/:id         → editar producto
 *  DELETE /api/v1/products/:id         → eliminar producto
 */

// PRODUCT BRAND ( /api/v1/products/brands )
import { createBrandRoutes } from "./features/brand/create_brand/presentation/create_brand.routes";
import { editBrandRoutes } from "./features/brand/edit_brand/presentation/edit_brand.routes";
import { deleteBrandRoutes } from "./features/brand/delete_brand/presentation/delete_brand.routes";
import { getBrandRoutes } from "./features/brand/get_brand/presentation/get_brand.routes";

export const productBrandRouter = Router();

productBrandRouter.use("/", createBrandRoutes);
productBrandRouter.use("/", editBrandRoutes);
productBrandRouter.use("/", deleteBrandRoutes);
productBrandRouter.use("/", getBrandRoutes);
/**
 *  MATCHES:
 *  POST   /api/v1/products/brands        → crear marca
 *  GET    /api/v1/products/brands        → listar marcas
 *  GET    /api/v1/products/brands/:id    → detalle de marca
 *  PUT    /api/v1/products/brands/:id    → editar marca
 *  DELETE /api/v1/products/brands/:id    → eliminar marca
 */

export default productRouter;
