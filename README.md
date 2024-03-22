# Book Management System

This is a simple book management system that allows users to authenticate and perform CRUD operations on books.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```sh
   git clone git@github.com:AbdallahMGomaa/book-management-system.git
2. Install dependencies:
   ```sh
   cd book-management-system
   npm install
3. Set up your environment:
   ```text
   SERVER_PORT=your_server port
   POSTGRES_USER=your_database_user
   POSTGRES_PASSWORD=your_database_password
   POSTGRES_DB=your_database_name
   POSTGRES_PORT=your_database_port
   POSTGRES_ADDRESS=your_database_address
   SECRET_KEY=your_secret_key
4. Run application:
   ```shell
   npm start
5. (optional) Run application on docker:
   ```shell
   docker-compose up
6. Run unit tests:
   ```shell
   npm test

## Authentication
The system provides basic JWT authentication through these endpoints, it also provides role based authorization.
The system implements two roles which are "borrower" and "admin"

- `POST /auth/register`: Sign up a new user.
- `POST /auth/login`: Login an existing user.
- `GET /auth/roles`: Returns all user roles.
To sign up a new user, send a `POST` request to `/auth/signup` with the following JSON payload:

```json
{
  "email": "email",
  "password": "your_password"
}
```

**note**: only roles endpoint is authenticated

## Book CRUD operations
the system provides the following endpoints for CRUD operations on books
- `GET /books`: Get all books, can send query parameters to filter books.
- `GET /books/:id`: Get a book by its id.
- `POST /books`: Creates a new book.
- `PUT /books/:id`: Updates a book by its id.
- `DELETE /books/:id`: Deletes a book by its id.

### Inputs and outputs expected
To create a new book, send a `POST` request to `/books` with the following JSON payload:
```json
{
   "title": "Book Title",
   "author": "Author Name",
   "ISBN": "ISBN Number",
   "available_quantity": "available_quantity",
   "shelf_location": "shelf_location"
}
```

To update a book, send a `PUT` request to `/books/:id` and replace :id with the book id to be updated, the fields sent in the JSON payload will be updated


**note**: POST, PUT, or DELETE are only allowed for users with role "admin"

## Borrower CRUD operations
- `GET /borrowers`: Get all borrowers, can send query parameters to filter borrowers.
- `GET /borrowers/:id`: Get a borrowers by its id.
- `POST /borrowers`: Signs up a new borrower and creates a user entry.
- `PUT /borrowers/:id`: Updates a borrowers by its id.
- `DELETE /borrowers/:id`: Deletes a borrowers by its id.

To create a new borrower, send a `POST` request to `/borrowers` with the following JSON payload:
```json
{
   "name": "your_name",
   "email": "your_email",
   "password": "your_password"
}
```

**note**: GET, or DELETE are only allowed for users with role "admin" while PUT is allowed for both "admin" and borrower.
POST is unauthenticated.

## Borrowing process endpoints
- `POST /borrow/checkout`: a borrower user borrows a book by its id
- `POST /borrow/return`: a borrower user returns a book that he/she borrowed
- `GET /borrow/borrowed`: returns all borrowed books by this borrower

To checkout a book send a `POST` request to `/borrow/checkout` with the following JSON payload
```json
{
   "bookId": "boodId"
}
```

To return a book send a `POST` request to `/borrow/return` with the following JSON payload
```json
{
   "bookId": "boodId"
}
```

**note**: all endpoints are authorized for "borrower" only

## Reporting endpoints
- `GET /reports/borrowing_process`: returns an excel sheet with all borrowings between a certain date.
- `GET /reports/last_month_borrowed`: returns an excel sheet with all the books borrowed last month
- `GET /reports/last_month_overdue`: returns an excel sheet with all overdue borrowed books last month

**note**: all endpoints are authorized for "admin" only