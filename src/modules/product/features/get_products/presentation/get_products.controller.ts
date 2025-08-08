// src/modules/product/features/get_products/presentation/get_products.controller.ts
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { buildHttpResponse } from "../../../../../utils/build_http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import prisma from "../../../../../config/prisma_client";
import { AppError } from "../../../../../utils/errors";
import { PRODUCT_MESSAGES } from "../../../../../constants/messages/product";

/**
 * GET /api/v1/products
 * Si no se pasa `?id`, retorna todos los productos.
 * Si se pasa `?id=uuid`, retorna el detalle.
 */
export const getProducts = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (id) {
    const product = await prisma.products.findUnique({
      where: { id: String(id) },
    });

    if (!product) {
      throw new AppError(
        PRODUCT_MESSAGES.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(
        HttpStatusCodes.OK.code,
        "Detalle del producto",
        req.path,
        product
      )
    );
  }

  const products = await prisma.products.findMany();

  return res.status(HttpStatusCodes.OK.code).json(
    buildHttpResponse(
      HttpStatusCodes.OK.code,
      "Lista de productos",
      req.path,
      products
    )
  );
});

/**
 * GET /api/v1/products/:id
 * Recibe el ID como parámetro de ruta.
 */
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await prisma.products.findUnique({
    where: { id },
  });

  if (!product) {
    throw new AppError(
      PRODUCT_MESSAGES.NOT_FOUND,
      HttpStatusCodes.NOT_FOUND.code
    );
  }

  return res.status(HttpStatusCodes.OK.code).json(
    buildHttpResponse(
      HttpStatusCodes.OK.code,
      "Detalle del producto",
      req.path,
      product
    )
  );
});
