import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { TaskDetailComponent } from './pages/task-detail/task-detail';
import { TaskListComponent } from './pages/task-list/task-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/:id', component: TaskDetailComponent },
  { path: '**', redirectTo: '' },
];
