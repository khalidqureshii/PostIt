import react from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header () {
    const navigate = useNavigate();
    // return <header className="flex flex-row justify-between bg-[#2d2d2d] py-4">
    //     <button onClick={()=>{navigate("/")}}><h1 className="text-2xl ml-5 md:text-3xl md:ml-7">Post-It: A Blogging Website</h1></button>

    //     <button onClick={()=>{navigate("/logout")}}><h1 className="mr-5 md:mr-7 text-xl">Logout</h1></button>
    // </header>
    return <header className="fixed top-0 w-full bg-[#D8B395]/90 backdrop-blur-sm shadow-lg z-50">
    <div className="container mx-auto px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#8B4513] tracking-tight">
          <span className="relative group">
            PostIt
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#8B4513] to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          </span>
        </h1>
        <div className="flex gap-4">
          <button 
            className="p-2 rounded-full text-[#8B4513] hover:bg-[#E8D0B8]
                      transition-all duration-300 hover:scale-105
                      flex items-center justify-center"
            onClick={() => navigate('/dashboard')}
          >
          </button>
        </div>
      </div>
    </div>
  </header>
}

export default Header;