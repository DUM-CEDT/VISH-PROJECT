"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VishCard from "@/components/VishCard";
import VishFooter from "@/components/VishFooter";
import Star from "@/components/svg/Star";
import HeartUnliked from "@/components/svg/HeartUnliked";
import HeartLiked from "@/components/svg/HeartLiked";
import { Vish } from "../../../../interface";
import getAllVishes from "@/app/libs/getAllVishes";
import getVishCategoryById from "@/app/libs/getVishCategoryById";
import vishVish from "@/app/libs/vishVish";
import getVishStatus from "@/app/libs/getVishStatus";
import { getSession } from "next-auth/react";

interface VishWithColor extends Vish {
  color: string;
}

export default function AllWishesPage() {
  const [vishes, setVishes] = useState<VishWithColor[]>([]);
  const [isVishLoading, setIsVishLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'popular' | 'latest'>('popular');
  const [likedStates, setLikedStates] = useState<{ [key: string]: boolean }>({});
  const router = useRouter();

  useEffect(() => {
    async function fetchVishes() {
      try {
        setIsVishLoading(true);

        const data = await getAllVishes(0, 24, filter);
        const vishesWithColors = await Promise.all(
          data.vishes.map(async (vish: Vish) => {
            let color = "#FFFFFF";
            if (vish.category_list && vish.category_list.length > 0) {
              const categoryData = await getVishCategoryById(vish.category_list[0]);
              color = categoryData.category.color;
            }
            return { ...vish, color };
          })
        );
        setVishes(vishesWithColors);

        const session = await getSession();
        if (session && session.user) {
          const token = session.user.token;
          if (!token) {
            setError("Authentication token not found");
            return;
          }

          const vishStatus = await getVishStatus(token);
          if (vishStatus.success) {
            const likedVishes = vishStatus.likedVishes || [];
            const initialLikedStates: { [key: string]: boolean } = {};
            vishesWithColors.forEach((vish) => {
              initialLikedStates[vish._id] = likedVishes.includes(vish._id);
            });
            setLikedStates(initialLikedStates);
          } else {
            setError("Failed to load vish status");
          }
        } else {
          const initialLikedStates: { [key: string]: boolean } = {};
          vishesWithColors.forEach((vish) => {
            initialLikedStates[vish._id] = false;
          });
          setLikedStates(initialLikedStates);
        }

        setIsVishLoading(false);
      } catch (err) {
        setError("Failed to load vishes or categories");
        setIsVishLoading(false);
      }
    }
    fetchVishes();
  }, [filter]);

  const handleFilterChange = (newFilter: 'popular' | 'latest') => {
    setFilter(newFilter);
  };

  const toggleLike = async (vishId: string) => {
    try {
      const session = await getSession();
      if (!session || !session.user) {
        setError("Please login to like a vish");
        router.push("/login");
        return;
      }

      const token = session.user.token;
      if (!token) {
        setError("Authentication token not found");
        router.push("/login");
        return;
      }

      const response = await vishVish(vishId, token);

      if (response.success) {
        setVishes((prevVishes) =>
          prevVishes.map((vish) => {
            if (vish._id === vishId) {
              return { ...vish, vish_count: response.vish.vish_count };
            }
            return vish;
          })
        );

        setLikedStates((prev) => ({
          ...prev,
          [vishId]: !prev[vishId],
        }));
      } else {
        setError("Failed to update like status");
      }
    } catch (err) {
      setError("Error occurred while liking/unliking");
      console.error(err);
    }
  };

  const leftColumn = vishes.filter((_, index) => index % 2 === 0);
  const rightColumn = vishes.filter((_, index) => index % 2 !== 0);

  return (
    <div className="relative min-h-screen flex flex-col pt-20 px-10 pb-24">
      {/* พื้นหลัง */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/star_5.png')",
          backgroundRepeat: "repeat-y",
          backgroundPosition: "center top",
          backgroundSize: "100% auto",
        }}
      />
      <div className="relative z-10">
        {isVishLoading ? (
          <div className="flex-1 flex items-center justify-center">
            Loading vishes...
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            {error}
          </div>
        ) : (
          <div className="flex w-full h-full flex-1">
            <div className="flex flex-col gap-20 flex-1 p-4 min-h-screen">
              {leftColumn.map((vish, index) => (
                <div
                  key={vish._id}
                  className={`flex items-center gap-4 overflow-visible ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 p-2 rounded-lg">
                    <div className="relative">
                      <Star width={74} height={74} fillColor={vish.color} />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleLike(vish._id)}>
                      {likedStates[vish._id] ? (
                        <HeartLiked width={26} height={21} fillColor="#E07CAE" />
                      ) : (
                        <HeartUnliked width={26} height={21} fillColor="#E0EEA5" />
                      )}
                      <span
                        className="text-sm"
                        style={{ color: likedStates[vish._id] ? "#E07CAE" : "#E0EEA5" }}
                      >
                        {vish.vish_count}
                      </span>
                    </div>
                  </div>
                  <VishCard
                    text={vish.text}
                    vish_count={vish.vish_count}
                    is_bon={vish.is_bon}
                    bon_condition={vish.bon_condition}
                    bon_credit={vish.bon_credit}
                    bon_vish_target={vish.bon_vish_target}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-20 flex-1 p-4 min-h-screen">
              {rightColumn.map((vish, index) => (
                <div
                  key={vish._id}
                  className={`flex items-center gap-4 overflow-visible ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 p-2 rounded-lg">
                    <div className="relative">
                      <Star width={74} height={74} fillColor={vish.color} />
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => toggleLike(vish._id)}>
                      {likedStates[vish._id] ? (
                        <HeartLiked width={26} height={21} fillColor="#E07CAE" />
                      ) : (
                        <HeartUnliked width={26} height={21} fillColor="#E0EEA5" />
                      )}
                      <span
                        className="text-sm"
                        style={{ color: likedStates[vish._id] ? "#E07CAE" : "#E0EEA5" }}
                      >
                        {vish.vish_count}
                      </span>
                    </div>
                  </div>
                  <VishCard
                    text={vish.text}
                    vish_count={vish.vish_count}
                    is_bon={vish.is_bon}
                    bon_condition={vish.bon_condition}
                    bon_credit={vish.bon_credit}
                    bon_vish_target={vish.bon_vish_target}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <VishFooter onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
}