import Navbar from "@/elements/Navbar";
import Sidebar from "@/elements/Sidebar";

type WrapperI = {
  children: React.ReactElement;
};
const Wrapper: React.FC<WrapperI> = (props) => {
  const { children } = props;
  return (
    <div className="h-screen w-screen bg-slate-50 overflow=x-hidden">
      <div className="h-12 border-b-2">
        <Navbar />
      </div>
      <div className="flex h-[calc(100vh-3rem)]">
        <div className="border-r-2">
          <Sidebar />
        </div>
        <div className="p-2 bg-white w-full">
          {/* Main View */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
