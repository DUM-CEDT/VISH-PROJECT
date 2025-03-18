'use client'

import LessSign from '@/components/svg/LessSign'
import styles from './page.module.css'
import Button1 from '@/components/button/Button1'
import ChoiceQuiz from '@/components/button/ChoiceQuiz'
import getAllYanImage from '@/app/libs/getAllYanImage'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import YanSelection from '@/components/button/YanSelection/YanSelection'
// import { useEffect, useState } from 'react' 

export default function Yan () {
   
    const [allYanImage, setAllYanImage] = useState({success : false, data :[]})
    const [stateImage, setStateImage] = useState(new Array(4).fill(null))

    useEffect(() => {
        const x = async () => {
            const fetchingData = await getAllYanImage()
            setAllYanImage(fetchingData)
        }
        x()
    },[])

    return (
        <div className={styles['wrapper']}>
                <Image
                    src="/star_5.png"
                    alt="star"
                    layout="intrinsic"
                    width={1000}
                    height={1000}
                    className='absolute w-[120vw] z-0 opacity-[100%]'
                />
            {(!allYanImage.success) && (
                <h1 className='z-1'>กำลังดาวน์โหลด...</h1>
            )}
            {(allYanImage.success) && (
                <div className={styles['content-wrapper']}>
                    <div className={styles['left-side-wrapper']}>
                        <div className={styles['yan-scope']}>
                            <div className={styles['yan-boarder']}>
                                <div id='yan-background' className={styles['yan-background']}>
                                    <div style={{backgroundColor : 'aqua'}} className={styles['yan-inner-first']}>
                                        <div style={{backgroundColor : 'black'}} className={styles['yan-inner'] + " z-2"}>
                                            <div style={{backgroundColor : 'green'}} className={styles['yan-inner'] + " z-3"}>
                                                <div style={{backgroundColor : 'pink'}} className={styles['yan-inner'] + " z-4"}>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className={styles['bottom-button-wrapper']}>
                            <Button1 minWidth={'150px'} icon='Download' front={true} text='เสร็จสิ้น'></Button1>
                            <Button1 minWidth={'150px'} icon='Share' text='แชร์'></Button1>
                        </div>
                    </div>

                    <div className={styles['button-wrapper']}>
                        <div className={styles['button-wrapper-inner']}>
                            <YanSelection rightButtonClick={() => {console.log(999)}} leftButtonClick={() => {console.log(123)}} layer={1} innerText='ลายเสือสมิง' description='ความรัก'></YanSelection>
                            <YanSelection rightButtonClick={() => {console.log(999)}} leftButtonClick={() => {console.log(123)}} layer={2} innerText='ลายเสือสมิง' description='ความรัก'></YanSelection>
                            <YanSelection rightButtonClick={() => {console.log(999)}} leftButtonClick={() => {console.log(123)}} layer={3} innerText='ลายเสือสมิง' description='ความรัก'></YanSelection>
                            <YanSelection rightButtonClick={() => {console.log(999)}} leftButtonClick={() => {console.log(123)}} layer={4} innerText='ลายเสือสมิง' description='ความรัก'></YanSelection>
                        </div>
                    </div>
                </div>

            )}
            
        </div>
    )
    

}