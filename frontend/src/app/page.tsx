'use server'
 
import { redirect } from 'next/navigation'
import Button1 from "@/components/button/Button1";
import Image from "next/image";

export default async function Home() {
  redirect('/homepage') // Navigate to the new post page
  return (
    <></>
  );
}