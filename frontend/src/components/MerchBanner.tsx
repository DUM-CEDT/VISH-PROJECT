import Image from "next/image";

export default function MerchBanner({
    head = "ชื่อสินค้า",
    desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien",
    image = "/Yan.png"
}:{
    head? : string,
    desc? : string,
    image? : string
}){
    return(
        <div className="flex items-center gap-16 p-12 rounded-lg h-full ">
            <div className="flex-shrink-0">
                <Image
                src={image}
                alt={head}
                width={250}
                height={250}
                className="object-contain"
                />
            </div>
            <div className="flex-1">
                <h2 className="text-[32px] font-regular text-black">{head}</h2>
                <p className="mt-2 text-[24px] font-light text-black">{desc}</p>
            </div>
        </div>
    );
};