'use client'

import styles from './page.module.css'
import Button1 from '@/components/button/Button1'
import Button2 from '@/components/button/Button2'
import getAllYanImage from '@/app/libs/getAllYanImage'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { redirect, useParams } from 'next/navigation'
import YanDisplay from '@/components/YanDisplay/YanDisplay'
import downloadYan from '@/app/libs/createYanTemplate'
import { getSession, useSession } from 'next-auth/react'
import createYanTemplate from '@/app/libs/createYanTemplate'
import addYanTemplateToUser from '@/app/libs/addYanTemplateToUser'
import downloadYanWithoutSession from '@/app/libs/downloadYanWithoutSession'
import downloadYanWithSession from '@/app/libs/downloadYanWithSession'

export default function Yan_ID () {
    const BACKEND_URL = process.env.BACKEND_URL;
    const params = useParams();
    let anyObject : any = {}
    let empty : (null | string)[] = [null, null, null, null]
    
    const [allYanImage, setAllYanImage] = useState({success : false, data :[[]]})
    const [layerState, setLayerState] = useState(empty)
    const [category, setCategory] = useState({text : '', category_list : []})
    const [backgroundColor, setBackgroundColor] = useState('#112141')
    const [showYan, setShowYan] = useState(false)
    const [imageId, setImageId] = useState(empty)
    const [session , setSession] = useState(anyObject)

    
    useEffect(() => {
        const x = async () => {
            const fetchingData = await getAllYanImage()
            setAllYanImage(fetchingData)
        }
        x()

        const loadSession  = async () => {
            const thisSession = await getSession()
            setSession(thisSession)
        }
        loadSession()
    },[])

    if (allYanImage.success && showYan == false) {
        const { id } = params as { id: string }
        let param_index = id.split('-')

        var imageState : (string | null)[] = [null,null,null,null]
        var indexState : (number | null)[] = [null,null,null,null]
        for (let i = 0 ; i < 4 ; i++) {
            let x = parseInt(param_index[i])
            if(!isNaN(x))
                indexState[i] = x
        }

        let newCategory = {text : '', category_list : []}
        let newImageId : (null | string)[] = []
        for (let i = 0 ; i < 4 ; i++) {
            if (indexState[i] != null) {
                for (let j = 0 ; j < allYanImage['data'][i].length ; j++) {
                    if (allYanImage['data'][i][j]['yan_template_image_set_id'] == indexState[i]) {
                        imageState[i] = allYanImage['data'][i][j]['yan_image_base64']
                        newImageId.push(allYanImage['data'][i][j]['_id'])
                        if (!newCategory['category_list'].includes(allYanImage['data'][i][j]['yan_category'][0])) {
                            newCategory['category_list'].push(allYanImage['data'][i][j]['yan_category'][0])
                            newCategory['text'] += allYanImage['data'][i][j]['category'] + " | "
                        }
                    }
                }
            }
        }
        newCategory['text'] = newCategory['text'].slice(0, -2)
        setCategory(newCategory)
        setLayerState(imageState);
        setImageId(newImageId)
        setBackgroundColor ('#' + param_index[4]);
        setShowYan(true)
    }
    
    const handleDownload = async () => {
        const yanTemplate = await createYanTemplate(category['category_list'], backgroundColor, imageId)
        const yanTemplateId = yanTemplate.data._id
        let downloadYan
        if (session && session.user) {
            const saveYanToUser = await addYanTemplateToUser(session.user.token, yanTemplateId)            
        }

        window.open(`${BACKEND_URL}/api/yan/template/download_nosession/${yanTemplateId}`);
 
        
    }

    const genURL = () => {
        let str = window.location.href
        return str
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
            {(allYanImage.success && showYan) && (
                <div className='z-10 flex flex-col gap-[48px] w-[396px]'>
                    <YanDisplay
                         layer={layerState} backgroundColor={backgroundColor} yanWidth={364} borderWidth={396}
                    />
                    <Button1 front={true} icon='Buy' text='สั่งซื้อยันต์ของคุณ' size={24}/>
                </div>
               
            )}

            <div className='flex h-[100%] flex flex-col justify-center items-center gap-[24px] z-10'>
                
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='font-regular text-[24px]'>ยันต์นี้เด่นในด้าน</h1>
                    <h1 className='font-regular text-[28px]'>{category['text']}</h1>
                </div>

                <Button1 onClick={() => {handleDownload()}} minWidth='255px' front={true} icon='Download' text='ดาวน์โหลด' size={24}/>
                <Button1 onClick={() => navigator.clipboard.writeText(genURL())} minWidth='255px' front={true} icon='Share' text='แชร์' size={24}/>
                <Button2 onClick={() => { const { id } = params as { id: string }; window.open(window.location.origin + `/yan/${id}`)}} minWidth={255} text='Custom ยันต์' size={24}/>
            </div>
            
        </div>
    )
    

}