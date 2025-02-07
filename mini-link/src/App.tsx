import { getAllMiniLinks } from "./api/getMiniLinks";
import getStatus from "./api/getStatus";
import { useState, useEffect } from "react";
import { MiniLinkType } from "./types/common";
import Logo from "./components/Logo";
import MinifyLinkForm from "./composites/MinifyLinkForm";
import MiniLinkCards from "./composites/MiniLinkCards";


function App() {

  const [miniLinks, setMiniLinks] = useState<MiniLinkType[]>([]);
  const [status, setStatus] = useState('');

  const appendMiniLink = (newLink: MiniLinkType) => {
    setMiniLinks([newLink, ...miniLinks])
  }

  useEffect(() => {
    const initLinks = async () => {
      try {
        const serverStatus = await getStatus()
        setStatus(serverStatus);
        if (serverStatus == 'OK') {
          const miniLinks = await getAllMiniLinks();
          setMiniLinks(miniLinks);
        }
      } catch(err) {
        alert(err);
      }
    }

    initLinks();
  }, [])

  return (
    <>
      <div className="">
        <Logo/>
        <MinifyLinkForm appendMiniLink={appendMiniLink} status={status}/>
        <MiniLinkCards miniLinks={miniLinks}/>
      </div>
    </>
  )
}

export default App
