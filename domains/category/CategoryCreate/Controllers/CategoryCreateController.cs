using CategoryCreate.Data;
using CategoryCreate.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CategoryCreate.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryCreateController : ControllerBase
    {
        private readonly MySQLContext _context;

        public CategoryCreateController(MySQLContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CategoryCreateDTO dto)
        {
            if (string.IsNullOrEmpty(dto.NameCategory))
                return BadRequest(new { message = "NameCategory is required." });

            try
            {
                var result = await _context.CreateCategoryAsync(
                    dto.NameCategory,
                    dto.DescriptionCategory
                );
                return Created("", new { message = "Category created successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Database error", error = ex.Message });
            }
        }
    }
}
