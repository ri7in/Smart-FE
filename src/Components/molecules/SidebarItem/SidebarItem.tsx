import React from "react";
import IconTextButton from "../../atoms/IconTextButton/IconTextButton";

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active,
  onClick,
}) => (
  <IconTextButton icon={icon} text={text} onClick={onClick} active={active} />
);

export default SidebarItem;
