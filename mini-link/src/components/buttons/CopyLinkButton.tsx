import { useState, useEffect } from "react";
import BaseButton from "../base/BaseButton";
import CopyIcon from "../../icons/CopyIcon";
import CopiedIcon from "../../icons/CopiedIcon";

function CopyLinkButton( { alias }: { alias: string} ): JSX.Element {

  const [isCopied, setIsCopied] = useState(false);

  const url = `${import.meta.env.VITE_API_URL}/${alias}`;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (isCopied) {
      setInterval(() => {
        setIsCopied(false);
      }, 5000);
    }
  })

  return (
    <BaseButton
      className="btn-sm btn-primary btn-outline"
      text={isCopied ? 'Copied!' : 'Copy'}
      onClick={handleCopy}
      Icon={isCopied ? CopiedIcon : CopyIcon}
    />
  )
}

export default CopyLinkButton;