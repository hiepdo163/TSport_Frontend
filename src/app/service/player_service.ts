import { customFetch } from "@/utils/fetch/customFetch";
import { createClient } from "@/utils/supabase/client";

export const fetchAllPlayersFilter = async () => {
    try {
        const response = await fetch('https://tsportapi.azurewebsites.net/api/players/getall', { cache: 'no-store' });

        const data = await response.json();
        console.log({ data });
        return data;

    } catch (error) {
        console.error(`Error fetching all players filter: ${error}`);
        return null;
    }
}

export const fetchAllPlayers = async (page: number, search: string, clubId: string) => {
    let url = `https://tsportapi.azurewebsites.net/api/players?pageNumber=${page}&pageSize=8&sortColumn=id&orderByDesc=true`;
    if (search != "") {
        url += `&name=${search}`;
    }
    if (clubId != ""){
        url += `&clubId=${clubId}`;
    }
    try {
        const response = await fetch(url, { cache: 'no-store' });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching all players: ${error}`);
        return null;
    }
}

export const addNewPlayer = async (code: string, name: string, clubId: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'POST',
            },
            endpointPath: '/players',
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: {
                "code": code,
                "name": name,
                "club-id": clubId
            },
        });
        return response;
    } catch (error) {
        console.error(`Error add new player: ${error}`);
        return null;
    }
}

export const updatePlayer = async (id: number, code: string, name: string, clubId: number, status: string) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'PUT',
            },
            endpointPath: `/players/${id}`,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: {
                "code": code,
                "name": name,
                "club-id": clubId,
                "status": status
            },
        });
        return response;
    } catch (error) {
        console.error(`Error update player: ${error}`);
        return null;
    }
}