import Image from "next/image";
import styles from "./page.module.css";
import NavBar from "@/components/NavBar";
import Vish from "@/components/svg/Vish";

export default function Home() {
  return (
      <div className="h-[92vh] z-0 flex flex-col items-center justify-center"> 
        <div className="border h-[500px] w-[700px] px-6 py-8">
          <div className="font-light text-[24px] text-center">
            วันนี้คุณ “รู้สึก” อยากทำอะไร ?
          </div>
            <div className="flex justify-around pt-8">
              <div>
                <Image
                  src="/Yan.png"
                  alt="YanTra"
                  width={200}
                  height={200}
                />
                <div>
                  
                </div>
              </div>
              <div>
                <Image
                  src="/Gear.png"
                  alt="Gear"
                  width={200}
                  height={200}
                />
              </div>
            </div>
        </div>
      </div>
  );
}
