export default function Hero() {
    return (
        <section className="relative h-[70vh] w-full overflow-hidden bg-black">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/hero.mp4" type="video/mp4" />
            </video>

            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent" />

            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />

            <div className="absolute inset-0 bg-black/50" />

            <div className="relative z-10 flex flex-col gap-5 items-center justify-center h-full text-white">
                <p className="text-[10px] md:text-xs tracking-widest uppercase text-gray-400 mt-8">BOSNIA * WORLDWIDE SHIPPING</p>
                <h1 className="font-display text-8xl uppercase tracking-widest text-center">SENTINEL GEAR</h1>
            </div>

        </section>
    )
}

