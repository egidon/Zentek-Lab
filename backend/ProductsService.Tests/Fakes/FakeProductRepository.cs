using ProductService.Models;
using ProductService.Repositories;

namespace ProductService.Tests.Fakes
{
    public class FakeProductRepository : IProductRepository
    {
        private readonly List<Product> _products = new();
        private readonly Dictionary<string, List<Product>> _productsByColor = new(StringComparer.OrdinalIgnoreCase);

        public int CreateCalls { get; private set; }
        public Product? LastCreatedProduct { get; private set; }

        public void Create(Product product)
        {
            CreateCalls++;
            LastCreatedProduct = product;

            var storedProduct = new Product
            {
                Id = _products.Count + 1,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                CreatedAt = product.CreatedAt == default ? DateTime.UtcNow : product.CreatedAt
            };

            _products.Add(storedProduct);
        }

        public List<Product> GetAll()
        {
            return _products
                .Select(Clone)
                .ToList();
        }

        public List<Product> GetByColor(string color)
        {
            if (string.IsNullOrWhiteSpace(color))
            {
                return new List<Product>();
            }

            return _productsByColor.TryGetValue(color, out var products)
                ? products.Select(Clone).ToList()
                : new List<Product>();
        }

        public void Seed(params Product[] products)
        {
            _products.Clear();
            _products.AddRange(products.Select(Clone));
        }

        public void SeedColor(string color, params Product[] products)
        {
            _productsByColor[color] = products.Select(Clone).ToList();
        }

        private static Product Clone(Product product)
        {
            return new Product
            {
                Id = product.Id,
                Name = product.Name,
                Price = product.Price,
                Description = product.Description,
                CreatedAt = product.CreatedAt
            };
        }
    }
}