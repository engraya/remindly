import React from 'react'
import UserProfile from './UserProfile'

type WelcomeMessageProps = {
    user? : any;
}

function WelcomeMessage( { user } : WelcomeMessageProps) {
  return (
    <div className='flex flex-col items-center justify-center mb-6 gap-3 mt-6 border-b border-gray-300 pb-2 dark:border-gray-400/30 border-gray-400/30 rounded-md'>
        <UserProfile image={user?.imageUrl} firstName={user?.firstName} lastName={user?.lastName} />
      <p className="text-center text-sm text-gray-50 dark:text-gray-400 divide-y divide-slate-200 border-blue-300">Welcome to Remindly, your personal task manager designed to help you take control of your day, prioritize tasks, and never miss a beat.</p>
  </div>
  )
}

export default WelcomeMessage
