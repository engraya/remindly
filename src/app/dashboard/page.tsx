import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import WelcomeMessage from '@/components/WelcomeMessage';
import { getUserCollections } from '@/db/actions';
import CollectionList from '@/components/CollectionList';
import { Suspense } from 'react';
import WelcomeMessageFallBack from '@/components/WelcomeMessageFallBack';
import Loader from '@/components/Loader';

async function Dashboard() {

  const user = await currentUser();
  console.log("User Collections", user);


  return (
    <main className="min-h-screen bg-slate-900 text-white">
    <section className="w-full p-6 mx-auto space-y-3 dark:bg-gray-800 dark:text-white">
      <Suspense fallback={<><WelcomeMessageFallBack/></>}>
        <WelcomeMessage user={user}/> 
      </Suspense>
      <div className="w-full flex items-center justify-center">
      <Suspense fallback={<><Loader/></>}>
        <CollectionList user={user}/> 
      </Suspense>
      </div>
    </section>
    </main>
  )
}

export default Dashboard
