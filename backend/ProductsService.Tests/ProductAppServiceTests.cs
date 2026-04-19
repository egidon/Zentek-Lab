using ProductService.Models;
using ProductService.Services;
using ProductService.Tests.Fakes;

namespace ProductService.Tests
{
    public class ProductAppServiceTests
    {
        [Fact]
        public void Create_WithValidProduct_SavesProduct()
        {
            var repository = new FakeProductRepository();
            var service = new ProductAppService(repository);
            var product = new Product
            {
                Name = "Keyboard",
                Price = 99.99m,
                Description = "Compact keyboard"
            };

            service.Create(product);

            Assert.Equal(1, repository.CreateCalls);
            Assert.NotNull(repository.LastCreatedProduct);
            Assert.Equal("Keyboard", repository.LastCreatedProduct!.Name);
        }

        [Fact]
        public void Create_WithEmptyName_ThrowsAndDoesNotSave()
        {
            var repository = new FakeProductRepository();
            var service = new ProductAppService(repository);
            var product = new Product
            {
                Name = "   ",
                Price = 50m,
                Description = "Missing name"
            };

            var action = () => service.Create(product);

            var exception = Assert.Throws<Exception>(action);
            Assert.Equal("Name is required", exception.Message);
            Assert.Equal(0, repository.CreateCalls);
        }

        [Fact]
        public void Create_WithInvalidPrice_ThrowsAndDoesNotSave()
        {
            var repository = new FakeProductRepository();
            var service = new ProductAppService(repository);
            var product = new Product
            {
                Name = "Mouse",
                Price = 0m,
                Description = "Invalid price"
            };

            var action = () => service.Create(product);

            var exception = Assert.Throws<Exception>(action);
            Assert.Equal("Invalid price", exception.Message);
            Assert.Equal(0, repository.CreateCalls);
        }
    }
}