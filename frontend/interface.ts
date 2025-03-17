export interface UserJson {
    success: boolean;
    data: {
      _id: string;
      name: string;
      tel: string;
      email: string;
      password: string;
      role: string;
      createdAt: string;
    };
  }