import { useState, useEffect, useRef } from "react";
import { MiniLinkType } from "./types/common";
import Navbar from "./composites/Navbar";
import MinifyLinkForm from "./composites/MinifyLinkForm";
import MiniLinkCards from "./composites/MiniLinkCards";
import { getAllMiniLinks } from "./api/getMiniLinks";
import getStatus from "./api/getStatus";
import deleteMiniLink from "./api/deleteMiniLink";
import LineGraph from "./components/LineGraph";

function App() {

  const [miniLinks, setMiniLinks] = useState<MiniLinkType[]>([]);
  const [status, setStatus] = useState('');
  const hasRun = useRef(false);

  const appendMiniLink = (newLink: MiniLinkType): void => {
    setMiniLinks(prevMiniLinks => [newLink, ...prevMiniLinks])
  }

  const removeMiniLink = async (alias: string): Promise<void> => {
    const newMiniLinks = miniLinks.filter(miniLink => miniLink.alias != alias);
    try {
      await deleteMiniLink(alias);
      setMiniLinks(newMiniLinks);
    } catch(err) {
      console.error(err);
    }
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
    if (hasRun.current) return;
    hasRun.current = true;
    initLinks();
  }, [])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar appendMiniLink={appendMiniLink}/>
        <main className="flex-1 pb-10">
          <MinifyLinkForm appendMiniLink={appendMiniLink} status={status}/>
          <MiniLinkCards
            miniLinks={miniLinks}
            removeMiniLink={removeMiniLink}
          />
        </main>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Add something clever here</p>
        </aside>
      </footer>
      </div>
    </>
  )
}

export default App
