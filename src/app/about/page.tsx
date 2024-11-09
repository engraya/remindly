import React from 'react'

function AboutPage() {
  return (
    <main className='min-h-screen'>
     <section className="px-4 py-2 mx-auto max-w-7xl mt-20">
    <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
      <h1 className="mb-4 text-xl font-extrabold leading-none tracking-normal text-gray-900 md:text-4xl md:tracking-tight">
        <span className="block w-full text-transparent text-center bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
        About Remindly!.
        </span>
      </h1>
    </div>
  </section>
  <blockquote className="flex flex-col items-center p-4">
  <p className="max-w-4xl text-lg font-medium text-slate-200 text-center md:text-xl lg:text-2xl">At Remindly, we believe in simplifying your daily life. We designed Remindly to help you manage your tasks with zero stress. Whether you’re juggling work projects, keeping track of personal goals, or organizing daily errands, Remindly keeps you focused and productive. Our intuitive interface and smart reminders ensure that you’ll never forget a task, so you can achieve more with less effort. Join us on a journey to better productivity and a more organized life.
  </p>
</blockquote>

    </main>
  )
}

export default AboutPage
