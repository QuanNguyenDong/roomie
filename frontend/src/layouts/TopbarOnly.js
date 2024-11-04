import Topbar from "../components/Topbar";
import React from "react";

function TopbarOnly({ children }) {
    return (
        <div className="max-w-[520px] mx-auto min-h-full bg-[#f9f9f9]">
            <Topbar />
            {children}
            <div className="h-24"></div>
        </div>
    );
}

export default TopbarOnly;