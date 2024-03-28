'use client';
import Profile from '@/app/(components)/profile';
import useUser from '@/lib/hooks/useUser';
import ErrorHandle from '../(components)/ErrorHandle';
import Loading from '../(components)/Loading';

export default () => {
  // const { data: session, status } = useSession();
  // const [user, setUser] = useState<User>();
  // const setInforUser = async () => {
  //   const _user: User = {
  //     id: session?.user.id as number,
  //     name: session?.user.name as string,
  //     email: session?.user.email as string,
  //     image: session?.user.image as string,
  //     phone: session?.user.phone as string,
  //     // gender: session?.user.gender as boolean,
  //     gender: session?.user.gender as boolean,
  //     // role: null,
  //   };
  //   if (_user != undefined) {
  //     setUser(_user);
  //   }
  // };
  const { user, status } = useUser();

  // useEffect(() => {
  //   if (session?.user) {
  //     setInforUser();
  //   } else {
  //     console.log('count');
  //   }
  // }, [session?.user]);
  const statusComponent = {
    loading: (
      <div className="w-full h-full">
        <Loading />
      </div>
    ),
    unauthenticated: (
      <div>
        <ErrorHandle message="Không có quyền truy cập!!" />
      </div>
    ),
    authenticated: (
      <div>
        <Profile user={user!} />
      </div>
    ),
  };
  return statusComponent[status];
};
