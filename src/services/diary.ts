import { Diary } from '@/models/DiaryData';
import API from './API';
import { AxiosResponse } from 'axios';

export async function Create(
  request: Diary,
  date: string
): Promise<AxiosResponse | null> {
  try {
    const response: any = await API.post(`/diaries/${date}/write`, request);

    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function Update(request: any, date: string): Promise<any> {
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

export async function GetDiary(date: string): Promise<any> {
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

export async function GetDiaries(): Promise<any> {
  try {
    const response = await API.get(`/diaries`);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}
