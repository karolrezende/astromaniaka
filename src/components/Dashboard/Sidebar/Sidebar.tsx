import logo from '@/assets/brand/logo.svg'
export const Sidebar = () => {
  return (
    <div className="absolute">
      <section className="hidden lg:flex w-72 rounded-xl bg-slate-800 min-h-screen">
        <header>
          <img src={logo} alt="LOGO" />
        </header>
      </section>
    </div>
  );
};

export default Sidebar;
