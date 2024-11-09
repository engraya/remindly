import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <main className="auth-page">
     <section className="px-4 py-2 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-normal text-gray-900 md:text-5xl md:tracking-tight">
              <span className="block w-full text-transparent text-center bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
              Get Started with Remindly!.
              </span>
            </h1>
            <p className="mt-4 text-lg text-center leading-8 text-gray-400">
            Create your account and start managing your tasks with ease. Say goodbye to scattered to-do lists and hello to productivity.
            </p>
          </div>
        </section>
      <SignUp />
    </main>
  )
}

export default SignUpPage