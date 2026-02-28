import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-detail.html',
  styleUrls: ['./task-detail.css'],
})
export class TaskDetailComponent {
  task = signal<any>(null);
  loading = signal(true);

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
  ) {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.loading.set(true);

      this.taskService.getTaskById(id).subscribe((data) => {
        this.task.set(data);
        this.loading.set(false);
      });
    });
  }
}
