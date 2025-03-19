'use client'

import LessSign from '@/components/svg/LessSign'
import styles from './page.module.css'
import Q from './question_data.json'
import Button1 from '@/components/button/Button1'
import ChoiceQuiz from '@/components/button/ChoiceQuiz'

import Image from 'next/image'
import { useEffect, useState } from 'react' 
import { redirect } from 'next/navigation'
import calculateYanLayer from '@/app/libs/calculateYanLayer'
import getAllYanImage from '@/app/libs/getAllYanImage'

export default function FindYourSelf () {
    const questionList = Q['question_list']
    const questionCount = questionList.length
    
    let buttonStatus = [false, false, false, false]

    const [questionIndex, setQuestionIndex] = useState(1)
    const [questionAnswer, setQuestionAnswer] = useState(new Array(questionCount).fill(null))
    
    const genAnswer  = (answer : string) => {
        let newAnswer = [...questionAnswer]
        newAnswer[questionIndex - 1] = answer
        return newAnswer
    }

    const indexNow = questionIndex - 1
    const thisQuestionObject = questionList[indexNow]

    for (let i = 0 ; i < 4 ; i++) {
        buttonStatus[i] = thisQuestionObject['choices'][i]['field'] == questionAnswer[questionIndex - 1]
    }
    
    const handleFinish = async () => {
        const count : any = {};
        questionAnswer.forEach(item => {
            count[item] = (count[item] || 0) + 1;
        })
        let field = ['การเรียน', 'การงาน', 'การเงิน', 'ความรัก', 'สุขภาพ', 'ครอบครัว']
        let postArray = []

        for (let i = 0 ; i < field.length ; i++) {
            if (!count[field[i]])
                postArray.push(0)
            else
            postArray.push(count[field[i]])
        }

        let s = await calculateYanLayer(postArray)
        let targetField = s.layers
        for (let i = 0 ; i < 4 ; i++) {
            targetField[i] = field[targetField[i] - 1]
        }

        const allYanImage = await getAllYanImage()

        let tokenParam = ''

        for (let i = 0 ; i < 4 ; i++) {
            let n = allYanImage['data'][i].length
            for (let j = 0 ; j < n; j++) {
                if (allYanImage['data'][i][j]['category'] == targetField[i])
                    tokenParam += allYanImage['data'][i][j]['yan_template_image_set_id'].toString() + '-'
            }   
        }
        tokenParam = tokenParam + '112141'
        redirect(`/yan/${tokenParam}`)


    }


    return (
        <div className={styles.wrapper}>
            <Image
              src="/star_5.png"
              alt="star"
              layout="intrinsic"
              width={1000}
              height={1000}
              className='absolute w-[120vw] z-0 opacity-[100%]'
        />
            <div className={styles['back-wrapper']}>
                <button
                    className="flex ml-[10%] justify-center items-center gap-4 group"
                    onClick={() => {redirect('/yan_mode_select')}}
                    >
                    <LessSign
                        width={"24px"}
                        height={"24px"}
                        className="fill-white group-hover:fill-highlight1"
                    />
                    <div className="text-[20px] font-light group-hover:text-highlight1">
                        กลับ
                    </div>
            </button>
            </div>

            <div className={styles['content-wrapper']}>
                <div className='flex mt-[24px]'>
                    <h4>ขั้นตอนที่ 2</h4>
                    <h2 className='ml-[16px]'>ยันต์อะไรดี</h2>
                </div>
                <h2 className='mt-[16px]'>ข้อ {questionIndex} / {questionCount}</h2>
                <h1 className='mt-[16px]'>{thisQuestionObject['question']}</h1>
            <div className={styles['choice-wrapper']}>
                <ChoiceQuiz active = {buttonStatus[0]} onClick={() => setQuestionAnswer(genAnswer(thisQuestionObject['choices'][0]['field']))} mt={24} size={24} text = {thisQuestionObject['choices'][0]['text']}></ChoiceQuiz>
                <ChoiceQuiz active = {buttonStatus[1]} onClick={() => setQuestionAnswer(genAnswer(thisQuestionObject['choices'][1]['field']))} mt={24} size={24} text = {thisQuestionObject['choices'][1]['text']}></ChoiceQuiz>
                <ChoiceQuiz active = {buttonStatus[2]} onClick={() => setQuestionAnswer(genAnswer(thisQuestionObject['choices'][2]['field']))} mt={24} size={24} text = {thisQuestionObject['choices'][2]['text']}></ChoiceQuiz>
                <ChoiceQuiz active = {buttonStatus[3]} onClick={() => setQuestionAnswer(genAnswer(thisQuestionObject['choices'][3]['field']))} mt={24} size={24} text = {thisQuestionObject['choices'][3]['text']}></ChoiceQuiz>
                
                {(questionIndex != questionCount && questionIndex == 1)  &&
                    <div className={styles['op-wrapper']}>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 onClick={() => {if(questionAnswer[questionIndex - 1] != null) setQuestionIndex(questionIndex + 1)}} icon='GreaterSign' size={24} text = {"ไปกันต่อ"}></Button1>
                        </div>
                    </div>
                }

                {(questionIndex != questionCount && questionIndex != 1)  && (
                    <div className={styles['op-wrapper']}>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 onClick={() => {setQuestionIndex(questionIndex - 1)}} icon='LessSign' front={true} size={24} text = {"ย้อนกลับ"}></Button1>
                        </div>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 onClick={() => {if(questionAnswer[questionIndex - 1] != null) setQuestionIndex(questionIndex + 1)}} icon='GreaterSign' size={24} text = {"ไปกันต่อ"}></Button1>
                        </div>
                    </div>
                )
                }

                {(questionIndex == questionCount)  && (
                    <div className={styles['op-wrapper']}>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 onClick={() => {setQuestionIndex(questionIndex - 1)}} icon='LessSign' front={true} size={24} text = {"ย้อนกลับ"}></Button1>
                        </div>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 onClick={() => {handleFinish()}} icon='GreaterSign' size={24} text = {"ส่งคำตอบ"}></Button1>
                        </div>
                    </div>
                )
                }

            </div>
            </div>


        </div>
    )

}