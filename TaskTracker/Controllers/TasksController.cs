using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskTracker.Application.Interfaces;
using TaskTracker.Domain.Entities;

namespace TaskTracker.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class TasksController : ControllerBase
	{
		private readonly ITaskRepository _taskRepository;

		public TasksController(ITaskRepository taskRepository)
		{
			_taskRepository = taskRepository;
		}

		[HttpGet]
		public async Task<IActionResult> GetAll()
		{
			var tasks = await _taskRepository.GetAllAsync();
			return Ok(tasks);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			var task = await _taskRepository.GetByIdAsync(id);
			if (task == null) return NotFound();
			return Ok(task);
		}

		[HttpPost]
		public async Task<IActionResult> Create(TaskItem task)
		{
			task.CreatedAt = DateTime.UtcNow;
			await _taskRepository.AddAsync(task);
			return Ok(task);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Update(int id, TaskItem task)
		{
			task.Id = id;
			await _taskRepository.UpdateAsync(task);
			return Ok(task);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			await _taskRepository.DeleteAsync(id);
			return NoContent();
		}
	}
}
