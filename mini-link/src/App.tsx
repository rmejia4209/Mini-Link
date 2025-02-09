import { useState, useEffect, useRef } from "react";
import { MiniLinkType } from "./types/common";
import Navbar from "./composites/Navbar";
import MinifyLinkForm from "./composites/MinifyLinkForm";
import MiniLinkCards from "./composites/MiniLinkCards";
import { getAllMiniLinks } from "./api/getMiniLinks";
import getStatus from "./api/getStatus";

function App() {

  const [miniLinks, setMiniLinks] = useState<MiniLinkType[]>([]);
  const [status, setStatus] = useState('');
  const hasRun = useRef(false);

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
    if (hasRun.current) return;
    hasRun.current = true;
    initLinks();
  }, [])

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-1 pb-10">
          <MinifyLinkForm appendMiniLink={appendMiniLink} status={status}/>
          <MiniLinkCards miniLinks={miniLinks}/>
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
