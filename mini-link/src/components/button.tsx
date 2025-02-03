import { useState } from 'react'


function Button() {
const [count, setCount] = useState(0)

return (
  <>
    <button className="btn w-64 rounded-full" onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  </>
)
}

export default Button
