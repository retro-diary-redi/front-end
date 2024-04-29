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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 현재 유저가 로그인 중인지 확인하는 요청 추가

    async function getStatus() {
      const status = await Auth();

      if (status === 200) {
        setIsLoggedIn(true);
      } else {
        navigate('/landing');
      }
    }

    getStatus();
  }, []);

  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} />
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/write" element={<DiaryWritePage type="write" />} />
          <Route path="/edit/:date" element={<DiaryWritePage type="edit" />} />
          <Route path="/view/:date" element={<DiaryWritePage type="view" />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
