// src/pages/Realizacje/Realizacje.jsx
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import CtaBanner from "../../components/CtaBanner/CtaBanner";
import { useReveal } from "../../hooks/useReveal";
import "../Oferta/Oferta.css";
import "./Realizacje.css";

const PROJECTS = [
  {
    id: 1,
    title: "Dom Jednorodzinny – Piekary Śląskie",
    year: 2023,
    img: "",
  },
  {
    id: 2,
    title: "Hala Produkcyjna – Bytom",
    year: 2023,
    img: "",
  },
  {
    id: 3,
    title: "Osiedle Domków – Radzionków",
    year: 2022,
    type: "Deweloper",
    img: "",
  },
  {
    id: 4,
    title: "",
    year: 2022,
    img: "",
  },
  {
    id: 5,
    title: "Budynek Usługowy – Chorzów",
    year: 2021,
    img: "",
  },
  {
    id: 6,
    title: "Fundament Mostu – Siemianowice",
    year: 2021,
    img: "",
  },
];

function ProjectCard({ project, index }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className="project-card reveal"
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      <div className="project-card__img-wrap">
        <img
          src={project.img}
          alt={project.title}
          className="project-card__img"
          loading="lazy"
        />
      </div>
      <div className="project-card__body">
        <span className="project-card__year">{project.year}</span>
        <h3 className="project-card__title">{project.title}</h3>
      </div>
    </div>
  );
}

export default function Realizacje() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <p className="page-hero__eyebrow">Portfolio</p>
          <h1 className="page-hero__title">Nasze Realizacje</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Projekty"
            title={
              <>
                Co już
                <br />
                Zbudowaliśmy
              </>
            }
            subtitle="Każdy projekt to dowód naszego zaangażowania i precyzji. Poniżej prezentujemy wybrane realizacje z ostatnich lat."
          />
          <div className="projects__grid">
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
