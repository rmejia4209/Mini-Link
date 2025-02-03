import BaseInput from "./base/BaseInput";
import Link from "../icons/Link";


interface LinkInputPropTypes {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


function LinkInput({ onChange } : LinkInputPropTypes) {
  return (
    <BaseInput
        InputIcon={Link}
        placeHolder="https://github.com/rmejia4209/Mini-Link"
        onChange={onChange}
    />
  )
}


export default LinkInput;
