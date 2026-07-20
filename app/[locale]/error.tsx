"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ARC WEB]", error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-orbitron text-sm uppercase tracking-[0.2em] text-hud-cyan">
        Canal instável
      </p>
      <h2 className="font-orbitron text-xl text-chrome">
        Falha ao carregar a interface
      </h2>
      <p className="max-w-md font-rajdhani text-sm text-arc-blue/70">
        Tente recarregar. Em alguns celulares o 3D pode falhar — o site deve
        continuar utilizável após o retry.
      </p>
      <button
        type="button"
        onClick={reset}
        className="border border-hud-cyan/40 bg-hud-cyan/10 px-5 py-2.5 font-orbitron text-xs uppercase tracking-wider text-hud-cyan"
      >
        Tentar novamente
      </button>
    </div>
  );
}
