import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "ARC WEB — Sites que parecem tecnologia do futuro";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

/**
 * Open Graph image (1200×630).
 * Styles limited to what Satori / @vercel/og supports:
 * flexbox, solid colors, simple radial gradients, box-shadow.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: "#0a0e14",
          overflow: "hidden",
        }}
      >
        {/* Ambient glows (radial only — more reliable in Satori) */}
        <div
          style={{
            position: "absolute",
            left: -100,
            top: 80,
            width: 480,
            height: 480,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(77,184,255,0.28) 0%, rgba(10,14,20,0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -80,
            bottom: -60,
            width: 420,
            height: 420,
            borderRadius: 9999,
            background:
              "radial-gradient(circle, rgba(185,28,44,0.22) 0%, rgba(10,14,20,0) 70%)",
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, backgroundColor: "rgba(77,184,255,0.15)" }} />
          <div style={{ width: 280, backgroundColor: "#4db8ff" }} />
          <div style={{ width: 160, backgroundColor: "#b91c2c" }} />
          <div style={{ flex: 1, backgroundColor: "rgba(185,28,44,0.2)" }} />
        </div>

        {/* Corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 36,
            width: 32,
            height: 32,
            borderTop: "2px solid rgba(77,184,255,0.6)",
            borderLeft: "2px solid rgba(77,184,255,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 32,
            right: 36,
            width: 32,
            height: 32,
            borderTop: "2px solid rgba(77,184,255,0.6)",
            borderRight: "2px solid rgba(77,184,255,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 36,
            width: 32,
            height: 32,
            borderBottom: "2px solid rgba(77,184,255,0.6)",
            borderLeft: "2px solid rgba(77,184,255,0.6)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 32,
            right: 36,
            width: 32,
            height: 32,
            borderBottom: "2px solid rgba(77,184,255,0.6)",
            borderRight: "2px solid rgba(77,184,255,0.6)",
          }}
        />

        {/* Main content row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            paddingLeft: 72,
            paddingRight: 72,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          {/* Left copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              maxWidth: 640,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 22,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  backgroundColor: "#4db8ff",
                  marginRight: 12,
                }}
              />
              <div
                style={{
                  fontSize: 20,
                  letterSpacing: 6,
                  color: "rgba(77,184,255,0.9)",
                  textTransform: "uppercase",
                }}
              >
                ESTUDIO · PROVA VIVA
              </div>
            </div>

            <div
              style={{
                fontSize: 88,
                fontWeight: 800,
                letterSpacing: 10,
                color: "#b8c0d0",
                lineHeight: 1,
                marginBottom: 18,
              }}
            >
              ARC WEB
            </div>

            <div
              style={{
                fontSize: 28,
                color: "#cfefff",
                lineHeight: 1.35,
                marginBottom: 28,
                maxWidth: 520,
              }}
            >
              Sites que parecem tecnologia do futuro
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 14,
                  paddingBottom: 14,
                  paddingLeft: 24,
                  paddingRight: 24,
                  border: "1px solid rgba(77,184,255,0.55)",
                  backgroundColor: "rgba(77,184,255,0.12)",
                  color: "#4db8ff",
                  fontSize: 16,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  marginRight: 18,
                }}
              >
                INICIAR PROJETO
              </div>
              <div
                style={{
                  fontSize: 16,
                  color: "rgba(207,239,255,0.45)",
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                Next.js · 3D · Performance
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 36,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 9999,
                  backgroundColor: "#34d399",
                  marginRight: 10,
                }}
              />
              <div
                style={{
                  fontSize: 15,
                  letterSpacing: 3,
                  color: "rgba(52,211,153,0.95)",
                  textTransform: "uppercase",
                  marginRight: 14,
                }}
              >
                LIVE
              </div>
              <div
                style={{
                  fontSize: 15,
                  letterSpacing: 3,
                  color: "rgba(207,239,255,0.35)",
                  textTransform: "uppercase",
                }}
              >
                · Core online
              </div>
            </div>
          </div>

          {/* Right reactor motif */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 300,
              height: 300,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 280,
                height: 280,
                borderRadius: 9999,
                border: "1px solid rgba(77,184,255,0.18)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 210,
                height: 210,
                borderRadius: 9999,
                border: "2px solid rgba(77,184,255,0.4)",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 140,
                height: 140,
                borderRadius: 9999,
                border: "1px solid rgba(184,192,208,0.4)",
              }}
            />
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 9999,
                background:
                  "radial-gradient(circle, #ffffff 0%, #4db8ff 50%, rgba(77,184,255,0.2) 100%)",
                boxShadow: "0 0 60px rgba(77,184,255,0.75)",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
