import { ArrowLeft } from "lucide-react";

const PersonBody = () => {
  return (
    <section className="lg:ml-[19rem] min-h-screen pt-32 flex justify-center">
      <div className="mx-4 lg:mx-4 rounded-lg w-full flex flex-col overflow-y-auto h-[calc(100vh-8rem)]">
        <div>
          <button
            className="bg-slate-200 rounded-full text-gray-700 p-3"
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowLeft />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PersonBody;
