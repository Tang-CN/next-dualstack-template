import React from "react";
import { Icon as ArcoIcon } from "@arco-design/web-react";

const LocalIcon: React.FC<any> = ({ name, ...rest }) => {
  return <ArcoIcon component={name} {...rest} />;
};

export default LocalIcon;
