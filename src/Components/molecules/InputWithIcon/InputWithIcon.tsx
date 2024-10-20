import React from "react";
import { motion } from "framer-motion";
import IconWrapper from "../../atoms/IconWrapper/IconWrapper";
import InputField from "../../atoms/InputField/InputField";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({ icon, ...props }) => {
  return (
    <motion.div
      className="relative mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <IconWrapper>{icon}</IconWrapper>
      <InputField {...props} />
    </motion.div>
  );
};

export default InputWithIcon;
