import styled from 'styled-components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DiaryWritePage from './pages/DiaryPage/DiaryPage';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import { useEffect, useState } from 'react';
import { Auth } from './services/login';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -30px 0;
  height: 100%;
`;

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 현재 유저가 로그인 중인지 확인
    async function getStatus() {
      const status = await Auth();

      if (status === 200) {
        setIsLoggedIn(true);
        navigate('/');
        setIsLoading(false);
      } else {
        navigate('/landing');
        setIsLoading(false);
      }
    }

    getStatus();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {' '}
          <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Container>
            <Routes>
              <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
              <Route path="landing" element={<LandingPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route
                path="/login"
                element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
              />
              <Route path="/write" element={<DiaryWritePage type="write" />} />
              <Route
                path="/edit/:date"
                element={<DiaryWritePage type="edit" />}
              />
              <Route
                path="/view/:date"
                element={<DiaryWritePage type="view" />}
              />
            </Routes>
          </Container>
        </>
      )}
    </>
  );
}

export default App;
