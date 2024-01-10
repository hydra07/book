import { Button } from '@material-tailwind/react';
import './App.css';
import Header from './components/header';
function App() {
  return (
    <div className="w-max-[1280px] content-center h-[3000px]">
      <Header />
      <div className="w-max-[1280px] h-[1400px] bg-white"></div>
      <Button className="mt-6" fullWidth>
        sign up
      </Button>
      <div className="w-max-[1280px] h-[1400px] bg-black"></div>
    </div>
  );
}

export default App;
