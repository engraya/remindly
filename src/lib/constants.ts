export enum CollectionColors {
    Sunset = "bg-gradient-to-r from-red-500 to-orange-500",
    Rosebud = "bg-gradient-to-r from-violet-500 to-purple-500",
    Night = "bg-gradient-to-r from-purple-300 to-pink-600",
    Sunrise = "bg-gradient-to-r from-green-400 to-blue-500",
    Ocean = "bg-gradient-to-r from-cyan-400 to-teal-500",
    Forest = "bg-gradient-to-r from-green-400 to-indigo-500",
    Lavender = "bg-gradient-to-r from-purple-500 to-fuchsia-800",
    Lime = "bg-gradient-to-r from-green-400 to-lime-500",    
    Grape = "bg-gradient-to-r from-purple-400 to-pink-500",
    Poppy = "bg-gradient-to-r from-rose-300 to-emerald-500",
    Sky = "bg-gradient-to-r from-cyan-400 to-sky-500",
    Sea = "bg-gradient-to-r from-cyan-300 to-teal-700",
    Olive = "bg-gradient-to-r from-green-400 to-olive-500",
    Plum = "bg-gradient-to-r from-purple-400 to-fuchsia-500",
    Rose = "bg-gradient-to-r from-pink-400 to-rose-500",
    Mauve = "bg-gradient-to-r from-purple-200 to-fuchsia-400",
    Sand = "bg-gradient-to-r from-yellow-400 to-orange-500",
    Mint = "bg-gradient-to-r from-green-400 to-teal-500",
    Berry = "bg-gradient-to-r from-purple-500 to-fuchsia-800",  
}

export type CollectionColor = keyof typeof CollectionColors;