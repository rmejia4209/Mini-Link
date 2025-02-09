import { MiniLinkType } from "../types/common";
import getDemoData from "../api/getDemoData";
import MenuIcon from "../icons/MenuIcon";

interface NavBarButtonsActionTypes {
  appendMiniLink: (miniLink: MiniLinkType) => void;
}

function NavBarButtons(
  { appendMiniLink }: NavBarButtonsActionTypes): JSX.Element
{

  const loadDemoData = async () => {
    const miniLinks = await getDemoData();
    console.log(miniLinks);
    miniLinks.forEach((miniLink) => appendMiniLink(miniLink));
  }

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
            <li>
              <button
                className="btn btn-ghost rounded-2xl font-normal"
                onClick={loadDemoData}
              >
                Add Demo Data
              </button>
            </li>
            <li>
              <button className="btn btn-ghost rounded-2xl font-normal">
                Change Theme
              </button>
            </li>
          </ul>
        </div>
      <div className="max-sm:hidden flex flex-row items-center gap-2">
        <button
          className="btn btn-outline btn-primary rounded-2xl"
          onClick={loadDemoData}
        >
          Add Demo Data
        </button>
        <button className="btn btn-outline btn-primary rounded-2xl">
          Change Theme
        </button>
      </div>
      
    </>
  )
}

export default NavBarButtons;