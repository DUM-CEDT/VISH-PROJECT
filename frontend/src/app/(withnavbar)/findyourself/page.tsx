import LessSign from '@/components/svg/LessSign'
import styles from './page.module.css'
import question_list from './question_data.json'

export default function FindYourSelf () {
    
    return (
        <div className={styles.wrapper}>
            <div className={styles['back-wrapper']}>
                <div className='flex items-center'>
                    <LessSign width='24px' height='24px' className=' ml-[5vw] fill-white mr-[12px]'></LessSign>
                    <p>กลับ</p>
                </div>
            </div>

            <div className={styles['content-wrapper']}>
                <h2>123</h2>
                <h2>123</h2>
                <h1>123</h1>
            </div>
        </div>
    )

}