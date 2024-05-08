import API from './API';
import { LoginRequest, LoginResponse } from '@/models/LoginData';

export default async function Login(
  request: LoginRequest
): Promise<LoginResponse | null> {
  try {
    const data: LoginResponse = await API.post('/auth/loginProc', request).then(
      (res) => res.data
    );
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function Auth(): Promise<number | boolean> {
  try {
    const data: number = await API.get('/auth/status').then(
      (res) => res.status
    );
    return data;
  } catch (err) {
    return false;
  }
}
