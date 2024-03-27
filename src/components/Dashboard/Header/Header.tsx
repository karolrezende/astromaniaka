import Profile from "./Profile/Profile";

const Header = () => {
  return (
    <section className="py-4 px-4 lg:pl-80 fixed w-full">
      <header className="w-full bg-slate-800 rounded-xl">
        <Profile />
      </header>
    </section>
  );
};

export default Header;
