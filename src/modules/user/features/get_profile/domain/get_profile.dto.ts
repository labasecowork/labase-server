export interface GetProfileResponseDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  birth_date: Date | null;
  gender: "M" | "F" | "O" | null;
  user_type: "admin" | "client";
  status: string;
  adminDetails: {
    role: string;
  } | null;
}
