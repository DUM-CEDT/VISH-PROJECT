"use client";
import ChoiceQuiz from "@/components/button/ChoiceQuiz";
import LessSign from "@/components/svg/LessSign";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Button1 from "@/components/button/Button1";
import DropDown from "@/components/button/DropDown";
import { useState, useEffect } from "react";
import getMerchById from "@/app/libs/getMerchById";

interface MerchItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  merch_props: { type: string; options: string[] }[];
  description: string;
  type: string;
}

interface prop {
    type: string
    options: string[]
}

export default function MerchandiseDetail() {
  const params = useParams();
  const router = useRouter();
  const { id } = params as { id: string }; // Type assertion for useParams

  const [item, setItem] = useState<MerchItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Dynamically initialize selected states based on merch_props
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        if (!id) throw new Error("No ID provided");
        const data = await getMerchById(id);
        setItem(data.item);

        // Initialize selected options from the first option of each merch_prop type
        const initialOptions: Record<string, string> = {};
        data.item.merch_props.forEach((prop : prop) => {
          if (prop.options && prop.options.length > 0) {
            initialOptions[prop.type] = prop.options[0]; // Default to first option
          }
        });
        setSelectedOptions(initialOptions);
      } catch (err: any) {
        setError(err.message || "Failed to load item");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  const handleBackClick = () => {
    router.push("/merchandise");
  };

  // Dynamically get options from merch_props
  const getOptionsForType = (type: string): string[] => {
    const prop = item?.merch_props.find((p) => p.type === type);
    return prop?.options || []; // Return empty array if no options found
  };

  const handleBuyClick = () => {
    try {
      if (!item) throw new Error("Item not available");
      
      let str = item._id
      console.log(selectedOptions)
      for (let key in selectedOptions) {
        str += '-' + key + '-' + selectedOptions[key]
      }
      
      const url = `/payment/${str}`;

      router.push(`${url}`);
    } catch (err: any) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-white p-4">Loading...</div>;
  }

  if (error || !item) {
    return <div className="text-red-500 p-4">{error || "Item not found"}</div>;
  }

  return (
    <div className="w-full mt-[8vh]">
      <Image
                    src="/star_5.png"
                    alt="star"
                    width={2000}
                    height={2000}
                    className='absolute z-0 opacity-[100%] object-cover pointer-events-none'
      />
      <div className="w-full p-16 h-[92vh]">
        <button
          className="flex justify-center items-center gap-4 group z-[10]"
          onClick={handleBackClick}
        >
          <LessSign
            width={"24px"}
            height={"24px"}
            className="fill-white group-hover:fill-highlight1"
          />
          <div className="text-[20px] font-light group-hover:text-highlight1">
            กลับ
          </div>
        </button>
        <div className="mt-16 px-16 w-full flex gap-12">
          <Image
            src={item.image ? `data:image/jpeg;base64,${item.image}` : "/Yan.png"}
            alt={item.name}
            width={0}
            height={0}
            sizes="100vw"
            className="z-1 object-contain w-[37.5%] opacity-100"
          />
          <div className="flex flex-col justify-between w-[62.5%]">
            <div>
              <div className="font-regular text-[28px] text-white">
                {item.name}
              </div>
              <div className="font-light text-[24px] text-white mt-2 line-clamp-3 overflow-hidden">
                {item.description}
              </div>
            </div>
            <div>
              <div className="font-light text-[20px] text-white">
                ตัวเลือกสินค้า
              </div>
              <div className="flex  w-full gap-8 ">
                {item.merch_props.map((prop, index) => (
                    <div key={index} className="w-full">
                        <div className="mb-1">{prop.type}</div>
                        <DropDown
                        options={getOptionsForType(prop.type)}
                        size="16px"
                        default={selectedOptions[prop.type] || ""}
                        onChange={(value) =>
                            setSelectedOptions((prev) => ({
                            ...prev,
                            [prop.type]: value,
                            }))
                        }
                        />
                    </div>
                ))}
              </div>
            </div>
            <div className="text-white text-[32px] font-regular">{item.price} บาท</div>
            <div className="z-1">
              <Button1
                
                icon="Buy"
                front={true}
                text="สั่งซื้อสินค้า"
                size={24}
                minWidth="100%"
                onClick={handleBuyClick}
              />

            </div>
          </div>
        </div>
        {/* <div className="text-white text-[20px] font-light mt-4">
            Selected Options:{" "}
            {item.merch_props
                .map((prop) => `${prop.type}=${selectedOptions[prop.type] || "N/A"}`)
                .join(", ")}
        </div> */}
      </div>
    </div>
  );
}
