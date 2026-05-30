using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskTracker.Application.Interfaces;
using TaskTracker.Domain.Entities;
using TaskTracker.Infrastructure.Persistence;

namespace TaskTracker.Infrastructure.Repositories
{
	public class TaskRepository : ITaskRepository
	{
		private readonly AppDbContext _context;

		public TaskRepository(AppDbContext context)
		{
			_context = context;
		}

		public async Task<List<TaskItem>> GetAllAsync()
			=> await _context.Tasks.ToListAsync();

		public async Task<TaskItem?> GetByIdAsync(int id)
			=> await _context.Tasks.FindAsync(id);

		public async Task AddAsync(TaskItem task)
		{
			await _context.Tasks.AddAsync(task);
			await _context.SaveChangesAsync();
		}

		public async Task UpdateAsync(TaskItem task)
		{
			_context.Tasks.Update(task);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteAsync(int id)
		{
			var task = await _context.Tasks.FindAsync(id);
			if (task != null)
			{
				_context.Tasks.Remove(task);
				await _context.SaveChangesAsync();
			}
		}
	}
}
