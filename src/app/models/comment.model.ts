export interface CommentDto {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string; // ISO datetime
} 