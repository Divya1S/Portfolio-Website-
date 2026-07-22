/* ==========================================================================
   Divya S Rajput — Portfolio
   Vanilla JS. Each feature is an init function called from boot() at the end.
   ========================================================================== */
"use strict";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Theme toggle ---------- */
function initTheme() {
  const toggle = document.getElementById("theme-toggle");
  toggle.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    // Keep the browser UI color in sync (mobile address bar)
    document.querySelector('meta[name="theme-color"]').setAttribute(
      "content",
      next === "dark" ? "#171512" : "#faf9f7"
    );
  });
}

/* ---------- Nav: solid on scroll, scrollspy, mobile menu ---------- */
function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("nav-burger");
  const links = document.getElementById("nav-links");

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  burger.addEventListener("click", () => {
    const open = links.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  // Close the mobile menu after choosing a destination
  links.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      links.classList.remove("is-open");
      burger.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  // Scrollspy: highlight the nav link of the section in view
  const navAnchors = [...links.querySelectorAll("a")];
  const sections = navAnchors
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach((a) =>
          a.classList.toggle("is-active", a.getAttribute("href") === `#${entry.target.id}`)
        );
      });
    },
    { rootMargin: "-35% 0px -60% 0px" }
  );
  sections.forEach((s) => spy.observe(s));
}

/* ---------- Section reveal animations ---------- */
function initReveals() {
  const revealables = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    revealables.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );
  revealables.forEach((el) => io.observe(el));
}

/* ---------- Animated counters (hero fact strip) ---------- */
function initCounters() {
  const counters = document.querySelectorAll(".counter");
  const format = (el, value) =>
    el.dataset.format === "comma" ? Math.round(value).toLocaleString("en-US") : Math.round(value);

  const animate = (el) => {
    const target = parseFloat(el.dataset.count);
    const duration = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      el.textContent = format(el, target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (prefersReducedMotion) return; // keep the final values already in the HTML

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => io.observe(c));
}

/* ---------- GitHub repositories ----------
   Curated from github.com/Divya1S (54 public repos).
   cat: agents | llm | ml | web — drives the filter tabs.
   To add a repo, append an object here; the grid renders itself. */
const REPOS = [
  // — Agents —
  { name: "CarePilot", cat: "agents", lang: "Python",
    desc: "Multi-agent care coordination system that ingests health documents and resolves medication conflicts. FastAPI + SQLite.",
    topics: ["multi-agent", "healthcare"], url: "https://github.com/Divya1S/CarePilot" },
  { name: "a2a-healthcare-multiagent", cat: "agents", lang: "Jupyter Notebook",
    desc: "Healthcare multi-agent system with three specialized agents built on the Agent2Agent (A2A) protocol.",
    topics: ["a2a", "agents"], url: "https://github.com/Divya1S/a2a-healthcare-multiagent" },
  { name: "generative-ui-agents", cat: "agents", lang: "Jupyter Notebook",
    desc: "Full-stack interactive AI agents with CopilotKit and the AG-UI protocol, connecting LangChain and Google ADK agents to React UIs.",
    topics: ["ag-ui", "langchain"], url: "https://github.com/Divya1S/generative-ui-agents" },
  { name: "Agentic-API-Discovery-with-Knowledge-Graphs", cat: "agents", lang: "Jupyter Notebook",
    desc: "Transforms API specs into a knowledge graph, linking isolated APIs through business-process data for semantic discovery.",
    topics: ["knowledge-graphs"], url: "https://github.com/Divya1S/Agentic-API-Discovery-with-Knowledge-Graphs" },
  { name: "GoogleCloudPlatform-generative-ai-media", cat: "agents", lang: "Jupyter Notebook",
    desc: "Autonomous agents for high-quality image and video generation with intelligent prompting and multi-step evaluation.",
    topics: ["gcp", "media-gen"], url: "https://github.com/Divya1S/GoogleCloudPlatform-generative-ai-media" },
  { name: "Building-Multi-Agent-Apps-with-CrewAI", cat: "agents", lang: "Jupyter Notebook",
    desc: "Multi-agent application patterns with CrewAI — role-based crews, task delegation, and tool use.",
    topics: ["crewai"], url: "https://github.com/Divya1S/Building-Multi-Agent-Apps-with-CrewAI" },
  { name: "Building-Agentic-Systems-AutoGen", cat: "agents", lang: "Jupyter Notebook",
    desc: "Agentic system design with AutoGen — conversational multi-agent workflows and coordination.",
    topics: ["autogen"], url: "https://github.com/Divya1S/Building-Agentic-Systems-AutoGen" },
  { name: "Agent-Communication-Protocol", cat: "agents", lang: "Jupyter Notebook",
    desc: "Hands-on implementation of the Agent Communication Protocol (ACP) for interoperable agents.",
    topics: ["acp", "interop"], url: "https://github.com/Divya1S/Agent-Communication-Protocol" },
  { name: "SandboxSmith-AI-Agents-", cat: "agents", lang: "Jupyter Notebook",
    desc: "Experiments with sandboxed execution environments for AI agents.",
    topics: ["sandboxing"], url: "https://github.com/Divya1S/SandboxSmith-AI-Agents-" },
  { name: "Building-Database-Agent", cat: "agents", lang: "Jupyter Notebook",
    desc: "Natural-language database agents that query and reason over SQL data.",
    topics: ["sql-agents"], url: "https://github.com/Divya1S/Building-Database-Agent" },

  // — LLM · RAG · MCP —
  { name: "minigpt-jax-GeminiStack", cat: "llm", lang: "Jupyter Notebook",
    desc: "20M-parameter GPT-style language model built from scratch in JAX — preprocessing, transformer blocks, and training.",
    topics: ["jax", "transformers"], url: "https://github.com/Divya1S/minigpt-jax-GeminiStack" },
  { name: "Anthropic-MCP-Implementations", cat: "llm", lang: "Jupyter Notebook",
    desc: "Model Context Protocol servers and clients built on Anthropic's MCP.",
    topics: ["mcp", "anthropic"], url: "https://github.com/Divya1S/Anthropic-MCP-Implementations" },
  { name: "Using-MCP-Server-to-build-AI-Application", cat: "llm", lang: "Jupyter Notebook",
    desc: "Building AI applications backed by MCP servers for tool and data access.",
    topics: ["mcp"], url: "https://github.com/Divya1S/Using-MCP-Server-to-build-AI-Application" },
  { name: "Advanced-RAG-with-Chroma", cat: "llm", lang: "Jupyter Notebook",
    desc: "Advanced retrieval-augmented generation techniques with ChromaDB — query expansion and re-ranking.",
    topics: ["rag", "chromadb"], url: "https://github.com/Divya1S/Advanced-RAG-with-Chroma" },
  { name: "LangChain-RAG", cat: "llm", lang: "Jupyter Notebook",
    desc: "RAG pipelines with LangChain — loaders, splitters, embeddings, and retrieval chains.",
    topics: ["rag", "langchain"], url: "https://github.com/Divya1S/LangChain-RAG" },
  { name: "Reinforcement-Fine-Tuning-LLMs-with-GRPO", cat: "llm", lang: "Jupyter Notebook",
    desc: "Reinforcement fine-tuning of LLMs with GRPO (Group Relative Policy Optimization).",
    topics: ["rlhf", "grpo"], url: "https://github.com/Divya1S/Reinforcement-Fine-Tuning-LLMs-with-GRPO" },
  { name: "Serverless-LLM-Apps-using-Amazon-Bedrock", cat: "llm", lang: "Jupyter Notebook",
    desc: "Serverless LLM applications on Amazon Bedrock with Lambda-based orchestration.",
    topics: ["bedrock", "serverless"], url: "https://github.com/Divya1S/Serverless-LLM-Apps-using-Amazon-Bedrock" },
  { name: "Building-with-Llama-4-Scout-Maverick-MoE", cat: "llm", lang: "Jupyter Notebook",
    desc: "Exploring Llama 4 Scout and Maverick mixture-of-experts models.",
    topics: ["llama", "moe"], url: "https://github.com/Divya1S/Building-with-Llama-4-Scout-Maverick-MoE" },
  { name: "MongoDB-Prompt-Compression-and-Query-Optimization", cat: "llm", lang: "Jupyter Notebook",
    desc: "Prompt compression and vector query optimization with MongoDB.",
    topics: ["mongodb", "vector-search"], url: "https://github.com/Divya1S/MongoDB-Prompt-Compression-and-Query-Optimization" },
  { name: "LLM-Apps-with-LangChain", cat: "llm", lang: "Jupyter Notebook",
    desc: "LLM application patterns with LangChain — chains, memory, and evaluation.",
    topics: ["langchain"], url: "https://github.com/Divya1S/LLM-Apps-with-LangChain" },
  { name: "youtube-video-summarizer", cat: "llm", lang: "Jupyter Notebook",
    desc: "Python tool that summarizes YouTube videos from transcripts using AI-powered summarization.",
    topics: ["summarization"], url: "https://github.com/Divya1S/youtube-video-summarizer" },
  { name: "AI_Prompt_Engineering", cat: "llm", lang: "Jupyter Notebook",
    desc: "Prompt-engineering patterns and experiments.",
    topics: ["prompting"], url: "https://github.com/Divya1S/AI_Prompt_Engineering" },

  // — ML · CV · Inference —
  { name: "production-nemo-agents", cat: "ml", lang: "Jupyter Notebook",
    desc: "High-performance text and image generation with SGLang, focused on low-latency inference.",
    topics: ["sglang", "inference"], url: "https://github.com/Divya1S/production-nemo-agents" },
  { name: "SGLang-Low-Latency-Inference-", cat: "ml", lang: "Jupyter Notebook",
    desc: "Low-latency LLM inference experiments with SGLang.",
    topics: ["inference"], url: "https://github.com/Divya1S/SGLang-Low-Latency-Inference-" },
  { name: "Building-LLMOps-Pipelines-Google-Cloud", cat: "ml", lang: "Jupyter Notebook",
    desc: "LLMOps pipelines on Google Cloud — automation, deployment, and monitoring.",
    topics: ["llmops", "gcp"], url: "https://github.com/Divya1S/Building-LLMOps-Pipelines-Google-Cloud" },
  { name: "Astronomer-Airflow-GenAI-Apps", cat: "ml", lang: "Jupyter Notebook",
    desc: "Orchestrating GenAI applications with Apache Airflow (Astronomer).",
    topics: ["airflow"], url: "https://github.com/Divya1S/Astronomer-Airflow-GenAI-Apps" },
  { name: "Diffusion-Models", cat: "ml", lang: "Jupyter Notebook",
    desc: "Diffusion model implementations — sampling, training, and noise schedules.",
    topics: ["diffusion"], url: "https://github.com/Divya1S/Diffusion-Models" },
  { name: "NeRF", cat: "ml", lang: "Jupyter Notebook",
    desc: "Neural Radiance Fields for novel view synthesis.",
    topics: ["nerf", "3d-vision"], url: "https://github.com/Divya1S/NeRF" },
  { name: "go-game-ai-alphabeta", cat: "ml", lang: "HTML",
    desc: "Game-playing AI for Go using minimax search with alpha–beta pruning.",
    topics: ["game-ai", "search"], url: "https://github.com/Divya1S/go-game-ai-alphabeta" },
  { name: "Diabetic-Retinopathy-Image-Classifier", cat: "ml", lang: "Jupyter Notebook",
    desc: "Deep-learning classifier for diabetic retinopathy detection from retinal images.",
    topics: ["medical-imaging"], url: "https://github.com/Divya1S/Diabetic-Retinopathy-Image-Classifier" },
  { name: "Dental-Caries-Detection", cat: "ml", lang: "Jupyter Notebook",
    desc: "Computer-vision pipeline for detecting dental caries from imagery.",
    topics: ["medical-imaging"], url: "https://github.com/Divya1S/Dental-Caries-Detection" },
  { name: "Automated-Hate-Speech-Detection", cat: "ml", lang: "Python",
    desc: "NLP pipeline for automated hate-speech detection.",
    topics: ["nlp"], url: "https://github.com/Divya1S/Automated-Hate-Speech-Detection" },
  { name: "HuggingFace-Gradio-Generative-AI", cat: "ml", lang: "Jupyter Notebook",
    desc: "Generative AI demos with Hugging Face models and Gradio interfaces.",
    topics: ["huggingface", "gradio"], url: "https://github.com/Divya1S/HuggingFace-Gradio-Generative-AI" },

  // — Web —
  { name: "Multiplayer-Chess-Game", cat: "web", lang: "TypeScript",
    desc: "Real-time multiplayer chess game built in TypeScript.",
    topics: ["websockets", "games"], url: "https://github.com/Divya1S/Multiplayer-Chess-Game" },
  { name: "bigquery-release-notes", cat: "web", lang: "CSS",
    desc: "Flask dashboard that tracks Google BigQuery release notes from the official feed.",
    topics: ["flask", "dashboard"], url: "https://github.com/Divya1S/bigquery-release-notes" },
  { name: "react-express-docker", cat: "web", lang: "CSS",
    desc: "Full-stack React + Express application, containerized with Docker.",
    topics: ["react", "docker"], url: "https://github.com/Divya1S/react-express-docker" },
  { name: "HackSC", cat: "web", lang: "Jupyter Notebook",
    desc: "Hackathon project work from HackSC.",
    topics: ["hackathon"], url: "https://github.com/Divya1S/HackSC" },
  { name: "Spotify-Clone", cat: "web", lang: "HTML",
    desc: "Spotify UI clone in vanilla HTML, CSS, and JavaScript.",
    topics: ["ui"], url: "https://github.com/Divya1S/Spotify-Clone" },
];

/* GitHub's standard language colors */
const LANG_COLORS = {
  Python: "#3572A5",
  "Jupyter Notebook": "#DA5B0B",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

function initRepos() {
  const grid = document.getElementById("repo-grid");

  grid.innerHTML = REPOS.map((repo) => {
    const color = LANG_COLORS[repo.lang] || "";
    const topics = repo.topics.map((t) => `<span>${t}</span>`).join("");
    return `
      <a class="repo" data-cat="${repo.cat}" href="${repo.url}" target="_blank" rel="noopener" aria-label="${repo.name} on GitHub">
        <span class="repo-top"><span class="repo-name">${repo.name}</span><span class="repo-arrow" aria-hidden="true">↗</span></span>
        <span class="repo-desc">${repo.desc}</span>
        <span class="repo-meta">
          <span class="lang"><i style="--c:${color}"></i>${repo.lang}</span>
          ${topics}
        </span>
      </a>`;
  }).join("");

  // Filters
  const tabs = document.querySelectorAll(".tab");
  const cards = grid.querySelectorAll(".repo");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
      const filter = tab.dataset.filter;
      cards.forEach((card, i) => {
        const show = filter === "all" || card.dataset.cat === filter;
        card.classList.toggle("is-hidden", !show);
        // Replay the entrance fade with a light stagger
        if (show && !prefersReducedMotion) {
          card.style.animation = "none";
          void card.offsetWidth; // force reflow so the animation can restart
          card.style.animation = `repo-in 0.4s cubic-bezier(0.25,0.6,0.3,1) ${Math.min(i * 0.015, 0.25)}s both`;
        }
      });
    });
  });
}

/* ---------- Boot ---------- */
function boot() {
  document.getElementById("year").textContent = new Date().getFullYear();
  initTheme();
  initNav();
  initRepos(); // render repo cards before wiring the reveal observer
  initReveals();
  initCounters();
}

boot();
