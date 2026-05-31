using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TaskTracker.Application.Interfaces;
using TaskTracker.Domain.Entities;

namespace TaskTracker.Infrastructure.Repositories
{
	public class CachedTaskRepository : ITaskRepository
	{
		private readonly TaskRepository _inner;
		private readonly IDistributedCache _cache;
		private const string CacheKey = "tasks";

		public CachedTaskRepository(TaskRepository inner, IDistributedCache cache)
		{
			_inner = inner;
			_cache = cache;
		}

		public async Task<List<TaskItem>> GetAllAsync()
		{
			var cached = await _cache.GetStringAsync(CacheKey);
			if (cached != null)
				return JsonSerializer.Deserialize<List<TaskItem>>(cached)!;

			var tasks = await _inner.GetAllAsync();
			await _cache.SetStringAsync(CacheKey, JsonSerializer.Serialize(tasks),
				new DistributedCacheEntryOptions
				{
					AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(5)
				});

			return tasks;
		}

		public async Task<TaskItem?> GetByIdAsync(int id)
			=> await _inner.GetByIdAsync(id);

		public async Task AddAsync(TaskItem task)
		{
			await _inner.AddAsync(task);
			await _cache.RemoveAsync(CacheKey);
		}

		public async Task UpdateAsync(TaskItem task)
		{
			await _inner.UpdateAsync(task);
			await _cache.RemoveAsync(CacheKey);
		}

		public async Task DeleteAsync(int id)
		{
			await _inner.DeleteAsync(id);
			await _cache.RemoveAsync(CacheKey);
		}
	}
}
