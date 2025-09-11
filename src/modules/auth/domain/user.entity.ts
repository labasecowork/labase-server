export class User {
  constructor(
    public id: string,
    public first_name: string,
    public last_name: string,
    public email: string,
    public password: string,
    public status: string,
    public createdAt?: Date,
    public user_type?: string | null,
    public profile_image?: string | null
  ) {}

  isVerified(): boolean {
    return this.status === "active";
  }

  activate() {
    this.status = "active";
  }
}
