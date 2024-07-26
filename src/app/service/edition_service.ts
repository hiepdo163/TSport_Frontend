import { customFetch } from "@/utils/fetch/customFetch";
import { createClient } from "@/utils/supabase/client";

export const fetchAllEditions = async (page: number, search: string) => {
    let url = `https://tsportapi.azurewebsites.net/api/ShirtEditions?pageNumber=${page}&pageSize=8&sortColumn=id&orderByDesc=true`;
    if (search != "") {
        url += `&code=${search}`;
    }
    try {
        const response = await fetch(url, { cache: 'no-store' });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching all editions: ${error}`);
        return null;
    }
};

export const addEdition = async (code: string, size: string, sign: boolean, stock: number, discount: number, color: string, origin: string, quantity: number, material: string, seasonId: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'POST',
            },
            endpointPath: '/ShirtEditions',
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: {
                "code": code,
                "size": size,
                "has-signature": sign,
                "stock-price": stock,
                "discount-price": discount,
                "color": color,
                "origin": origin,
                "quantity": quantity,
                "material": material,
                "season-id": seasonId
            },
        });

        return response;

    } catch (error) {
        console.error(`Error add new edition: ${error}`);
        return null;
    }
};

export const updateEdition = async (id: number, code: string, size: string, sign: boolean, stock: number, discount: number, color: string, origin: string, quantity: number, material: string, seasonId: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'PUT',
            },
            endpointPath: `/ShirtEditions/${id}`,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: {
                "code": code,
                "size": size,
                "has-signature": sign,
                "stock-price": stock,
                "discount-price": discount,
                "color": color,
                "origin": origin,
                "quantity": quantity,
                "material": material,
                "season-id": seasonId
            },
        });

        return response;

    } catch (error) {
        console.error(`Error update edition: ${error}`);
        return null;
    }
};

export const removeEdition = async (id: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'DELETE',
            },
            endpointPath: `/ShirtEditions/${id}`,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        return response;

    } catch (error) {
        console.error(`Error remove edition: ${error}`);
        return null;
    }
};

export const fetchShirtEditions = async () => {
    try {
        const response = await fetch('https://tsportapi.azurewebsites.net/api/shirteditions/getall', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });


        const data = await response.json();

        return data;

    } catch (error) {
        console.error(`Error fetching shirt editions: ${error}`);
    }
}