import Image from "next/image";

export default function TransactionBlock({
    amount,
    category,
    created_at
}: {
    amount : number,
    category : string,
    created_at : string
}) {
    const gainCategory = ['deposit', 'reward-bon', 'refund', 'delete-bon' , 'reward-withdraw'];
    const lossCategory = ['withdraw', 'buyItems', 'bon',]
    let frontText = ""
    if (gainCategory.includes(category)){
        frontText = "คุณได้รับ";
    }else if(lossCategory.includes(category)){
        frontText = "คุณเสีย";
    }

    let backText = ""
    if (category === 'deposit'){
        backText = "การฝากเงินสำเร็จ"
    }
    if (category === 'reward-bon'){
        backText = "การบนสำเร็จ"
    }
    if (category === 'refund'){
        backText = "การขอคืนเงินสำเร็จ"
    }
    if (category === 'delete-bon'){
        backText = "การยกเลิกการบน"
    }
    if (category === 'withdraw'){
        backText = "การถอนเงินสำเร็จ"
    }
    if (category === 'reward-withdraw'){
        backText = " Lucky draw"
    }
    if (category === 'buyItems'){
        backText = "การซื้อสินค้า"
    }
    if (category === 'bon'){
        backText = "การบน"
    }


    return (
        <div className="flex items-center bg-white rounded-lg gap-8 p-5">
            <Image
                src="/transaction.png"
                alt="transaction"
                width={0}
                height={0}
                sizes="100vw"
                className="object-contain w-[48px] opacity-100"
            />
            <div className="text-[16px] text-black font-light">
                <div>
                    {frontText} {amount} เครดิต จาก{backText}
                </div>
                <div>
                    {new Date(created_at).toLocaleString()}
                </div>
            </div>
        </div>
    );
}
