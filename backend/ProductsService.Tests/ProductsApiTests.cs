using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using ProductService.Models;

namespace ProductService.Tests
{
    public class ProductsApiTests
    {
        [Fact]
        public async Task Health_ReturnsOkWithoutAuthentication()
        {
            using var factory = new ProductsApiFactory();
            using var client = factory.CreateClient();

            var response = await client.GetAsync("/health");
            var body = await response.Content.ReadAsStringAsync();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("OK", body.Trim('"'));
        }

        [Fact]
        public async Task GetProducts_ReturnsSeededProducts()
        {
            using var factory = new ProductsApiFactory();
            factory.SeedProducts(new Product
            {
                Id = 1,
                Name = "Laptop",
                Price = 1299m,
                Description = "Workstation",
                CreatedAt = new DateTime(2026, 4, 19, 12, 0, 0, DateTimeKind.Utc)
            });

            using var client = CreateAuthorizedClient(factory);

            var response = await client.GetAsync("/api/products");
            var products = await response.Content.ReadFromJsonAsync<List<Product>>();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(products);
            Assert.Single(products!);
            Assert.Equal("Laptop", products[0].Name);
        }

        [Fact]
        public async Task CreateProduct_ReturnsOkAndAddsProduct()
        {
            using var factory = new ProductsApiFactory();
            using var client = CreateAuthorizedClient(factory);

            var payload = new Product
            {
                Name = "Monitor",
                Price = 249.99m,
                Description = "27 inch display"
            };

            var response = await client.PostAsJsonAsync("/api/products", payload);
            var products = factory.Repository.GetAll();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Single(products);
            Assert.Equal("Monitor", products[0].Name);
        }

        [Fact]
        public async Task SearchProductsByColor_ReturnsMatchingProducts()
        {
            using var factory = new ProductsApiFactory();
            factory.SeedColor(
                "red",
                new Product
                {
                    Id = 5,
                    Name = "Speaker",
                    Price = 79.99m,
                    Description = "Bluetooth speaker",
                    CreatedAt = new DateTime(2026, 4, 19, 10, 0, 0, DateTimeKind.Utc)
                });

            using var client = CreateAuthorizedClient(factory);

            var response = await client.GetAsync("/api/products/search?color=red");
            var products = await response.Content.ReadFromJsonAsync<List<Product>>();

            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.NotNull(products);
            Assert.Single(products!);
            Assert.Equal("Speaker", products[0].Name);
        }

        private static HttpClient CreateAuthorizedClient(ProductsApiFactory factory)
        {
            var client = factory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(TestAuthHandler.SchemeName);
            return client;
        }
    }
}