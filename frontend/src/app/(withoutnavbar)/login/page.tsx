import Image from "next/image";
import styles from './page.module.css'
import Button1 from "@/components/button/Button1";
import Button2 from "@/components/button/Button2";

export default function LoginPage() {
  return (
    
      
    <div className={styles['page-wrapper']}>
        <div className={styles['banner-wrapper']}>
          
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
                <Button1 text="เข้าสู่ระบบด้วยบัญชี Google" size={16}/>
              </div>

          </div>


          
        </div>
    </div>
    

  );
}