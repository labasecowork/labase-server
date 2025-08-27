export interface GetProfileResponseDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  birth_date: Date | null;
  gender: string | null;
  user_type: "admin" | "client" | "employee";
  status: string;
  admin_details: {
    role: string;
  } | null;
}
