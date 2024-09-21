import Topbar from "../components/Topbar";

function TopbarOnly({ children }) {
    return (
        <div>
            <Topbar />
            {children}
        </div>
    );
}

export default TopbarOnly;