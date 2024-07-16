import CreatePost from "./CreatePost/CreatePost";
import Feed from "./Feed/Feed";

const DashboardBody = () => {
  return (
    <>
      <section className=" lg:ml-[19rem]  min-h-screen min-w-screen pt-32 flex justify-center">
        <div className="mx-4 lg:mx-4 rounded-lg h-28 w-full min-h-screen flex flex-col">
          <CreatePost />
          <Feed />
        </div>
      </section>
    </>
  );
};

export default DashboardBody;
