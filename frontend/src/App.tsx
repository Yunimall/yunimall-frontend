import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Demo from './pages/Demo';
import CreateAccountForm from './pages/buyer/create-account/account';
import CreatePassword from './pages/buyer/create-account/create-password';
import Verification from './pages/buyer/create-account/verification';
import Login from './pages/buyer/auth/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Demo />} />
        <Route path="/create-account-buyer" element={<CreateAccountForm />} />
        <Route path="/create-password" element={<CreatePassword/>} />
        <Route path="/verification" element={<Verification/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;