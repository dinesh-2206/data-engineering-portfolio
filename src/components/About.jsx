
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardRefs.current.filter(Boolean);

    const animation = gsap.fromTo(
      cards,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    const listeners = [];

    cards.forEach((card) => {
      const listener = (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      };

      card.addEventListener('mousemove', listener);
      listeners.push({ card, listener });
    });

    return () => {
      listeners.forEach(({ card, listener }) => {
        card.removeEventListener('mousemove', listener);
      });

      animation.scrollTrigger?.kill();
      animation.kill();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  const technologies = [
    'Python',
    'SQL',
    'PySpark',
    'AWS S3',
    'AWS Glue',
    'AWS Lambda',
    'AWS EC2',
    'AWS Athena',
    'Snowflake',
    'Redshift',
    'Apache Airflow',
    'MWAA',
    'EventBridge',
    'CloudWatch',
    'SNS',
    'IAM',
    'Terraform',
    'Git',
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-32 px-6 md:px-12 flex flex-col justify-center overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">

        {/* Section Header */}
        <div className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-green-600/40 text-xs font-mono uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />
            <span className="text-green-500 font-bold">EPISODE 01</span>
            <span className="text-white/40">|</span>
            <span>ABOUT THE ENGINEER</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            BEHIND THE DATA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-600 to-green-700">
              ENGINEERING STORY.
            </span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Card 1: Professional Background */}
          <div
            ref={addToRefs}
            className="md:col-span-7 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-green-600/60 transition-all duration-500 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              01
            </div>

            <div className="space-y-5 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-green-500 font-bold">
                Professional Profile
              </h3>

              <p className="text-lg md:text-xl font-medium text-white/90 leading-relaxed">
                I'm <span className="text-white font-bold">Dinesh Kumar</span>,
                a Data Engineer passionate about building scalable,
                reliable, and efficient data pipelines using Python,
                SQL, PySpark, and AWS.
              </p>

              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                With 2.5 years of experience in software development
                and data engineering, I specialize in developing
                ETL/ELT workflows, cloud-based data integration,
                data transformation, data quality validation,
                and data warehousing solutions.
              </p>

              <p className="text-sm md:text-base text-white/60 font-light leading-relaxed">
                I enjoy transforming complex raw data into
                meaningful, analytics-ready datasets that help
                businesses make better decisions.
              </p>
            </div>

            <div className="pt-8 flex flex-wrap gap-2 relative z-10">
              {['Data Engineering', 'Cloud Computing', 'ETL / ELT', 'Data Warehousing'].map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2: Experience */}
          <div
            ref={addToRefs}
            className="md:col-span-5 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between relative group hover:border-green-600/60 transition-all duration-500 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)',
              }}
            />

            <div className="absolute top-0 right-0 p-8 text-white/5 font-mono text-7xl font-black pointer-events-none">
              02
            </div>

            <div className="space-y-6 relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-green-500 font-bold">
                Career Journey
              </h3>

              <div className="border-l-2 border-green-600/50 pl-5 space-y-2">
                <h4 className="text-lg font-bold text-white">
                  SANeForce
                </h4>
                <p className="text-xs text-green-500 font-mono">
                  APR 2024 — MAY 2026
                </p>
                <p className="text-sm text-white/60">
                  Data Engineering, Python, SQL, ETL pipelines,
                  and cloud-based data processing.
                </p>
              </div>

              <div className="border-l-2 border-white/20 pl-5 space-y-2">
                <h4 className="text-lg font-bold text-white">
                  ZF Commercial Vehicle Systems
                </h4>
                <p className="text-xs text-green-500 font-mono">
                  OCT 2023 — JAN 2024
                </p>
                <p className="text-sm text-white/60">
                  Automotive data integration, AWS,
                  PySpark, SQL, and analytics.
                </p>
              </div>
            </div>

            <div className="pt-6 font-mono text-xs text-white/40 relative z-10">
              // BUILDING DATA SOLUTIONS
            </div>
          </div>

          {/* Card 3: Technical Ecosystem */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl relative group hover:border-green-600/60 transition-all duration-500 overflow-hidden"
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(500px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.12), transparent 70%)',
              }}
            />

            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-green-500 font-bold">
                  Technical Ecosystem
                </h3>
                <p className="text-base md:text-lg font-semibold text-white">
                  Technologies and tools I use to build
                  production-ready data solutions.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs md:text-sm font-mono text-white/80 hover:bg-green-600/20 hover:border-green-600/50 hover:scale-105 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Card 4: Core Expertise */}
          <div
            ref={addToRefs}
            className="md:col-span-12 p-8 md:p-12 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl relative group hover:border-green-600/60 transition-all duration-500"
          >
            <div className="relative z-10">
              <h3 className="text-xs font-mono uppercase tracking-widest text-green-500 font-bold mb-6">
                Core Expertise
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  ['01', 'Data Pipeline Development', 'Building scalable ETL and ELT pipelines.'],
                  ['02', 'Cloud Data Engineering', 'AWS-based ingestion and processing solutions.'],
                  ['03', 'Big Data Processing', 'PySpark transformations and optimization.'],
                  ['04', 'Data Warehousing', 'Snowflake, Redshift, and dimensional modelling.'],
                  ['05', 'Workflow Orchestration', 'Airflow, MWAA, and EventBridge.'],
                  ['06', 'Data Quality', 'Validation, reconciliation, and deduplication.'],
                ].map(([number, title, description]) => (
                  <div key={number} className="border border-white/10 rounded-2xl p-5 hover:border-green-600/50 transition-all">
                    <span className="text-green-500 font-mono text-sm">{number}</span>
                    <h4 className="text-white font-bold mt-3 mb-2">{title}</h4>
                    <p className="text-sm text-white/50">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
