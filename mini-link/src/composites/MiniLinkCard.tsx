import { MiniLinkType } from "../types/common";
import MiniLinkVisits from "../components/MiniLinkVisits";
import MiniLinkURL from "../components/MiniLinkURL";
import StatsButton from "../components/buttons/StatsButton";
import DeleteButton from "../components/buttons/DeleteButton";
import ShowQRCodeButton from "../components/buttons/ShowQRCode";


interface MiniLinkCardPropTypes {
  miniLink: MiniLinkType;
  removeMiniLink:(alias: string) => Promise<void>;
}


function MiniLinkCard(
    { miniLink, removeMiniLink }: MiniLinkCardPropTypes): JSX.Element 
{

  return (
    <div className="card card-compact w-fit bg-neutral-content shadow-xl rounded-3xl">
      <div className="card-body items-center gap-0">
        <MiniLinkURL alias={`${miniLink.alias}`}/>
        <MiniLinkVisits
          totalVisits={miniLink.totalVisits}
          currentMonthVisits={miniLink.currentMonthVisits}
          lastMonthVisits={miniLink.lastMonthVisits}
        />
        <div className="flex flex-row gap-4 items-center justify-center">
          <ShowQRCodeButton alias={miniLink.alias}/>
          <StatsButton alias={miniLink.alias}/>
          <DeleteButton alias={miniLink.alias} removeMiniLink={removeMiniLink}/>
        </div>
      </div>
    </div>
  )
}

export default MiniLinkCard;