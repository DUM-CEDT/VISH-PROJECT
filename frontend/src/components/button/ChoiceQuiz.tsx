export default function ChoiceQuiz({ 
    size = 16,
    text = "ตัวหนังสือ",
    active = false,
    mt = 0,
    onClick
}: {
    size?: number;
    text?: string;
    active? : boolean;
    mt? : number;
    onClick : Function
}){
    return(
        <button className={`
            w-full
            active:bg-highlight1
            hover:bg-subsecondary
            ${active ? "bg-highlight1 border-white" : "bg-white"}
            ${active ? "border-white" : "border-secondary"}
            text-black
            font-regular 
            py-2 px-8 
            rounded-2xl
            border-2
            active:border-white
            shadow-[-2px_-2px_10px_rgba(250,250,250,0.5),4px_4px_10px_rgba(62,92,152,0.3)]
            transition-all duration-300 ease-in-out
            group
            items-center
            justify-center
            `}
            style={{ fontSize: `${size}px`, marginTop : `${mt}px`}}
            onClick={() => onClick()}
        >
            {text}
        </button>
    );
}