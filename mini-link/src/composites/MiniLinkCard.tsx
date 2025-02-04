import DeleteIcon from "../icons/DeleteIcon";
import QRCodeWrapper from "../components/QRWrapper";
import MiniLinkVisits from "../components/MiniLinkVisits";
import MiniLinkURL from "../components/MiniLinkURL";



interface MiniLinkCardPropTypes {
  link?: string,
  currentMonthClicks?: number,
  lastMonthClicks?: number
}


function MiniLinkCard(
  {
    link='Mini Link URL', currentMonthClicks=1000, lastMonthClicks=50
  }: MiniLinkCardPropTypes
): JSX.Element {
    return (
      <div className="card card-compact w-fit bg-neutral-content shadow-xl rounded-3xl">
      <div className="card-body">
        <div className="flex flex-row justify-between">
          <MiniLinkURL link={link}/>
          <button className="btn btn-xs btn-circle btn-error shadow-none">
            <DeleteIcon />
          </button>
        </div>
        <div className="flex flex-row justify-between items-center">
          <QRCodeWrapper value={link}/>
          <MiniLinkVisits
            currentMonthClicks={currentMonthClicks}
            lastMonthClicks={lastMonthClicks} 
          />
        </div>
      </div>
    </div>
    )
}

export default MiniLinkCard;