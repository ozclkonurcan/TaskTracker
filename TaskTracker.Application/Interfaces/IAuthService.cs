using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskTracker.Application.Interfaces
{
	public interface IAuthService
	{
		Task<string?> RegisterAsync(string email, string password);
		Task<string?> LoginAsync(string email, string password);
	}
}
