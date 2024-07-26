import { customFetch } from "@/utils/fetch/customFetch";

export const fetchSeasonPlayers = async () => {
    try {
        const response = await fetch('https://tsportapi.azurewebsites.net/api/seasonplayers', { cache: 'no-store' });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        return data;

    } catch (error) {
        console.error(`Error: ${error}`);
    }  
};

export const addSeasonPlayer = async (seasonid: number, playerid: number) => {
    await customFetch({
            options: {
                'method': 'POST',
            },
            endpointPath: '/SeasonPlayers',
            headers: {
                'Content-Type': 'application/json-patch+json',
            },
            body: {
                "seasonid":seasonid ,
                "playerid": playerid
            },
        });
}