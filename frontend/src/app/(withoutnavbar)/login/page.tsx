'use client'

import Image from "next/image";
import styles from './page.module.css'
import Button2 from "@/components/button/Button2";
import Button3 from "@/components/button/Button3";
import Vish from "@/components/svg/Vish";
export default function LoginPage() {
  return (
    
      
    <div className={styles['page-wrapper']}>
        <div className={styles['banner-wrapper']}>
          <div className={styles['image-banner-wrapper']}>
          <Image
              src="/login_top.png"
              alt="cloud"
              width={0}
              height={0}
              sizes='100vw'
              className="object-contain w-[100%] bottom-0 opacity-100"
            />
          </div>
            <Image
              src="/Vish.png"
              alt="cloud"
              width={0}
              height={0}
              sizes='100vw'
              className="object-contain w-[50%] bottom-0 opacity-100"
            />
          <div className={styles['image-banner-wrapper']}>
            <Image
                src="/login_bottom.png"
                alt="cloud"
                width={0}
                height={0}
                sizes='100vw'
                className="object-contain w-[100%] bottom-0 opacity-100"
                style={{}}
              />
          </div>

          <Image
              src="/star_2.png"
              alt="star"
              layout="intrinsic"
              width={1000}
              height={1000}
              objectFit="cover"
              className='absolute z-0 opacity-[30%]'
        />
        </div>
        <div className={styles['login-wrapper']}>
          <div className={styles['login-content']}>
            <div className={styles['login-banner-and-information']}>
              <h1>เข้าสู่ระบบ</h1>

              <form>
                <div className={styles['input-wrapper']}>
                  <h2>ที่อยู่อีเมล</h2>
                  <input type="email" name="email" required/>
                </div>
                <div className={styles['input-wrapper']}>
                  <h2>รหัสผ่าน</h2>
                  <input type="password"  name="password" required/>
                </div>
                <div className="mt-[24px] w-[100%] flex justify-end">
                  <a href="/register">สร้างบัญชีใหม่</a>

                </div>
              </form>
            </div>

            <div className="mt-[24px] w-[100%] flex justify-center">
              <Button2 text="เข้าสู่ระบบ" size={16}/>
            </div>

            <div className="mt-[32px] w-[100%] flex justify-center items-center">
              <div className={styles.line}></div>
              <h2 className="mx-[24px]">หรือ</h2>
              <div className={styles.line}></div>
            </div>

            <div className="mt-[32px] w-[100%] flex justify-center">
                <Button3 onClick={() => {}} icon='Google' front={true} text="เข้าสู่ระบบด้วยบัญชี Google" size={16}/>
              </div>

          </div>


          
        </div>
    </div>
    

  );
}