import { Link } from "react-router-dom";
import menuData from "../data/menu";
import { useAppDispatch } from "../hooks/hooks";
import { clearToken } from "../slice/tokenSlice";
import { clearUser } from "../slice/authSlice";

const Sidebar = () => {
    const dispatch = useAppDispatch();
    
    const handleLogout = () => {
        dispatch(clearToken());
        dispatch(clearUser());
    }
    return (
        <div className='sidebar col-2 col-1' >
            <div className="header">
                <img 
                    src="https://e7.pngegg.com/pngimages/827/941/png-clipart-web-development-web-design-logo-website-arrow-and-globe-logo-search-engine-optimization-text.png" 
                    alt="siteLogo" 
                    width={30} 
                    height={30} 
                    className="img-fluid" 
                />
                <span className="text-nowrap">Little Techy</span>
            </div>
            <div className="body">
                {menuData.map((item) => (
                    <Link className='' key={item.id} to={item.path}>
                        <i className={`${item.color} ${item.icon} fs-5`}></i>
                        <span className="text-nowrap">{item.label}</span>
                    </Link>
                ))}
            </div>
            <div className="footer">
                <li onClick={handleLogout}>
                    <i className="ri-logout-box-r-line"></i>
                    <span className="text-nowrap">Logout</span>
                </li>
            </div>
        </div>
    );
};

export default Sidebar;
