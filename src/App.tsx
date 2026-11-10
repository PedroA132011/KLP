import { useEffect, useRef, useState } from "react";

const WA = "https://wa.me/554999844396";
const IG = "https://www.instagram.com/klp.show/";
const img = {
  hero: "https://images.unsplash.com/photo-1546708770-589dab7b22c7?auto=format&fit=crop&w=2000&q=88",
  crowd:
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1500&q=84",
  stage:
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1500&q=84",
  guitar:
    "https://images.unsplash.com/photo-1566150951155-4a59643d8a9f?auto=format&fit=crop&w=1400&q=84",
  acoustic:
    "https://images.unsplash.com/photo-1647265194908-6815badcc397?auto=format&fit=crop&w=1400&q=84",
  lights:
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1500&q=84",
  audience:
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1500&q=84",
  live: "https://images.unsplash.com/photo-1515175192010-cf3250992719?auto=format&fit=crop&w=1700&q=84",
};
const nav = [
  ["Início", "inicio"],
  ["Sobre", "sobre"],
  ["Repertório", "repertorio"],
  ["Integrantes", "integrantes"],
  ["Galeria", "galeria"],
  ["Contato", "contato"],
];
const chapters = [
  [
    "Música gaúcha",
    "gaucha",
    [
      [
        "A tradição que move gerações",
        "NOSSA CULTURA,|NOSSA MÚSICA.",
        "A música gaúcha ganha o palco com respeito às raízes, presença e aquela conexão que atravessa gerações.",
        img.acoustic,
      ],
      [
        "A essência dos bailes",
        "É HORA DE|DANÇAR!",
        "No baile, a música vira encontro. Ritmo, movimento e uma energia feita para aproximar a banda e o público.",
        img.crowd,
      ],
    ],
  ],
  [
    "Rock",
    "rock",
    [
      [
        "Atitude, guitarra e personalidade",
        "QUANDO O ROCK|SOBE AO PALCO.",
        "Do nacional ao internacional, o rock entra no repertório com guitarras marcantes, pulso e personalidade.",
        img.guitar,
      ],
      [
        "A energia que contagia",
        "VOLUME NO ALTO.|ENERGIA LÁ EM CIMA.",
        "Luz, palco e instrumentos em sintonia para entregar a intensidade que só o rock ao vivo tem.",
        img.stage,
      ],
    ],
  ],
  [
    "MPB",
    "mpb",
    [
      [
        "Música que conta histórias",
        "MELODIAS|QUE MARCAM.",
        "Interpretação, musicalidade e canções que criam respiro, emoção e novas memórias em cada apresentação.",
        img.acoustic,
      ],
      [
        "Cada canção, uma experiência",
        "DA EMOÇÃO|À CONEXÃO.",
        "Momentos mais próximos e sensíveis conectam diferentes gerações por meio da música brasileira.",
        img.live,
      ],
    ],
  ],
  [
    "Sertanejo",
    "sertanejo",
    [
      [
        "O som que todo mundo conhece",
        "MODA BOA|NÃO PODE FALTAR.",
        "O sertanejo chega com calor, proximidade e espaço garantido para os refrões que o público reconhece.",
        img.lights,
      ],
      [
        "Música para cantar junto",
        "QUANDO A GALERA|CANTA JUNTO.",
        "A melhor parte acontece quando palco e pista viram uma coisa só. É música feita para compartilhar.",
        img.crowd,
      ],
    ],
  ],
  [
    "Pop + outros estilos",
    "pop",
    [
      [
        "Diversidade que faz a diferença",
        "UM REPERTÓRIO|SEM LIMITES.",
        "Pop e diferentes sonoridades ampliam a experiência e deixam cada evento com a sua própria dinâmica.",
        img.stage,
      ],
      [
        "Para todos os gostos",
        "TEM MÚSICA|PARA TODO MUNDO.",
        "Versatilidade para ler o público, atravessar estilos e manter a energia certa do primeiro ao último acorde.",
        img.audience,
      ],
    ],
  ],
] as const;

function Arrow({ left = false }: { left?: boolean }) {
  return (
    <svg viewBox="0 0 24 24">
      <path d={left ? "M19 12H5m5-5-5 5 5 5" : "M5 12h14m-5-5 5 5-5 5"} />
    </svg>
  );
}
function Instagram() {
  return (
    <svg viewBox="0 0 24 24">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" />
    </svg>
  );
}
function Logo() {
  return (
    <a href="#inicio" className="logo" aria-label="KLP Show">
      <span>KLP</span>
      <b>SHOW</b>
    </a>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false),
    [menu, setMenu] = useState(false),
    [slide, setSlide] = useState(0),
    [modal, setModal] = useState<string | null>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 40);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const ob = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((e) => ob.observe(e));
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(null);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", handleKeyDown);
      ob.disconnect();
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = modal || menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal, menu]);
  const move = (d: number) => {
    const n = Math.max(0, Math.min(3, slide + d));
    setSlide(n);
    if (track.current && track.current.children[n]) {
      const target = track.current.children[n] as HTMLElement;
      track.current.scrollTo({
        left: target.offsetLeft - track.current.offsetLeft,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="site">
      <header className={scrolled ? "solid" : ""}>
        <Logo />
        <nav className={menu ? "open" : ""}>
          {nav.map(([a, b]) => (
            <a href={"#" + b} onClick={() => setMenu(false)} key={b}>
              {a}
            </a>
          ))}
          <a className="navCta" href={WA} target="_blank" rel="noreferrer">
            Contrate a banda <Arrow />
          </a>
        </nav>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Abrir menu">
          <i />
          <i />
        </button>
      </header>
      <main>
        <section className="hero" id="inicio">
          <img src={img.hero} alt="Palco de música ao vivo visto do público" />
          <div className="shade" />
          <div className="heroCopy">
            <p className="eyebrow">— KLP Show · Música ao vivo</p>
            <h1>
              DO NOSSO JEITO,
              <br />
              <em>DO JEITO QUE A</em>
              <br />
              GALERA GOSTA.
            </h1>
            <p>
              Música, energia e versatilidade para transformar seu evento em um momento
              inesquecível.
            </p>
            <div className="actions">
              <a className="btn red" href={WA} target="_blank" rel="noreferrer">
                Contrate a banda <Arrow />
              </a>
              <a className="btn line" href="#repertorio">
                Conheça nosso trabalho
              </a>
            </div>
          </div>
          <small>KLP Show · Música Ao Vivo</small>
          <a className="scroll" href="#sobre">
            Role para sentir ↓
          </a>
        </section>
        <section className="about pad" id="sobre">
          <Label text="01 — Sobre" />
          <div className="reveal copy">
            <p className="eyebrow">Um show feito de encontros</p>
            <h2>
              MUITO MAIS
              <br />
              QUE <em>MÚSICA.</em>
            </h2>
            <p className="lead">
              O KLP Show é uma banda que acredita na música como forma de conectar pessoas, criar
              momentos e animar diferentes ocasiões.
            </p>
            <p>
              Com um repertório diversificado, passeamos por diferentes estilos musicais, levando
              nossa identidade e energia para cada apresentação.
            </p>
          </div>
          <div className="aboutPics reveal">
            <img src={img.live} alt="Luzes e público em uma apresentação" />
            <img src={img.guitar} alt="Detalhe de guitarra no palco" />
          </div>
        </section>
        <section className="repertoire pad" id="repertorio">
          <Label text="02 — Universo musical" />
          <div className="reveal">
            <p className="eyebrow">Muitos estilos. Uma identidade.</p>
            <h2>
              O SOM QUE
              <br />
              <em>MOVE A PISTA.</em>
            </h2>
          </div>
          <p className="reveal">
            Da tradição ao pop, cada repertório ganha a energia do KLP Show. Uma experiência
            construída para acompanhar o clima do seu evento e o ritmo de quem está na pista.
          </p>
        </section>
        {chapters.map(([genre, cls, rows], ci) => (
          <section className={"chapter " + cls} key={genre}>
            <div className="chapterHead">
              <b>0{ci + 1}</b>
              <span>{genre}</span>
              <i />
            </div>
            {rows.map(([sub, title, text, pic], ri) => (
              <article className={"music reveal " + (ri ? "reverse" : "")} key={title}>
                <figure>
                  <img src={pic} alt={"KLP Show — " + sub} loading="lazy" />
                  <figcaption>KLP Show ao vivo</figcaption>
                </figure>
                <div>
                  <small>{sub}</small>
                  <h3>
                    {title.split("|").map((x, i) => (
                      <span key={x}>
                        {x}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p>{text}</p>
                  <div className="wave">ııııııı</div>
                </div>
              </article>
            ))}
            {ci === 4 && (
              <blockquote>
                “Do nosso jeito, <em>do jeito que a galera gosta.</em>”
              </blockquote>
            )}
          </section>
        ))}
        <section className="members pad" id="integrantes">
          <Label text="03 — Integrantes" />
          <div className="memberHead reveal">
            <div>
              <p className="eyebrow">Quem faz o KLP Show</p>
              <h2>
                POR TRÁS DA MÚSICA,
                <br />
                <em>EXISTEM PESSOAS.</em>
              </h2>
            </div>
            <p>
              Conheça os músicos e a equipe que transformam cada evento em um show inesquecível.
            </p>
          </div>
          <div className="track" ref={track}>
            {[
              { num: "01", name: "Vocal & Violão", role: "Voz Principal", tag: "Palco" },
              { num: "02", name: "Acordeon & Teclas", role: "Harmonia & Tradição", tag: "Música" },
              { num: "03", name: "Guitarras & Baixo", role: "Arranjos & Riffs", tag: "Pressão" },
              { num: "04", name: "Bateria & Percussão", role: "Ritmo & Pista", tag: "Groove" },
            ].map((m, i) => (
              <article className={i === slide ? "active" : ""} key={m.num}>
                <div className="person">
                  <b>{m.num}</b>
                  <svg viewBox="0 0 80 80">
                    <circle cx="40" cy="27" r="14" />
                    <path d="M15 72c2-19 12-29 25-29s23 10 25 29" />
                  </svg>
                  <small>KLP Show</small>
                </div>
                <span>{m.tag}</span>
                <h3>{m.name}</h3>
                <p>{m.role}</p>
              </article>
            ))}
          </div>
          <div className="controls">
            <span>
              <b>0{slide + 1}</b> / 04
            </span>
            <button onClick={() => move(-1)} aria-label="Anterior">
              <Arrow left />
            </button>
            <button onClick={() => move(1)} aria-label="Próximo">
              <Arrow />
            </button>
          </div>
        </section>
        <section className="gallery pad" id="galeria">
          <Label text="04 — Galeria" />
          <div className="galleryHead reveal">
            <div>
              <p className="eyebrow">Momentos KLP Show</p>
              <h2>
                NOSSO PALCO,
                <br />
                <em>NOSSA HISTÓRIA.</em>
              </h2>
            </div>
            <p>
              Uma seleção de momentos, energia e conexão do KLP Show com o público em cada evento.
            </p>
          </div>
          <div className="grid reveal">
            {[img.stage, img.crowd, img.guitar, img.lights, img.audience].map((x, i) => (
              <button onClick={() => setModal(x)} key={x}>
                <img src={x} alt={"Atmosfera de show " + (i + 1)} loading="lazy" />
                <span>
                  0{i + 1} <b>Ampliar +</b>
                </span>
              </button>
            ))}
          </div>
          <a className="igLink" href={IG} target="_blank" rel="noreferrer">
            <Instagram /> Acompanhe os registros reais em <b>@klp.show</b>
            <Arrow />
          </a>
        </section>
        <section className="contact" id="contato">
          <img src={img.live} alt="Palco iluminado" />
          <div className="shade" />
          <div className="reveal">
            <p className="eyebrow">Leve essa energia para o seu evento</p>
            <h2>
              SEU EVENTO MERECE
              <br />
              UMA TRILHA SONORA
              <br />
              <em>ESPECIAL.</em>
            </h2>
            <p>
              Está organizando um baile, festa ou evento? Leve o KLP Show para fazer parte desse
              momento.
            </p>
            <a className="btn red" href={WA} target="_blank" rel="noreferrer">
              Fale com a gente <Arrow />
            </a>
          </div>
        </section>
        <section className="social pad">
          <Instagram />
          <div>
            <p className="eyebrow">Bastidores, agenda e palco</p>
            <h2>
              ACOMPANHE
              <br />
              <em>O KLP SHOW.</em>
            </h2>
          </div>
          <div>
            <p>Confira nossas apresentações, novidades e momentos nos bastidores.</p>
            <a className="btn dark" href={IG} target="_blank" rel="noreferrer">
              Seguir @klp.show <Arrow />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <div className="foot">
          <Logo />
          <p>
            “Do nosso jeito,
            <br />
            do jeito que a galera gosta.”
          </p>
          <div>
            {nav.map(([a, b]) => (
              <a href={"#" + b} key={b}>
                {a}
              </a>
            ))}
          </div>
          <div>
            <a href={IG} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
            <a href={WA} target="_blank" rel="noreferrer">
              WhatsApp ↗
            </a>
          </div>
        </div>
        <div className="legal">
          © {new Date().getFullYear()} KLP Show. Todos os direitos reservados.
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
      {modal && (
        <div
          className="lightbox"
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visualização de imagem"
        >
          <button
            type="button"
            onClick={() => setModal(null)}
            aria-label="Fechar visualização"
          >
            Fechar ×
          </button>
          <img
            src={modal}
            alt="Imagem ampliada"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
function Label({ text }: { text: string }) {
  return <div className="label">{text}</div>;
}
