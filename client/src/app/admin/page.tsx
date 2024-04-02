import axios from '@/lib/axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminPage from './AdminPage';

const fetchType = async () => {
  try {
    const res = await axios.get(`/type/getAll`);
    return await res.data;
  } catch (error) {
    return null;
  }
};

const fetchAuthor = async () => {
  try {
    const res = await axios.get(`/author/getAll`);
    console.log(res.data);
    return await res.data;
  } catch (error) {
    return null;
  }
};

export default async () => {
  const authors = await fetchAuthor();
  const types = await fetchType();
  return (
    <>
      <AdminPage authors={authors} types={types} />
      <ToastContainer />
    </>
  );
};
