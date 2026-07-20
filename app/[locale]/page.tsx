import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import BootSequence from "@/components/sections/BootSequence";
import Hero from "@/components/sections/Hero";
import SectionSkeleton from "@/components/ui/SectionSkeleton";

const About = dynamic(() => import("@/components/sections/About"), {
  loading: () => <SectionSkeleton id="about" />,
});
const Services = dynamic(() => import("@/components/sections/Services"), {
  loading: () => <SectionSkeleton id="services" />,
});
const Portfolio = dynamic(() => import("@/components/sections/Portfolio"), {
  loading: () => <SectionSkeleton id="portfolio" />,
});
const Process = dynamic(() => import("@/components/sections/Process"), {
  loading: () => <SectionSkeleton id="process" />,
});
const Testimonials = dynamic(
  () => import("@/components/sections/Testimonials"),
  {
    loading: () => <SectionSkeleton id="principles" />,
  }
);
const Faq = dynamic(() => import("@/components/sections/Faq"), {
  loading: () => <SectionSkeleton id="faq" />,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <SectionSkeleton id="contact" />,
});

export default function Home({
  params,
}: {
  params: { locale: string };
}) {
  setRequestLocale(params.locale);

  return (
    <>
      <BootSequence />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
