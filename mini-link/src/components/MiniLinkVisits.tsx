import DetailsButton from "./buttons/DetailsButton";
import DeleteButton from "./buttons/DeleteButton";

interface MiniLinkVisitsPropTypes {
  totalVisits: number;
  currentMonthVisits: number;
  lastMonthVisits: number;
}


function MiniLinkVisits(
  { totalVisits, currentMonthVisits, lastMonthVisits }: MiniLinkVisitsPropTypes
): JSX.Element {

  const generateDescription = () => {

    if (lastMonthVisits == 0) return "";
    const percentDiff = Math.floor(
      100 * (currentMonthVisits - lastMonthVisits) / lastMonthVisits
    );
    const arrow = percentDiff < 0 ? '↘︎' : '↗︎';
    const direction = percentDiff < 0 ? 'less' : 'more';
    return `${arrow} ${Math.abs(percentDiff)}% ${direction} than last month`
  }

  return (
    <div className="stat place-items-center max-w-fit p-0">
      <div className="stat-title">Total visits</div>
      <div className="stat-value">{totalVisits}</div>
      <div className="stat-desc">{generateDescription()}</div>
      <div className="flex flex-row gap-4 items-center justify-center">
        <DetailsButton/>
        <DeleteButton/>
      </div>
    </div>

  )
}

export default MiniLinkVisits;