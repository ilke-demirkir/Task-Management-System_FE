export interface TenantDto {
  id: string;
  name: string;
}

export interface AddUserToTenantDto {
  userId: string;
  tenantId: string;
  role: string;
}

export interface TenantMembers {
  userId: string;
  role: string;
  email?: string;
  fullName?: string;
}
