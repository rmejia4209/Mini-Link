import useObject from './hooks/useObject';
import LinkInput from './components/LinkInput';
import AliasInput from './components/AliasInput';
import MinifyLinkButton from './components/MinifyLinkButton';
import { createMiniLink } from './api/apiServices';


function App() {

  const [linkDetails, setLinkDetails] = useObject({url: '', alias: ''});

  const foo = async () => {
    createMiniLink({url: linkDetails.url, alias: linkDetails.alias})
  }


  return (
    <>
      <div className='flex flex-col justify-items-center gap-5'>
        <LinkInput
          value={linkDetails.url}
          onChange={setLinkDetails}
        />
        <AliasInput
          value={linkDetails.alias}
          onChange={setLinkDetails}
        />
        <MinifyLinkButton
          onClick={foo}
        />
      </div>
    </>
  )
}

export default App
