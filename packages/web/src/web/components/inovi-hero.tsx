import { SectionTextReveal } from "./section-text-reveal";
import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { InoviAnimation } from "./inovi-animation";

const contact = "https://wa.me/5583998247412?text=" + encodeURIComponent("Olá, equipe INOVI! Vim pelo site e gostaria de solicitar um orçamento para um caso de prótese dentária. Quais informações e arquivos preciso enviar para começarmos?");

export function InoviHero() {
  return (
    <section className="inovi-hero inovi-hero-immersive" aria-label="INOVI — Laboratório Dentário">
      <div className="inovi-animation-stage">
        <InoviAnimation />
      </div>
      <div className="inovi-below-animation">
        <a href="#" className="inovi-stage-brand" aria-label="INOVI Laboratório Dentário — início"><img src="/media/inovi-logo.png" alt="INOVI Laboratório Dentário" width="2100" height="749" /></a>
        <p className="inovi-eyebrow"><span /> LABORATÓRIO DE PRÓTESES DENTÁRIAS</p>
        <div className="inovi-copy">
          <h1><SectionTextReveal>Precisão em cada detalhe.<br /><span className="inovi-hero-title-accent">Naturalidade em cada sorriso.</span></SectionTextReveal></h1>
          <p className="inovi-description">Próteses dentárias que unem estética e função. Uma parceria com dentistas para cuidar do que faz cada sorriso único.</p>
          <a className="inovi-contact" href={contact} target="_blank" rel="noopener noreferrer">
            <span className="inovi-contact-icon" aria-hidden="true"><FaWhatsapp size={24} /></span>
            <span className="inovi-contact-label">Solicite seu orçamento</span>
            <span className="inovi-contact-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
          </a>
          <p className="inovi-contact-note">Converse com nossa equipe pelo WhatsApp</p>
        </div>
      </div>
    </section>
  );
}