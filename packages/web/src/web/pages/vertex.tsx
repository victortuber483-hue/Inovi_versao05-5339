import { useRef } from "react";
import { usePageBlurReveal } from "../hooks/use-page-blur-reveal";
import { InoviHero } from "../components/inovi-hero";
import { VertexBio } from "../components/vertex-bio";
import { InoviWhatsapp } from "../components/inovi-whatsapp";
import { InoviScrollProsthesis } from "../components/inovi-scroll-prosthesis";
import { InoviFooter } from "../components/inovi-footer";

export default function Vertex() {
  const root = useRef<HTMLDivElement>(null);
  usePageBlurReveal(root);
  return (
    <div ref={root}>
      <main className="inovi-migration">
        <InoviHero />
        <InoviScrollProsthesis />
        <VertexBio />
      </main>
      <InoviFooter />
      <InoviWhatsapp />
    </div>
  );
}