"use client";

export default function VishCard({ message, wishes }: { message: string; wishes: number }) {
  return (
    <div className="relative border-2 border-white rounded-xl bg-primary p-6 text-white w-[320px] text-center">
      <p className="text-lg">{message}</p>
      <div className="flex justify-center items-center mt-4">
        <span className="mr-2">💖 {wishes} WISHES</span>
      </div>
    </div>
  );
}
