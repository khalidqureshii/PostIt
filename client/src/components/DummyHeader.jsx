import react from "react";

function DummyHeader () {
    // return <header className="flex flex-row justify-center md:justify-start bg-[#2d2d2d] py-4">
    //     <button onClick={()=>{}}><h1 className="text-3xl md:ml-7">Post-It: A Blogging Website</h1></button>
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
      </div>
    </div>
  </header>
}

export default DummyHeader;