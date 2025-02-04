import BaseInput from "./base/BaseInput";
import Link from "../icons/Link";


interface LinkInputPropTypes {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


function LinkInput({ value, onChange } : LinkInputPropTypes) {
  return (
    <BaseInput
        label="URL"
        name='url'
        value={value}
        InputIcon={Link}
        placeHolder="https://github.com/rmejia4209/Mini-Link"
        onChange={onChange}
    />
  )
}


export default LinkInput;
