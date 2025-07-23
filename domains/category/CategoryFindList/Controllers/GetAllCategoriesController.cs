using CategoryFindList.Models;
using Microsoft.AspNetCore.Mvc;

namespace CategoryFindList.Controllers
{
    [ApiController]
    [Route("api/category/all")]
    public class GetAllCategoriesController : ControllerBase
    {
        private readonly GetAllCategoriesService _service;

        public GetAllCategoriesController(GetAllCategoriesService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.ExecuteAsync();
            return Ok(result);
        }
    }
}
