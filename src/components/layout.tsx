import Footer from "./footer";
import Header from "./header";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = (props: Readonly<Props>) => {
  const { children } = props;
  return (
    <main className="flex justify-center bg-amber-300 h-screen">
      <div className="layout-container min-w-full bg-amber-300 max-w-full dark:bg-neutral-800 md:min-w-[480px] md:max-w-[480px] flex flex-col">
        <Header />
        <div className="flex-grow overflow-auto scrollbar-hidden">{children}</div>
        <Footer />
      </div>
    </main>
  );
};

export default Layout;
