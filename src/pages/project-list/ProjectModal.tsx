import React from "react";
import { Drawer, Button } from "antd";

const ProjectModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer visible={visible} width={"100%"} onClose={onClose}>
      <h1>Project Modal</h1>
      <Button onClick={onClose}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
