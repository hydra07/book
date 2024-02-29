import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/header';
import BookDetail from './pages/BookDetail';
import Fanpage from './pages/Fanpage';
import Home from './pages/Home';
import Reader from './pages/Reader';
function App() {
  return (
    <BrowserRouter>
     
      {/* <Header /> */}
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="bookdetail" element={<BookDetail />} />
        <Route path="fanpage" element={<Fanpage />} />
        <Route path="/epub" element={<Reader/>}/>
        <Route element={<PrivateRoute />}>
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
