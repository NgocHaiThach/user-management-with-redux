import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeManagement from './pages/HomeManagement/HomeManagement';
import AddUser from './pages/AddUser/AddUser';
import EditUser from './pages/EditUser/EditUser';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomeManagement/>} />
          <Route path='/add' element={<AddUser/>} />
          <Route path='/edit/:id' element={<EditUser/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
