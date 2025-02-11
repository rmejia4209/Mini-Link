import BaseButton from "../base/BaseButton";
import DeleteIcon from "../../icons/DeleteIcon";

function DeleteButton(): JSX.Element {
  return (
    <BaseButton
      className="btn-sm btn-error btn-outline"
      onClick={()=>{}}
      Icon={DeleteIcon}
    />
  )
}

export default DeleteButton;