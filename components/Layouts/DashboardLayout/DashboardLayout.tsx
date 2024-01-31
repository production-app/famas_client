"use client";
import { Layout, Menu, theme } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";

const { Header, Content, Footer, Sider } = Layout;

import "./_dashboardLayout.scss";
import { useState } from "react";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("General", "1", <MailOutlined />, [
    getItem(
      "Pre-setup",
      "g1",
      null,
      [
        getItem("Location(s)", "/location"),
        getItem("Department", "/department"),
      ],
      "group"
    ),
    getItem(
      "Item 2",
      "g2",
      null,
      [getItem("Option 3", "3"), getItem("Option 4", "4")],
      "group"
    ),
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),

  { type: "divider" },

  getItem("Navigation Three", "sub4", <SettingOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
];

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //   const {

  // "lg" "md" "sm"
  //     token: { colorBgContainer, borderRadiusLG },
  //   } = theme.useToken();

  const router = useRouter();

  const [openKeys, setOpenKeys] = useState(["1"]);

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          style={{
            zIndex: 99,
            position: "fixed",
            overflow: "auto",
            height: "100vh",
          }}
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="layouts" />

          <Menu
            theme="light"
            mode="inline"
            defaultOpenKeys={openKeys}
            style={{ position: "sticky" }}
            defaultSelectedKeys={["1"]}
            onClick={(e) => {
              console.log(e.key);
              router.push(e.key);
            }}
            items={items}
          />
        </Sider>
        <Layout style={{ marginLeft: "200px" }}>
          <Header
            // style={{ padding: 0, background: "white", width: "100vm" }}
            style={{
              position: "sticky",
              top: 0,
              padding: 0,
              background: "white",
              zIndex: 98,
              boxShadow: "0 2px 4px 0 rgba(0,0,0,.2)",
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          />
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: "white",
                borderRadius: 10,
              }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            FAMAS ©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
