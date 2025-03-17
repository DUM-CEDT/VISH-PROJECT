import LessSign from '@/components/svg/LessSign'
import styles from './page.module.css'
import question_list from './question_data.json'
import Button1 from '@/components/button/Button1'
import ChoiceQuiz from '@/components/button/ChoiceQuiz'

import Image from 'next/image'

export default function FindYourSelf () {
    
    let indexNow = 2
    let allIndex = 10
    let endIndex = 10
    let thisQuestion = "ตอนคุณเรียน คุณเป็นคนประเภทที่..."

    let thisQuestionObject = {
        "question": "คุณมักใช้เวลาว่างไปกับอะไรเพื่อพัฒนาตัวเองมากที่สุด?",
        "choices": [
          { "text": "อ่านหนังสือหรือเรียนรู้ทักษะใหม่ๆ เพื่อเพิ่มพูนความรู้", "field": "การเรียน" },
          { "text": "วางแผนงานหรือฝึกฝนทักษะที่เกี่ยวข้องกับอาชีพของตัวเอง", "field": "การงาน" },
          { "text": "ศึกษาการลงทุนหรือวางแผนการเงินส่วนตัว", "field": "การเงิน" },
          { "text": "ใช้เวลาคุยกับคนรักเพื่อสร้างความสัมพันธ์ที่ดีขึ้น", "field": "ความรัก" }
        ]
      }
    return (
        <div className={styles.wrapper}>
            <Image
              src="/star_4.png"
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
                <h2 className='mt-[16px]'>ข้อ {indexNow} / {allIndex}</h2>
                <h1 className='mt-[16px]'>{thisQuestionObject['question']}</h1>
            <div className={styles['choice-wrapper']}>
                <ChoiceQuiz mt={24} size={24} text = {thisQuestionObject['choices'][0]['text']}></ChoiceQuiz>
                <ChoiceQuiz mt={24} size={24} text = {thisQuestionObject['choices'][1]['text']}></ChoiceQuiz>
                <ChoiceQuiz mt={24} size={24} text = {thisQuestionObject['choices'][2]['text']}></ChoiceQuiz>
                <ChoiceQuiz mt={24} size={24} text = {thisQuestionObject['choices'][3]['text']}></ChoiceQuiz>
                
                {(indexNow != endIndex && indexNow == 1)  &&
                    <div className={styles['op-wrapper']}>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 icon='GreaterSign' size={24} text = {"ไปกันต่อ"}></Button1>
                        </div>
                    </div>
                }

                {(indexNow != endIndex && indexNow != 1)  && (
                    <div className={styles['op-wrapper']}>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 icon='LessSign' front={true} size={24} text = {"ย้อนกลับ"}></Button1>
                        </div>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 icon='GreaterSign' size={24} text = {"ไปกันต่อ"}></Button1>
                        </div>
                    </div>
                )
                }

                {(indexNow == endIndex)  && (
                    <div className={styles['op-wrapper']}>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 icon='LessSign' front={true} size={24} text = {"ย้อนกลับ"}></Button1>
                        </div>
                        <div className={styles['op-button-wrapper']}>
                            <Button1 icon='GreaterSign' size={24} text = {"ส่งคำตอบ"}></Button1>
                        </div>
                    </div>
                )
                }

            </div>
            </div>


        </div>
    )

}