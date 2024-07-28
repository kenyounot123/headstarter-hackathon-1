'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()
  console.log(session)
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <div className="h-[100dvh] overflow-y-hidden">
      <div className="w-[80%] mx-auto">
        <h1 className="font-bold text-7xl text-primary-text-color font-[900]">Connect, plan, and experience. All in one place.</h1>
      </div>
      <div className="w-[95%] text-primary-accent-color font-bold my-5 ">
        <h2 className="text-9xl tracking-[-0.1em] font-[900] pl-5">10,000</h2>
        <p className="text-right text-4xl font-[900]">users are Dawdling</p>
      </div>
      <div className="w-[80%] mx-auto flex flex-col gap-3 my-5 pb-5">
        <p className="text-primary-text-color self-end underline underline-offset-2 ">Are you one of them?</p>
        <input className="outline-none transition-all ease-in-out duration-300 hover:bg-hover-color focus:bg-hover-color px-5 placeholder:text-black rounded-full py-5 bg-secondary-accent-color" type="text" placeholder="Email" />
        <input className="outline-none transition-all ease-in-out duration-300 hover:bg-hover-color focus:bg-hover-color px-5 placeholder:text-black rounded-full py-5 bg-secondary-accent-color" type="password" placeholder="Password"/>
      </div>
      <div className="w-[80%] mx-auto rotate-[-2deg]">
        <h2 className="text-center font-[900] text-2xl text-primary-accent-color my-2">27th Saturday 5:00PM</h2>
        <div className="w-[90%] mx-auto relative">
          <div className="absolute bg-primary-accent-color py-2 px-3 rounded-full top-0 left-0 -translate-x-5 -translate-y-2">
            <div className="flex gap-1">
              <div className="rounded-full bg-white p-1">🦆</div>
              <div className="rounded-full bg-white p-1">🐤</div>
              <div className="rounded-full bg-white p-1">🐤</div>
              <div className="rounded-full bg-white p-1">🐤</div>
              <div className="rounded-full bg-white p-1">🐤</div>
            </div>
          </div>
          <Image
            src="/images/landing-page.png"
            width={0}
            height={0}
            alt="Picture of the author"
            sizes="100vw"
            className="w-full h-auto rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
