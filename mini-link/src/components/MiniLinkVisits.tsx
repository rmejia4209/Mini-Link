

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
    <div className="stat place-items-center max-w-fit">
      <div className="stat-title">Total visits</div>
      <div className="stat-value">{totalVisits}</div>
      <div className="stat-desc">{generateDescription()}</div>
      <button className="btn btn-sm btn-outline btn-accent mt-2">Details</button>
    </div>

  )
}

export default MiniLinkVisits;