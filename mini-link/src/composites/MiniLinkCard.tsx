import { MiniLinkType } from "../types/common";
import DeleteIcon from "../icons/DeleteIcon";
import MiniLinkVisits from "../components/MiniLinkVisits";
import MiniLinkURL from "../components/MiniLinkURL";

const baseUrl = import.meta.env.VITE_API_URL;


function MiniLinkCard({ miniLink }: { miniLink: MiniLinkType }): JSX.Element {
    return (
      <div className="card card-compact w-fit bg-neutral-content shadow-xl rounded-3xl">
      <div className="card-body">
        <div className="flex flex-row justify-between items-center">
          <MiniLinkURL miniLink={`${baseUrl}${miniLink.alias}`}/>
          <button className="btn btn-xs btn-circle btn-error shadow-none">
            <DeleteIcon />
          </button>
        </div>
        <MiniLinkVisits
          visits={miniLink.visits}
        />
      </div>
    </div>
    )
}

export default MiniLinkCard;