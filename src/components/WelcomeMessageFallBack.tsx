import React from 'react'
import { Skeleton } from './ui/skeleton'
function WelcomeMessageFallBack() {
  return (
    <div>
            <div className='flex flex-col items-center justify-center'>
                <Skeleton className="relative flex xl:w-[60%] md:w-[50%] sm:w-[80%] xs:w-[96%] " />
    </div>
  <h1 className="text-center text-2xl font-extrabold leading-none tracking-normal text-gray-50 md:text-5xl md:tracking-tight">
  ⚒️ <span className="block w-full text-transparent text-center bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
        <Skeleton className='w-[180px] h-[36px]'/>
        </span>⚒️
      </h1>
  <p className="text-center text-gray-50 dark:text-gray-400">Welcome to Remindly, your personal task manager designed to help you take control of your day, prioritize tasks, and never miss a beat.</p>
    </div>
  )
}

export default WelcomeMessageFallBack
