import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaHome, FaPhone } from 'react-icons/fa';
import Input from '../Components/Input';
import Button from '../Components/Button';

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  addresses: string[];
}

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    addresses: [''],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    if (e.target.name === 'address' && index !== undefined) {
      const newAddresses = [...formData.addresses];
      newAddresses[index] = e.target.value;
      setFormData({ ...formData, addresses: newAddresses });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addAddress = () => {
    setFormData({ ...formData, addresses: [...formData.addresses, ''] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white p-8 rounded-lg shadow-xl w-96"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-green-600">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            icon={<FaUser />}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            icon={<FaEnvelope />}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            icon={<FaLock />}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={<FaLock />}
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            icon={<FaPhone />}
          />
          {formData.addresses.map((address, index) => (
            <Input
              key={index}
              type="text"
              name="address"
              placeholder={`Address ${index + 1}`}
              value={address}
              onChange={(e) => handleChange(e, index)}
              icon={<FaHome />}
            />
          ))}
          <Button type="button" onClick={addAddress} className="w-full mb-4">
            Add Another Address
          </Button>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SignUpPage;