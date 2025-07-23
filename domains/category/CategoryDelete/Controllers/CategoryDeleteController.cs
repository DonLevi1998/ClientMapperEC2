using CategoryDelete.Data;
using CategoryDelete.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace CategoryDelete.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryDeleteController : ControllerBase
    {
        private readonly MySQLContext _context;

        public CategoryDeleteController(MySQLContext context)
        {
            _context = context;
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete([FromBody] CategoryDeleteDTO dto)
        {
            if (dto.IdCategory <= 0)
                return BadRequest(new { message = "IdCategory is required and must be positive." });

            try
            {
                var deleted = await _context.DeleteCategoryAsync(dto.IdCategory);

                if (!deleted)
                    return NotFound(new { message = "Category not found." });

                return Ok(new { message = "Category deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Database error", error = ex.Message });
            }
        }
    }
}
