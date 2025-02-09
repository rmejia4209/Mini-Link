import { MiniLinkTypeFromAPI, MiniLinkType } from "../types/common";
import { convertToMiniLinkType } from "../types/common";
import { UnsuccessfulAPIResponseType } from "../types/common";
const baseURL = import.meta.env.VITE_API_URL;

interface UserInputType {
    url: string;
    alias: string;
}


/**
 * Makes a request to the api to create a mini-link. 
 * 
 * @param userInput - Contains the url to be shorten and an optional alias
 */
export const createMiniLink = async (
  userInput: UserInputType): Promise<MiniLinkType> => 
{
  const payload = Object.fromEntries(
    Object.entries(userInput).filter(([_, v]) => v !== "")
  );
  try {
    const res = await fetch(`${baseURL}/`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    if (res.status == 200) {
      const data: MiniLinkTypeFromAPI = await res.json();
      return convertToMiniLinkType(data);
    } else {
      const data: UnsuccessfulAPIResponseType = await res.json();
      throw new Error(`${data.detail}`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }  
}
