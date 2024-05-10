import { AxiosResponse } from 'axios';
import API from './API';
import { LoginRequest, LoginResponse } from '@/models/LoginData';

export default async function Login(
  request: LoginRequest
): Promise<AxiosResponse<LoginResponse>> {
  try {
    const data = await API.post('/auth/loginProc', request);
    return data;
  } catch (err: any) {
    const errMsg = err.response.data.message;
    return errMsg;
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
