// app/layout.tsx
"use client";

import { Layout, Menu, Breadcrumb, Spin } from "@arco-design/web-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSystemStore } from "@/store/systemStore";
import {
  IconDashboard,
  IconList,
  IconSettings,
  IconFile,
  IconApps,
  IconCheckCircle,
  IconExclamationCircle,
  IconUser,
  IconMenuFold,
  IconMenuUnfold,
} from "@arco-design/web-react/icon";
import styles from "@/styles/adminLayout.module.scss";
import cs from "classnames";

const { Sider, Content } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { showNavbar, loading, showMenu, showFooter, MenuWidth, setMenuWidth } = useSystemStore();
  // 折叠
  const [collapsed, setCollapsed] = useState(false);
  // 面包屑
  const [breadcrumb, setBreadCrumb] = useState([]);

  const navbarHeight = 60;
  const menuWidth = collapsed ? setMenuWidth(48) : MenuWidth || 200;
  const paddingLeft = showMenu ? { paddingLeft: menuWidth } : {};
  const paddingTop = showNavbar ? { paddingTop: navbarHeight } : {};
  const paddingStyle = { ...paddingLeft, ...paddingTop };

  return (
    <Layout className={styles.layout}>
      <div
        className={cs(styles["layout-navbar"], {
          [styles["layout-navbar-hidden"]]: !showNavbar,
        })}
      >
        <div>header</div>
      </div>
      {loading ? (
        <Spin className={styles["spin"]} />
      ) : (
        <Layout>
          {showMenu && (
            <Sider
              className={styles["layout-sider"]}
              width={menuWidth}
              collapsed={collapsed}
              onCollapse={setCollapsed}
              trigger={null}
              collapsible
              breakpoint="xl"
              style={paddingTop}
            >
              <div>11</div>
            </Sider>
          )}
          <Layout className={styles["layout-content"]} style={paddingStyle}>
            <div className={`${styles["layout-content-wrapper"]} flex-1`}>
              <Content>children</Content>
            </div>
            {showFooter && <>foot</>}
          </Layout>
        </Layout>
      )}
    </Layout>
  );
}
