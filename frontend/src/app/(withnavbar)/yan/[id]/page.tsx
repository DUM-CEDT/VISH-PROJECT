'use client'

import LessSign from '@/components/svg/LessSign'
import styles from './page.module.css'
import Button1 from '@/components/button/Button1'
import ChoiceQuiz from '@/components/button/ChoiceQuiz'
import getAllYanImage from '@/app/libs/getAllYanImage'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import YanSelection from '@/components/button/YanSelection/YanSelection'
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
// import { useEffect, useState } from 'react' 

export default function Yan () {
    const params = useParams();
    const [allYanImage, setAllYanImage] = useState({success : false, data :[[]]})
    const [stateImage, setStateImage] = useState(new Array(4).fill(null))
    const [clearURL, setClearURL] = useState(false)
    

    useEffect(() => {
        const x = async () => {
            const fetchingData = await getAllYanImage()
            console.log(fetchingData)
            setAllYanImage(fetchingData)
        }
        x()
        console.log(allYanImage)        
        
    },[clearURL])

    if (allYanImage.success && !clearURL) {
        const { id } = params as { id: string }
        let param_index = id.split('-')
        var imageState : (number | null)[] = [null,null,null,null]
        for (let i = 0 ; i < 4 ; i++) {
            let x = parseInt(param_index[i])
            if(!isNaN(x))
                imageState[i] = x
        }

        for (let i = 0 ; i < 4 ; i++) {
            if (imageState[i] != null) {
                console.log(allYanImage['data'][i])
                for (let j = 0 ; j < allYanImage['data'][i].length ; j++) {
                    if (allYanImage['data'][i][j]['yan_template_image_set_id'] == imageState[i])
                    imageState[i] = j
                }
            }
        }

        console.log(imageState)
        setClearURL(true)
        setStateImage(imageState)
        window.history.replaceState(null, "", `/yan`)
    }

    const handleClick = (mode : string , layer : number) => {
        let newStateImage = [...stateImage]
        let nowStateImageThisLayer = newStateImage[layer]
        if (mode == "inc") {
            if (newStateImage[layer] == null)
                newStateImage[layer] = 0
            else if (newStateImage[layer] == allYanImage['data'][layer].length - 1  )
                newStateImage[layer] = null
            else newStateImage[layer] = newStateImage[layer] + 1
        }
        else if (mode == "dec") {
            if (newStateImage[layer] == null)
                newStateImage[layer] = allYanImage['data'][layer].length - 1
            else if (newStateImage[layer] == 0)
                newStateImage[layer] = null
            else newStateImage[layer] = newStateImage[layer] - 1
        }
        console.log(newStateImage)
        setStateImage(newStateImage)

    }

    const getInnerText = (layer : number ) => {
        if (stateImage[layer] != null)
            return allYanImage['data'][layer][stateImage[layer]]['yan_set_name']
        else
            return ''
    }

    const getCategory = (layer : number ) => {
        if (stateImage[layer] != null)
            return allYanImage['data'][layer][stateImage[layer]]['category']
        else
            return ''
    }

    const genURL = () => {
        let str = window.location.origin + '/yan/'
        for (let i = 0 ; i < 4 ; i++) {
            if (stateImage[i] != null)
                str += ( allYanImage['data'][i][stateImage[i]]['yan_template_image_set_id'])
            else
                str += 'null'

            if (i != 3)
                str += '-'
        }
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
                                    {allYanImage['data'][0][stateImage[0]] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${allYanImage['data'][0][stateImage[0]]['yan_image_base64']}`}
                                        alt=""
                                        layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />)}
                                    
                                    {allYanImage['data'][1][stateImage[1]] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${allYanImage['data'][1][stateImage[1]]['yan_image_base64']}`}
                                        alt=""
                                        layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />)}

                                    {allYanImage['data'][2][stateImage[2]] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${allYanImage['data'][2][stateImage[2]]['yan_image_base64']}`}
                                        alt=""
                                        layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />)}

                                    {allYanImage['data'][3][stateImage[3]] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${allYanImage['data'][3][stateImage[3]]['yan_image_base64']}`}
                                        alt=""
                                        layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />)}
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className={styles['bottom-button-wrapper']}>
                            <Button1 minWidth={'150px'} icon='Download' front={true} text='เสร็จสิ้น'></Button1>
                            <Button1 onClick={() => {console.log(genURL())}} minWidth={'150px'} icon='Share' text='แชร์'></Button1>
                        </div>
                    </div>

                    <div className={styles['button-wrapper']}>
                        <div className={styles['button-wrapper-inner']}>
                            <YanSelection rightButtonClick={() => {handleClick('inc', 0)}} leftButtonClick={() => {handleClick('dec', 0)}} layer={1} innerText={getInnerText(0)} description={getCategory(0)}></YanSelection>
                            <YanSelection rightButtonClick={() => {handleClick('inc', 1)}} leftButtonClick={() => {handleClick('dec', 1)}} layer={2} innerText={getInnerText(1)} description={getCategory(1)}></YanSelection>
                            <YanSelection rightButtonClick={() => {handleClick('inc', 2)}} leftButtonClick={() => {handleClick('dec', 2)}} layer={3} innerText={getInnerText(2)} description={getCategory(2)}></YanSelection>
                            <YanSelection rightButtonClick={() => {handleClick('inc', 3)}} leftButtonClick={() => {handleClick('dec', 3)}} layer={4} innerText={getInnerText(3)} description={getCategory(3)}></YanSelection>
                        </div>
                    </div>
                </div>

            )}
            
        </div>
    )
    

}