using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using ProductService.Models;
using ProductService.Repositories;
using ProductService.Tests.Fakes;

namespace ProductService.Tests
{
    public class ProductsApiFactory : WebApplicationFactory<Program>
    {
        public FakeProductRepository Repository { get; } = new();

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.UseEnvironment("Development");

            builder.ConfigureServices(services =>
            {
                services.RemoveAll<IProductRepository>();

                services.AddSingleton<IProductRepository>(Repository);

                services
                    .AddAuthentication(options =>
                    {
                        options.DefaultAuthenticateScheme = TestAuthHandler.SchemeName;
                        options.DefaultChallengeScheme = TestAuthHandler.SchemeName;
                    })
                    .AddScheme<AuthenticationSchemeOptions, TestAuthHandler>(
                        TestAuthHandler.SchemeName,
                        _ => { });
            });
        }

        public void SeedProducts(params Product[] products)
        {
            Repository.Seed(products);
        }

        public void SeedColor(string color, params Product[] products)
        {
            Repository.SeedColor(color, products);
        }
    }
}