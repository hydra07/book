'use client';
import useUser from '@/lib/hooks/useUser';
import ErrorHandle from './ErrorHandle';
import Loading from './Loading';

const MiddlewareAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, status, isAdmin } = useUser();

  return (
    <>
      {status === 'loading' ? (
        <Loading />
      ) : status === 'unauthenticated' ? (
        <ErrorHandle message="Không có quyền truy cập!!" />
      ) : isAdmin() ? (
        children
      ) : (
        <ErrorHandle message="Không có quyền truy cập!!" />
      )}
    </>
  );
};

export default MiddlewareAdmin;
