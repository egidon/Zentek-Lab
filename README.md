# Zentek Lab

Full-stack Products API built with ASP.NET Core and React, with JWT authentication, a SQL-backed repository layer, automated tests, and a simple architecture diagram.

## Repository Structure

- `backend/ProductsService` - .NET 8 Web API for product operations
- `backend/ProductsService.Tests` - unit and integration tests
- `backend/JwtProbe` - reserved utility folder for JWT probing helpers
- `frontend` - React client application
- `Zentek Sql` - SQL script for the `Zentek` database, products table, and stored procedures
- `ARCHITECTURE.md` - high-level system diagram

## Tech Stack

- Backend: ASP.NET Core 8, ADO.NET, JWT Bearer auth
- Frontend: React, Create React App
- Database: SQL Server with stored procedures
- Testing: xUnit and ASP.NET Core integration testing

## Prerequisites

- .NET 8 SDK
- Node.js 18+ and npm
- SQL Server instance if you want to run the repository against a real database

## Backend Setup

1. Update `backend/ProductsService/appsettings.json` with your local database connection string.
2. Run the `Zentek Sql` script against your SQL Server instance.
3. Optionally set `Jwt__Key` and `Jwt__Issuer` as environment variables.

From the repository root:

```powershell
dotnet run --project backend/ProductsService/ProductsService.csproj
```

The default local HTTP URL is `http://localhost:5069`.

In development, if `Jwt__Key` is not set, the API uses an in-memory development signing key so no secret needs to be committed.

## Frontend Setup

```powershell
cd frontend
npm install
npm start
```

The React app runs on `http://localhost:3000`.

## Tests

```powershell
dotnet test backend/ProductsService.Tests/ProductsService.Tests.csproj
```

## Notes

- Build artifacts, local IDE files, logs, and environment files are ignored
- Production secrets and real credentials should be supplied through environment variables or secure local configuration
- See `ARCHITECTURE.md` for the service interaction diagram
