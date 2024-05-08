const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_APP_REST_API_KEY;
const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_APP_REDIRECT_URI;

const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_APP_CLIENT_ID;
const NAVER_REDIRECT_URI = import.meta.env.VITE_NAVER_APP_REDIRECT_URI;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_REDIRECT_URI}&state=test`;
