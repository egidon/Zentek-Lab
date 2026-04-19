# Zentek-Lab
Full-stack Products API built with .NET 6 and React, featuring JWT authentication, mssql database repository pattern, unit &amp; integration tests, and microservices-ready architecture.

- Overview
- Tech Stack
- How to Run Backend
- How to Run Frontend
- API Endpoints
- Architecture Diagram

===============================================================
  Zentek-Lab
===============================================================
What is this?
This is a small full-stack project I built for a senior developer test.
It’s basically a Products system where you can:
add products
view all products
filter products (like by color)
and see everything working end-to-end (backend + frontend)
It’s not overcomplicated on purpose. I tried to keep it clean and realistic.

================================================================
What I used
================================================================
Backend
.NET 6 (Web API)
ADO.NET (no ORM, just direct DB access)
JWT for authentication
Stored procedures
Unit + Integration tests
Frontend
React (simple setup, no heavy libraries)
Axios / fetch for API calls
Basic UI (nothing fancy, just works)

================================================================
How the project is structured
================================================================

Backend is split into:
Controller → handles requests
Services → business logic
Repository → database stuff
Models → data structure
Frontend is also structured (kept similar on purpose):
controller → API calls
services → logic
model → data structure
components → UI
I didn’t try to be too clever here. Just clean separation.

================================================================
Features
================================================================
Health check (/health) → returns "OK"
Create product
Get all products
Filter products by color
JWT protection (everything except /health)
JSON raw view on frontend
Basic error handling

================================================================
How to run it
================================================================

Backend
cd backend
dotnet restore
dotnet run

Runs on:
http://localhost:5069


Frontend
cd frontend
npm install
npm start

Runs on:
http://localhost:3000

================================================================
Important config
================================================================
Check appsettings.json:
"ConnectionStrings": {
  "Default": "your_database_connection"
},
"DatabaseProvider": "Microsoft.Data.SqlClient"

Make sure your DB is set up and stored procedures exist.

================================================================
Tests
================================================================
I added:
Unit tests (for services)
Integration tests (for API endpoints)
They are not overdone, just enough to prove things work.
Run tests:
dotnet test

================================================================
Architecture (simple idea)
================================================================
React App
    |
    v
Products API
    |
    v
Database


Events (future idea):
Products → Orders → Payments

There’s also an event-driven idea where:
Products service can send events
Orders and Payments can react to them
I didn’t fully implement that part, just showed how it would fit.

================================================================
Things I didn’t overdo
================================================================
No heavy frameworks
No unnecessary patterns
No overengineering
This is intentional.

================================================================
Why I built it this way
================================================================
I wanted to show:
I understand clean structure
I can keep things simple
I can build something that actually works end-to-end
