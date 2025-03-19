import Image from "next/image";

export default function MerchTransactionBlock({
  name,
  category,
  created_at,
}: {
  name: string;
  category: string;
  created_at: string;
}) {
  let imagePath = "/correct.png";
  let backText = "ได้รับการยืนยันแล้ว";
  if (category === "กำลังจัดส่ง" || category === "จัดส่งแล้ว") {
    imagePath = "/shipping.png";
    if(category === "กำลังจัดส่ง"){
        backText = "อยู่ระหว่างการจัดส่ง"
    }else{
        backText = "ถูกจัดส่งแล้ว"
    }
  }
  if (category === "ยกเลิก") {
    imagePath = "/cancel.png";
    backText = "ถูกยกเลิก"
  }
  
  return (
    <div className="flex items-center bg-white rounded-lg gap-8 p-5">
      <Image
        src={imagePath}
        alt="status"
        width={0}
        height={0}
        sizes="100vw"
        className="object-contain w-[48px] opacity-100"
      />
      <div className="text-[16px] text-black font-light">
        <div>
          {name} {backText}
        </div>
        <div>{new Date(created_at).toLocaleString()}</div>
      </div>
    </div>
  );
}
