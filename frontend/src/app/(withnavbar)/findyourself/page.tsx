'use client'

import LessSign from '@/components/svg/LessSign'
import styles from './page.module.css'
import Q from './question_data.json'
import Button1 from '@/components/button/Button1'
import ChoiceQuiz from '@/components/button/ChoiceQuiz'

import Image from 'next/image'
import { useEffect, useState } from 'react' 

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
        console.log(buttonStatus[i])
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
                <div className='flex items-center'>
                    <LessSign width='24px' height='24px' className=' ml-[5vw] fill-white mr-[12px]'></LessSign>
                    <p>กลับ</p>
                </div>
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
                            <Button1 onClick={() => {setQuestionIndex(questionIndex + 1)}} icon='GreaterSign' size={24} text = {"ไปกันต่อ"}></Button1>
                        </div>
                    </div>
                }

                {(questionIndex != questionCount && questionIndex != 1)  && (
                    <div className={styles['op-wrapper']}>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 onClick={() => {setQuestionIndex(questionIndex - 1)}} icon='LessSign' front={true} size={24} text = {"ย้อนกลับ"}></Button1>
                        </div>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 onClick={() => {setQuestionIndex(questionIndex + 1)}} icon='GreaterSign' size={24} text = {"ไปกันต่อ"}></Button1>
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
                            <Button1 onClick={() => {console.log(questionAnswer)}} icon='GreaterSign' size={24} text = {"ส่งคำตอบ"}></Button1>
                        </div>
                    </div>
                )
                }

            </div>
            </div>


        </div>
    )

}