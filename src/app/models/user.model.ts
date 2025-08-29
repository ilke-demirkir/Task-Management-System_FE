export interface ApplicationUserDto {
  id: string;
  tenantId?: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  jobTitle?: string;
  isActive?: boolean;
  Roles?: string[]; // Optional roles array
}
