import { Outlet } from "react-router-dom";
import Navbar from "./navbar/Navbar";
const Header = () => {
    return (
        <div>
            <Navbar>
                <Outlet />
            </Navbar>
        </div>
    );
};

export default Header;