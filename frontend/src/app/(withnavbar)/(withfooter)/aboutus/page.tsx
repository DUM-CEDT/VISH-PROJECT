'use client'

import Image from 'next/image'
import styles from './page.module.css'

export default function AboutUs () {
   

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
        <div className='flex w-[868px] flex-col items-center justify-center gap-[42px]'>
            <Image
                src="/Vish.png"
                alt=""
                layout="intrinsic"
                width={1000}
                height={1000}
                style={{width : '356px', height:'70px'}}
            />
            <h2 className='mt-[40px]'>VISH PROJECT เป็นเว็บไซต์ให้ความช่วยเหลือนิสิตที่ได้รับผลกระทบจากความเครียด ความกังวลในด้านต่าง ๆ ไม่ว่าจะเป็นด้านการเรียน การงาน การเงิน หรือความรัก ผ่านการให้นิสิตออกแบบและทำแบบทดสอบ เพื่อคัดเลือกยันต์ที่เหมาะกับตัวเอง เอาไว้ปกป้องในชีวิตประจำวัน เว็บไซต์ยังมอบฟีเจอร์ในการขอพรร่วมกับเพื่อน ๆ ในเว็บไซต์ได้อีกด้วย รวมทั้งยังมีร้านค้าให้เลือกซื้อสินค้าศักดิ์สิทธิ์ต่าง ๆ </h2>
            <h2>ชื่อของเว็บไซต์มาจากชื่อของ “พระวิษณุกรรม” หรือ “Vishvakarma” ในภาษาอังกฤษ ซึ่งเป็น สิ่งศักดิ์สิทธิ์ของนิสิตคณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย และยังพ้องเสียง กับคำว่า “Wish” ในภาษาอังกฤษที่แปลว่า “ความปรารถนา” อีกด้วย</h2>
            <h2>VISH PROJECT เป็นเว็บไซต์ที่ถูกพัฒนาเพื่อเป็นส่วนหนึ่งของงาน 10 Day Challenge 2025 โดยชมรม Thinc. คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย โดยนิสิต 6 คน จากภาควิชาวิศวกรรมคอมพิวเตอร์ คณะวิศวกรรมศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย</h2>
        </div>
        </div>
    )

}