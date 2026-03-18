// src/pages/Realizacje/Realizacje.jsx
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import CtaBanner    from '../../components/CtaBanner/CtaBanner';
import { useReveal } from '../../hooks/useReveal';
import img1 from '../../assets/20230809_135439-2048x1153.jpg';
import img2 from '../../assets/20230711_154816-scaled-e1707271925260.jpg';
import img3 from '../../assets/20221130_105841-1-1536x2048.jpg';
import img4 from '../../assets/20230915_170846-2048x1153.jpg';
import img5 from '../../assets/20230718_100748-scaled.jpg';
import img6 from '../../assets/20220706_120424-scaled-e1707272113907-1140x2048.jpg';
import '../Oferta/Oferta.css';
import './Realizacje.css';

const PROJECTS = [
  { id: 1, title: 'Pompowanie betonu — osiedle mieszkaniowe',      year: 2023, type: 'Pompa',     img: img1 },
  { id: 2, title: 'Betonowanie fundamentu płytowego',               year: 2023, type: 'Fundament', img: img2 },
  { id: 3, title: 'Posadzka w hali produkcyjnej',                   year: 2022, type: 'Posadzka',  img: img3 },
  { id: 4, title: 'Betonowanie stropu — dom jednorodzinny',         year: 2023, type: 'Strop',     img: img4 },
  { id: 5, title: 'Dostawa gruszką w trudno dostępne miejsce',      year: 2023, type: 'Transport', img: img5 },
  { id: 6, title: 'Pompowanie na wyższe kondygnacje',               year: 2022, type: 'Pompa',     img: img6 },
];

function ProjectCard({ project, index }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="project-card reveal" style={{ transitionDelay: `${index * 0.08}s` }}>
      <div className="project-card__img-wrap">
        <img src={project.img} alt={project.title} className="project-card__img" loading="lazy" />
        <span className="project-card__type">{project.type}</span>
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
          <h1 className="page-hero__title">Nasze<br />Realizacje</h1>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="Projekty"
            title={<>Co już<br />Zrealizowaliśmy</>}
            subtitle="Zapraszamy do zapoznania się z naszymi realizacjami, które świadczą o profesjonalizmie i doświadczeniu. Każde zdjęcie to dowód zaangażowania zespołu Siejkom Invest."
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
