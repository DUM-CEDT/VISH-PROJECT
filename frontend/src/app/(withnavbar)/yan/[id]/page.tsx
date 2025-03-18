'use client'

import LessSign from '@/components/svg/LessSign'
import styles from './page.module.css'
import Button1 from '@/components/button/Button1'
import ChoiceQuiz from '@/components/button/ChoiceQuiz'
import getAllYanImage from '@/app/libs/getAllYanImage'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import YanSelection from '@/components/button/YanSelection/YanSelection'
import { redirect, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
// import { useEffect, useState } from 'react' 

export default function Yan_ID () {
    const params = useParams();
    
    const [allYanImage, setAllYanImage] = useState({success : false, data :[[]]})
    const [stateImage, setStateImage] = useState(new Array(4).fill(null))
    const [clearURL, setClearURL] = useState('')
    const [backgroundColor, setBackgroundColor] = useState('#112141')

    useEffect(() => {
        const x = async () => {
            const fetchingData = await getAllYanImage()
            console.log(fetchingData)
            setAllYanImage(fetchingData)
        }
        x()

        if (clearURL == '') {
            window.history.replaceState(null, "", `/yan`)
            const { id } = params as { id: string }
            console.log(id);
            setClearURL(id);
        }

    },[])

    if (allYanImage.success && clearURL != 'null') {
        
        let param_index = clearURL.split('-')
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

        setClearURL('null')
        setBackgroundColor ('#' + param_index[4]);
        setStateImage(imageState);
        
        
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

                str += '-'
        }
        str += backgroundColor.slice(1)
        return str
    }

    const genID = () => {
        let str = ''
        for (let i = 0 ; i < 4 ; i++) {
            if (stateImage[i] != null)
                str += ( allYanImage['data'][i][stateImage[i]]['yan_template_image_set_id'])
            else
                str += 'null'

                str += '-'
        }
        str += backgroundColor.slice(1)
        return str
    }

    const handleTextInputChange = (e : any) => {
        let txt = e.target.value 
        const s = new Option().style;
        s.color = txt;
        if (s.color !== '')
            setBackgroundColor(txt)
        else
            return
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
                                <div id='yan-background' style={{backgroundColor : `${backgroundColor}`}} className={styles['yan-background']}>
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
                                        // layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />)}
                                    
                                    {allYanImage['data'][1][stateImage[1]] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${allYanImage['data'][1][stateImage[1]]['yan_image_base64']}`}
                                        alt=""
                                        // layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />)}

                                    {allYanImage['data'][2][stateImage[2]] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${allYanImage['data'][2][stateImage[2]]['yan_image_base64']}`}
                                        alt=""
                                        // layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />)}

                                    {allYanImage['data'][3][stateImage[3]] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${allYanImage['data'][3][stateImage[3]]['yan_image_base64']}`}
                                        alt=""
                                        // layout="intrinsic"
                                        width={10000}
                                        height={10000}
                                        className='absolute w-[364px] z-0 opacity-[100%]'
                                    />)}
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className={styles['bottom-button-wrapper']}>
                            <Button1 onClick={() => {redirect(`/export/` + genID())}} minWidth={'150px'} icon='Download' front={true} text='เสร็จสิ้น'></Button1>
                            <Button1 onClick={() => {console.log(navigator.clipboard.writeText(genURL()))}} minWidth={'150px'} icon='Share' text='คัดลองลิงก์'></Button1>
                        </div>
                    </div>

                    <div className={styles['button-wrapper']}>
                        <div className={styles['button-wrapper-inner']}>
                            <YanSelection rightButtonClick={() => {handleClick('inc', 0)}} leftButtonClick={() => {handleClick('dec', 0)}} layer={1} innerText={getInnerText(0)} description={getCategory(0)}></YanSelection>
                            <YanSelection rightButtonClick={() => {handleClick('inc', 1)}} leftButtonClick={() => {handleClick('dec', 1)}} layer={2} innerText={getInnerText(1)} description={getCategory(1)}></YanSelection>
                            <YanSelection rightButtonClick={() => {handleClick('inc', 2)}} leftButtonClick={() => {handleClick('dec', 2)}} layer={3} innerText={getInnerText(2)} description={getCategory(2)}></YanSelection>
                            <YanSelection rightButtonClick={() => {handleClick('inc', 3)}} leftButtonClick={() => {handleClick('dec', 3)}} layer={4} innerText={getInnerText(3)} description={getCategory(3)}></YanSelection>
                            <div className={styles['color-wrapper']}>
                                <div onClick={() => setBackgroundColor('#EB463C')} style={{backgroundColor : '#EB463C'}} className={styles['circle']}></div>
                                <div onClick={() => setBackgroundColor('#E07CAE')} style={{backgroundColor : '#E07CAE'}} className={styles['circle']}></div>
                                <div onClick={() => setBackgroundColor('#8D4BF6')} style={{backgroundColor : '#8D4BF6'}} className={styles['circle']}></div>
                                
                                <div className='flex items-center justify-center'>
                                    <input onChange={(e) => setBackgroundColor(e.target.value)} style={{opacity : 0, backgroundColor : 'transparent', zIndex : 10, width : '48px', height : '48px'}} type="color" name="" id="" />
                                    <Image
                                        src='/dropper.png'
                                        width={10000}
                                        height={10000}
                                        alt=''
                                        style={{position : 'absolute', height : '48px', width : '48px'}}
                                    />
                                </div>
                                
                                <input onChange={(e) => {handleTextInputChange(e)}} type="text" placeholder='#FFFFFF' maxLength={7}/>
                            </div>
                        </div>
                    </div>
                </div>

            )}
            
        </div>
    )
    

}