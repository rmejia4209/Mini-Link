import BaseInput from "./base/BaseInput";


interface AliasInputPropTypes {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


function AliasInput({ value, onChange } : AliasInputPropTypes): JSX.Element {
  return (
    <BaseInput
      name='alias'
      placeHolder="Alias (Optional)"
      value={value}
      onChange={onChange}
    />
  )
}

export default AliasInput;