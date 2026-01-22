import { Outlet } from "react-router-dom";
import SidebarDesktop from "../Sidebar/Desktop/Index";
import SidebarMobile from "../Sidebar/Mobile";
import { Header } from "../Header/Header";
import { useState, type FC } from "react";
import Footer from "../Footer/Footer";



export const Inicio: FC = () => {
  const [OpenMenu, setOpenMenu] = useState(true);
  const [OpenMenuMobile, setOpenMenuMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex dark:bg-gray-900   relative">
      <SidebarDesktop
        OpenMenu={OpenMenu}
        setOpenMenu={setOpenMenu}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
      />
      <SidebarMobile
        OpenMenuMobile={OpenMenuMobile}
        setOpenMenuMobile={setOpenMenuMobile}
      />
      <div className="flex flex-col h-screen flex-1 overflow-auto duration-200 transition-colors relative ">
        <Header
          OpenMenu={OpenMenu}
          setOpenMenu={setOpenMenu}
          OpenMenuMobile={OpenMenuMobile}
          setOpenMenuMobile={setOpenMenuMobile}
        />
         <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
          
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Inicio;
