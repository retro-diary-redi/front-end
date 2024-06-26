import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DiaryWritePage from './pages/DiaryPage/DiaryPage';
import NavBar from './components/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import LoginHandlerPage from './pages/LoginPage/LoginHandlerPage';

const App = () => {
  return (
    <>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="/login/oauth/callback" element={<LoginHandlerPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/write/:date"
            element={<DiaryWritePage type="write" />}
          />
          <Route path="/edit/:date" element={<DiaryWritePage type="edit" />} />
          <Route path="/view/:date" element={<DiaryWritePage type="view" />} />
        </Routes>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: -30px 0;
  height: 100%;
`;

export default App;
