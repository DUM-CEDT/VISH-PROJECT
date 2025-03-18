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
            console.log(fetchingData)
            setAllYanImage(fetchingData)
        }
        x()
    },[])

    let img_test0
    let img_test1
    let img_test2
    let img_test3
    if (allYanImage.success) {
        img_test0 = (allYanImage['data'][0][2]['yan_image_base64'])
        img_test1 = (allYanImage['data'][1][1]['yan_image_base64'])
        img_test2 = (allYanImage['data'][2][3]['yan_image_base64'])
        img_test3 = (allYanImage['data'][3][8]['yan_image_base64'])
    }

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
                                    {/* <div style={{backgroundColor : 'aqua'}} className={styles['yan-inner-first']}>
                                        <div style={{backgroundColor : 'black'}} className={styles['yan-inner'] + " z-2"}>
                                            <div style={{backgroundColor : 'green'}} className={styles['yan-inner'] + " z-3"}>
                                                <div style={{backgroundColor : 'pink'}} className={styles['yan-inner'] + " z-4"}>

                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    <Image
                                        src={`data:image/jpeg;base64, ${img_test0}`}
                                        alt="star"
                                        layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />
                                    <Image
                                        src={`data:image/jpeg;base64, ${img_test1}`}
                                        alt="star"
                                        layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />
                                    <Image
                                        src={`data:image/jpeg;base64, ${img_test2}`}
                                        alt="star"
                                        layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />
                                    <Image
                                        src={`data:image/jpeg;base64, ${img_test3}`}
                                        alt="star"
                                        layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />
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