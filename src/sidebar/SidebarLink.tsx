import React from "react";
import { Link, LinkProps } from "react-router-dom";

const SidebarLink: React.FC<LinkProps> = (props) => {
  return <Link {...props}>{props.title}</Link>;
};

export default SidebarLink;
