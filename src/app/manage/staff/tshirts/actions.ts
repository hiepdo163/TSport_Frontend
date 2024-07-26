'use server';
import { fetchCreateShirt } from '@/app/service/shirt_service';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createShirt(formData: FormData) {

    const supabase = createClient();
    const accessToken = (await supabase.auth.getSession()).data.session?.access_token || '';

    const imageFile = formData.get('Images') as File;
    const code = formData.get('Code') as string;
    const name = formData.get('Name') as string;
    const description = formData.get('Description') as string;
    // Assuming 'Quantity' is the name attribute of the input field
    const quantityString = formData.get('Quantity') as string; // Get the value as string
    const quantity = quantityString ? parseInt(quantityString, 10) : 0; // Convert to number
    const shirtEditionId = formData.get('ShirtEditionId') as string ? parseInt(formData.get('ShirtEditionId') as string, 10) : 0;
    const seasonPlayerId = formData.get('SeasonPlayerId') as string ? parseInt(formData.get('SeasonPlayerId') as string, 10) : 0;

    console.log({ imageFile });


    const response = await fetchCreateShirt({ imageFile, code, name, description, quantity, shirtEditionId, seasonPlayerId }, accessToken);

    if (response?.status === 200) {
        // Handle success
        revalidatePath('/', 'layout');
        redirect("/manage/staff/tshirts");
    }
}