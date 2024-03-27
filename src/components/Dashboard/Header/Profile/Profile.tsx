import { useData } from "@/providers/DataProvider";
import { getInitials } from "@/utils/getInitials";
import { AlignJustify } from "lucide-react";

const Profile = () => {
  const { userData } = useData();

  return (
    <section>
      <div className="flex items-center justify-between lg:justify-end p-4  gap-5">
        <div className="flex lg:hidden">
          <AlignJustify />
        </div>
        <div className="flex items-center gap-2 justify-center ">
          {/* <div>
            <Bell />
          </div>
          <div>
            <MessageCircleMore />
          </div> */}
          <section className="flex gap-2 items-center justify-center">
            <div className="flex flex-col justify-center">
              <p className="font-bold text-end uppercase text-sm lg:text-md wrap">
                {userData ? userData.name : "pessoa admirável"}
              </p>
              <p className="text-sm  text-end uppercase">
                {userData ? userData.access_level : "user"}
              </p>
            </div>
            <div className="bg-white min-h-14 min-w-14 rounded-full flex items-center justify-center font-bold text-xl text-slate-900">
              {userData ? (
                getInitials(userData.name)
              ) : (
                <p className="uppercase text-sm">astro</p>
              )}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Profile;
