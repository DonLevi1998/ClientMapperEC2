# ClientMapperEC

This project is organized into several domains, each implemented as a microservice. Every domain provides a full set of CRUD operations (Create, Read, Update, Delete, and fetch by ID) for managing its respective data in the database.

## Domains

### Users
The Users domain manages user accounts and related information. It provides endpoints to create new users, retrieve user lists, update user details, delete users, and fetch users by their unique ID.

### Products
The Products domain handles product data. It allows for the creation, listing, updating, deletion, and retrieval of products by ID, supporting all necessary operations to manage product information in the system.

### Auth-Services
The Auth-Services domain is responsible for authentication and authorization. It includes endpoints for user login, registration, and token validation, as well as CRUD operations for managing authentication-related data.

### Category
The Category domain manages product categories. It provides endpoints to create, list, update, delete, and fetch categories by ID, enabling efficient organization and retrieval of product categories.

---

Each domain is implemented as a microservice, ensuring modularity and scalability. All services follow RESTful principles and interact with the database to perform the required operations.
