import { useEffect, useState } from "react";
import { Routes, Route, Link,  useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import EditNote from "./components/EditNote";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import Cookies from "js-cookie";

function App() {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const [usetoken, setToken] = useState(false);

  const location = useLocation();
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if(token){
      setToken(true);
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setToken(false);
    navigate("/login")
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 z-10 w-full  h-[70px] shadow-lg flex items-center justify-between md:px-[10%] px-40 bg-white">
        <h2 className="text-xl font-bold text-blue-800 ">ALI KEY </h2>
        <div
          className="md:hidden w-[40px] h-[40px]  text-xl text-white bg-blue-800
         rounded flex items-center justify-center cursor-pointer" 
          onClick={() => setMenu(!menu)}
        >
          {!menu ? <FaBars /> : <FaTimes />}
        </div>
        <div
          className={`md:static md:flex md:w-auto w-[100%] md:h-auto h-[100vh] absolute top-[70px] right-0
            text-white   
         ${
           !menu
             ? "origin-right max-md:opacity-0 "
             : "max-md:scale-x-100 max-md:opacity-100 "
         }`}

        > 
      
        <ul className={`md:static md:flex md:gap-2 md:w-auto w-[100%] md:h-auto h-[100vh] absolute  right-0
          bg-blue-900 md:bg-white md:!text-blue-800 text-white z-10 transition-all duration-200 
         ${!menu ? 'max-md:scale-x-0 origin-right max-md:opacity-0' : 'max-md:scale-x-100 max-md:opacity-100'}`}>
        
          {token && (

          <>
          <li className={`px-10 py-6 md:py-2 text-xl font-medium ${location.pathname === "/" ? " " : " "} ${location.pathname === "/"}  `}><Link to="/">HOME</Link></li>
          <li className={`px-10 py-6 md:py-2 text-xl font-medium ${location.pathname === "/add_Note" ? " " : ""} ${location.pathname == "/add_Note" ? "" : ""} `}><Link to="/add_Note">NOTE</Link></li>
          <li className={`px-10 py-6 md:py-2 text-xl font-medium  ${location.pathname === "/profile" ? " " : ""} ${location.pathname == "/profile" ? "" : ""}  `}><Link to="/profile">PROFILE</Link></li>
          <li className={`px-10 py-6 md:py-2 text-xl font-medium   `}><Link onClick={handleLogout}>LOGOUT</Link></li>
          </>
          )}

          {!token &&  (
          <>
          <l className={`px-10 py-6 md:py-2 text-xl font-medium  ${location.pathname === "/register" ? "    " : ""} ${location.pathname === "/register"}  `}><Link to="/register">REGISTER</Link></l>
          <li className={`px-10 py-6 md:py-2 text-xl font-medium  ${location.pathname === "/login" ? "  " : ""} ${location.pathname === "/login"}  `}><Link to="/login">LOGIN</Link></li>
          </>
          )}
        </ul>
    
         
        </div>
        </div>

      <div className="bg-gray-50 w-full relative top-[70px] md:h-[100vh] h-[100vh] -z-1 flex items-center justify-center">
        <Routes>
          <Route path="/" element={<Notes />} />
          <Route path="/add_Note" element={<AddNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;


