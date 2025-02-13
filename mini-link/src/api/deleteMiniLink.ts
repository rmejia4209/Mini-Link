import { UnsuccessfulAPIResponseType } from "../types/common";
const baseURL = import.meta.env.VITE_API_URL;


const deleteMiniLink = async (alias: string): Promise<void> => {

  try {
    const res = await fetch(`${baseURL}/${alias}`, {
      method: "DELETE",
      credentials: 'include',
    });
    if (res.status != 204) {
        const data: UnsuccessfulAPIResponseType = await res.json();
        throw new Error(`${data.detail}`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }  
}

export default deleteMiniLink;