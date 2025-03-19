"use client";
import Image from "next/image";
import NotifcationChoice from "@/components/button/NotificationChoice";
import { useState } from "react";
import TransactionBlock from "@/components/TransactionBlock";
import MerchTransactionBlock from "@/components/MerchTransactionBlock";
import YanStarChoice from "@/components/button/YanStarChoice";
import LessSign from "@/components/svg/LessSign";
import GreaterSign from "@/components/svg/GreaterSign";
import NavButton from "@/components/button/NavButton";
import YanDisplay from "@/components/YanDisplay/YanDisplay";
import VishCard from "@/components/VishCard";
import Button2 from "@/components/button/Button2";
import { useEffect } from "react";
import getAllTransactions from "@/app/libs/getAllTransaction";
import { getSession } from "next-auth/react";
import getAllMerchTransactions from "@/app/libs/getAllMerchTransaction";
import getMyYanTemplate from "@/app/libs/getMyYanTemplate";
import { useRouter } from "next/navigation"; 
import getMyVishes from "@/app/libs/getMyVishes";
import setVishSuccess from "@/app/libs/setVishSuccess";
import deleteVish from "@/app/libs/deleteVishSuccess";
import getMe from "@/app/libs/getMe";
interface Transaction {
  amount: number;
  category: string;
  created_at: string;
}

interface MerchTransaction {
  name: string;
  status: string;
  created_at: string;
}

interface YanProp {
  layer: string[];
  setid : string[];
  backgroundColor: string;
}

interface VishProp {
  text: string;
  vish_count: number;
  id: string;
  is_bon: boolean;
  bon_condition: number;
  bon_vish_target: number;
  is_success: boolean;
  bon_credit: number;
  bon_distribution : number;
}

export default function ProfilePage() {
  const router = useRouter(); 
  const [selectedNotificationItem, setSelectedNotificationItem] =
    useState("เครดิต");
  const [selectedYanStarItem, setSelectedYanStarItem] = useState("ยันต์ของฉัน");
  const [yanSliderPos, setYanSliderPos] = useState(0);
  const [starSliderPos, setStarSliderPos] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [merchTransactions, setMerchTransactions] = useState<
    MerchTransaction[]
  >([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [merchLoading, setMerchLoading] = useState(false);
  const [yanArray, setYanArray] = useState<YanProp[]>([]);
  const [yanLoading, setYanLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [credit, setCredit] = useState(null);
  const [vishArray, setVishArray] = useState<VishProp[]>([]); 
  const [vishLoading, setVishLoading] = useState(false); 
  const [isDeletingVish, setIsDeletingVish] = useState(false); // Loading state for deleteVish
  const [userName, setUserName] = useState("Username");

  const handleNotificationSelection = (selected: string) => {
    setSelectedNotificationItem(selected);
  };

  const handleYanStarSelection = (selected: string) => {
    setSelectedYanStarItem(selected);
  };

  const handlePrevClick = () => {
    if (selectedYanStarItem == "ยันต์ของฉัน"){
      setYanSliderPos((prev) => (prev > 0 ? prev - 1 : yanArray.length - 1));
      console.log(yanArray[yanSliderPos]);
    }
    else
      setStarSliderPos((prev) => (prev > 0 ? prev - 1 : vishArray.length - 1));
  };

  const handleNextClick = () => {
    if (selectedYanStarItem == "ยันต์ของฉัน")
      setYanSliderPos((prev) => (prev < yanArray.length - 1 ? prev + 1 : 0));
    else
      setStarSliderPos((prev) => (prev < vishArray.length - 1 ? prev + 1 : 0));
  };

  const handleYanClick = () => {
    if (yanArray.length === 0 || !yanArray[yanSliderPos]) return;

    const { setid, backgroundColor } = yanArray[yanSliderPos];
    const formattedBackgroundColor = backgroundColor.replace("#", "");
    const url = `/yan/${setid[0] || "null"}-${setid[1] || "null"}-${setid[2] || "null"}-${setid[3] || "null"}-${formattedBackgroundColor}`;
    
    router.push(url);
  };

  const handleSetVishSuccess = async (vish_id : string) => {
    try {
      setError(null);
      const session = await getSession();
      const token = session?.user.token;
      if (!token) throw new Error("No token found");
  
      await setVishSuccess(token, vish_id);

      setError(null);
      const data = await getMyVishes(token);
      if (data.success && Array.isArray(data.vishes)) {
        const mappedVishArray: VishProp[] = data.vishes.map((vish: any) => ({
          id: vish._id,
          text: vish.text,
          vish_count: vish.vish_count,
          is_bon: vish.is_bon,
          bon_condition: vish.bon_condition,
          bon_vish_target: vish.bon_vish_target,
          is_success: vish.is_success,
          bon_credit: vish.bon_credit,
          bon_distribution: vish.distribution,
        }));
        setVishArray(mappedVishArray);
      }
    } catch (err) {
      setError("Failed to mark Vish as successful");
      console.error(err);
    }
  };

  const handleDeleteVish = async (vish_id: string) => {
    try {
      setIsDeletingVish(true);
      setError(null);
      const session = await getSession();
      const token = session?.user.token;
      if (!token) throw new Error("No token found");

      // Optimistic update: Remove the Vish from the UI
      const deletedIndex = vishArray.findIndex((vish) => vish.id === vish_id);
      setVishArray((prev) => prev.filter((vish) => vish.id !== vish_id));

      // Adjust the slider position
      if (deletedIndex < starSliderPos) {
        setStarSliderPos((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (deletedIndex === starSliderPos && starSliderPos === vishArray.length - 1) {
        setStarSliderPos((prev) => (prev > 0 ? prev - 1 : 0));
      }

      await deleteVish(token, vish_id);

      // Refetch Vish data to ensure the UI is up-to-date
      const data = await getMyVishes(token);
      if (data.success && Array.isArray(data.vishes)) {
        const mappedVishArray: VishProp[] = data.vishes.map((vish: any) => ({
          id: vish._id,
          text: vish.text,
          vish_count: vish.vish_count,
          is_bon: vish.is_bon,
          bon_condition: vish.bon_condition,
          bon_vish_target: vish.bon_vish_target,
          is_success: vish.is_success,
          bon_credit: vish.bon_credit,
        }));
        setVishArray(mappedVishArray);

        // Adjust starSliderPos after refetching
        if (starSliderPos >= mappedVishArray.length && mappedVishArray.length > 0) {
          setStarSliderPos(mappedVishArray.length - 1);
        } else if (mappedVishArray.length === 0) {
          setStarSliderPos(0);
        }
      } else {
        throw new Error("Unexpected API response structure for Vish data");
      }
    } catch (err) {
      setError("Failed to delete Vish");
      console.error(err);

      // Refetch Vish data on error to restore the UI
      const session = await getSession();
      const token = session?.user.token;
      if (token) {
        const data = await getMyVishes(token);
        if (data.success && Array.isArray(data.vishes)) {
          const mappedVishArray: VishProp[] = data.vishes.map((vish: any) => ({
            id: vish._id,
            text: vish.text,
            vish_count: vish.vish_count,
            is_bon: vish.is_bon,
            bon_condition: vish.bon_condition,
            bon_vish_target: vish.bon_vish_target,
            is_success: vish.is_success,
            bon_credit: vish.bon_credit,
          }));
          setVishArray(mappedVishArray);
        }
      }
    } finally {
      setIsDeletingVish(false);
    }
  };

  useEffect(() => {
    const fetchCredit = async() =>{
      try{
        const session = await getSession();
        const token = session?.user.token; 
        if (!token) throw new Error("No token found");
        const data = await getMe(token);
        if (data.data.credit){
          setCredit(data.data.credit);
        }
        if (data.data.name){
          setUserName(data.data.name);
        }
      }catch(err){
        console.error(err);
      }
    };

    fetchCredit();
  },[]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setTransactionsLoading(true);
        setError(null);
        const session = await getSession();
        const token = session?.user.token;
        if (!token) throw new Error("No token found");
        const data = await getAllTransactions(token);
        if (data.success && Array.isArray(data.transactions)) {
          const mappedTransactions: Transaction[] = data.transactions.map(
            (trans: any) => ({
              amount: trans.amount,
              category: trans.trans_category,
              created_at: trans.created_at,
            })
          );
          setTransactions(mappedTransactions);
        } else {
          setError("Unexpected API response structure");
        }
      } catch (err) {
        setError("Failed to fetch transactions");
        console.error(err);
      } finally {
        setTransactionsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const fetchMerchTransactions = async () => {
      try {
        setMerchLoading(true);
        setError(null);
        const session = await getSession();
        const token = session?.user.token; // Adjust based on your session structure
        if (!token) throw new Error("No token found");

        const data = await getAllMerchTransactions(token);

        if (data.success && Array.isArray(data.transactions)) {
          const mappedMerchTransactions: MerchTransaction[] =
            data.transactions.map((trans: any) => ({
              name: trans.merch_id.name,
              status: trans.status,
              created_at: trans.created_at,
            }));
          setMerchTransactions(mappedMerchTransactions);
        } else {
          setError("Unexpected API response structure for merch transactions");
        }
      } catch (err) {
        setError("Failed to fetch merch transactions");
        console.error(err);
      } finally {
        setMerchLoading(false);
      }
    };

    fetchMerchTransactions();
  }, []);

  useEffect(() => {
    const fetchYanTemplates = async () => {
      try {
        setYanLoading(true);
        setError(null);
        const session = await getSession();
        const token = session?.user.token;
        if (!token) throw new Error("No token found");

        const data = await getMyYanTemplate(token);
        if (data.success && Array.isArray(data.data)) {
          const mappedYanArray: YanProp[] = data.data.map((yan: any) => {
            const layer: (string|null)[] = [null, null, null, null];
            const setid: string[] = ["","","",""]
            yan.yan_template_image_list.forEach((image: any) => {
              const level = image.yan_level;
              if (level >= 0 && level <= 3) {
                layer[level] = image.yan_image_base64;
                setid[level] = String(image.yan_template_image_set_id);
              }
            });
            return {
              layer,
              setid,
              backgroundColor: yan.background_color,
            };
          });
          setYanArray(mappedYanArray);
        } else {
          setError("Unexpected API response structure for Yan templates");
        }
      } catch (err) {
        setError("Failed to fetch Yan templates");
        console.error(err);
      } finally {
        setYanLoading(false);
      }
    };

    fetchYanTemplates();
  }, []);

  useEffect(() => {
    const fetchVishData = async () => {
      try {
        setVishLoading(true);
        setError(null);
        const session = await getSession();
        const token = session?.user.token;
        if (!token) throw new Error("No token found");

        const data = await getMyVishes(token);
        if (data.success && Array.isArray(data.vishes)) {
          const mappedVishArray: VishProp[] = data.vishes.map((vish: any) => ({
            id: vish._id,
            text: vish.text,
            vish_count: vish.vish_count,
            is_bon: vish.is_bon,
            bon_condition: vish.bon_condition,
            bon_vish_target: vish.bon_vish_target,
            is_success: vish.is_success,
            bon_credit: vish.bon_credit,
            bon_distribution: vish.distribution,
          }));
          setVishArray(mappedVishArray);
        } else {
          setError("Unexpected API response structure for Vish data");
        }
      } catch (err) {
        setError("Failed to fetch Vish data");
        console.error(err);
      } finally {
        setVishLoading(false);
      }
    };

    fetchVishData();
  }, []);

  return (
    <div className="mt-[8vh] h-[92vh] p-12 flex gap-12">
      <Image
                    src="/star_5.png"
                    alt="star"
                    width={2000}
                    height={2000}
                    className='absolute z-0 opacity-[100%]'
      />
      <div className="z-1 w-[40%] flex flex-col justify-between">
        <div>
          <div className="flex items-baseline gap-4 bg-primary">
            <Image
              src="/user.png"
              alt="usericon"
              width={0}
              height={0}
              sizes="100vw"
              className="object-contain w-[48px] opacity-100"
            />
            <div className="text-[28px] font-regular">{userName}</div>
          </div>
          <div className="z-1 mt-1">
            <button className="bg-highlight1 px-4 py-1 text-[16px] text-black rounded-full font-regular">
              เครดิตของคุณ : {credit}
            </button>
          </div>
        </div>
        <div className="z-1 bg-[rgba(255,255,255,0.6)] p-6 h-[80%] rounded-xl">
          <div className="text-black font-regular text-[20px]">
            การแจ้งเตือน
          </div>
          <div className="flex flex-col justify-between mt-2 pb-12 h-full gap-4">
            <NotifcationChoice onSelect={handleNotificationSelection} />
            <div className="h-full flex flex-col gap-4 overflow-y-auto rounded-lg">
              {selectedNotificationItem === "เครดิต" ? (
                transactionsLoading ? (
                  <div className="text-black">Loading transactions...</div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <TransactionBlock
                      key={index}
                      category={transaction.category}
                      amount={transaction.amount}
                      created_at={transaction.created_at}
                    />
                  ))
                ) : (
                  <div className="text-black">No transactions available</div>
                )
              ) : selectedNotificationItem === "คำสั่งซื้อ" ? (
                merchLoading ? (
                  <div className="text-black">
                    Loading merch transactions...
                  </div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : merchTransactions.length > 0 ? (
                  merchTransactions.map((transaction, index) => (
                    <MerchTransactionBlock
                      key={index}
                      category={transaction.status}
                      name={transaction.name}
                      created_at={transaction.created_at}
                    />
                  ))
                ) : (
                  <div className="text-black">
                    No merch transactions available
                  </div>
                )
              ) : (
                <div className="text-black">No items selected</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="z-1 w-[60%] border-2 border-white rounded-3xl relative p-4">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-2">
          <YanStarChoice onSelect={handleYanStarSelection} />
        </div>
        <div className="w-full h-full flex items-center px-4">
          <div className="w-[7.5%]">
            <NavButton next={false} size={24} onClick={handlePrevClick} />
          </div>
          <div className="w-[85%] h-full flex items-center justify-center">
          {selectedYanStarItem === "ดวงดาวของฉัน" ? (
              vishLoading ? (
                <div className="text-white">Loading Vish data...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : vishArray.length > 0 ? (
                <div className="flex items-center justify-center flex-col gap-4 w-full">
                  <div className="mb-8">
                    <VishCard
                      text={vishArray[starSliderPos].text}
                      vish_count={vishArray[starSliderPos].vish_count}
                      bon_condition={vishArray[starSliderPos].bon_condition}
                      is_bon={vishArray[starSliderPos].is_bon}
                      bon_vish_target={vishArray[starSliderPos].bon_vish_target}
                      bon_credit={vishArray[starSliderPos].bon_credit}
                    />
                  </div>
                  {vishArray[starSliderPos].is_bon === true &&
                  vishArray[starSliderPos].is_success === false &&
                  vishArray[starSliderPos].bon_condition === 0 &&
                  vishArray[starSliderPos].bon_distribution <= vishArray[starSliderPos].vish_count ? (
                    <Button2
                      onClick={() => handleSetVishSuccess(vishArray[starSliderPos].id)}
                      text="บนสำเร็จ"
                      size={16}
                      icon="Check"
                      front={true}
                    />
                  ) : null}
                  {vishArray[starSliderPos].is_bon === false ? (
                    <Button2
                      text={isDeletingVish ? "กำลังลบ..." : "ลบ"}
                      size={16}
                      icon="Bin"
                      front={true}
                      onClick={() => handleDeleteVish(vishArray[starSliderPos].id)}
                    />
                  ) : null}
                </div>
              ) : (
                <div className="text-black">No Vish data available</div>
              )
            ) : yanLoading ? (
              <div className="text-white">Loading Yan templates...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : yanArray.length > 0 ? (
              <div onClick={handleYanClick} className="cursor-pointer">
                <YanDisplay
                  layer={yanArray[yanSliderPos].layer}
                  backgroundColor={yanArray[yanSliderPos].backgroundColor}
                  yanWidth={300}
                  borderWidth={326.4}
                />
              </div>
            ) : (
              <div className="text-black">No Yan templates available</div>
            )}
          </div>
          <div className="w-[7.5%] flex justify-end">
            <NavButton next={true} size={24} onClick={handleNextClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
å