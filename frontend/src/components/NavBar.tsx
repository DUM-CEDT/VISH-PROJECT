'use client'

import { getServerSession } from "next-auth";
import Link from "next/link";
import Vish from "./svg/Vish";
import ArrowForward from "./svg/ArrowForward";
import getUserProfile from "@/app/libs/getUserProfile";
import { authOptions } from "@/app/libs/authOptions";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

export default function NavBar() {
    const anyObject : (any | null) = null
    const [session, setSession] = useState(anyObject)
    
    useEffect(() => {
        const getUserSession = async () => {
            // const thisSession = await getServerSession(authOptions);
            const thisSession = await getSession()
            setSession(thisSession)
        }

        getUserSession()
    })

    // console.log("NavBar session:", session);
    // console.log("User profile:", userProfile);

    return (
        <nav className="h-[8vh] absolute top-0 left-0 z-[100] w-full flex justify-between items-center px-16 bg-primary text-white">
            <div>
                <Link href="/">
                    <Vish width={149} height={29} className="fill-white hover:fill-highlight1 transition-all duration-300 ease-in-out"/>
                </Link>
            </div>
            <ul className="flex space-x-16 font-light text-2xl">
                <li>
                    <Link href="/yan_mode_select" className="hover:text-highlight1">ยันต์</Link>
                </li>
                <li>
                    <Link href="/vish" className="hover:text-highlight1">ขอพร</Link>
                </li>
                <li>
                    <Link href="/merchandise" className="hover:text-highlight1">ร้านค้า</Link>
                </li>
                
                {session ? (
                    <>
                        <li>
                            <Link href="/profile" className="hover:text-highlight1">โปรไฟล์</Link>
                        </li>
                        {/* <li className="text-sm text-gray-300">ID: {userProfile?.data?._id ?? "N/A"}</li> */}
                    </>
                ) : (
                    <li className="group flex items-center space-x-2">
                        <Link href="/login" className="group-hover:text-highlight1">เริ่มต้น</Link>
                        <ArrowForward width="29" height="29" className="fill-white group-hover:fill-highlight1"/>
                    </li>
                )}
            </ul>
        </nav>
    );
}
