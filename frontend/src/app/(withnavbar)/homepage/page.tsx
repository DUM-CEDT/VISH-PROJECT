import Button1 from "@/components/button/Button1";
import Image from "next/image";
import styles from './page.module.css'
export default function Home() {
  return (
    <div className="absolute h-[100vh] w-[100vw] overflow-hidden">
      <div className={styles.wrapper}>
        <div className="text-[24px] font-light text-center">
          วันนี้คุณ “รู้สึก” อยากทำอะไร ?
        </div>
        <div className="flex flex-row justify-center gap-[150px] pt-8">
          <div className={styles.content}>
            <Image
              src="/Yan.gif"
              alt="YanTra"
              width={0}
              height={0}
              sizes='100vw'
              className="ml-[24%] object-contain w-[70%] aspect-square"
            />
            <div className="pt-12">
              <Button1 text="สร้างยันต์ของคุณ" size={16} minWidth="250px"/>
            </div>
          </div>
          <div className={styles.content}>
            <Image
              src="/Gear.gif"
              alt="Gear"
              width={0}
              height={0}
              sizes='100vw'
              className="object-contain w-[70%] aspect-square"
            />
            <div className="pt-12">
              <Button1 text="ขอพรกับพระวิษณุกรรม" size={16} minWidth="250px"/>
            </div>
          </div>
        </div>
      </div>
      <Image
            src="/Cloud.png"
            alt="cloud"
            width={0}
            height={0}
            sizes='100vw'
            className="absolute object-contain w-[100vw] bottom-0 opacity-100"
      />
      <div className={styles['star-wrapper']}>
        <Image
              src="/star_3.png"
              alt="Gear"
              layout="intrinsic"
              width={2000}
              height={1000}
              objectFit="cover"
              className={styles['star-image']}
              style={{top: "-10vw", position: "absolute",  minWidth: "140vw" , opacity : 0.1}}
        />
      </div>
    </div>
  );
}