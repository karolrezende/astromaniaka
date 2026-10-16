import logo from '@/assets/brand/logo.svg'
import SidebarBody from './SidebarBody/SidebarBody';
export const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 z-20 hidden h-screen p-4 lg:block">
      <section className="glass flex h-full w-72 flex-col">
        <header className='flex w-full justify-center border-b border-white/[0.06] px-6 py-8'>
          <img src={logo} alt="Astromaniaka" className='w-52' />
        </header>
        <SidebarBody />
      </section>
    </div>
  );
};

export default Sidebar;
