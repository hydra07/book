'use client';
import useUser from '@/lib/hooks/useUser';
import ErrorHandle from '../(components)/ErrorHandle';
import Loading from '../(components)/Loading';
import Profile from '../(components)/profile';
export default () => {
  const { user, status } = useUser();
  return (
    <div>
      {status === 'loading' ? (
        <Loading />
      ) : status === 'unauthenticated' ? (
        <ErrorHandle message="Không có quyền truy cập!!" />
      ) : (
        <Profile user={user!} />
      )}
    </div>
  );
};
