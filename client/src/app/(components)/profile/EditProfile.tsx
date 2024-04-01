// "use client";
import { editProfile } from '@/lib/api/profile';
import app from '@/lib/firebase';
import User from '@/types/user';
import { Button, ButtonGroup, Input, Radio } from '@material-tailwind/react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

// eslint-disable-next-line react/display-name
export default ({
  isEditUser,
  setIsEditUser,
  user,
  setUser,
}: {
  isEditUser: boolean;
  setIsEditUser: any;
  user: User;
  setUser: any;
}) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<User>(user);
  const [currentUser, setCurrentUser] = useState<User>();
  const [image, setImage] = useState<File | null>(null);
  const [imagePercent, setImagePercent] = useState<number>(0);
  const [imageError, setImageError] = useState<boolean>(false);
  const [updateComplete, setUpdateComplete] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => { 
      setForm((prev) => ({
        ...prev,
        [event.target.id]: event.target.value,
      }));
    },
    [form],
  );
  const handleSubmit = useCallback(
    async (event: ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      await editProfile(session?.user.accessToken as string, form as User);
      console.log('form', form);
      setIsEditUser(false);
    },
    [form, session],
  );

  const handleFileUpload = async (image: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUser({ ...form, image: downloadURL });
          setForm({ ...form, image: downloadURL });
          console.log('File available at', downloadURL);
        });
      },
    );
  };

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  useEffect(() => {
    // đo tiến độ upload ảnh
    if (imagePercent === 100) {
      setUpdateComplete(true);
    }
  }, [imagePercent]);
  useEffect(() => {
    if (imageError) {
      //   toast.error(`Image upload failed`);
      alert('Image upload failed');
    } else if (updateComplete) {
      //   toast.success(`Image upload success`);
      alert('Image upload success');
    }
  }, [imageError, updateComplete]);
  return (
    <form
      className="backdrop-blur-3xl bg-white/5 p-4 rounded shadow w-3/5 h-5/6 flex flex-col relative"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center -mt-12">
        <input
          type={'file'}
          name={'image'}
          accept={'image/*'}
          id={'image'}
          hidden
          onChange={(event) => {
            setImage(event.target.files![0]);
          }}
          ref={fileRef}
        />
        <img
          src={
            user?.image
              ? user.image
              : `https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg`
          }
          alt="User avatar"
          className="w-24 h-24 rounded-full mb-4 content-center shadow-md"
          onClick={() => fileRef.current?.click()}
        />
      </div>
      {imagePercent > 0 && imagePercent < 100 && (
        <div className="flex justify-center">
          <progress
            className="progress-bar"
            value={imagePercent}
            max="100"
          ></progress>
        </div>
      )}
      <h1 className={'text-2xl justify-center self-center'}>Edit Profile</h1>
      <div className="text-center mt-2 mb-5">
        <p className="text-lg font-bold mb-2">{user?.email}</p>
      </div>
      <div className="w-5/6 justify-center self-center flex flex-col space-y-2">
        <Input
          className="h-16 mb-4 text-2xl "
          size="lg"
          color="white"
          id="name"
          type="text"
          label="Name"
          required
          autoComplete="off"
          value={form.name}
          onChange={(event) => handleChange(event)}
          crossOrigin={null}
        />
        <Input
          className="h-16 mb-4 text-2xl "
          size="lg"
          color="white"
          id="phone"
          type="text"
          label="Phone"
          required
          autoComplete="off"
          value={form.phone as string}
          onChange={(event) => handleChange(event)}
          crossOrigin={null}
        />
        <div className="flex gap-10">
          <Radio
            color="purple"
            name="gender"
            label="Female"
            checked={form.gender === false}
            onChange={() => {
              console.log(form.gender);
              setForm({ ...form, gender: false });
            }}
            crossOrigin={null}
          />
          <Radio
            color="purple"
            name="gender"
            label="Male"
            checked={form.gender === true}
            onChange={() => {
              console.log(form.gender);
              setForm({ ...form, gender: true });
            }}
            crossOrigin={null}
          />
        </div>
      </div>
      <div className="mt-auto flex justify-center w-1/3 self-center">
        <ButtonGroup placeholder={null}>
          <Button
            className="text-white content-center bg-red-600 w-1/2"
            onClick={() => setIsEditUser(false)}
            placeholder={null}
          >
            Cancel
          </Button>
          <Button
            className="text-white content-center bg-green-600 w-1/2"
            // onClick={() => setIsEditUser(false)}
            type={'submit'}
            placeholder={null}
          >
            Save
          </Button>
        </ButtonGroup>
      </div>
    </form>
  );
};
