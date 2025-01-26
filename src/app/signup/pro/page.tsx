import { redirect } from 'next/navigation';

export default async function ProSignupPage() {
  redirect('/signup?tier=pro');
} 