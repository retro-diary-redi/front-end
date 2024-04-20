import API from './API';
import { LoginRequest, LoginResponse } from '@/models/LoginData';

// export default async function Login(
//   request: LoginRequest
// ): Promise<LoginResponse | null> {
//   try {
//     const data: LoginResponse = await API.get('/auth/login', request);
//     return data;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// }

export default async function Login(
  request: LoginRequest
): Promise<LoginResponse | null> {
  try {
    const data: any = await API.post('/auth/loginProc', request);
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function GoogleLogin() {
  try {
    const data: LoginResponse = await API.get('/oauth2/authorization/google');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function NaverLogin() {
  try {
    const data: LoginResponse = await API.get('/oauth2/authorization/naver');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function KakaoLogin() {
  try {
    const data: LoginResponse = await API.get('/oauth2/authorization/kakao');
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
