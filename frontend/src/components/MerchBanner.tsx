import Image from "next/image";

export default function MerchBanner({
    head = "ชื่อสินค้า",
    desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien",
    image = "/Yan.png",
    id,
    onClick
}:{
    head? : string,
    desc? : string,
    image? : string,
    id? : string
    onClick?: () => void;
}){
    return(
        <div className="flex items-center gap-16 p-12 rounded-lg h-full" onClick={onClick}>
            <div className="flex-shrink-0">
                <Image
                src={image
                  ? `data:image/jpeg;base64,${image}` 
                  : "/Yan.png" }
                alt={head}
                width={0}
                height={0}
                sizes="100vw"
                className="object-contain w-[100%] opacity-100"
                />
            </div>
            <div className="flex-1">
                <h2 className="text-[32px] font-regular text-black">{head}</h2>
                <p className="mt-2 text-[24px] font-light text-black">{desc}</p>
            </div>
        </div>
    );
};