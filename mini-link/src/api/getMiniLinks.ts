import { MiniLinkTypeFromAPI, MiniLinkType } from "../types/common";
import { convertToMiniLinkType } from "../types/common";

const baseURL = import.meta.env.VITE_API_URL;


export const getAllMiniLinks = async (): Promise<MiniLinkType[]> => {
  try {
    const res = await fetch(`${baseURL}/get-all`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    const data: MiniLinkTypeFromAPI[] = await res.json();
    const miniLinks = data.map(
      (miniLink, _) => convertToMiniLinkType(miniLink)
    )
    return miniLinks;
  } catch (error) {
    throw new Error(`${error}`);
  }  
}
