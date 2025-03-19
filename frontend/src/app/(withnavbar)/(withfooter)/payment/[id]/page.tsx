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
import getMerchById from '@/app/libs/getMerchById'
import getMe from '@/app/libs/getMe'
import addMerchTrans from '@/app/libs/addMerchTrans'
// import { useEffect, useState } from 'react' 

export default function Yan_ID () {
    const params = useParams();
    
    let anyObject : any = {}
    let anyArray : any = []
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
    const [merch, setMerch] = useState(anyObject)
    const [transactionParams, setTransactionParams] = useState(anyArray)
    const [user, setUser] = useState(anyObject)

    const submitForm = async () => {
        if (cnt < 1 || firtstAddress == '' || tambon == '' || ampoe == '' || province == '' || postalCode == '' || tel == '')
            return
        console.log(transactionParams)
        console.log(user._id)
        let merch_prop : any = []

        for (let i = 0 ; i < transactionParams.length ; i += 2) {
            merch_prop.push({
                type : transactionParams[i],
                selected_option : transactionParams[i +1]
            })
        }
        let postData : any = {
            merch_id : merch._id,
            user_id : user._id,
            quantity : cnt,
            selected_merch_prop : merch_prop,
            tel : tel,
            address : firtstAddress + secondAddress + tambon + ampoe + province + postalCode
        }
        console.log(session)
        console.log(postData)
        const res = await addMerchTrans(postData,  session.user.token)
        console.log(res)



        // redirect('/successful')
    }

    useEffect(() => {

        const loadSession  = async () => {
            const thisSession = await getSession()
            setSession(thisSession)
            let token : any = thisSession?.user?.token
            const thisUser = await getMe(token)
            setUser(thisUser.data)
        }

        const getMerch  = async () => {

            let { id } = params as { id: string }
            id = decodeURIComponent(id)
            console.log(id)
            let param_list = id.split('-')

            const thisMerch = await getMerchById(param_list[0])
            setMerch(thisMerch.item)
            setTransactionParams(param_list.slice(1))
            setClearURL(id)

        }
        loadSession()
        getMerch()
        

    },[])

    if (clearURL != ''){

        if (merch.name == 'ยันต์' && transactionParams.length == 4) {
            let newArray = ['layer1', transactionParams[0], 'layer2', transactionParams[1], 'layer3', transactionParams[2], 'layer4', transactionParams[3]]
            setTransactionParams(newArray)
        }

    }

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
                <h1>ระบุจำนวน{merch.name} และ เลือกที่อยู่ในการจัดส่ง</h1>
                <div className={styles['bottom-wrapper']}>
                    <div className={styles['left-form']}>
                        <div className='w-[100%]'>
                            <div className='flex items-end'><h3>ระบุจำนวน{merch.name}ที่ต้องการ</h3><h5 className='text-[#EEBB7E]'>*</h5></div>
                            <input min="1" value={cnt} onChange={(e) => setCnt(Number(e.target.value))} type="number" name='cnt' />
                            <h4 className='font-light '>
                                ราคา 1 หน่วยอยู่ที่ {merch.price} บาท
                            </h4>
                        </div>

                        <div className='w-[100%]'>
                            <div className='flex align-center justify-between'>
                                <h3>จำนวนยันต์ทั้งหมด</h3>
                                <h3>{cnt} หน่วย</h3>
                            </div>
                            <div className='flex align-center justify-between'>
                                <h3>รวมค่า{merch.name}ทั้งหมด</h3>
                                <h3>{merch.price * cnt} บาท</h3>
                            </div>
                            <div className='flex align-center justify-between'>
                                <h3>ค่าจัดส่ง</h3>
                                <h3>{shippingCost} บาท</h3>
                            </div>

                        </div>
                        <div className='w-[100%] flex align-center justify-between'>
                            <h2>รวมทั้งสิ้น</h2>
                            <h2>{merch.price * cnt + shippingCost} บาท</h2>
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