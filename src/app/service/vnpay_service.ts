import { customFetch } from "@/utils/fetch/customFetch";
import { createClient } from "@/utils/supabase/client";

export const createPaymentUrl = async (amount: number, customer: number) => {
    try {
        const supabase = createClient();
        const accessToken = (await supabase.auth.getSession()).data.session?.access_token;
        const response = await customFetch({
            options: {
                'method': 'POST',
            },
            endpointPath: '/VnPay/create-payment-url',
            headers: {
                'Content-Type': 'application/json-patch+json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: {
                "order-type": "string",
                "amount": amount,
                "order-description": customer,
                "name": "string",
                "account-id": 0
            },
        });

        const data = await response.json();
        return data;
        console.log(response);


    } catch (error) {
        console.error(`Error : ${error}`);
        return null;
    }
};