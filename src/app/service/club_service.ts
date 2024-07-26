import { customFetch } from "@/utils/fetch/customFetch";
import { createClient } from "@/utils/supabase/client";

export const fetchAllClubsFilter = async () => {
    try {
        const response = await fetch('https://tsportapi.azurewebsites.net/api/clubs/getall', { cache: 'no-store' });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching all clubs filter: ${error}`);
        return null;
    }
};

export const fetchAllClubs = async (page: number, search: string) => {
    let url = `https://tsportapi.azurewebsites.net/api/clubs?page=${page}&size=8&sortColumn=id&orderByDesc=true`;
    if (search != "") {
        url += `&ClubRequest.Name=${search}`;
    }
    try {
        const response = await fetch(url, { cache: 'no-store' });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching all clubs: ${error}`);
        return null;
    }
};

export const addNewClub = async (code: string, name: string, status: string) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;

        let newFormData = new FormData();
        newFormData.append('Code', code);
        newFormData.append('Name', name);
        if (status != "") {
            newFormData.append('Status', status);
        }
        const response = await fetch('https://tsportapi.azurewebsites.net/api/clubs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // 'Content-Type': 'multipart/form-data'
            },
            body: newFormData
        });

        return response;

    } catch (error) {
        console.error(`Error add new club: ${error}`);
        return null;
    }
};

export const updateClub = async (id: number, code: string, name: string, status: string) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;

        let newFormData = new FormData();
        newFormData.append('id', id.toString());
        newFormData.append('Code', code);
        newFormData.append('Name', name);
        newFormData.append('Status', status);
        const response = await fetch(`https://tsportapi.azurewebsites.net/api/clubs/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // 'Content-Type': 'multipart/form-data'
            },
            body: newFormData
        });

        return response;

    } catch (error) {
        console.error(`Error update club: ${error}`);
        return null;
    }
};

export const removeClubs = async (id: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'DELETE',
            },
            endpointPath: `/clubs/${id}`,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        return response;

    } catch (error) {
        console.error(`Error remove club: ${error}`);
        return null;
    }
};