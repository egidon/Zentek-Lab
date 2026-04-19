using ProductService.Models;

namespace ProductService.Repositories
{
    public interface IProductRepository
    {
        void Create(Product product);
        List<Product> GetAll();
        List<Product> GetByColor(string color);
    }
}