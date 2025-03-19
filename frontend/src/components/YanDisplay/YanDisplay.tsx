import styles from './page.module.css'
import Image from 'next/image'

export default function YanDisplay ({layer, backgroundColor, yanWidth, borderWidth} : {layer : (string | null)[], backgroundColor : string, yanWidth : number, borderWidth : number}) {
        
    return (
        <div className={styles['content-wrapper']}>
                    <div className={styles['left-side-wrapper']}>
                        <div style={{width: `${yanWidth * 100 / 70}px`}} className={styles['yan-scope']}>
                            <div className={styles['yan-boarder']}>
                                

                            <Image

                                    src='/Yan_New_Frame.png'
                                    width={borderWidth}
                                    height={9999}
                                    alt=''
                                    style={{position : 'absolute', zIndex : 999}}
                                    className=''
                                />

                                <div id='yan-background' style={{backgroundColor : `${backgroundColor}`}} className={styles['yan-background']}>
                                    
                                    {layer[0] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${layer[0]}`}
                                        alt=""
                                        width={yanWidth}
                                        height={yanWidth * 43 / 29}
                                        className={`absolute w-[${yanWidth}px] z-0 opacity-[100%]`}
                                    />)}
                                    
                                    {layer[1] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${layer[1]}`}
                                        alt=""
                                        width={yanWidth}
                                        height={yanWidth * 43 / 29}
                                        className={`absolute w-[${yanWidth}px] z-0 opacity-[100%]`}
                                    />)}

                                    {layer[2] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${layer[2]}`}
                                        alt=""
                                        width={yanWidth}
                                        height={yanWidth * 43 / 29}
                                        className={`absolute w-[${yanWidth}px] z-0 opacity-[100%]`}
                                    />)}

                                    {layer[3] != null && (
                                    <Image
                                        src={`data:image/jpeg;base64, ${layer[3]}`}
                                        alt=""
                                        width={yanWidth}
                                        height={yanWidth * 43 / 29}
                                        className={`absolute w-[${yanWidth}px] z-0 opacity-[100%]`}
                                    />)}
                                </div>
                            </div>
                            
                            
                        </div>
                        
                    </div>

                 
                </div>
    )
}