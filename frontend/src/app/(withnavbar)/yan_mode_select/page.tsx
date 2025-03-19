'use client'

import styles from './page.module.css'
import Image from 'next/image'
import LessSign from '@/components/svg/LessSign'
import Button1 from '@/components/button/Button1'
import { redirect } from 'next/navigation'

export default function FindYourSelf () {
   
    return (
        <div className={styles.wrapper}>
            <Image
              src="/star_5.png"
              alt="star"
              layout="intrinsic"
              width={1000}
              height={1000}
              className='absolute w-[120vw] z-0 opacity-[100%]'
            />
            <div className='flex mt-[24px]'>
                    <h2>ขั้นตอนที่ 1</h2>
                    <h2 className='ml-[16px] font-light'>ค้นหาตัวตนของคุณ</h2>
            </div>

            <Image
              src="/Yannnnn.png"
              alt="star"
              layout="intrinsic"
              width={480}
              height={480}
              className='z-1 opacity-[100%]'
            />

            <div className='flex mt-[24px]'>
                    <h3>มาหายันต์ที่เหมาะกับ Life Style ของคุณผ่านแบบทดสอบทั้ง 12 ที่ผ่านการเลือกสรรจากเรากัน</h3>
            </div>
            <div className='z-1'>
                <Button1
                onClick={() => redirect('/findyourself')}
                text='ทำแบบทดสอบ'
                icon='GreaterSign'
                size={24}
                ></Button1>

            </div>


            <div className='mt-[96px] z-1'>
            <Button1
            onClick={() => redirect('/yan')}
            text='Custom ยันต์ด้วยตัวเอง'
            icon='GreaterSign'
            size={24}
            ></Button1>
            </div>
        </div>


    )

}