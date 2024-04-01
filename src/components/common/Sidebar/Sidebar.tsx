import logo from '@/assets/brand/logo.svg'
import SidebarBody from './SidebarBody/SidebarBody';
export const Sidebar = () => {
  return (
    <div className="absolute">
      <section className="hidden lg:flex-col lg:flex w-72 rounded-xl bg-gray-800 min-h-screen ">
        <header className='flex justify-center w-full '>
          <img src={logo} alt="LOGO" className='my-12 mx-6 w-64'/>
        </header>
        <SidebarBody/>
      </section>
    </div>
  );
};

export default Sidebar;
