import { Link } from "react-router-dom";
import menuData from "../data/menu";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const isVisible = useSelector((state: RootState) => state.sidebar.isVisible);
    const [isHover, setIsHover] = useState(false);

    return (
        <div
            className={`sidebar ${(isVisible || isHover) ? 'col-2' : 'col-1'}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <div className="header">
                <img 
                    src="https://e7.pngegg.com/pngimages/827/941/png-clipart-web-development-web-design-logo-website-arrow-and-globe-logo-search-engine-optimization-text.png" 
                    alt="siteLogo" 
                    width={30} 
                    height={30} 
                    className="img-fluid" 
                />
                {(isVisible || isHover) && <span className="text-nowrap">Little Techy</span>}
            </div>
            <div className="body">
                {menuData.map((item) => (
                    <Link className={`${!isVisible && 'text-center'}`} key={item.id} to={item.path}>
                        <i className={`${item.color} ${item.icon} fs-5`}></i>
                        {(isVisible || isHover) && <span className="text-nowrap">{item.label}</span>}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
