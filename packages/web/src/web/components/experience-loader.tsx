import { useEffect, useState, type ReactNode } from "react";
import { prepareExperience, subscribePreparation, type PreparationState } from "../lib/experience-preparation";

export function ExperienceLoader({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<PreparationState>({ completed: 0, total: 0, failures: 0, finished: false });
  const [entered, setEntered] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const percent = progress.total ? Math.floor(progress.completed / progress.total * 100) : 0;
  const success = progress.finished && progress.failures === 0;

  useEffect(() => {
    const unsubscribe = subscribePreparation(setProgress);
    void prepareExperience();
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!success) return;
    const timer = window.setTimeout(() => setEntered(true), 350);
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    if (!entered) return;
    const timer = window.setTimeout(() => setDismissed(true), 850);
    return () => clearTimeout(timer);
  }, [entered]);

  useEffect(() => {
    if (dismissed) return;
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
    };
  }, [dismissed]);

  return <>
    {entered && <div inert={!dismissed}>{children}</div>}
    {!dismissed && <div className={`inovi-experience-loader${entered ? " is-leaving" : ""}`} aria-hidden={entered}>
      <div className="experience-loader-content">
        <h1>Preparando cada detalhe.</h1>
        <div className="experience-loader-meter" role="progressbar" aria-label="Preparação da experiência inicial" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
          <span style={{ width: `${percent}%` }} />
        </div>
        <div className="experience-loader-progress"><strong>{percent}%</strong></div>
        {progress.finished && progress.failures > 0 && <p className="experience-loader-note" role="status">Alguns detalhes não carregaram.</p>}
        {progress.finished && progress.failures > 0 && <div className="experience-loader-actions">
          <button onClick={() => void prepareExperience(true)}>Tentar novamente</button>
          <button onClick={() => setEntered(true)}>Entrar sem esperar</button>
        </div>}
      </div>
    </div>}
  </>;
}