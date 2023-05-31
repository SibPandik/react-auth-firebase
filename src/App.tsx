import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Profile from './pages/Profile';


function App() {
  return (
      <div className="text-white">
        <Routes>
          <Route path='/' element={<Profile/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Registration/>}/>
        </Routes>
      </div>
  );
}

export default App;
