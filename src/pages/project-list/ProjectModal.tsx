import React from "react";
import { Drawer, Button } from "antd";
import useProjectModal from "./model/useProjectModal";

const ProjectModal = () => {
  const [visible, , close] = useProjectModal();
  return (
    <Drawer visible={visible} width={"100%"} onClose={close}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};

export default ProjectModal;
