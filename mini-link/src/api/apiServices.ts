
const baseURL = import.meta.env.VITE_API_URL;

interface UserInputType {
    url: string;
    alias: string;
}


interface SuccessfulResponseType {
  url: string;
  alias: string;
  expiration: string
  visits: number
}

interface UnsuccessfulResponseType {
  detail: string
}

type ApiResponseType = SuccessfulResponseType | UnsuccessfulResponseType;


/**
 * Makes a request to the api to create a mini-link. 
 * 
 * @param userInput - Contains the url to be shorten and an optional alias
 */
export const createMiniLink = async (
  userInput: UserInputType): Promise<[number, ApiResponseType]> => 
{
  const payload = Object.fromEntries(
    Object.entries(userInput).filter(([_, v]) => v !== "")
  );
  try {
    const res = await fetch(baseURL, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    const data: ApiResponseType = await res.json();
    return [res.status, data];
  } catch (error) {
    throw new Error(`${error}`);
  }  
}