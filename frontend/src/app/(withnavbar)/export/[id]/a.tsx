'use client'

import LessSign from '@/components/svg/LessSign'
import styles from './page.module.css'
import Button1 from '@/components/button/Button1'
import Button2 from '@/components/button/Button2'
import ChoiceQuiz from '@/components/button/ChoiceQuiz'
import getAllYanImage from '@/app/libs/getAllYanImage'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import YanSelection from '@/components/button/YanSelection/YanSelection'
// import { useEffect, useState } from 'react' 

export default function YanExport () {
   
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
                                <Image
                                    src='/Yan_Frame.png'
                                    width={387}
                                    height={9999}
                                    alt=''
                                    style={{marginBottom : '9px', marginRight : '1px', position : 'absolute', zIndex : 6}}
                                    className=''
                                />
                                
                                <div id='yan-background' className={styles['yan-background'] + " z-0"}>
                                    <div style={{backgroundColor : 'aqua'}} className={styles['yan-inner-first'] + " z-2"}>
                                        <div style={{backgroundColor : 'black'}} className={styles['yan-inner'] + " z-3"}>
                                            <div style={{backgroundColor : 'green'}} className={styles['yan-inner'] + " z-4"}>
                                                <div style={{backgroundColor : 'pink'}} className={styles['yan-inner'] + " z-5"}>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className={styles['bottom-button-wrapper']}>
                            <Button1 size={24} minWidth={'388px'} icon='Download' front={true} text='สั่งซื้อยันต์ของคุณ'></Button1>
                        </div>
                    </div>

                    <div className={styles['button-wrapper']}>
                       <Button1 size={24} icon='Download' front={true} text='ดาวน์โหลด' minWidth={'240px'}></Button1>
                       <Button1 size={24} icon='Share' front={true} text='แชร์' minWidth={'240px'}></Button1>
                       <Button2 size={24} text='Custom ยันต์' minWidth={240}></Button2>
                    </div>
                </div>

            )}
            
        </div>
    )
    

}