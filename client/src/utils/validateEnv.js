import { cleanEnv, str } from 'envalid';

export default cleanEnv(import.meta.env, {
  VITE_API: str(),
});
