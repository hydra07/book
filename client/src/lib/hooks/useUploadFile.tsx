import app from '@/lib/firebase';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FileUpload {
  file: File | null;
  name: string;
}

export default function useUploadFile({ file, name }: FileUpload) {
  // const [file, setFile] = useState<File | null>(null);
  const [filePercent, setFilePercent] = useState<number>(0);
  const [fileError, setFileError] = useState<boolean>(false);
  const [fileCompleted, setFileCompleted] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<string>('');

  const handleFileUpload = async (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(progress);
      },
      (error) => {
        setFileError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFileUrl(downloadURL);
        });
      },
    );
  };
  /**
   * Chạy khi file thay đổi, có file mới thì upload
   */
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  useEffect(() => {
    if (filePercent === 100) {
      setFileCompleted(true);
      // toast.success(`Upload ${name} thành công`);
    }
  }, [file, filePercent]);

  useEffect(() => {
    if (fileError) {
      toast.error(`Upload ${name} thất bại`);
    } else if (fileCompleted) {
      toast.success(`Upload ${name} thành công`);
    }
  }, [file, fileError, fileCompleted]);

  return {
    fileUrl,
    filePercent,
    fileError,
    fileCompleted,
  };
}
