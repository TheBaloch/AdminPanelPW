import { useEffect, useState } from 'react';
import DoctorsLogin from './Pages/DoctorsLogin/DoctorsLogin';
import Home from './Pages/Home/Home';
import LoginForm from './components/LoginForm/LoginForm';
import './App.css';

function App() {
  const handleUpdate = () => {
    setTrigger('UPDATE');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('doctor');
    setTrigger(null);
  };

  const [trigger, setTrigger] = useState();
  useEffect(() => {
    const auth = localStorage.getItem('admin');
    const doc = localStorage.getItem('doctor');

    if (doc !== null) {
      setTrigger('doctor');
    } else if (auth !== null) {
      setTrigger('admin');
    } else {
      setTrigger(null);
    }
  }, [trigger]);

  if (trigger === null) return <LoginForm handleUpdate={handleUpdate} />;
  if (trigger === 'admin') return <Home handleLogout={handleLogout} />;
  if (trigger === 'doctor') return <DoctorsLogin handleLogout={handleLogout} />;
}

export default App;
