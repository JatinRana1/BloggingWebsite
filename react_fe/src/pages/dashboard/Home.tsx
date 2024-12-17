import Navbar  from "../../components/Navbar";
import Sidebar  from "../../components/Sidebar";

const Home = () => {
    return (
        <div className="home">
            <Sidebar/>
            <div className="main-content">
                <Navbar/>
            </div>
        </div>
    )
}  
export default Home; 