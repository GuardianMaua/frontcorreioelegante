import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TelaCodigo from './screens/TelaCodigo';
import Admin from './screens/Admin';
import Login from './screens/Login';
import TelaMensagem from './screens/TelaMensagem';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TelaCodigo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mensagem" element={<TelaMensagem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
