import CopyIcon from "../icons/CopyIcon";

function CopyLinkButton(): JSX.Element {
  return (
    <button className="btn btn-sm btn-primary btn-outline rounded-xl">
      <CopyIcon />Copy
    </button>
  )
}

export default CopyLinkButton;