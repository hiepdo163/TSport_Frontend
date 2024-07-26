
import { customFetch } from "@/utils/fetch/customFetch";
import { createClient } from "@/utils/supabase/client";

export const fetchAddToCart = async ({ shirtId, quantity, size }: AddToCartRequest) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;

        console.log({ shirtId, quantity, size });

        const response = await customFetch({
            options: {
                method: 'POST'
            },
            endpointPath: '/orders/add-to-cart',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: {
                "shirt-id": shirtId,
                "quantity": quantity,
                "size": size
            },
        });

        return response;

    } catch (error) {
        console.error(`Error in fetchAddToCart: ${error}`);
        return null;
    }
};

export const fetchCartInfo = async (accessToken: string) => {
    try {

        console.log(`Access token: ${accessToken}`);

        const response = await customFetch({
            options: {
                method: 'GET'
            },
            endpointPath: '/orders/get-cart',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Cart info');
            console.log({ data });

            return data;
        }

        return null;

    } catch (error) {
        console.error(`Error fetching cart info: ${error}`);
        return null;
    }
};

function convertToKebabCaseArray(requests: AddToCartRequest[]): any[] {
    return requests.map(request => ({
        "shirt-id": request.shirtId,
        "quantity": request.quantity,
        "size": request.size
    }));
}

export const fetchConfirmOrder = async (accessToken: string, orderId: number, requests: AddToCartRequest[]) => {
    try {
        const requestBody = convertToKebabCaseArray(requests);

        const response = await customFetch({
            options: {
                method: 'POST'
            },
            endpointPath: `/orders/${orderId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: requestBody
        });

        return response;
    } catch (error) {
        console.error(`Error in fetchConfirmOrder: ${error}`);
        return null;
    }
};

export const fetchAllOrders = async (page: number, startDate: string, endDate: string) => {
    let url = `/Orders?pageNumber=${page}&pageSize=10&sortColumn=created-date&orderByDesc=true`;
    if (startDate != "") {
        url += `&startDate=${startDate}`;
    }
    if (endDate != "") {
        url += `&endDate=${endDate}`;
    }
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'GET',
            },
            endpointPath: url,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching all orders: ${error}`);
        return null;
    }
};

export const fetchOrder = async (id: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'GET',
            },
            endpointPath: `/Orders/${id}`,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching order: ${error}`);
        return null;
    }
};

export const cancelOrder = async (id: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'PATCH',
            },
            endpointPath: `/Orders/${id}`,
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
        });

        return response;

    } catch (error) {
        console.error(`Error cancel order: ${error}`);
        return null;
    }
};

export const clubOrderReport = async (clubId: number, start: string, end: string) =>{
    let url = `/Orders/club-order-report?`;
    if (clubId != 0) {
        url += `&clubId=${clubId}`;
    }
    if (start != "") {
        url += `&startDate=${start}`;
    }
    if (end != "") {
        url += `&endDate=${end}`;
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
        console.error(`Error: ${error}`);
        return null;
    }
}