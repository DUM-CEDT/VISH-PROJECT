'use client'

import styles from './page.module.css'
import Button1 from '@/components/button/Button1'
import Image from 'next/image'
import { redirect } from 'next/navigation'
export default function Successful () {
    return (
        <div className={styles['wrapper']}>
                <Image
                    src="/star_5.png"
                    alt="star"
                    layout="intrinsic"
                    width={10000}
                    height={10000}
                    className='absolute w-[120vw] z-0 opacity-[100%]'
                />
                <Image
                    src="/Check.png"
                    alt="star"
                    layout="intrinsic"
                    width={1000}
                    height={1000}
                    className=' w-[160px] h-[160px] z-1 opacity-[100%]'
                />
                <div className='flex items-center justify-center flex-col gap-[8px]'>
                    <h1>ยินดีด้วย ชำระเงินสำเร็จแล้ว</h1>
                    <h2>กรุณารอสินค้าภายใน 3 - 7 วัน</h2>
                </div>
                <div className='mt-[32px] z-[2]'>
                    <Button1 onClick={() => redirect('/')} minWidth='260px' size={24} text='กลับหน้าหลัก' ></Button1>
                </div>

        </div>
    )
}

