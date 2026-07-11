import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";

/**
 * Crawl policy: open index for search + major AI crawlers (GEO visibility).
 * llms.txt is served from /public for agent-readable site summary.
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  const allowAll = {
    allow: "/",
  } as const;

  return {
    rules: [
      { userAgent: "*", ...allowAll },
      // Answer / AI engines
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "ChatGPT-User", ...allowAll },
      { userAgent: "OAI-SearchBot", ...allowAll },
      { userAgent: "Google-Extended", ...allowAll },
      { userAgent: "Googlebot", ...allowAll },
      { userAgent: "Googlebot-Image", ...allowAll },
      { userAgent: "Bingbot", ...allowAll },
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      { userAgent: "anthropic-ai", ...allowAll },
      { userAgent: "Applebot", ...allowAll },
      { userAgent: "Applebot-Extended", ...allowAll },
      { userAgent: "meta-externalagent", ...allowAll },
      { userAgent: "Bytespider", ...allowAll },
      { userAgent: "CCBot", ...allowAll },
      { userAgent: "cohere-ai", ...allowAll },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl.replace(/^https?:\/\//, ""),
  };
}
