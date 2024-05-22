export interface DiaryFormProps {
  id?: number;
  title: string;
  content: string;
  date: string;
  mood: number;
  weather: number;
  image_url: string | null;
}

export interface Diaries {
  counts: number;
  message: string;
  diaryDateList: string[];
}

export interface Diary {
  title: string;
  mood: number;
  weather: number;
  content: string;
}

export interface DiaryInfo {
  diaryInfo: {
    title: string;
    mood: number;
    weather: number;
    content: string;
    nickname: string;
    savedFilePaths: string[];
  };
  message: string;
}
