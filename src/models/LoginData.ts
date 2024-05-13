export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  userInfo: {
    username: string;
  };
  message: string;
}

export interface SocialLoginResponse {
  status: string;
  message: string;
  data: Data;
}

export interface Data {
  sessionId: string;
  oAuth2UserInfoResponse: OAuth2UserInfoResponse;
}

export interface OAuth2UserInfoResponse {
  userId: number;
  username: string;
  nickname: string;
}

export interface LoginStatusResponse {
  message: string;
  status: boolean;
}
