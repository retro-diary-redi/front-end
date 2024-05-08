import API from '@/services/API';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

const LoginHandlerPage = () => {
  const params = useParams();
  const [searchParams, _] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get('code');
  const platform = params.platform;

  useEffect(() => {
    const OauthLogin = async (platform: string, code: string) => {
      await API.post(`/oauth2/authorization/${platform}`, {
        code: code,
      })
        .then((res) => {
          alert('로그인이 완료되었습니다.');
          console.log(res);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (platform && code) OauthLogin(platform, code);
  }, []);

  return <div>로그인 중입니다. 잠시만 기다려주세요.</div>;
};

export default LoginHandlerPage;
