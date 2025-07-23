using CategoryUpdate.Data;
using CategoryUpdate.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CategoryUpdate.Controllers
{
    [ApiController]
    [Route("api/category/update")]
    public class UpdateCategoryController : ControllerBase
    {
        private readonly UpdateCategoryService _service;

        public UpdateCategoryController(UpdateCategoryService service)
        {
            _service = service;
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] CategoryUpdateDTO dto)
        {
            if (dto.IdCategory <= 0 || string.IsNullOrWhiteSpace(dto.NameCategory))
            {
                return BadRequest(new { message = "IdCategory and NameCategory are required." });
            }

            var success = await _service.ExecuteAsync(dto);

            if (!success)
                return NotFound(new { message = "Category not found." });

            return Ok(new { message = "Category updated successfully." });
        }
    }
}
