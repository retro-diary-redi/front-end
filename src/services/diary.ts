import { Diaries, DiaryInfo } from '@/models/DiaryData';
import API from './API';
import { AxiosResponse } from 'axios';

export async function Create(
  request: FormData,
  date: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response: AxiosResponse = await API.post(
      `/diaries/${date}/write`,
      request,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response;
  } catch (err: any) {
    return err.response.data.message;
  }
}

export async function Update(
  request: FormData,
  date: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await API.put(`/diaries/${date}/update`, request);
    return response;
  } catch (err: any) {
    return err.response.data.message;
  }
}

export async function Delete(
  date: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await API.delete(`/diaries/${date}/delete`);
    return response;
  } catch (err: any) {
    return err.response.data.message;
  }
}

export async function GetDiary(
  date: string
): Promise<AxiosResponse<DiaryInfo>> {
  try {
    const response = await API.get(`/diaries/${date}`);
    return response;
  } catch (err: any) {
    return err.response.data.message;
  }
}

export async function GetDiaries(): Promise<Diaries | null> {
  try {
    const response = await API.get(`/diaries`).then((res) => res.data);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function GetImage(imageUrl: string): Promise<File | null> {
  try {
    const response = await API.get(imageUrl, { responseType: 'arraybuffer' });

    const blob = new Blob([response.data], { type: 'image/jpeg' }); // arraybuffer를 Blob 객체로 변환
    const file = new File([blob], 'imageFileName.jpg', {
      type: 'image/jpeg',
    }); // Blob 객체를 File 객체로 변환

    return file;
  } catch (err) {
    console.log(err);
    return null;
  }
}
