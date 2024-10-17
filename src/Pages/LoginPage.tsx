import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock } from 'react-icons/fa';
import Input from '../Components/Input';
import Button from '../Components/Button';
import ForgotPasswordModal from '../Components/ForgotPasswordModal';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-4xl font-extrabold text-center text-green-600 mb-2">SmartBin</h1>
          <h2 className="text-center text-2xl font-bold text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<FaUser />}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<FaLock />}
          />
          <div>
            <Button className="w-full py-3 px-4 text-lg" type="submit">
              Sign In
            </Button>
          </div>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-green-600 hover:text-green-800 font-medium focus:outline-none"
          >
            Forgot your password?
          </button>
        </div>
      </motion.div>
      <ForgotPasswordModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default LoginPage;