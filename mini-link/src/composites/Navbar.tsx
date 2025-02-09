import MagnifyingGlass from "../icons/MagnifyingGlass"

function Navbar(): JSX.Element {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="flex flex-row items-center">
          <MagnifyingGlass/>
          <h1 className={`
            text-4xl font-black tracking-tighter bg-gradient-to-r
            bg-clip-text text-transparent animate-text 
            from-primary via-secondary to-accent
          `}
          >
            Mini Link
          </h1>
        </div>
      </div>
      <div className="navbar-end gap-1">
        <button className="btn btn-outline btn-primary rounded-2xl">
          Add Demo Data
        </button>
        <button className="btn btn-outline btn-primary rounded-2xl">
          Change Theme
        </button>
      </div>
    </div>
    
  )
}

export default Navbar

/*
    
*/