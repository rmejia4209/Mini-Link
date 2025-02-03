import Link from "../icons/Link";

function LinkInput({}) {
  return (
    <label className='input input-bordered flex items-center gap-2 w-full max-w-xs'>
      <Link/>
      <input
        type='text'
        className='grow'
        placeholder='https://github.com/rmejia4209/Mini-Link'
      />
    </label>
  )
}


export default LinkInput;
