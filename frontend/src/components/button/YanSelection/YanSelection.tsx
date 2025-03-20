import CustomYanButton from '../CustomYanButton'
import styles from './page.module.css'
import Image from 'next/image'

export default function YanSelection ({layer, innerText, description, leftButtonClick, rightButtonClick} : {layer : number, innerText : string, description : string, leftButtonClick : Function, rightButtonClick : Function}) {

    return (
        <div className={styles['yan-selection-wrapper']}>
            <div className='flex w-[100%] items-center justify-center'>
                <h1>ชั้นที่ {layer}</h1>
            </div>
            <div className={styles['center-wrapper']}>
                <div className='flex items-center'>
                    {/* <Image
                        src='/Left_Tri.png'
                        width={32}
                        height={32}
                        objectFit='cover'
                        alt=''
                    ></Image> */}
                    <CustomYanButton icon='ThickLeft' text='' size={32} onClick={() => leftButtonClick()}/>
                </div>
            
                <div className={styles['center-text-wrapper']}>
                    <h3>{innerText}</h3>
                </div>

                
                <div className='flex items-center'>
                    {/* <Image
                        src='/Right_Tri.png'
                        width={32}
                        height={32}
                        objectFit='cover'
                        alt=''
                    ></Image> */}
                    <CustomYanButton icon='ThickRight' text='' size={32} onClick={()=>rightButtonClick()}/>
                </div>

            </div>
            <div className='flex w-[100%] items-center justify-center'>
                {description != '' && (<h4>ยันต์ลายนี้เด่นในด้าน {description}</h4>)}
                {description == '' && (<h4 style={{color : 'transparent'}}>ยันต์ลายนี้เด่นในด้าน {description}</h4>)}
            </div>
            
        </div>
    )
}