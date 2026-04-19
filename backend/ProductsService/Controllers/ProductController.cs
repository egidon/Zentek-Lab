using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ProductService.Models;
using ProductService.Services;

namespace ProductService.Controllers
{
    [ApiController]
    [Route("api/products")]
    [Authorize]
    public class ProductController : ControllerBase
    {
        private readonly ProductAppService _service;

        public ProductController(ProductAppService service)
        {
            _service = service;
        }

        [HttpPost]
        public IActionResult Create(Product product)
        {
            try
            {
                _service.Create(product);
                return Ok("Created");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("search")]
        public IActionResult GetByColor([FromQuery] string color)
        {
            var result = _service.GetByColor(color);

            if (!result.Any())
                return NotFound("No products found");

            return Ok(result);
        }
    }
}