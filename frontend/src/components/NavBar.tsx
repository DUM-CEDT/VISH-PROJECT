import Link from 'next/link';
import Vish from './svg/Vish';
import ArrowForward from './svg/ArrowForward';

export default function NavBar() {

    return (
        <nav className="h-[8vh] top-0 left-0 z-10 w-full flex justify-between items-center px-16 bg-primary text-white">
            <div>
                <Link href="/">
                    <Vish width='149' height='29'/>
                </Link>
            </div>
            <ul className="flex space-x-16 font-light text-2xl">
                <li>
                    <Link href="/" className="hover:text-gray-400 ">ยันต์</Link>
                </li>
                <li>
                    <Link href="/services" className="hover:text-highlight1 ">ขอพร</Link>
                </li>
                <li>
                    <Link href="/portfolio" className="hover:text-highlight2 ">ร้านค้า</Link>
                </li><li>
                    <Link href="/about" className="hover:text-gray-400 ">วิธีการใช้งาน</Link>
                </li>
                <li className='group flex items-center space-x-2'>
                    <Link href="/contact" className='group-hover:text-gray-400'>เริ่มต้น</Link>
                    <ArrowForward  width='29' height='29' className="fill-white group-hover:fill-gray-400"/>
                </li>
                {/* <li>
                    <Link href="/contact" className="hover:text-gray-400">โปรไฟล์</Link>
                </li> */}
            </ul>
        </nav>
    );
};