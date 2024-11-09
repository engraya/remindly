import Image from "next/image";
import Link from "next/link";
import { SignedIn } from "@clerk/nextjs";


export default function Home() {
  return (
<>
<section x-data="{ testimonialActive: 1 }" className="bg-[#1a1a1f] relative overflow-hidden">
  <svg className="absolute blur-3xl opacity-70  -top-6 animate-pulse" width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_17_56)">
      <g filter="url(#filter0_f_17_56)">
        <path d="M128.6 0H0V322.2L250.5 231.5L128.6 0Z" fill="white" />
        <path d="M0 322.2V400H240H320L250.5 231.5L0 322.2Z" fill="#5701c9" />
        <path d="M320 400H400V78.75L250.5 231.5L320 400Z" fill="#5209ee" />
        <path d="M400 0H128.6L250.5 231.5L400 78.75V0Z" fill="#380094" />
      </g>
    </g>
    <defs>
      <filter id="filter0_f_17_56" x="-160.333" y="-160.333" width="720.666" height="720.666" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="80.1666" result="effect1_foregroundBlur_17_56" />
      </filter>
    </defs>
  </svg>
  <div className="relative max-w-7xl 2xl:max-w-screen-2xl  lg:px-16 md:px-12 mx-auto py-6 px-8 h-svh flex flex-col justify-center items-center">
  <div className="mx-auto flex justify-center px-4 sm:px-6 lg:px-8">
    <div className="text-center ">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-200 dark:text-slate-200 sm:text-5xl md:text-6xl">
        <span className="block xl:inline"><span className="mb-1 block">Stay on top of your tasks</span>
          <span className="bg-gradient-to-r from-indigo-400 to-pink-600 bg-clip-text text-transparent">
            effortlessly
          </span>
        </span>
        <div className="mt-2">
          <span className="relative mt-3 whitespace-nowrap text-blue-400"><svg aria-hidden="true" viewBox="0 0 418 42" className="absolute top-3/4 left-0 right-0 m-auto h-[0.58em] w-fit fill-pink-400/50" preserveAspectRatio="none">
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z">
              </path>
            </svg>
            <span className="relative">with Remindly</span>
          </span>
        </div>
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-lg text-gray-300 dark:text-slate-400 sm:mt-5 md:mt-5">
      Never miss a deadline again. Organize, prioritize, and conquer your to-dos with ease, whether it’s work, personal tasks, or long-term goals.
      </p>
      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
      <SignedIn>
        <Link href="/dashboard">
        <button className="animate-bounce focus:animate-none hover:animate-none relative inline-block p-px font-semibold leading-6 text-white no-underline bg-gray-800 shadow-2xl cursor-pointer group rounded-xl shadow-zinc-900"><span className="absolute inset-0 overflow-hidden rounded-xl"><span className="absolute inset-0 rounded-xl bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            </span>
          </span>
          <div className="relative z-10 flex items-center px-6 py-3 space-x-2 rounded-xl bg-gray-950/50 ring-1 ring-white/10 ">
            <span>Lets get started</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-6 h-6">
              <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-gray-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
        </Link>
        </SignedIn>
      </div>
    </div>
  </div>

  </div>
</section>

</>

  );
}
