export interface ScheduleDto {
  id: string;
  taskId: string;
  scheduledAt: string; // ISO datetime
  note: string;
} 