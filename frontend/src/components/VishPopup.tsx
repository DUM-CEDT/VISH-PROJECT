import React, { useState, useEffect } from "react";
import DropDown from "./button/DropDownVishCard";
import getAllVishCategories from "@/app/libs/getAllVishCategories";
import { useSession } from "next-auth/react";
import { createVish } from "@/app/libs/createVish";

interface VishPopupProps {
  text?: string;
  onClose: () => void;
}

const VishPopup: React.FC<VishPopupProps> = ({ text = "", onClose }) => {
  const { data: session } = useSession();
  const [wishText, setWishText] = useState(text);
  const [categories, setCategories] = useState<{ id: string, name: string }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [bonType, setBonType] = useState<string>("");
  const [bonCredit, setBonCredit] = useState<string>("");
  const [distribution, setDistribution] = useState<string>("");
  const [vishTarget, setVishTarget] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const offeringOptions = ["ขอพร", "จำนวน VISH", "ไม่บน"];
  
  const isFieldsDisabled = bonType === "ไม่บน";
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllVishCategories();
        if (data && data.categories) {
          const formattedCategories = data.categories.map((category: any) => ({
            id: category._id,
            name: category.category_name
          }));
          setCategories(formattedCategories);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories");
      }
    };
    
    fetchCategories();
  }, []);
  
  const handleCreateVish = async () => {
    if (!wishText.trim()) {
      setError("Please enter your wish text");
      return;
    }
    
    if (!selectedCategory) {
      setError("Please select a category");
      return;
    }
    
    if (!bonType) {
      setError("Please select a bon type");
      return;
    }
    
    if (!session?.user?.token) {
      setError("Please login to create a wish");
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    const isBon = bonType !== "ไม่บน";
    
    const vishData: any = {
      text: wishText,
      category_list: [selectedCategory],
      is_bon: isBon,
    };
    
    if (isBon) {
      if(bonType === "ขอพร"){
        vishData.bon_condition = false;
      }else if(bonType === "จำนวน VISH"){
        vishData.bon_condition = true;
      }
      
      if (vishTarget) {
        vishData.bon_vish_target = parseInt(vishTarget, 10);
      }
      if (bonCredit) {
        vishData.bon_credit = parseInt(bonCredit, 10);
      }
      if (distribution) {
        vishData.distribution = parseInt(distribution, 10);
      }
    }
    
    const response = await createVish(vishData, session.user.token);
    
    setIsSubmitting(false);
    
    if (response.success) {
      onClose();
    } else {
      setError(response.msg || "Failed to create wish");
    }
  };
  
  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div className="relative flex flex-col border border-gray-300 rounded-lg w-[900px] bg-white p-4 shadow-lg gap-4">
          <div className="flex justify-between items-center px-2 py-1">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="text-black hover:text-gray-800 text-2xl"
              >
                ✕
              </button>
              <span className="text-[24px] font-normal text-black">ปิดหน้าต่าง</span>
            </div>
            <div>
              <span className="text-[24px] font-light text-black">
                สร้างดวงดาวแห่งคำขอของคุณ
              </span>
            </div>
            <button 
              className="flex items-center gap-1 border border-blue-900 rounded-full px-3 py-1 bg-blue-900 hover:bg-blue-800 transition-colors"
              onClick={handleCreateVish}
              disabled={isSubmitting}
            >
              <span className="text-white text-xl font-bold">
                {isSubmitting ? "กำลังส่ง..." : "VISH!!!"}
              </span>
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-center">
            <textarea
              className="border border-gray-400 rounded-lg w-[850px] h-[250px] p-3 bg-white text-black resize-none text-[20px] font-light"
              placeholder="ขอให้เป็นวันที่ดี..."
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-2">
            <div className="flex flex-col">
              <span className="text-black mb-1 text-[20px] font-normal">หมวดหมู่</span>
              <DropDown
                options={categories.map(cat => cat.name)}
                defaultOption="ตัวเลือก"
                onChange={(value) => {
                  const category = categories.find(cat => cat.name === value);
                  if (category) {
                    setSelectedCategory(category.id);
                  }
                }}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-black mb-1 text-[20px] font-normal">การบน</span>
              <DropDown
                options={offeringOptions}
                defaultOption="ตัวเลือก"
                onChange={(value) => setBonType(value)}
              />
            </div>

            <div className="flex flex-col">
              <span className={`text-black mb-1 text-[20px] font-normal ${isFieldsDisabled ? 'opacity-50' : ''}`}>จำนวนเครดิต</span>
              <input
                type="number"
                className={`border border-blue-300 rounded-lg px-2 py-2 w-[120px] h-[50px] text-black text-[24px] ${isFieldsDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                value={bonCredit}
                onChange={(e) => setBonCredit(e.target.value)}
                disabled={isFieldsDisabled}
              />
            </div>

            <div className="flex flex-col">
              <span className={`text-black mb-1 text-[20px] font-normal ${isFieldsDisabled ? 'opacity-50' : ''}`}>จำนวนคน</span>
              <input
                type="number"
                className={`border border-blue-300 rounded-lg px-2 py-2 w-[120px] h-[50px] text-black text-[24px] ${isFieldsDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                value={distribution}
                onChange={(e) => setDistribution(e.target.value)}
                disabled={isFieldsDisabled}
              />
            </div>

            <div className="flex flex-col">
              <span className={`text-black mb-1 text-[20px] font-normal ${isFieldsDisabled ? 'opacity-50' : ''}`}>จำนวน VISH</span>
              <input
                type="number"
                className={`border border-blue-300 rounded-lg px-2 py-2 w-[120px] h-[50px] text-black text-[24px] ${isFieldsDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                value={vishTarget}
                onChange={(e) => setVishTarget(e.target.value)}
                disabled={isFieldsDisabled}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-[rgba(255,255,255,0.5)] z-[90] pointer-events-none" />
    </>
  );
};

export default VishPopup;