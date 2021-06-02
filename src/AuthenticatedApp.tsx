import { FC, memo } from "react";
import ProjectListPage from "pages/project-list";
import { useAuth } from "context/authContext";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";

/**
 * grid 和 flex 应用场景
 * 1. 二维布局 grid 还是一维布局 flex
 * 2. 是从内容出发, 还是从布局出发
 * 从内容出发 flex: 现有一组内容(数量不固定), 然后希望他们均匀分布在容器中, 由内容自己的大小决定占据空间
 * 从布局出发 grid: 先规划网格(数量一般固定), 然后再把元素往里填充
 */
const AuthenticatedApp: FC = memo(() => {
  const { logout, user } = useAuth();

  return (
    <Container>
      <Header between>
        <HeaderLeft gap={true}>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="logout" onClick={logout}>
                  登出
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link">Hi, {user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListPage />
      </Main>
    </Container>
  );
});

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  justify-content: space-between;
  padding: 0 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;

export default AuthenticatedApp;
