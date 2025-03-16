export default function ChoiceQuiz({ 
    size = 16,
    text = "ตัวหนังสือ",
}: {
    size?: number;
    text?: string;
}){
    return(
        <button className="
            w-full
            bg-white hover:bg-subsecondary active:bg-highlight1
            text-black
            font-regular 
            py-2 px-8 
            rounded-2xl
            border-2
            border-secondary active:border-white
            shadow-[-2px_-2px_10px_rgba(250,250,250,0.5),4px_4px_10px_rgba(62,92,152,0.3)]
            transition-all duration-300 ease-in-out
            group
            items-center
            justify-center
            "
            style={{ fontSize: `${size}px` }}
        >
            {text}
        </button>
    );
}