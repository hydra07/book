'use client';
import { Spinner, Typography } from '@material-tailwind/react';

// eslint-disable-next-line react/display-name
export default () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <Typography color="red" placeholder={null}>
          Error disconnect server
        </Typography>
        <Spinner className="h-16 w-16" color="red" />
      </div>
    </div>
  );
};
