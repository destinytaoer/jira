import { Popover, Typography, List, Divider } from "antd";
import useProjects from "pages/project-list/model/useProjects";
import styled from "@emotion/styled";

const ProjectPopover = ({ projectButton }: { projectButton: JSX.Element }) => {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin) ?? [];

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {projectButton}
    </ContentContainer>
  );

  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;
