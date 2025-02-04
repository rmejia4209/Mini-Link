
interface MinifyLinkButtonPropTypes {
  onClick: () => Promise<void>;
}


function MinifyLinkButton(
  { onClick }: MinifyLinkButtonPropTypes): JSX.Element 
{
  return (
    <button
      className="btn btn-lg btn-outline btn-primary btn-block rounded-3xl bg"
      onClick={onClick}
    >
        Minify Link!
    </button>
  )
}

export default MinifyLinkButton