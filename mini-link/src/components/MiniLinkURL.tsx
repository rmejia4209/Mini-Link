

interface MiniLinkURLPropTypes {
  link: string;
  isNew?: boolean;
}

function MiniLinkURL({ link, isNew }: MiniLinkURLPropTypes): JSX.Element {
  return (
    <h2 className="card-title">
      {link}
      {isNew
        ? <div className="badge badge-secondary">NEW</div> 
        : null
      }
    </h2>
  )
}

export default MiniLinkURL;