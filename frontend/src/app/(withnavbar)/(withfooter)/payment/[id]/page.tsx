'use client'

import styles from './page.module.css'
import Button1 from '@/components/button/Button1'
import getAllYanImage from '@/app/libs/getAllYanImage'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import YanSelection from '@/components/button/YanSelection/YanSelection'
import { redirect, useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import { getSession } from 'next-auth/react'
import createYanTemplate from '@/app/libs/createYanTemplate'
import addYanTemplateToUser from '@/app/libs/addYanTemplateToUser'
// import { useEffect, useState } from 'react' 

export default function Yan_ID () {
    const params = useParams();
    
    let anyObject : any = {}
    const [clearURL, setClearURL] = useState('')
    const [session , setSession] = useState(anyObject)
    const [cnt, setCnt] = useState(1)
    const [firtstAddress, setFirstAddress] = useState('')
    const [secondAddress, setSecondAddress] = useState('')
    const [tambon, setTambon] = useState('')
    const [ampoe, setAmpoe] = useState('')
    const [province, setProvince] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [tel, setTel] = useState('')
    const [shippingCost, setShippingCost] = useState(100)

    const submitForm = () => {
        if (cnt < 1 || firtstAddress == '' || tambon == '' || ampoe == '' || province == '' || postalCode == '' || tel == '')
            return
        redirect('/successful')
    }

    useEffect(() => {

        const loadSession  = async () => {
            const thisSession = await getSession()
            setSession(thisSession)
        }
        loadSession()

        if (clearURL == '') {
            // window.history.replaceState(null, "", `/payment` )
            const { id } = params as { id: string }
            setClearURL(decodeURIComponent(id));
        }

    },[])


    return (
        <div className={styles['wrapper']}>
                <Image
                    src="/star_5.png"
                    alt="star"
                    layout="intrinsic"
                    width={10000}
                    height={10000}
                    className='absolute w-[120vw] z-0 opacity-[100%]'
                />
            {(clearURL == '') && (
                <h1 className='z-1'></h1>
            )}
            {(clearURL != '') && (
            <div className={styles['content-wrapper']}>
                <h1>ระบุจำนวน{clearURL.split('-')[0]} และ เลือกที่อยู่ในการจัดส่ง</h1>
                <div className={styles['bottom-wrapper']}>
                    <div className={styles['left-form']}>
                        <div className='w-[100%]'>
                            <div className='flex items-end'><h3>ระบุจำนวน{clearURL.split('-')[0]}ที่ต้องการ</h3><h5 className='text-[#EEBB7E]'>*</h5></div>
                            <input min="1" value={cnt} onChange={(e) => setCnt(Number(e.target.value))} type="number" name='cnt' />
                            <h4 className='font-light '>
                                ราคา 1 หน่วยอยู่ที่ {parseInt(clearURL.split('-')[1])} บาท
                            </h4>
                        </div>

                        <div className='w-[100%]'>
                            <div className='flex align-center justify-between'>
                                <h3>จำนวนยันต์ทั้งหมด</h3>
                                <h3>{cnt} หน่วย</h3>
                            </div>
                            <div className='flex align-center justify-between'>
                                <h3>รวมค่า{clearURL.split('-')[0]}ทั้งหมด</h3>
                                <h3>{parseInt(clearURL.split('-')[1]) * cnt} บาท</h3>
                            </div>
                            <div className='flex align-center justify-between'>
                                <h3>ค่าจัดส่ง</h3>
                                <h3>{shippingCost} บาท</h3>
                            </div>

                        </div>
                        <div className='w-[100%] flex align-center justify-between'>
                            <h2>รวมทั้งสิ้น</h2>
                            <h2>{parseInt(clearURL.split('-')[1]) * cnt + shippingCost} บาท</h2>
                        </div>

                        <div>
                        </div>
                    </div>
                   
                    <div className={styles.line}></div>
                    <div className={styles['right-form']}>

                         <div className='w-[100%]'>
                            <div className='flex items-end'><h3>ที่อยู่บรรทัดแรก</h3><h5 className='text-[#EEBB7E]'>*</h5></div>
                            <input required type="text" onChange={(e) => {setFirstAddress(e.target.value)}} value={firtstAddress} />
                        </div>

                        <div className='w-[100%]'>
                            <h3>ที่อยู่บรรทัดที่ 2</h3>
                            <input onChange={(e) => {setSecondAddress(e.target.value)}} value={secondAddress} type="text" />
                        </div>

                        <div className='flex gap-[16px]'>
                            <div className='w-[100%]'>
                                <div className='flex items-end'><h3>ตำบล/แขวง</h3><h5 className='text-[#EEBB7E]'>*</h5></div>
                                <input onChange={(e) => {setTambon(e.target.value)}} value={tambon} required type="text" />
                            </div>

                            <div className='w-[100%]'>
                                <div className='flex items-end'><h3>อำเภอ/เขต</h3><h5 className='text-[#EEBB7E]'>*</h5></div>
                                <input onChange={(e) => {setAmpoe(e.target.value)}} value={ampoe} type="text" />
                            </div>
                        </div>

                        <div className='flex gap-[16px]'>
                            <div className='w-[100%]'>
                                <div className='flex items-end'><h3>จังหวัด</h3><h5 className='text-[#EEBB7E]'>*</h5></div>
                                <input onChange={(e) => {setProvince(e.target.value)}} value={province} required type="text" />
                            </div>

                            <div className='w-[100%]'>
                                <div className='flex items-end'><h3>รหัสไปรษณีย์</h3><h5 className='text-[#EEBB7E]'>*</h5></div>
                                <input onChange={(e) => {setPostalCode(e.target.value)}} value={postalCode} required type="text" />
                            </div>
                        </div>

                        <div className='w-[100%] mb-[32px]'>
                            <div className='flex items-end'><h3>หมายเลขโทรศัพท์</h3><h5 className='text-[#EEBB7E]'>*</h5></div>
                                <input onChange={(e) => {setTel(e.target.value)}} value={tel} required type='tel' />
                        </div>
                        <Button1 onClick={() => {submitForm()}} size={24} text='เสร็จสิ้น'></Button1>
                       

                    </div>


                </div>
            </div>
            )}
        </div>
    )
    

}