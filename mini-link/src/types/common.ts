
export interface MiniLinkTypeFromAPI {
    url: string;
    alias: string;
    expiration: string;
    total_visits: number;
    current_month_visits: number;
    last_month_visits: number;
}


export interface MiniLinkType {
    url: string;
    alias: string;
    expiration: string;
    totalVisits: number;
    currentMonthVisits: number;
    lastMonthVisits: number;
}


export interface UnsuccessfulAPIResponseType {
    detail: string
}


export const convertToMiniLinkType = (
    data: MiniLinkTypeFromAPI
): MiniLinkType => {

    return {
        url: data.url,
        alias: data.alias,
        expiration: data.expiration,
        totalVisits: data.total_visits,
        currentMonthVisits: data.current_month_visits,
        lastMonthVisits: data.last_month_visits,
    }
}