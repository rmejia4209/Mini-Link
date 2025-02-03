import { useState } from 'react';
import LinkInput from './components/LinkInput';
import AliasInput from './components/AliasInput';

function App() {

  const [url, setUrl] = useState('');
  const [alias, setAlias] = useState('');


  return (
    <>
      <div className='flex flex-col justify-items-center gap-5'>
        <LinkInput
          onChange={(event) => setUrl(event.target.value)}
        />
        <AliasInput
          onChange={(event) => setAlias(event.target.value)}
        />
      </div>
    </>
  )
}

export default App
