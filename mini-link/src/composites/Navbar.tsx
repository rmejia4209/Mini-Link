import Logo from "../components/Logo"
import NavBarButtons from "./NavBarButtons"

function Navbar(): JSX.Element {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="flex flex-row items-center">
          <Logo/>
        </div>
      </div>
      <div className="navbar-end gap-1">
        <NavBarButtons />
      </div>
    </div>
    
  )
}

export default Navbar

/*
    
*/