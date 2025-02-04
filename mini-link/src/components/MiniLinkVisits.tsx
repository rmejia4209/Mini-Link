

interface MiniLinkVisitsPropTypes {
  currentMonthClicks: number,
  lastMonthClicks: number
}


function MiniLinkVisits(
  { currentMonthClicks, lastMonthClicks }: MiniLinkVisitsPropTypes
): JSX.Element {

  const generateDescription = () => {
    const percentDiff = Math.floor(
      100 * (currentMonthClicks - lastMonthClicks) / lastMonthClicks
    );
    const direction = percentDiff < 0 ? 'less' : 'more';
    console.log(percentDiff)
    return `${Math.abs(percentDiff)}% ${direction} than last month`
  }

  return (
    <div className="stat max-w-fit">
      <div className="stat-title">Monthly Clicks</div>
      <div className="stat-value">{currentMonthClicks}</div>
      <div className="stat-desc">{generateDescription()}</div>
      <button className="btn btn-sm btn-outline btn-accent mt-2">Details</button>
    </div>

  )
}

export default MiniLinkVisits;