# OpXpress Products API

Welcome to the OpXpress Products API! This API provides easy access to a wide range of product information, allowing developers to integrate product data into their applications, websites, and services seamlessly.

## Documentation

The API documentation is available [here](https://documenter.getpostman.com/view/31476421/2sA3XLDiMV).

## Base URL

The base URL for the API is:

```
https://api.opxpress.sushant.fun
```

## Features

- **Retrieve Product Data**: Access detailed information about various products available.
- **No API Key Required**: Enjoy hassle-free access to product data without authentication requirements.

## Endpoints

### 1. Get All Products

Retrieve all products with optional query parameters for pagination and field selection.

- **URL**: `/products`
- **Method**: `GET`
- **Query Parameters**:
  - `limit`: The number of products to return per page.
  - `page`: The page number to fetch.
  - `fields`: A comma-separated list of fields to include in the result.
  - `category`: The category to filter products by.
    - `men's clothing`
    - `women's clothing`
    - `accessories`

### 2. Get Product by ID

Retrieve a product by its ID.

- **URL**: `/products/{id}`
- **Method**: `GET`
- **Path Parameter**:
  - `id`: The unique identifier of the product.

## Usage

To use the API, simply make HTTP requests to the provided endpoints with the appropriate parameters.

### Example

```http
GET /api/products?limit=10&page=1&fields=id,name,price&category=women's clothing HTTP/1.1
Host: api.opxpress.sushant.fun
```

## Getting Started

To get started with the OpXpress Products API, refer to the [API documentation](https://documenter.getpostman.com/view/31476421/2sA3XLDiMV) for detailed information on available endpoints and request parameters.
