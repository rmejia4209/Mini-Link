import BaseButton from "./base/BaseButton";
import FollowIcon from "../icons/FollowIcon";


function FollowLinkButton( { alias }: { alias: string} ): JSX.Element {

  const url = `${import.meta.env.VITE_API_URL}/${alias}`;

  return (
    <BaseButton
      className="btn-sm btn-accent btn-outline"
      text="Go"
      onClick={()=>{window.open(url, '_blank')}}
      Icon={FollowIcon}
    />
  )
}


export default FollowLinkButton;