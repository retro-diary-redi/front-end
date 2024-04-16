export interface RegisterRequest {
  username: string;
  password: string;
  nickname: string;
  email: string;
}

export interface RegisterResponse {
  status: string;
  message: string;
  data: {
    userId: number;
    username: string;
    nickname: string;
  };
}
