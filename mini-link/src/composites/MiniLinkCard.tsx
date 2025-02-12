import { MiniLinkType } from "../types/common";
import MiniLinkVisits from "../components/MiniLinkVisits";
import MiniLinkURL from "../components/MiniLinkURL";
import StatsButton from "../components/buttons/StatsButton";
import DeleteButton from "../components/buttons/DeleteButton";

function MiniLinkCard(
    { miniLink, removeMiniLink }:
    { miniLink: MiniLinkType, removeMiniLink:(alias: string) => Promise<void>;}
  ): JSX.Element 
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
          <StatsButton/>
          <DeleteButton alias={miniLink.alias} removeMiniLink={removeMiniLink}/>
        </div>
      </div>
    </div>
    )
}

export default MiniLinkCard;