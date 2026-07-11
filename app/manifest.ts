import { MetadataRoute } from "next";
import { seoCopy } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ARC WEB",
    short_name: "ARC WEB",
    description: seoCopy.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0e14",
    theme_color: "#0a0e14",
    lang: "pt-BR",
    categories: ["business", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
