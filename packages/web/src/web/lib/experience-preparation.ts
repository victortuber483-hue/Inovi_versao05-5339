export const preparedHeroFrames = new Map<number, HTMLImageElement>();

export type PreparationState = { completed: number; total: number; failures: number; finished: boolean };

let state: PreparationState = { completed: 0, total: 0, failures: 0, finished: false };
let running: Promise<void> | undefined;
const listeners = new Set<(state: PreparationState) => void>();
const notify = () => listeners.forEach(listener => listener({ ...state }));

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    const timeout = window.setTimeout(() => reject(new Error(`Tempo de carregamento excedido: ${src}`)), 12000);
    image.onload = async () => {
      try {
        await image.decode();
        window.clearTimeout(timeout);
        resolve(image);
      } catch (error) { window.clearTimeout(timeout); reject(error); }
    };
    image.onerror = () => { window.clearTimeout(timeout); reject(new Error(`Falha ao carregar: ${src}`)); };
    image.src = src;
  });
}

function bounded(task: Promise<unknown>): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => reject(new Error("Tempo de preparação excedido")), 12000);
    task.then(value => { clearTimeout(timer); resolve(value); }, error => { clearTimeout(timer); reject(error); });
  });
}

export function subscribePreparation(listener: (state: PreparationState) => void) {
  listeners.add(listener);
  listener({ ...state });
  return () => { listeners.delete(listener); };
}

export function prepareExperience(retry = false) {
  if (running && !retry) return running;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const frameCount = reduced ? 1 : 24;
  const folder = window.innerWidth < 768 ? "dental-scroll-mobile" : "dental-scroll";
  const jobs: Array<() => Promise<unknown>> = [
    () => loadImage("/media/inovi-logo.png"),
    () => loadImage(`/${folder}/001.webp`),
    () => bounded(document.fonts.load("300 32px Poppins")),
    () => bounded(document.fonts.load("400 16px Poppins")),
    ...Array.from({ length: frameCount }, (_, index) => async () => {
      if (preparedHeroFrames.has(index)) return;
      const image = await loadImage(`/inovi-frames-hq/${String(index + 1).padStart(3, "0")}.webp`);
      preparedHeroFrames.set(index, image);
    }),
  ];
  state = { completed: 0, total: jobs.length, failures: 0, finished: false };
  notify();
  let next = 0;
  running = Promise.all(Array.from({ length: 4 }, async () => {
    while (next < jobs.length) {
      const job = jobs[next++];
      try { await job(); state.completed++; }
      catch { state.failures++; }
      notify();
    }
  })).then(() => { state.finished = true; notify(); });
  return running;
}