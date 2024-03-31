import CreatePost from "./CreatePost/CreatePost";

const DashboardBody = () => {
    return (<section className=" lg:ml-[19rem]  min-h-screen min-w-screen pt-32 flex justify-center">
        <div className=" bg-slate-700 mx-4 lg:mx-4 rounded-lg h-28 w-full" >
            <CreatePost />
        </div>
    </section>);
}

export default DashboardBody;