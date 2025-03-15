import Button1 from "@/components/button/Button1";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[92vh] z-0 flex flex-col items-center justify-center">

      <div className="border h-[500px] w-[700px] px-6 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="font-light text-[24px] text-center">
            วันนี้คุณ “รู้สึก” อยากทำอะไร ?
          </div>
          <div className="flex pt-12 justify-around w-full">
            <div className="flex flex-col items-center flex-1 min-h-0">
              <Image
                src="/Yan.png"
                alt="YanTra"
                width={200}
                height={200}
                className="object-contain h-[200px] w-[200px]"
              />
              <div className="mt-auto pt-12">
                <Button1 text="สร้างยันต์ของคุณ" size={16}/>
              </div>
            </div>
            <div className="flex flex-col items-center flex-1 min-h-0">
              <Image
                src="/Gear.png"
                alt="Gear"
                width={200}
                height={200}
                className="object-contain h-[200px] w-[200px]"
              />
              <div className="mt-auto pt-12">
                <Button1 text="ขอพรกับพระวิษณุกรรม" size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}