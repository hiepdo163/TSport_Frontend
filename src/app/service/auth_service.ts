import { customFetch } from "@/utils/fetch/customFetch";

export const fetchWhoAmI = async (accessToken: string) => {
    const response = await customFetch({
        endpointPath: '/auth/who-am-i',
        options: {
            method: 'GET',
        },
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();
    return data;
};