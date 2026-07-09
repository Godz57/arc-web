export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="flex min-h-[80vh] flex-col items-center justify-center"
      >
        <h1 className="font-orbitron text-5xl font-bold text-titan-gold text-glow-gold md:text-7xl">
          ARC WEB
        </h1>
        <p className="mt-4 max-w-xl text-center font-rajdhani text-xl text-arc-blue text-glow-cyan">
          Construo sites que parecem tecnologia do futuro
        </p>
      </section>

      <section
        id="services"
        className="flex min-h-[50vh] items-center justify-center border-t border-hud-cyan/10"
      >
        <p className="font-orbitron text-2xl text-hud-cyan">CAPABILITIES</p>
      </section>

      <section
        id="portfolio"
        className="flex min-h-[50vh] items-center justify-center border-t border-hud-cyan/10"
      >
        <p className="font-orbitron text-2xl text-hud-cyan">MISSION LOG</p>
      </section>

      <section
        id="process"
        className="flex min-h-[50vh] items-center justify-center border-t border-hud-cyan/10"
      >
        <p className="font-orbitron text-2xl text-hud-cyan">ASSEMBLY PROTOCOL</p>
      </section>

      <section
        id="contact"
        className="flex min-h-[50vh] items-center justify-center border-t border-hud-cyan/10"
      >
        <p className="font-orbitron text-2xl text-hud-cyan">ESTABLISH UPLINK</p>
      </section>
    </>
  );
}
