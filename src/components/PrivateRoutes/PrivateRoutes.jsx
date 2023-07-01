import Cookies from "js-cookie"
import { Navigate  , Outlet} from "react-router-dom"
import Login from "../Auth/Login";
const PrivateRoutes = () => {
    const token = Cookies.get('token');
    if(!token) {
        return <Navigate to={<Login/>}/>
    }
  return  <Outlet/>
}

export default PrivateRoutes