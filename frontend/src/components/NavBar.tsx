import { getServerSession } from "next-auth";
import Link from "next/link";
import Vish from "./svg/Vish";
import ArrowForward from "./svg/ArrowForward";
import getUserProfile from "@/app/libs/getUserProfile";
import { authOptions } from "@/app/libs/authOptions";

export default async function NavBar() {
    const session = await getServerSession(authOptions);

    let userProfile = null;
    if (session?.user?.token) {
        try {
        userProfile = await getUserProfile(session.user.token);
        } catch (error) {
        console.error("Failed to fetch user profile:", error);
        }
    }
    // console.log("NavBar session:", session);
    // console.log("User profile:", userProfile);

    return (
        <nav className="h-[8vh] absolute top-0 left-0 z-10 w-full flex justify-between items-center px-16 bg-primary text-white">
            <div>
                <Link href="/">
                    <Vish width={149} height={29} className="fill-white hover:fill-highlight1 transition-all duration-300 ease-in-out"/>
                </Link>
            </div>
            <ul className="flex space-x-16 font-light text-2xl">
                <li>
                    <Link href="/yan" className="hover:text-highlight1">ยันต์</Link>
                </li>
                <li>
                    <Link href="/services" className="hover:text-highlight1">ขอพร</Link>
                </li>
                <li>
                    <Link href="/merchandise" className="hover:text-highlight1">ร้านค้า</Link>
                </li>
                <li>
                    <Link href="/about" className="hover:text-highlight1">วิธีการใช้งาน</Link>
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
