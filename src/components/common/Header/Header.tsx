import Profile from "./Profile/Profile";

const Header = () => {
  return (
    <section className="fixed z-20 w-full px-4 pt-4 lg:pl-80 lg:pr-6">
      <header className="glass">
        <Profile />
      </header>
    </section>
  );
};

export default Header;
