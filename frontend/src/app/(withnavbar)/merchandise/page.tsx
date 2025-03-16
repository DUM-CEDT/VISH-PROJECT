"use client";
import MerchandiseChoice from "@/components/button/MerchandiseChoice";
import NavButton from "@/components/button/NavButton";
import MerchBanner from "@/components/MerchBanner";
import { useState } from "react";

export default function MerchandisePage() {
    const [selectedItem, setSelectedItem] = useState("home"); 
    const [sliderPos , setSliderPos] = useState(0);

    const handleSelection = (selected: string) => {
        console.log("Selected merchandise type:", selected);
        setSelectedItem(selected); 
      };

    const handlePrev = () => {
    setSliderPos((prev) => (prev - 1 + merchArray.length) % merchArray.length);
    };
    
    const handleNext = () => {
    setSliderPos((prev) => (prev + 1) % merchArray.length);
    };

    const merchArray = [
        {
            head: "YanTra",
            desc: undefined,
            image: "/Yan.png",
        },
        {
            head: "Gear",
            desc: undefined,
            image: "/Gear.png",
        },
        {
            head: "Cap",
            desc: "Stylish cap for sunny days.",
            image: undefined,
        },
        {
            head: "Mug",
            desc: "Ceramic mug for your favorite beverages.",
            image: undefined,
        },
    ];

    const currentMerch = merchArray[sliderPos];
    
      return (
        <div className="flex flex-col items-center">
            <div className="w-full bg-subsecondary h-[76vh] text-white mt-[8vh] p-16">
                <div className=" w-full h-full border-white border-3 rounded-3xl flex items-center justify-center p-12">
                    <div className="w-full h-full flex items-center">
                        <div className="w-[7.5%]">
                            <NavButton next={false} size={24} onClick={handlePrev}/>
                        </div>
                        <div className="w-[85%] h-full">
                            <MerchBanner head={currentMerch.head} desc={currentMerch.desc} image={currentMerch.image}/>
                        </div>
                        <div className="w-[7.5%] flex justify-end">
                            <NavButton next={true} size={24} onClick={handleNext}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-[16vh] flex items-center justify-center">
                <MerchandiseChoice onSelect={handleSelection} />
            </div>
            
            <div className="text-white">
                <p>Selected: {selectedItem || "None"}</p>
            </div>
        </div>
      );
    }