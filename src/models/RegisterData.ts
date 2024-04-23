export interface RegisterRequest {
  username: string;
  password: string;
  nickname: string;
  email: string;
}

export interface RegisterResponse {
  userInfo: {
    username: string;
    nickname: string;
  };
  message: string;
}
