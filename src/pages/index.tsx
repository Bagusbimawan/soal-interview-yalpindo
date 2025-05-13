import Head from "next/head";
import Calendar from "@/pages/components/Calendar";
import Image from "next/image";

// Arahkan ke public folder jika kamu menggunakan public/rolling-stones-logo.svg
import RollingStones from "@/pages/assets/rolling-stones-logo.svg";
import Blobgroup from "@/pages/assets/blob-group.svg";
import Guitar from "@/pages/assets/headstock.webp";

export default function Home() {
  return (
    <>
      <Head>
        <title>The Rolling Stones Events</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className="relative bg-white overflow-hidden font-[Poppins] min-h-screen">
        {/* Background Images */}
        <Image
          src={RollingStones}
          alt="Rolling Stones"
          className="pointer-events-none select-none absolute top-[10%] left-0 w-auto h-auto max-w-[350px] sm:max-w-[450px] md:max-w-[550px] lg:max-w-[650px] xl:max-w-[750px] -translate-x-1/4 opacity-70"
        />
        <Image
          src={Blobgroup}
          alt="Blobgroup"
          className="pointer-events-none select-none absolute top-[10%] right-0 w-auto h-auto max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px] translate-x-1/4 opacity-70"
        />
        <Image
          src={Guitar}
          alt="Guitar"
          className="pointer-events-none select-none absolute bottom-0 left-1/2 w-auto h-auto max-w-[550px] sm:max-w-[650px] md:max-w-[750px] lg:max-w-[850px] xl:max-w-[950px] -translate-x-1/2 translate-y-1/3 opacity-95"
        />

        {/* Title and Description */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">
          <h1 className="text-center font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight max-w-4xl mx-auto">
            THE <span className="text-red-600">ROLLING STONES</span> EVENTS
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-center text-xs sm:text-sm md:text-base font-normal text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mauris
            dui, feugiat dignissim sapien quis, tristique venenatis mauris.
            Donec imperdiet felis ac auctor auctor.
          </p>
        </div>

        {/* Calendar Component */}
        <Calendar />
      </main>
    </>
  );
}
