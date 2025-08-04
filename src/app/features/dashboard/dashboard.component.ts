import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Project {
  id: string;
  name: string;
  status: 'Active' | 'Completed';
}

interface Task {
  id: string;
  title: string;
  dueDate: string;
  project: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  projects: Project[] = [
    { id: '1', name: 'Website Redesign', status: 'Active' },
    { id: '2', name: 'Mobile App', status: 'Active' },
    { id: '3', name: 'API Integration', status: 'Completed' }
  ];

  tasks: Task[] = [
    { id: '1', title: 'Design UI', dueDate: '2024-06-10', project: 'Website Redesign' },
    { id: '2', title: 'Write API Docs', dueDate: '2024-06-12', project: 'API Integration' },
    { id: '3', title: 'Sprint Planning', dueDate: '2024-06-14', project: 'Mobile App' }
  ];

  constructor(private router: Router) {}

  addProject() {
    this.router.navigate(['/projects/create']);
  }
} 