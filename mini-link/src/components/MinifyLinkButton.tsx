
interface MinifyLinkButtonPropTypes {
  onClick: () => Promise<void>;
}


function MinifyLinkButton(
  { onClick }: MinifyLinkButtonPropTypes): JSX.Element 
{
  return (
    <button className="btn btn-wide" onClick={onClick}>
        Minify Link!
    </button>
  )
}

export default MinifyLinkButton