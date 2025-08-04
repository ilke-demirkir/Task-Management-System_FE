export interface ProjectDto {
  id: string;
  name: string;
  description: string;
  projectType: string;
  createdAt: string; // ISO datetime
  ownerId: string;
} 