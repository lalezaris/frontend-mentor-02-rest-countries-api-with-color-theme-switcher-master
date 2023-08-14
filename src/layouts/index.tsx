import { PageProps } from "gatsby";
import * as React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <h1>Where in the world?</h1>
        <div className="theme-toggle">Dark Mode</div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
