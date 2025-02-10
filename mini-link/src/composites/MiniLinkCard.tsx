import { MiniLinkType } from "../types/common";
import DeleteIcon from "../icons/DeleteIcon";
import MiniLinkVisits from "../components/MiniLinkVisits";
import MiniLinkURL from "../components/MiniLinkURL";


function MiniLinkCard({ miniLink }: { miniLink: MiniLinkType }): JSX.Element {
    return (
      <div className="card card-compact w-fit bg-neutral-content shadow-xl rounded-3xl">
      <div className="card-body items-center gap-0">
        <div className="flex flex-row justify-between items-center gap-2">
          <MiniLinkURL alias={`${miniLink.alias}`}/>
          <button className="btn btn-sm btn-circle btn-error shadow-none">
            <DeleteIcon />
          </button>
        </div>
        <MiniLinkVisits
          totalVisits={miniLink.totalVisits}
          currentMonthVisits={miniLink.currentMonthVisits}
          lastMonthVisits={miniLink.lastMonthVisits}
        />
      </div>
    </div>
    )
}

export default MiniLinkCard;