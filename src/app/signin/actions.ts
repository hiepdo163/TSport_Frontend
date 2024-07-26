'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { customFetch } from '@/utils/fetch/customFetch'
import { fetchWhoAmI } from '../service/auth_service'

export async function signin(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error')
  }

  const accessToken = (await supabase.auth.getSession()).data.session?.access_token;

  const account : BasicAccount = await fetchWhoAmI(accessToken ?? '');

  let redirectUrl = account.role === 'Customer' ? '/' : '/manage/staff/tshirts';

  revalidatePath('/', 'layout')
  redirect(redirectUrl);
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const signUpData = {
    email: email,
    password: password,
    options: {
      data: {
        role: 'Customer'
      }
    }
  }

  const { data, error } = await supabase.auth.signUp(signUpData);



  if (error) {
    redirect('/error')
  }

  console.log(`User after signup:`);
  console.log({ data });


  const response = await customFetch({
    endpointPath: '/auth/register',
    baseUrl: 'http://localhost:7091/api',
    body: {
      email: email,
      password: password,
      role: 'Customer',
      'supabase-id': data.user?.id
    },
    options: {
      method: 'POST'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  });

  console.log(`Response from /api/auth/register:`);
  console.log({ response });


  if (!response.ok) {
    redirect('/error');
  }


  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signout() {
  const supabase = createClient();

  await supabase.auth.signOut();



  revalidatePath('/', 'layout');
  redirect('/');
}