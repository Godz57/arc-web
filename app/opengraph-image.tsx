import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ARC WEB — Sites que parecem tecnologia do futuro";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0e14",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Orbitron, Rajdhani, sans-serif",
        }}
      >
        {/* subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(185, 28, 44, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(185, 28, 44, 0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 0%, rgba(10,14,20,0.6) 70%, rgba(10,14,20,0.95) 100%)",
          }}
        />

        {/* arc reactor rings */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "2px solid rgba(77, 184, 255, 0.25)",
            boxShadow: "0 0 60px rgba(77, 184, 255, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 240,
            height: 240,
            borderRadius: "50%",
            border: "2px solid rgba(184, 192, 208, 0.2)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(207, 239, 255, 0.12)",
            boxShadow: "0 0 80px rgba(77, 184, 255, 0.3)",
          }}
        />

        {/* text */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 16,
          }}
        >
          <h1
            style={{
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: "0.15em",
              color: "#b8c0d0",
              textShadow: "0 0 30px rgba(184, 192, 208, 0.45)",
            }}
          >
            ARC WEB
          </h1>
          <p
            style={{
              fontSize: 32,
              color: "#cfefff",
              letterSpacing: "0.1em",
              textShadow: "0 0 16px rgba(207, 239, 255, 0.35)",
            }}
          >
            Sites que parecem tecnologia do futuro
          </p>
          <div
            style={{
              marginTop: 24,
              padding: "10px 24px",
              border: "1px solid rgba(77, 184, 255, 0.4)",
              color: "#4db8ff",
              fontSize: 18,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              background: "rgba(77, 184, 255, 0.05)",
            }}
          >
            Establish Uplink
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
