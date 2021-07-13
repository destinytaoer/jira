import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalVisible,
} from "./ProjectList.slice";

const ProjectModal = () => {
  const dispatch = useDispatch();
  const visible = useSelector(selectProjectModalVisible);
  return (
    <Drawer
      visible={visible}
      width={"100%"}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>Project Modal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  );
};

export default ProjectModal;
