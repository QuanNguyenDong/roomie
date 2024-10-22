import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

function DefaultLayout({ children }) {
    return (
        <div className="max-w-[520px] mx-auto min-h-full bg-[#f9f9f9]">
            <Topbar />
            <div className="h-16"></div>
            {children}
            <Navbar />
            <div className="h-24"></div>
        </div>
    );
}

export default DefaultLayout;