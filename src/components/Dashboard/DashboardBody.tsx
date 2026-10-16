import CreatePost from "./CreatePost/CreatePost";
import Feed from "./Feed/Feed";

const DashboardBody = () => {
  return (
    <>
      <section className="page">
        <div className="page-inner">
          <CreatePost />
          <Feed />
        </div>
      </section>
    </>
  );
};

export default DashboardBody;
