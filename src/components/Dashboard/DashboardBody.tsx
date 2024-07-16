import CreatePost from "./CreatePost/CreatePost";
import Feed from "./Feed/Feed";

const DashboardBody = () => {
  return (
    <>
      <section className="lg:ml-[19rem] min-h-screen pt-32 flex justify-center">
        <div className="mx-4 lg:mx-4 rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)]">
          <CreatePost />
          <Feed />
        </div>
      </section>
    </>
  );
};

export default DashboardBody;
