import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import Input from "../components/Input";
import Button from "../components/Button";
import ForgotPasswordModal from "../components/ForgotPasswordModal";
import bgImage from "../assets/bglogin.png"; // Import the background image
import { useNavigate } from "react-router-dom"; // Use useNavigate

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle your login logic, e.g., API call
    // If login is successful, redirect to /user
    navigate("/user"); // Redirect to user page
  };

  const handleSignup = () => {
    navigate("/signup"); // Redirect to signup page
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `url(${bgImage})`, // Use the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white">SmartBin</h1>{" "}
          {/* Changed to font-bold */}
          <h2 className="text-xl font-medium text-white">
            Sign in to your account
          </h2>{" "}
          {/* Changed to font-medium */}
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<FaUser className="text-gray-400" />}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<FaLock className="text-gray-400" />}
          />
          <Button
            className="w-full py-3 text-lg bg-green-600 text-white hover:bg-green-700 transition duration-200"
            type="submit"
          >
            Sign In
          </Button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-white hover:text-green-300 font-medium focus:outline-none"
          >
            Forgot your password?
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={handleSignup}
            className="text-white hover:text-green-300 font-medium focus:outline-none"
          >
            New User? Sign Up
          </button>
        </div>
      </motion.div>
      <ForgotPasswordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LoginPage;
