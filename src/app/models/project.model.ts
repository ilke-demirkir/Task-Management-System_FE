export enum ProjectTypes {
  SoftwareDevelopment = "SoftwareDevelopment",
  ProjectManagement = "ProjectManagement",
  ProcessManagement = "ProcessManagement",
  TaskManagement = "TaskManagement",
}
export interface ProjectDto {
  id: string;
  name: string;
  description: string;
  projectType: ProjectTypes;
  createdAt: string; // ISO datetime
  ownerId: string;
  ownerName: string;
}
