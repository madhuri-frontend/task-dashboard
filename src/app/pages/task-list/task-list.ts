import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskListComponent {
  deleteTask(id: number) {
    const updated = this.tasks().filter((task) => task.id !== id);
    this.tasks.set(updated);
  }
  toggleTask(id: number) {
    const updated = this.tasks().map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    this.tasks.set(updated);
  }
  tasks = signal<any[]>([]);
  searchTerm = signal('');

  filteredTasks = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.tasks().filter((task) => task.title.toLowerCase().includes(term));
  });

  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks.set(data.slice(0, 20));
    });
  }

  updateSearch(value: string) {
    this.searchTerm.set(value);
  }
}
