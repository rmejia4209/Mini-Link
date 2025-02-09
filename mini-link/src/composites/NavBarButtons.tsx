import { MiniLinkType } from "../types/common";
import getDemoData from "../api/getDemoData";
import MenuIcon from "../icons/MenuIcon";

interface NavBarButtonsPropTypes {
  appendMiniLink: (miniLink: MiniLinkType) => void;
}

interface ButtonsPropTypes {
  inMenu: boolean;
  appendMiniLink: (miniLink: MiniLinkType) => void;
}

function Buttons({ inMenu, appendMiniLink }: ButtonsPropTypes): JSX.Element {
  
  const loadDemoData = async () => {
    const miniLinks = await getDemoData();
    miniLinks.forEach((miniLink) => appendMiniLink(miniLink));
  }
  
  return (
    <>
      <button
        className={`${
          inMenu 
          ? 'btn btn-ghost rounded-2xl font-normal'
          :'btn btn-outline btn-primary rounded-2xl'
        }`}
        onClick={loadDemoData}
      >
        Add Demo Data
      </button>
      <button 
        className={`${
          inMenu 
          ? 'btn btn-ghost rounded-2xl font-normal'
          :'btn btn-outline btn-primary rounded-2xl'
        }`}
      >
        Change Theme
      </button>
    </>
  )
}



function NavBarButtons(
  { appendMiniLink }: NavBarButtonsPropTypes): JSX.Element
{

  return (
    <>
      <div className="dropdown dropdown-bottom dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost sm:hidden">
          <MenuIcon />
        </div>
          <ul
            tabIndex={0}
            className={`
              menu dropdown-content bg-base-100 rounded-box
              z-[1] mt-3 w-52 p-2 shadow-xl
            `}
          >
          <Buttons inMenu={true} appendMiniLink={appendMiniLink}/>
        </ul>
        </div>
      <div className="max-sm:hidden flex flex-row items-center gap-2">
        <Buttons inMenu={false} appendMiniLink={appendMiniLink}/>
      </div>
      
    </>
  )
}

export default NavBarButtons;