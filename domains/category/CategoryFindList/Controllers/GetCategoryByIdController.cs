using CategoryFindList.Models;
using Microsoft.AspNetCore.Mvc;

namespace CategoryFindList.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class GetCategoryByIdController : ControllerBase
    {
        private readonly GetCategoryByIdService _service;

        public GetCategoryByIdController(GetCategoryByIdService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await _service.ExecuteAsync(id);

            if (category == null)
                return NotFound(new { message = "Category not found." });

            return Ok(category);
        }
    }
}
