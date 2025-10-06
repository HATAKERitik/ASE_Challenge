# Product Inventory Management API 📦

This is a RESTful API designed for managing product inventory, providing standard CRUD (Create, Read, Update, Delete) operations, and specific endpoints for stock quantity management.

It's built with **Node.js**, **Express.js**, and uses **Prisma** as the Object-Relational Mapper (ORM) for interacting with the database.

---

## Prerequisites

Before running this API, ensure you have:

* **Node.js** and **npm** installed.
* A database configured and accessible by **Prisma**.
* The Prisma client generated (`npx prisma generate`).

---

## API Endpoints

The API base path is assumed to be where your routes are configured (e.g., `/api`).

### 1. Product Retrieval (GET)

| Method | Endpoint | Description | Success Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/products` | Fetches a list of **all products** in the inventory. | `200 OK` | Returns an array of product objects. |
| **GET** | `/product/:id` | Fetches a **single product** by its unique ID. | `200 OK` | `:id` must be provided. Returns `404 Not Found` if the product doesn't exist. |
| **GET** | `/products/underthreshold/:threshold` | Fetches products where `stock_quntity` is **less than** the specified `:threshold`. | `200 OK` | |
| **GET** | `/products/underthreshold` | Fetches products where `stock_quntity` is **less than the default threshold of 10**. | `200 OK` | Uses a default threshold if not provided in the URL. |

### 2. Product Creation and Deletion

| Method | Endpoint | Description | Success Status | Request Body (JSON Example) |
| :--- | :--- | :--- | :--- | :--- |
| **POST** | `/product` | Creates a **new product**. | `201 Created` | `{ "name": "New Gadget", "price": 49.99, "stock_quntity": 100 }` |
| **DELETE** | `/product/:id` | **Deletes** a product by its ID. | `200 OK` | *(None)* |

### 3. Stock Management (PUT/Update)

These endpoints specifically manage the `stock_quntity` field.

| Method | Endpoint | Description | Success Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **PUT** | `/products/increase/:id/:stock_quantity` | **Increases** the stock of product `:id` by the amount specified in `:stock_quantity`. | `200 OK` | |
| **PUT** | `/product/decrease/:id/:stock_quantity` | **Decreases** the stock of product `:id` by the amount specified in `:stock_quantity`. | `200 OK` | **Validation:** Fails with `400 Bad Request` if the decrease amount would result in a stock quantity less than zero. |

---

## Data Schema Reference

This API assumes a Prisma model named `products` with at least the following fields:

| Field Name | Type | Description |
| :--- | :--- | :--- |
| `id` | `Int` | Unique identifier for the product. |
| `stock_quntity` | `Int` | The current stock level of the product. |
| *...other fields* | *...* | *(e.g., name, price, description)* |

---

## Error Responses

The API uses standard HTTP status codes to indicate the outcome of a request:

| Status Code | Response Body | Description |
| :--- | :--- | :--- |
| **200 OK** | `{ "Status": "Sucessfull", "Data": ... }` | The request was successful (GET, DELETE, PUT). |
| **201 Created** | `{ "Status": "Sucessfully created the product", "Data": ... }` | A new resource was created (POST). |
| **400 Bad Request** | `{ "Status": "Failed", "Message": ... }` | Client-side error (e.g., missing ID, trying to decrease stock below zero). |
| **404 Not Found** | `{ "Status": "Failed", "Message": "No product found with ID:..." }` | The requested product ID does not exist. |
| **500 Internal Server Error** | `{ "status": "Error", "message": "Failed to...", "error": ... }` | A server-side or database-related error occurred. |
