import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";

function DefaultLayout({ children }) {
    return (
        <div>
            <Topbar />
            {children}
            <Navbar />
        </div>
    );
}

export default DefaultLayout;