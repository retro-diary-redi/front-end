import { RegisterRequest, RegisterResponse } from '@/models/RegisterData';
import API from './API';

export default async function Register(
  request: RegisterRequest
): Promise<RegisterResponse | null> {
  try {
    const data: RegisterResponse = await API.post(
      '/auth/registerProc',
      request
    ).then((res) => res.data);

    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
}
