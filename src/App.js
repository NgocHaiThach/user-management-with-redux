import './App.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomeManagement from './pages/HomeManagement/HomeManagement';
import Form from './components/Form/Form';

function App() {
      return (
            <div className="App">
                  <HashRouter>
                        <Routes>
                              <Route path='/' element={<HomeManagement />} />
                              <Route path='/add' element={<Form />} />
                              <Route path='/edit/:id' element={<Form />} />
                        </Routes>
                  </HashRouter>
            </div>
      );
}

export default App;
