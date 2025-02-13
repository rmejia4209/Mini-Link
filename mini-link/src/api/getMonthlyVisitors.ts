import { UnsuccessfulAPIResponseType } from "../types/common";
const baseURL = import.meta.env.VITE_API_URL;

interface SuccessfulAPIResponseType {
    [key: string]: number;
}

const sortResponseData = (
  data: SuccessfulAPIResponseType): [string[], number[]] => 
{
  const sortedMonths = Object.entries(data).sort(
    ([monthA, _], [monthB, __]) => (
      new Date(monthA).getTime() - new Date(monthB).getTime()
    )
  );
  const [months, visits] = sortedMonths.reduce(
    (
      [months, visits]: [string[], number[]],
      [month, visit]: [string, number]
    ) => {
        const date = new Date(month);
        months.push(
          date.toLocaleString('en-us', { year:"numeric", month:"short"})
        );
        visits.push(visit);
        return [months, visits];
    }, [[], []])
    return [months, visits]
}


const getMonthlyVisitors = async (
  alias: string): Promise<[string[], number[]]> => 
{
  try {
    const res = await fetch(`${baseURL}/get-monthly-visitors/${alias}`, {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    });
    
    if (res.status === 200) {
      const data: SuccessfulAPIResponseType = await res.json();
      return sortResponseData(data);
    } else {
      const data: UnsuccessfulAPIResponseType = await res.json();
      throw new Error(`${data.detail}`);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }  
}

export default getMonthlyVisitors;