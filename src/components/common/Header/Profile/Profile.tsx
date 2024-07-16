import { useData } from "@/providers/DataProvider";
import { AlignJustify } from "lucide-react";
import { useState } from "react";
import SidebarMobile from "../../Sidebar/SidebarMobile";
import ProfileMenu from "./ProfileMenu/ProfileMenu";
import ProfilePic from "../../ProfilePic/ProfilePic";

const Profile = () => {
  const { userData } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOpen = (state: boolean) => {
    setIsOpen(state);
  };
  const openMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  return (
    <section>
      <div className="flex items-center justify-between lg:justify-end p-4  gap-5">
        <div className="flex lg:hidden" onClick={() => handleOpen(true)}>
          <AlignJustify className="cursor-pointer text-white" />
        </div>
        {isOpen && <SidebarMobile handleOpen={handleOpen} />}
        <div className="flex items-center gap-2 justify-center ">
          {/* <div>
            <Bell />
          </div>
          <div>
            <MessageCircleMore />
          </div> */}
          <section className="flex gap-2 items-center justify-center">
            <div className="flex flex-col justify-center select-none text-white">
              <p className="font-bold text-end uppercase text-sm lg:text-md wrap">
                {userData ? userData.name : "pessoa admirável"}
              </p>
              <p className="text-sm  text-end uppercase">
                {userData ? userData.access_level : "user"}
              </p>
            </div>
            <div onClick={() => openMenu()} className="cursor-pointer">
              <ProfilePic name={userData?.name} />
            </div>
            {isOpenMenu && <ProfileMenu />}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Profile;
