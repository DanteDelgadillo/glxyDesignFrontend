import React from "react";
import Menu from "./Menu"

const Layout = ({ title = "Title", description = "Description", className, children }) => (
    <div>
        <Menu></Menu>
        <hr />
        <hr />
        <hr />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div>
            <div>
                <div className={className}>{children}</div>
            </div>
        </div>
    </div>
);

export default Layout;