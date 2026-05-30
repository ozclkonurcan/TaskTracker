using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskTracker.Domain.Entities;

namespace TaskTracker.Application.Interfaces
{
	public interface ITaskRepository
	{
		Task<List<TaskItem>> GetAllAsync();
		Task<TaskItem?> GetByIdAsync(int id);
		Task AddAsync(TaskItem task);
		Task UpdateAsync(TaskItem task);
		Task DeleteAsync(int id);
	}
}
