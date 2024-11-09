import React from 'react'
import Image from 'next/image'
import { FcOvertime } from "react-icons/fc";
import { FcTimeline } from "react-icons/fc";

type UserProfileProps = {
    image? : any;
    firstName : string | null | undefined;
    lastName : string | null | undefined;
}


function UserProfile({ image, firstName, lastName } : UserProfileProps) {

  return (
<div className="relative flex xl:w-[40%] md:w-[50%] sm:w-[80%] xs:w-[96%] gap-4 items-center border dark:border-gray-400/30 border-gray-400/30 rounded  shadow shadow-green-500 ">
  <div className="absolute flex justify-center gap-1 w-2 text-xl font-bold text-center text-green-500 dark:bg-white bg-gray-800 rounded -top-2 -left-2">
    <span className="self-end text-sm text-red-500"><FcOvertime /></span>
    <FcTimeline />
  </div>
  <div className="w-full overflow-hidden rounded" style={{maxWidth: '100px'}} >
    <Image className="object-cover my-auto w-20 h-20 rounded-full" width={200} height={200} src={image} alt="Samuel Abera" />
  </div>
  <div className="flex flex-col justify-between flex-grow gap-3 px-2">
    <div className="w-full">
    <h1 className="text-center text-xl font-bold  md:text-xl bg-clip-text leading-none tracking-normal text-gray-50 md:tracking-tight">
  ⚒️ <span className="block w-full text-transparent text-center bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
        {firstName} 
        </span>⚒️
      </h1>
    </div>
  </div>
</div>

  )
}

export default UserProfile
