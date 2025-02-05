import { MiniLinkType } from "../types/common";
import MiniLinkCard from "./MiniLinkCard";


function MiniLinkCards(
  { miniLinks }: { miniLinks: MiniLinkType[] }): JSX.Element
{

  return(
    <div className="flex flex-col items-center w-screen">
      <div className="max-w-fit">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {miniLinks.map((link, i) => <MiniLinkCard key={i} miniLink={link}/>)}
        </div>
      </div>
    </div>  
  )
}

export default MiniLinkCards

