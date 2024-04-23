export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  // status: 기존에 구현된 소셜 로그인 때문에 추가해둔 값으로, 추후 소셜 로그인 로직 수정 시 수정해야 함
  status?: string;
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
