
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/portfolio.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'DATA ENGINEER // PYTHON SPECIALIST',
    'CLOUD DATA PIPELINES // AWS',
    'BIG DATA PROCESSING // PYSPARK',
    'DATA WAREHOUSING // SNOWFLAKE',
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;

    if (!section || !card || !content) return;

    const ctx = gsap.context(() => {
      // Cinematic entrance animation
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
      });

      tl.fromTo(
        section.querySelector('header'),
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          content.querySelectorAll('.hero-anim-item'),
          { y: 50, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: 0.12,
          },
          '-=0.7'
        )
        .fromTo(
          card,
          {
            scale: 0.75,
            opacity: 0,
            rotationY: 35,
            rotationX: -15,
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            rotationX: 0,
            duration: 1.4,
            ease: 'back.out(1.2)',
          },
          '-=0.9'
        );

      // Custom cursor initial state
      gsap.set([cursorDotRef.current, cursorRingRef.current], {
        scale: 0.5,
        opacity: 0,
        transformOrigin: '50% 50%',
      });

      // Disable custom cursor effects on touch devices
      const isTouchDevice = window.matchMedia(
        '(hover: none), (pointer: coarse)'
      ).matches;

      if (isTouchDevice) return;

      // Smooth cursor movement
      const xToDot = gsap.quickTo(cursorDotRef.current, 'x', {
        duration: 0.05,
        ease: 'power2.out',
      });

      const yToDot = gsap.quickTo(cursorDotRef.current, 'y', {
        duration: 0.05,
        ease: 'power2.out',
      });

      const xToRing = gsap.quickTo(cursorRingRef.current, 'x', {
        duration: 0.15,
        ease: 'power3.out',
      });

      const yToRing = gsap.quickTo(cursorRingRef.current, 'y', {
        duration: 0.15,
        ease: 'power3.out',
      });

      // 3D card movement
      const xTilt = gsap.quickTo(card, 'rotationY', {
        duration: 0.4,
        ease: 'power3.out',
      });

      const yTilt = gsap.quickTo(card, 'rotationX', {
        duration: 0.4,
        ease: 'power3.out',
      });

      const glareX = gsap.quickTo(glareRef.current, 'x', {
        duration: 0.3,
        ease: 'power2.out',
      });

      const glareY = gsap.quickTo(glareRef.current, 'y', {
        duration: 0.3,
        ease: 'power2.out',
      });

      const handleMouseMove = (e) => {
        const rect = section.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dotSize = 12;
        const ringSize = 48;

        // Spotlight tracking
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
        }

        // Custom cursor tracking
        xToDot(x - dotSize / 2);
        yToDot(y - dotSize / 2);
        xToRing(x - ringSize / 2);
        yToRing(y - ringSize / 2);

        // Card 3D tilt
        const cardRect = card.getBoundingClientRect();

        const cardCenterX =
          cardRect.left + cardRect.width / 2 - rect.left;

        const cardCenterY =
          cardRect.top + cardRect.height / 2 - rect.top;

        const rotateX =
          -((y - cardCenterY) / (cardRect.height / 2)) * 16;

        const rotateY =
          ((x - cardCenterX) / (cardRect.width / 2)) * 16;

        xTilt(rotateY);
        yTilt(rotateX);

        // Holographic glare
        glareX((x - cardCenterX) - cardRect.width / 2);
        glareY((y - cardCenterY) - cardRect.height / 2);
      };

      const handleMouseEnter = () => {
        gsap.to([cursorDotRef.current, cursorRingRef.current], {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });

        if (spotlightRef.current) {
          gsap.to(spotlightRef.current, {
            opacity: 1,
            duration: 0.3,
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to([cursorDotRef.current, cursorRingRef.current], {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.inOut',
        });

        if (spotlightRef.current) {
          gsap.to(spotlightRef.current, {
            opacity: 0,
            duration: 0.3,
          });
        }

        xTilt(0);
        yTilt(0);
      };

      section.addEventListener('mousemove', handleMouseMove);
      section.addEventListener('mouseenter', handleMouseEnter);
      section.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        section.removeEventListener('mousemove', handleMouseMove);
        section.removeEventListener('mouseenter', handleMouseEnter);
        section.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }

        @media (hover: hover) and (pointer: fine) {
          .custom-cursor-area {
            cursor: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>

      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span
                key={idx}
                className="text-[14vw] font-black text-green-600 mx-8 uppercase tracking-tighter"
              >
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mouse Spotlight - Sea Blue */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(circle, rgba(0,166,199,0.35) 0%, rgba(0,166,199,0.1) 40%, transparent 70%)',
        }}
      />

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-between pt-28 pb-10"
      >
        {/* Top Badge */}
        <div className="hero-anim-item flex flex-wrap items-center justify-between gap-4 w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-green-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-green-600 animate-ping" />

            <span className="text-green-500 font-bold tracking-wider">
              DATA ENGINEER PORTFOLIO
            </span>

            <span className="text-white/40">|</span>

            <span className="text-white/80">CHENNAI, INDIA</span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2 py-1 border border-white/20 rounded bg-black/40">
              BIG DATA
            </span>

            <span className="px-2 py-1 border border-white/20 rounded bg-black/40">
              ENGINEERING
            </span>
          </div>
        </div>

        {/* Main Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 my-auto py-12">

          {/* Left: Professional Introduction */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">

            <div className="hero-anim-item flex flex-wrap items-center gap-3">
              <span className="px-2.5 py-1 bg-green-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(0,166,199,0.5)]">
                2.5 YEARS
              </span>

              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">
                Data Engineering Professional
              </span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-6xl xl:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              DINESH K
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-600 to-green-700 drop-shadow-[0_0_35px_rgba(0,166,199,0.5)]">
                Data Engineer
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 text-xs font-mono text-green-400 font-bold">
              <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-500">
                PYTHON
              </span>

              <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-500">
                SQL
              </span>

              <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-500">
                PYSPARK
              </span>

              <span className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-green-500">
                AWS
              </span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/75 font-light leading-relaxed max-w-md">
              I am a Data Engineer focused on building scalable data
              pipelines, developing ETL workflows, processing large
              datasets, and delivering reliable cloud-based data
              solutions using Python, SQL, PySpark, and AWS.
            </p>

            <p className="hero-anim-item text-xs md:text-sm text-white/45 font-mono leading-relaxed">
              INGEST DATA. TRANSFORM INFORMATION. DELIVER INSIGHTS.
            </p>

            {/* Action Buttons */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#projects"
                className="px-7 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-green-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.2)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>

                View Projects
              </a>

              <a
                href="#contact"
                className="px-7 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4" />
                  <path d="M12 16h.01" />
                </svg>

                Contact Me
              </a>
            </div>
          </div>

          {/* Center: Profile Card */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Neon Glow - Green */}
              <div className="absolute -inset-3 bg-gradient-to-r from-green-600/70 via-green-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000" />

              {/* Profile Poster */}
              <div className="relative w-[260px] sm:w-[280px] md:w-[320px] p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-green-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">

                {/* Holographic Glare */}
                <div
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                />

                {/* Featured Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-green-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  DATA ENGINEER
                </div>

                <img
                  src={pictureImg}
                  alt="Dinesh Kumar portfolio profile"
                  className="w-full h-[310px] md:h-[390px] object-cover object-center rounded-xl filter contrast-110 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />

                {/* Profile Caption */}
                <div className="absolute bottom-6 left-6 right-6 z-30 bg-black/70 backdrop-blur-md border border-white/10 rounded-lg px-4 py-3">
                  <p className="text-white font-bold text-sm tracking-wide">
                    DINESH KUMAR
                  </p>

                  <p className="text-green-400 font-mono text-[10px] tracking-widest uppercase mt-1">
                    AWS Data Engineer • Pyspark Developer
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Expertise */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">

            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs w-full">
              <h3 className="text-xs font-mono uppercase tracking-widest text-green-500 font-bold mb-3">
                Core Technologies
              </h3>

              <div className="flex flex-wrap gap-2 lg:justify-end">
                {[
                  'Python',
                  'SQL',
                  'PySpark',
                  'AWS S3',
                  'AWS Glue',
                  'Lambda',
                  'Snowflake',
                  'Airflow',
                  'Athena',
                  'Redshift',
                  'Terraform',
                ].map((technology) => (
                  <span
                    key={technology}
                    className="text-[10px] font-mono text-white/75 bg-white/5 border border-white/10 px-2.5 py-1.5 rounded hover:border-green-500/50 hover:text-green-400 transition-colors"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs w-full">
              <h3 className="text-xs font-mono uppercase tracking-widest text-green-500 font-bold mb-2">
                Engineering Focus
              </h3>

              <p className="text-xs text-white/75 leading-relaxed font-light">
                ETL / ELT Pipelines, Cloud Data Engineering, Big Data
                Processing, Data Warehousing, Data Quality, and
                Workflow Orchestration.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Ticker */}
        <div className="hero-anim-item flex flex-wrap items-center justify-between gap-3 text-[10px] md:text-xs font-mono text-white/50 tracking-widest uppercase">
          <span>ENGINEERED FOR SCALABILITY</span>

          <span>CHENNAI • INDIA</span>

          <span>[ DATA ENGINEER PORTFOLIO ]</span>
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-green-600 rounded-full shadow-[0_0_15px_#00A6C7]"
      />

      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-green-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      />

      {/* Navbar */}
      <header className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <a
          href="#home"
          className="text-2xl font-black text-green-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(0,166,199,0.9)]"
        >
          DINESH
          <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="hover:text-green-500 transition-colors">
            Home
          </a>

          <a href="#about" className="hover:text-green-500 transition-colors">
            About
          </a>

          <a
            href="#expertise"
            className="hover:text-green-500 transition-colors"
          >
            Expertise
          </a>

          <a href="#skills" className="hover:text-green-500 transition-colors">
            Skills
          </a>

          <a
            href="#experience"
            className="hover:text-green-500 transition-colors"
          >
            Experience
          </a>

          <a
            href="#projects"
            className="hover:text-green-500 transition-colors"
          >
            Projects
          </a>

          <a
            href="#contact"
            className="hover:text-green-500 transition-colors"
          >
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="px-5 py-2 rounded bg-green-600 hover:bg-green-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(0,166,199,0.6)] hover:scale-105 active:scale-95"
        >
          Hire Me
        </a>
      </header>
    </section>
  );
};

export default Hero;
