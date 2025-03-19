'use client'

import { redirect } from 'next/navigation'
import styles from './page.module.css'
import Image from 'next/image'
export default function Footer () {
    return (
        <div className={styles['wrapper']}>
            <div className={styles['nav']}>
                <h2 onClick={() => {redirect('/yan_mode_select')}}>ยันต์</h2>
                <h2 onClick={() => {redirect('/vish')}}>ขอพร</h2>
                <h2 onClick={() => {redirect('/merchandise')}}>ร้านค้า</h2>
                <h2 onClick={() => {redirect('/aboutus')}}>เกี่ยวกับเรา</h2>
            </div>
            <Image
                src='/vish_black.png'
                height={25}
                width={130}
                alt=''
            ></Image>
            <div className='mt-[4px] flex gap-[8px] items-center mb-[16px]'>
                <h3>Submitted in</h3>
                <h3 style={{letterSpacing : '2px'}}>10 DAY CHALLENGE 2025 BY</h3>
                <Image
                    src='/thinc.png'
                    width={1000}
                    height={1000}
                    alt=''
                    style={{width : '25px',height : '36px'}}
                    onClick={() => window.open('https://thinc.in.th/')}
                ></Image>
            </div>
            <div className={styles['line']}></div>
            <h4>Copyright © 2025 | VISH-PROJECT. All rights reserved.</h4>
        </div>
    )
}