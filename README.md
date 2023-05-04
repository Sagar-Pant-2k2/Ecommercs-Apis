# Introduction:
The e-commerce site is designed to provide a platform for college students to resell their used items. 

# Technologies Used
-Node.js
-Express.js
-MongoDB
-JWT
-bcrypt

# API Documentation:
The API provides endpoints for the following functionality:

1. Authentication - The API supports registration and login for buyers.

2. Product Management - The API allows admin to create, update, and delete products. Buyers can browse through products and add them to their cart.

3. Cart Management - The API allows buyers to manage their cart. They can add, update, and remove products from their cart.

4. Order Management - The API allows buyers to place orders for the products in their cart. Sellers can view and manage their orders.

# API Endpoints:

1. Authentication
- POST /api/v1/auth/register - Register a new user
- POST /api/v1/auth/login - Login a user

2. Product Management
- POST /api/v1/products - Create a new product
- GET /api/v1/products - Get a list of all products
- GET /api/v1/products/:id - Get details of a specific product
- PUT /api/v1/products/:id - Update a specific product
- DELETE /api/v1/products/:id - Delete a specific product

3. Cart Management
- POST /api/v1/cart - Add a product to cart
- GET /api/v1/cart - Get all products in cart
- PUT /api/v1/cart/:id - Update a specific product in cart
- DELETE /api/v1/cart/:id - Remove a specific product from cart

4. Order Management
- POST /api/v1/order - Place an order
- GET /api/v1/order - Get all orders for a seller
- GET /api/v1/order/:id - Get details of a specific order
- PUT /api/v1/order/:id - Update a specific order

# API Security:
The API uses JSON Web Tokens (JWT) for authentication and authorization. Every request to a protected endpoint must include a valid JWT token in the Authorization header. The API also uses bcrypt for password hashing.

# Database:
The project uses MongoDB as the database. The database schema includes collections for Users, Products, Cart, and Orders.

# Conclusion:
This e-commerce site provides a platform for college students to resell their used items. It is easy to use, secure, and efficient.
