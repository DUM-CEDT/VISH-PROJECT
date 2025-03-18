'use client'

import Image from "next/image";
import styles from './page.module.css'
import Button2 from "@/components/button/Button2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/app/libs/userRegister";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }

    try {
      await userRegister(name, email, password);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      const err = error as any;
      setError(err.message || "เกิดข้อผิดพลาดในการลงทะเบียน");
    }
  };

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
          />
        </div>
        <Image
          src="/star_2.png"
          alt="star"
          layout="intrinsic"
          width={1000}
          height={1000}
          className='absolute z-0 opacity-[30%]'
        />
      </div>
      <div className={styles['login-wrapper']}>
        <div className={styles['login-content']}>
          <div className={styles['login-banner-and-information']}>
            <h1>ลงทะเบียน</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            
            <form onSubmit={handleRegister}>
              <div className={styles['input-wrapper']}>
                <h2>ชื่อผู้ใช้</h2>
                <input 
                  type="text" 
                  name="username" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles['input-wrapper']}>
                <h2>ที่อยู่อีเมล</h2>
                <input 
                  type="email" 
                  name="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={styles['input-wrapper']}>
                <h2>รหัสผ่าน</h2>
                <input 
                  type="password" 
                  name="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className={styles['input-wrapper']}>
                <h2>ยืนยันรหัสผ่าน</h2>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="mt-[24px] w-[100%] flex justify-center">
                <Button2 text="ลงทะเบียน" size={16}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}