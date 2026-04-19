# Products Service Architecture

```mermaid
flowchart LR
    Frontend[React App]
    Gateway[API Gateway]
    Products[Products Service]
    Orders[Orders Service]
    Payments[Payments Service]
    Broker[Message Broker\nRabbitMQ / Kafka]
    Database[(Products Database)]

    Frontend -->|HTTP| Gateway
    Gateway -->|HTTP| Products
    Gateway -->|HTTP| Orders
    Gateway -->|HTTP| Payments

    Products -->|Read / Write| Database
    Products -->|Product events| Broker
    Broker -->|Consumes events| Orders
    Broker -->|Consumes events| Payments
```

HTTP traffic flows from the React frontend through an API gateway to the backend services.

The Products Service persists product data in its database and publishes product-related events that downstream services can consume asynchronously.