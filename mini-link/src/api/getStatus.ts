
const baseURL = import.meta.env.VITE_API_URL;

const getStatus = async (): Promise<string> => {
  try{
    const res = await fetch(`${baseURL}status`, {method: 'GET'});
    return res.status == 204 ? 'OK' : 'Down'
  } catch {
    return 'Down'
  }
}

export default getStatus;