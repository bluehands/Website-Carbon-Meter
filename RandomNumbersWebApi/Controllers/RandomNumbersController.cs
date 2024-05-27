using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace RandomNumbersWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RandomNumbersController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<RandomNumbersController> _logger;

        public RandomNumbersController(ILogger<RandomNumbersController> logger)
        {
            _logger = logger;
        }

        [HttpGet()]
        public async Task Get([FromQuery]int length = 3)
        {
            var list = new List<RandomNumber>();
            for (int i = 0; i < length; i++)
            {
                list.Add(new RandomNumber(Random.Shared.Next()));
            }

            var response = HttpContext.Response;
            response.Headers.Add("Content-Type", "application/json; charset=utf-8");
            response.Headers.Add("Access-Control-Allow-Origin", "*");
            response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
            response.Headers.Add("Access-Control-Allow-Headers", "*");
            response.Headers.Add("Access-Control-Allow-Credentials", "true");
            response.Headers.Add("Timing-Allow-Origin", "*");
            await response.Body.WriteAsync(JsonSerializer.SerializeToUtf8Bytes(list));

        }
    }
    public record RandomNumber(int Number);
}
