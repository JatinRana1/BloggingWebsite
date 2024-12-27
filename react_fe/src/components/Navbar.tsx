import { useAppDispatch, useAppSelector } from '../hooks/hooks';


const Navbar = () => {
    const dispatch = useAppDispatch();
    const userData  = useAppSelector((state)=> state.auth.userData);

    return(
        <div className="navbar col-12">
            <div className="left-side">
                <div className="ham">
                    <i className="ri-menu-line fs-5"></i>
                </div>
                <div className="search">
                    <i className="ri-search-line"></i>
                </div>
            </div>
            <div className="right-side">
                <div className="notification">
                    <i className="ri-notification-2-line"></i>
                </div>
                <div className="message">
                    <i className="ri-chat-4-fill"></i>
                </div>
                <div className="profile-pic img-fluid">
                    <img width={30} height={30} src="https://i.pinimg.com/736x/b8/80/70/b880708681403feb71d634c902b0afdd.jpg" alt="profile-pic" />
                </div>
                <div className="user-name">
                    <span>{ userData ? userData.userName : "Invalid User" }</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar;