import { RegisterRequest, RegisterResponse } from '@/models/RegisterData';
import API from './API';
import { AxiosResponse } from 'axios';

export default async function Register(
  request: RegisterRequest
): Promise<AxiosResponse<RegisterResponse, any> | string> {
  try {
    const data = await API.post('/auth/registerProc', request);
    return data;
  } catch (err: any) {
    let errMsg;

    if (err.response.status === 400) {
      errMsg = err.response.data.message;
    }

    return errMsg;
  }
}
