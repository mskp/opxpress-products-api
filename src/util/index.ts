import type { Request as ExpressRequest } from "express";

type PaginationMetadata = {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  firstPageUrl: string | null;
  previousPageUrl: string | null;
  nextPageUrl: string | null;
  lastPageUrl: string | null;
};

type PaginatedResponse<T> = {
  data: T[];
  pagination: PaginationMetadata;
};

/**
 * Paginate data and structure the response with pagination metadata.
 *
 * @param {Array} data - The array of data to be paginated.
 * @param {number} totalCount - The total count of items available.
 * @param {number} limit - The number of items per page.
 * @param {number} page - The current page number.
 * @param {Request} req - The Express request object.
 * @returns The paginated data with metadata.
 */
export function getPaginatedData<T>(
  data: T[],
  totalCount: number,
  limit: number,
  page: number,
  req: ExpressRequest
): PaginatedResponse<T> {
  const currentPage = page;
  const totalPages = Math.ceil(totalCount / limit);

  const protocol = req.protocol;
  const host = req.get("host");
  const originalUrl = req.originalUrl.split("?")[0];
  const baseUrl = `${protocol}://${host}${originalUrl}`;

  const queryParams = { ...req.query };
  delete queryParams.limit;
  delete queryParams.page;

  const createPageUrl = (page: number) => {
    const url = new URL(baseUrl);
    Object.keys(queryParams).forEach((key) => {
      url.searchParams.set(key, String(queryParams[key]));
    });
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("page", String(page));
    return url.toString();
  };

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return {
    data,
    pagination: {
      totalItems: totalCount,
      currentPage,
      totalPages,
      itemsPerPage: limit,
      hasPreviousPage,
      hasNextPage,
      firstPageUrl: currentPage > 1 ? createPageUrl(1) : null,
      previousPageUrl: hasPreviousPage ? createPageUrl(currentPage - 1) : null,
      nextPageUrl: hasNextPage ? createPageUrl(currentPage + 1) : null,
      lastPageUrl: currentPage < totalPages ? createPageUrl(totalPages) : null,
    },
  };
}
