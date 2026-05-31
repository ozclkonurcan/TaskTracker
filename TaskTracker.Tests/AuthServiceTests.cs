using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskTracker.Infrastructure.Persistence;
using TaskTracker.Infrastructure.Services;

namespace TaskTracker.Tests
{
	public class AuthServiceTests
	{
		private AppDbContext GetInMemoryContext()
		{
			var options = new DbContextOptionsBuilder<AppDbContext>()
				.UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
				.Options;
			return new AppDbContext(options);
		}

		private IConfiguration GetConfiguration()
		{
			var config = new Dictionary<string, string?>
		{
			{ "Jwt:Key", "test-secret-key-minimum-32-characters!!" },
			{ "Jwt:Issuer", "TaskTracker" },
			{ "Jwt:Audience", "TaskTracker" }
		};
			return new ConfigurationBuilder()
				.AddInMemoryCollection(config)
				.Build();
		}

		[Fact]
		public async Task Register_WithNewEmail_ReturnsToken()
		{
			var context = GetInMemoryContext();
			var config = GetConfiguration();
			var service = new AuthService(context, config);

			var token = await service.RegisterAsync("test@test.com", "123456");

			Assert.NotNull(token);
		}

		[Fact]
		public async Task Register_WithExistingEmail_ReturnsNull()
		{
			var context = GetInMemoryContext();
			var config = GetConfiguration();
			var service = new AuthService(context, config);

			await service.RegisterAsync("test@test.com", "123456");
			var token = await service.RegisterAsync("test@test.com", "123456");

			Assert.Null(token);
		}

		[Fact]
		public async Task Login_WithWrongPassword_ReturnsNull()
		{
			var context = GetInMemoryContext();
			var config = GetConfiguration();
			var service = new AuthService(context, config);

			await service.RegisterAsync("test@test.com", "123456");
			var token = await service.LoginAsync("test@test.com", "yanlis_sifre");

			Assert.Null(token);
		}
	}
}
