"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Button2 from "@/components/button/Button2";
import Button3 from "@/components/button/Button3";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      // console.log("signIn result:", result);

      if (result?.error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      } else {
        // alert("Login success");
        router.push("/");
      }
    } catch (error) {
      // alert("Please check your Email and Password");
      console.error("Error during login", error);
    }
  };
  

  return (
    <div className={styles["page-wrapper"]}>
      <div className={styles["banner-wrapper"]}>
        <div className={styles["image-banner-wrapper"]}>
          <Image
            src="/login_top.png"
            alt="cloud"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain w-[100%] bottom-0 opacity-100"
          />
        </div>
        <Image
          src="/Vish.png"
          alt="cloud"
          width={0}
          height={0}
          sizes="100vw"
          className="object-contain w-[50%] bottom-0 opacity-100"
        />
        <div className={styles["image-banner-wrapper"]}>
          <Image
            src="/login_bottom.png"
            alt="cloud"
            width={0}
            height={0}
            sizes="100vw"
            className="object-contain w-[100%] bottom-0 opacity-100"
          />
        </div>

        <Image
          src="/star_2.png"
          alt="star"
          layout="intrinsic"
          width={1000}
          height={1000}
          objectFit="cover"
          className="absolute z-0 opacity-[30%]"
        />
      </div>
      <div className={styles["login-wrapper"]}>
        <div className={styles["login-content"]}>
          <div className={styles["login-banner-and-information"]}>
            <h1>เข้าสู่ระบบ</h1>

            {error && (
              <div className="text-red-500 mb-4 text-center">{error}</div>
            )}

            <form onSubmit={handleLogin}>
              <div className={styles["input-wrapper"]}>
                <h2>ที่อยู่อีเมล</h2>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles["input-wrapper"]}>
                <h2>รหัสผ่าน</h2>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mt-[24px] w-[100%] flex justify-end">
                <a href="/api/auth/register">สร้างบัญชีใหม่</a>
              </div>
              <div className="mt-[24px] w-[100%] flex justify-center">
                <Button2 text="เข้าสู่ระบบ" size={16} />
              </div>
            </form>
          </div>

          <div className="mt-[32px] w-[100%] flex justify-center items-center">
            <div className={styles.line}></div>
            <h2 className="mx-[24px]">หรือ</h2>
            <div className={styles.line}></div>
          </div>

          <div className="mt-[32px] w-[100%] flex justify-center">
            <Button3
              onClick={() => {
                console.log("Google login clicked (not implemented)");
              }}
              icon="Google"
              front={true}
              text="เข้าสู่ระบบด้วยบัญชี Google"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
}