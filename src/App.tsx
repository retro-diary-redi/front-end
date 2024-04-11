import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import SignUpPage from './pages/\bSignUpPage/SignUpPage';
import LoginPage from './pages/LoginPage/LoginPage';
import DiaryWritePage from './pages/DiaryWritePage/DiaryWritePage';
import DiaryViewPage from './pages/DiaryViewPage/DiaryViewPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/write" element={<DiaryWritePage />} />
        <Route path="/view/:date" element={<DiaryViewPage />} />
      </Routes>
    </>
  );
}

export default App;
