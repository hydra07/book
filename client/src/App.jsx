import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/header';
import BookDetail from './pages/BookDetail';
import Home from './pages/Home';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="bookdetails" element={<BookDetail />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
        {/* <Route path="/message" element={<Chat />} /> */}
        <Route element={<PrivateRoute />}>
          {/* <Route path="/profile" element={<Profile />} /> */}
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
