'use server';
import { redirect } from 'next/navigation'
import { fetchAddToCart } from "../service/order_service";

export async function addToCart(formData: FormData) {
    const productIdString = formData.get('shirtId');
    const quantityString = formData.get('quantity');
    const size = formData.get('size') as string;

    // Convert to number. You might want to handle potential `null` values and conversion failures.
    const productId = productIdString ? parseInt(productIdString as string, 10) : null;
    const quantity = quantityString ? parseInt(quantityString as string, 10) : null;

    // Check if conversion was successful (you could also check for NaN with isNaN())
    if (productId === null || quantity === null) {
        throw new Error('Invalid product ID or quantity');
    }

    //Call add to cart here
    const response = await fetchAddToCart({ shirtId: productId, quantity, size });

    if (response?.status === 200) {
        // Handle success
        redirect("/");
    }

}