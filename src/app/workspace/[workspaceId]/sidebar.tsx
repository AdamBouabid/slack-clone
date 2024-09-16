import { UserButton } from "@/features/auth/components/user-button";
import React from "react";
import WorkspaceSwitcher from "./workspace-switcher";
import SideBarButton from "./sidebar-button";
import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="w-[70px] h-full bg-[#481349] flex flex-col gap-y-4 items-center pt-[9px] pb-4">
      <WorkspaceSwitcher />
      <SideBarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/workspace")}
      ></SideBarButton>
      <SideBarButton icon={MessagesSquare} label="DMs"></SideBarButton>
      <SideBarButton icon={Bell} label="Activity"></SideBarButton>
      <SideBarButton icon={MoreHorizontal} label="More"></SideBarButton>
      <div className="flex flex-col items-center gap-y-1 mt-auto">
        <UserButton />
      </div>
    </aside>
  );
};

export default Sidebar;
