import { Diaries, DiaryInfo } from '@/models/DiaryData';
import API from './API';
import { AxiosResponse } from 'axios';

export async function Create(
  request: FormData,
  date: string
): Promise<AxiosResponse | null> {
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
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function Update(
  request: FormData,
  date: string
): Promise<AxiosResponse | null> {
  try {
    const response = await API.put(`/diaries/${date}/update`, request);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function Delete(date: string): Promise<AxiosResponse | null> {
  try {
    const response = await API.delete(`/diaries/${date}/delete`);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function GetDiary(date: string): Promise<DiaryInfo | null> {
  try {
    const response = await API.get(`/diaries/${date}`).then(
      (response) => response.data
    );
    return response;
  } catch (err) {
    console.log(err);
    return null;
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
