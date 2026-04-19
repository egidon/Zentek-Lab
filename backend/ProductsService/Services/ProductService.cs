using ProductService.Models;
using ProductService.Repositories;

namespace ProductService.Services
{
    public class ProductAppService
    {
        private readonly IProductRepository _repo;

        public ProductAppService(IProductRepository repo)
        {
            _repo = repo;
        }

        public void Create(Product product)
        {
            if (string.IsNullOrWhiteSpace(product.Name))
                throw new Exception("Name is required");

            if (product.Price <= 0)
                throw new Exception("Invalid price");

            _repo.Create(product);
        }

        public List<Product> GetAll()
        {
            return _repo.GetAll();
        }

        public List<Product> GetByColor(string color)
        {
            return _repo.GetByColor(color);
        }
    }
}