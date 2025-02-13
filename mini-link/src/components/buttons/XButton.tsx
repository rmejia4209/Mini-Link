import BaseButton from "../base/BaseButton";
import XIcon from "../../icons/XIcon";

function XButton(): JSX.Element {
  return (
    <BaseButton
      className="btn-sm btn-circle btn-ghost absolute right-2 top-2"
      Icon={XIcon}
    />
  )
}

export default XButton;