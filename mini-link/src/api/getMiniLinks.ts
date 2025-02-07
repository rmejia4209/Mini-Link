import { MiniLinkType } from "../types/common";

const baseURL = import.meta.env.VITE_API_URL;


const convertType = (data: any): MiniLinkType => {
    return {
        url: data.url,
        alias: data.alias,
        expiration: data.expiration,
        totalVisits: data.total_visits,
        currentMonthVisits: data.current_month_visits,
        lastMonthVisits: data.last_month_visits,
    }
} 

/**
 * Makes a request to the api to create a mini-link. 
 * 
 * @param userInput - Contains the url to be shorten and an optional alias
 */
export const getAllMiniLinks = async (): Promise<[number, MiniLinkType[]]> => {
  try {
    const res = await fetch(`${baseURL}get-all`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    const data: Array<any> = await res.json();
    console.log(data);
    const miniLinks = data.map((miniLink, _) => convertType(miniLink))
    return [res.status, miniLinks];
  } catch (error) {
    throw new Error(`${error}`);
  }  
}
