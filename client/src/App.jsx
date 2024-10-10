import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import Home from './pages/Home';
import Header from './components/Header.jsx';
import PreHome from './pages/PreHome.jsx';
import DummyHeader from './components/DummyHeader.jsx';
import PostHomePage from './pages/PostHomePage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import CreateBlogPage from './pages/CreateBlogPage.jsx';
import NewHeader from './components/NewHeader.jsx';
import PremiumPage from './pages/PremiumPage.jsx';

// import CreateBlogPage from './pages/CreateBlogPage.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<><Header /><PreHome /></>} />
          <Route path='/home' element={<><Home /></>} />
          <Route path='/login' element={<><Login /></>} />
          <Route path='/register' element={<><Register /></>} />
          <Route path='/logout' element={<><Header /><Logout /></>} />
          <Route path='/posthome' element={<><PostHomePage /></>} />
          <Route path='/dashboard' element={<><DashboardPage /></>} />
          <Route path='/createblog' element={<><CreateBlogPage /></>} />
          <Route path='/prehome' element={<><Header /><PreHome /></>} />
          <Route path='/createblogpage' element={<><Header /><CreateBlogPage /></>} />
          <Route path='/premium' element={<><PremiumPage /></>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
