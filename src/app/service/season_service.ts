import { customFetch } from "@/utils/fetch/customFetch";
import { createClient } from "@/utils/supabase/client";

export const fetchAllSeasonsFilter = async () => {
    try {
        const response = await fetch('https://tsportapi.azurewebsites.net/api/seasons/getall', { cache: 'no-store' });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching all seasons filter: ${error}`);
        return null;
    }
};

export const fetchAllSeasons = async (page: number, search: string) => {
    let url = `/seasons?pageNumber=${page}&pageSize=8&sortColumn=id&orderByDesc=true`;
    if (search != "") {
        url += `&code=${search}`;
    }
    try {
        const response = await customFetch({
            options: {
                'method': 'GET',
            },
            endpointPath: url,
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching all seasons: ${error}`);
        return null;
    }
};

export const addNewSeason = async (code: string, name: string, clubId: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'POST',
            },
            endpointPath: '/seasons',
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
        console.error(`Error add new seasons: ${error}`);
        return null;
    }
};

export const updateSeason = async (id: number,code: string, name: string, clubId: number, status: string) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'PUT',
            },
            endpointPath: `/seasons/${id}`,
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
        console.error(`Error update seasons: ${error}`);
        return null;
    }
};

export const removeSeason = async (id: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'DELETE',
            },
            endpointPath: `/seasons/${id}`,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        return response;

    } catch (error) {
        console.error(`Error remove seasons: ${error}`);
        return null;
    }
};