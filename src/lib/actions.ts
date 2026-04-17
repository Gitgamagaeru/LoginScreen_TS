'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

// メール・パスワードによるログイン処理
export async function loginWithCredentials(formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          redirect('/login?error=CredentialsSignin');
        default:
          redirect('/login?error=Default');
      }
    }
    throw error;
  }
}

// Googleによるソーシャルログイン処理
export async function loginWithGoogle() {
  await signIn('google');
}

// GitHubによるソーシャルログイン処理
export async function loginWithGithub() {
  await signIn('github');
}

// ログアウト処理
export async function handleSignOut() {
  await signOut();
}
