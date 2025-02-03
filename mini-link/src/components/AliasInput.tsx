import BaseInput from "./base/BaseInput";


interface AliasInputPropTypes {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


function AliasInput({ onChange } : AliasInputPropTypes): JSX.Element {
  return (
    <BaseInput
      placeHolder="Alias (Optional)"
      onChange={onChange}
    />
  )
}

export default AliasInput;