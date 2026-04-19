using System.Data;
using Microsoft.Data.SqlClient;
using ProductService.Models;

namespace ProductService.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly string _conn;

        public ProductRepository(IConfiguration config)
        {
            _conn = config.GetConnectionString("Default");
        }

        public void Create(Product product)
        {
            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_create_products", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Name", product.Name);
            cmd.Parameters.AddWithValue("@Price", product.Price);
            cmd.Parameters.AddWithValue("@Description", product.Description);

            con.Open();
            cmd.ExecuteNonQuery();
        }

        public List<Product> GetAll()
        {
            var list = new List<Product>();

            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_select_products", con);
            cmd.CommandType = CommandType.StoredProcedure;

            con.Open();
            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Product
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    Price = (decimal)reader["Price"],
                    Description = reader["Description"].ToString(),
                    CreatedAt = (DateTime)reader["CreatedAt"]
                });
            }

            return list;
        }

        public List<Product> GetByColor(string color)
        {
            var list = new List<Product>();

            using var con = new SqlConnection(_conn);
            using var cmd = new SqlCommand("sp_select_product", con);
            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Color", color);

            con.Open();
            using var reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                list.Add(new Product
                {
                    Id = (int)reader["Id"],
                    Name = reader["Name"].ToString(),
                    Price = (decimal)reader["Price"],
                    Description = reader["Description"].ToString(),
                    CreatedAt = (DateTime)reader["CreatedAt"]
                });
            }

            return list;
        }
    }
}