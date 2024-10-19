import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaHome, FaPhone } from "react-icons/fa";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button/Button";

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
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    addresses: [""],
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    if (e.target.name === "address" && index !== undefined) {
      const newAddresses = [...formData.addresses];
      newAddresses[index] = e.target.value;
      setFormData({ ...formData, addresses: newAddresses });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addAddress = () => {
    setFormData({ ...formData, addresses: [...formData.addresses, ""] });
  };

  const removeAddress = (index: number) => {
    const newAddresses = formData.addresses.filter((_, i) => i !== index);
    setFormData({ ...formData, addresses: newAddresses });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here

    // Redirect to the login page after signup
    navigate("/login");
  };

  return (
    <motion.div
      className="fixed inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('src/assets/bglogin.png')" }}
    >
      <motion.div className=" min-h-screen flex items-center justify-center py-12">
        <motion.div
          className="bg-white bg-opacity-10 backdrop-blur-md shadow-xl p-8 rounded-lg  w-96 max-h-196 overflow-auto"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Sign Up
          </h1>
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
              <div key={index} className="flex items-center mb-4">
                <Input
                  type="text"
                  name="address"
                  placeholder={`Address ${index + 1}`}
                  value={address}
                  onChange={(e) => handleChange(e, index)}
                  icon={<FaHome />}
                />
                <Button
                  type="button"
                  onClick={() => removeAddress(index)}
                  className="ml-2 text-sm"
                >
                  Remove
                </Button>
              </div>
            ))}

            <Button
              type="button"
              onClick={addAddress}
              className="w-full mb-2 text-sm bg-green-500 hover:bg-green-600 text-white py-2 rounded"
            >
              Add Address
            </Button>
            <Button
              type="submit"
              className="w-full text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
            >
              Sign Up
            </Button>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUpPage;
