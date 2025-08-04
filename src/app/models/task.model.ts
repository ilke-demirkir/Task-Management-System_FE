export interface TaskDto {
  id: string;
  title: string;
  description: string;
  dueDate: string; // ISO datetime
  status: string;
  assignedToId: string;
  projectId: string;
} 