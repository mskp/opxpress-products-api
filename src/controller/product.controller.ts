import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";
import prisma from "../config/prisma.js";
import { getPaginatedData } from "../util/index.js";

/**
 * Get all products with optional query parameters for pagination and field selection.
 *
 * @param {ExpressRequest} req - The request object, containing query parameters:
 *   - `limit` {string} - The number of products to return.
 *   - `page` {string} - The page number to fetch.
 *   - `fields` {string} - A comma-separated list of fields to include in the result.
 * @param {ExpressResponse} res - The response object.
 *
 * @returns {Promise<void>} Sends a JSON response with the products or an error message.
 */
export async function GetAllProducts(
  req: ExpressRequest,
  res: ExpressResponse
): Promise<void> {
  try {
    const { limit, page, fields } = req.query;

    const limitNumber = limit ? parseInt(limit as string, 10) : 10;
    const pageNumber = page ? parseInt(page as string, 10) : 1;
    const offsetNumber = (pageNumber - 1) * limitNumber;

    const selectFields = fields
      ? (fields as string).split(",").reduce((acc, field) => {
          acc[field.trim()] = true;
          return acc;
        }, {} as any)
      : undefined;

    // Get the total count of products
    const totalCount = await prisma.product.count();

    // Get the paginated products
    const products = await prisma.product.findMany({
      take: limitNumber,
      skip: offsetNumber,
      select: selectFields,
    });

    // Prepare the paginated response
    const paginatedResponse = getPaginatedData(
      products,
      totalCount,
      limitNumber,
      pageNumber,
      req
    );

    res.json(paginatedResponse);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
}

/**
 * Get a product by its ID.
 *
 * @param {ExpressRequest} req - The request object, containing the product ID in the route parameters.
 *   - `fields` {string} - A comma-separated list of fields to include in the result.
 * @param {ExpressResponse} res - The response object.
 *
 * @returns {Promise<void>} Sends a JSON response with the product details or an error message.
 */
export async function GetProductById(
  req: ExpressRequest,
  res: ExpressResponse
): Promise<void> {
  try {
    const { id } = req.params;
    const { fields } = req.query;

    const selectFields = fields
      ? (fields as string).split(",").reduce((acc, field) => {
          acc[field.trim()] = true;
          return acc;
        }, {} as any)
      : undefined;

    const product = await prisma.product.findUnique({
      where: { id },
      select: selectFields,
    });

    if (!product) {
      res.status(404).json({ error: "Product not found." });
      return;
    }

    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the product." });
  }
}
