import { customFetch } from "@/utils/fetch/customFetch";
import { createClient } from "@/utils/supabase/client";

export const fetchPagedShirts = async ({ page = 1, pageSize = 10, clubIds = [],
    playerIds = [],
    seasonIds = [],
    startPrice = null,
    endPrice = null,
    sortColumn = 'id',
    orderByDesc = true
}: QueryPagedShirtRequest) => {
    let url = `https://tsportapi.azurewebsites.net/api/shirts?pageNumber=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&orderByDesc=${orderByDesc}`;

    if (clubIds.length > 0) {
        clubIds.forEach((clubId) => {
            url += `&clubId=${clubId}`;
        });
    }

    if (seasonIds.length > 0) {
        seasonIds.forEach((seasonId) => {
            url += `&seasonId=${seasonId}`;
        });
    }

    if (playerIds.length > 0) {
        playerIds.forEach((playerId) => {
            url += `&playerId=${playerId}`;
        });
    }

    if (startPrice) {
        url += `&startPrice=${startPrice}`;
    }

    if (endPrice) {
        url += `&endPrice=${endPrice}`;
    }

    console.log(`Fetching shirts from: ${url}`);

    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    console.log(`Shirts data:`);
    console.log({ data });
    return data;
};

export const fetchShirts = async (page = 1, pageSize = 10,
    name = '',
    clubIds = [],
    playerIds = [],
    seasonIds = [],
    startPrice = null,
    endPrice = null,
    sortColumn = 'id',
    orderByDesc = true) => {
    let url = `https://tsportapi.azurewebsites.net/api/shirts?pageNumber=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&orderByDesc=${orderByDesc}`;

    if (name != '') {
        url += `&name=${name}`;
    }

    if (clubIds.length > 0) {
        clubIds.forEach((clubId) => {
            url += `&clubId=${clubId}`;
        });
    }

    if (seasonIds.length > 0) {
        seasonIds.forEach((seasonId) => {
            url += `&seasonId=${seasonId}`;
        });
    }

    if (playerIds.length > 0) {
        playerIds.forEach((playerId) => {
            url += `&playerId=${playerId}`;
        });
    }

    if (startPrice) {
        url += `&startPrice=${startPrice}`;
    }

    if (endPrice) {
        url += `&endPrice=${endPrice}`;
    }

    console.log(`Fetching shirts from: ${url}`);

    const response = await fetch(url);
    const data = await response.json();
    console.log(`Shirts data:`);
    console.log({ data });
    return data;
}

export const fetchShirtDetails = async (id: number) => {
    const response = await fetch(`https://tsportapi.azurewebsites.net/api/shirts/${id}`);
    const data = await response.json();
    console.log(`Shirt details:`);
    console.log({ data });
    return data;
};

export const fetchCreateShirt = async (request: CreateShirtRequest, accessToken: string) => {

    try {
        let newFormData = new FormData();
        newFormData.append('Images', request.imageFile);
        newFormData.append('Name', request.name);
        newFormData.append('Code', request.code);
        newFormData.append('Description', request.description);
        newFormData.append('Quantity', request.quantity.toString());
        newFormData.append('shirtEditionId', request.shirtEditionId.toString());
        newFormData.append('seasonPlayerId', request.seasonPlayerId.toString());

        const response = await fetch('https://tsportapi.azurewebsites.net/api/shirts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                // 'Content-Type': 'multipart/form-data'
            },
            body: newFormData
        });

        const responseData = await response.json();
        // Handle success
        console.log(responseData);

        return response;

    } catch (error) {
        console.error(`Error creating shirt: ${error}`);
    }
};

export const removeShirt = async (id: number | undefined) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'DELETE',
            },
            endpointPath: `/shirts/${id}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
        });

        return response;

    } catch (error) {
        console.error(`Error remove shirt: ${error}`);
        return null;
    }
};