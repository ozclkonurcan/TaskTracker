using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskTracker.Application.Interfaces;

namespace TaskTracker.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly IAuthService _authService;

		public AuthController(IAuthService authService)
		{
			_authService = authService;
		}

		[HttpPost("register")]
		public async Task<IActionResult> Register([FromBody] AuthRequest request)
		{
			var token = await _authService.RegisterAsync(request.Email, request.Password);
			if (token == null) return BadRequest("Email zaten kullanımda.");
			return Ok(new { token });
		}

		[HttpPost("login")]
		public async Task<IActionResult> Login([FromBody] AuthRequest request)
		{
			var token = await _authService.LoginAsync(request.Email, request.Password);
			if (token == null) return Unauthorized("Email veya şifre yanlış.");
			return Ok(new { token });
		}
	}

	public record AuthRequest(string Email, string Password);
}
