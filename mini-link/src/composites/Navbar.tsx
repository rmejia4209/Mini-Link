import { MiniLinkType } from "../types/common";
import Logo from "../components/Logo"
import NavBarButtons from "./NavBarButtons"


interface NavbarActionTypes {
  appendMiniLink: (miniLink: MiniLinkType) => void;
}

function Navbar({ appendMiniLink }: NavbarActionTypes ): JSX.Element {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="flex flex-row items-center">
          <Logo/>
        </div>
      </div>
      <div className="navbar-end">
        <NavBarButtons appendMiniLink={appendMiniLink}/>
      </div>
    </div>
    
  )
}

export default Navbar

/*
    
*/