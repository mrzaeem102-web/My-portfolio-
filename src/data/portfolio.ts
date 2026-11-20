import type { LucideIcon } from "lucide-react";
import {
  Bot,
  BrainCircuit,
  Briefcase,
  ChartCandlestick,
  ChartLine,
  Code2,
  Flower2,
  Languages,
  MessageCircle,
  Network,
  Scale,
  ScanEye,
  Sparkles,
  Stethoscope,
  Table2,
  TrendingUp,
  Workflow,
} from "lucide-react";

export const socialProfiles = [
  {
    name: "GitHub",
    href: "https://github.com/mrzaeem102-web",
    icon: "github",
    description: "Browse public repositories and project code.",
  },
  {
    name: "Hugging Face",
    href: "https://huggingface.co/mrzaeem102",
    icon: "huggingface",
    description: "Explore published Spaces and AI experiments.",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/zaeem-joiya-a5195735b/",
    icon: "linkedin",
    description: "View my professional profile and connect.",
  },
] as const;

export const contactDetails = {
  email: "zaeemfayyaz18@gmail.com",
  phone: "+923177180090",
  displayPhone: "+92 317 7180090",
};

export type ProfileIconName = (typeof socialProfiles)[number]["icon"];

export const projectFilters = [
  "All Projects",
  "Artificial Intelligence",
  "Machine Learning",
  "Chatbots",
  "NLP & Translation",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];
export type ProjectCategory = Exclude<ProjectFilter, "All Projects">;
export type ProjectArt =
  | "assistant"
  | "medical"
  | "market"
  | "flower"
  | "chat"
  | "legal"
  | "code"
  | "language"
  | "data"
  | "finance"
  | "vision";

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  categories: ProjectCategory[];
  technologies: string[];
  icon: LucideIcon;
  art: ProjectArt;
  repository?: string;
  additionalRepositories?: { label: string; href: string }[];
  demo?: string;
  demoLabel?: string;
}

export const projects: PortfolioProject[] = [
  {
    id: "student-career-assistant",
    title: "AI Student Career Assistant",
    description:
      "A student-focused assistant built around prompt engineering and conversational guidance for career-related questions.",
    categories: ["Artificial Intelligence", "Chatbots"],
    technologies: ["Python", "OpenAI API", "Streamlit"],
    icon: BrainCircuit,
    art: "assistant",
    repository: "https://github.com/mrzaeem102-web/AI-Student-Career-Assistant",
    demo: "https://ai-student-career-assistant-eight.vercel.app",
    demoLabel: "Live demo",
  },
  {
    id: "medi-scan-ai",
    title: "Medi-Scan AI",
    description:
      "An AI-based medical information application that analyses user-provided symptoms and presents relevant information. It is an informational project, not a medical diagnosis.",
    categories: ["Artificial Intelligence", "Machine Learning"],
    technologies: ["Python", "Streamlit", "Scikit-learn", "XGBoost"],
    icon: Stethoscope,
    art: "medical",
    repository: "https://github.com/mrzaeem102-web/Medi-Scan-Ai",
  },
  {
    id: "ai-stock-analyzer",
    title: "AI Stock Analyzer",
    description:
      "An AI-focused stock analysis and trading project for exploring market information and assisted analysis.",
    categories: ["Artificial Intelligence"],
    technologies: ["Python", "Pandas", "Scikit-learn", "Plotly", "Streamlit"],
    icon: ChartCandlestick,
    art: "market",
    repository: "https://github.com/mrzaeem102-web/Ai-Stock-Analyzer",
    demo: "https://ai-stock-analyzer-chi.vercel.app",
    demoLabel: "Project website",
  },
  {
    id: "iris-flower-classification-ai",
    title: "Iris Flower Classification AI",
    description:
      "Classifies Iris flower species from measurements through an interactive machine-learning prediction interface.",
    categories: ["Machine Learning"],
    technologies: ["Python", "Scikit-learn", "Gradio"],
    icon: Flower2,
    art: "flower",
    repository:
      "https://github.com/mrzaeem102-web/Iris-Flower-Classifiation-Ai",
    demo: "https://huggingface.co/spaces/mrzaeem102/Data_Classification_project",
    demoLabel: "Open Space",
  },
  {
    id: "rule-based-ai-chatbot",
    title: "Rule-Based AI Chatbot",
    description:
      "A browser-based, rule-driven chatbot that responds to users through an interactive web interface.",
    categories: ["Chatbots"],
    technologies: ["HTML", "CSS", "JavaScript"],
    icon: MessageCircle,
    art: "chat",
    repository: "https://github.com/mrzaeem102-web/Rule-Based-AI-Chatbot",
    demo: "https://huggingface.co/spaces/mrzaeem102/rule-base-ai-chatbot",
    demoLabel: "Open Space",
  },
  {
    id: "legal-research-chatbot",
    title: "Legal Research Chatbot",
    description:
      "A conversational legal research tool using natural language processing and Hugging Face to help explore legal information.",
    categories: ["Artificial Intelligence", "Chatbots", "NLP & Translation"],
    technologies: ["Python", "NLP", "Hugging Face", "Gradio"],
    icon: Scale,
    art: "legal",
    repository: "https://github.com/mrzaeem102-web/Legal_Research_Chatbot",
  },
  {
    id: "codealpha-internship-projects",
    title: "CodeAlpha Internship Projects",
    description:
      "A collection of internship work featuring an AI chatbot and a language translation application.",
    categories: ["Machine Learning", "Chatbots", "NLP & Translation"],
    technologies: ["Python", "Machine Learning", "NLP"],
    icon: Code2,
    art: "code",
    repository: "https://github.com/mrzaeem102-web/codealpha_task",
    additionalRepositories: [
      {
        label: "Related repo",
        href: "https://github.com/mrzaeem102-web/codealpha_tasks",
      },
    ],
  },
  {
    id: "dilogpt-v2",
    title: "DiloGPT V2",
    description:
      "An advanced conversational AI project powered by a custom-trained language model.",
    categories: ["Artificial Intelligence", "Chatbots", "NLP & Translation"],
    technologies: ["Python", "PyTorch", "Hugging Face", "Transformers", "DialoGPT"],
    icon: Bot,
    art: "assistant",
    demo: "https://huggingface.co/spaces/mrzaeem102/DiloGPT-v2",
    demoLabel: "Open Space",
  },
  {
    id: "ai-advanced-translator",
    title: "AI Advanced Translator",
    description:
      "A translation application designed to help translate text between supported languages.",
    categories: ["NLP & Translation"],
    technologies: ["Python", "Hugging Face", "Transformers", "NLP", "Gradio"],
    icon: Languages,
    art: "language",
    demo: "https://huggingface.co/spaces/mrzaeem102/Language-Translator",
    demoLabel: "Open Space",
  },
  {
    id: "ai-translation-tool",
    title: "AI Translation Tool",
    description:
      "A separate language utility for translating words and text between supported languages.",
    categories: ["NLP & Translation"],
    technologies: ["Python", "NLP", "Streamlit", "Translation APIs"],
    icon: Languages,
    art: "language",
    demo: "https://huggingface.co/spaces/mrzaeem102/Translationtool",
    demoLabel: "Open Space",
  },
  {
    id: "data-classification-project",
    title: "Data Classification Project",
    description:
      "A machine-learning application that predicts Iris flower species from user-provided measurements.",
    categories: ["Machine Learning"],
    technologies: ["Python", "Scikit-learn", "Pandas", "Gradio"],
    icon: Table2,
    art: "data",
    demo: "https://huggingface.co/spaces/mrzaeem102/Data-Classification",
    demoLabel: "Open Space",
  },
  {
    id: "legal-law-ai-chatbot",
    title: "Legal Law AI Chatbot",
    description:
      "A law-focused chatbot project designed to provide legal information through conversational interaction.",
    categories: ["Artificial Intelligence", "Chatbots"],
    technologies: ["Python", "NLP", "Hugging Face", "DialoGPT"],
    icon: Scale,
    art: "legal",
    demo: "https://huggingface.co/spaces/mrzaeem102/Dialo-GPT",
    demoLabel: "Open Space",
  },
  {
    id: "ai-finance-advisor",
    title: "AI Finance Advisor",
    description:
      "A conversational AI application for financial-advice questions, built with a Python and LangChain stack.",
    categories: ["Artificial Intelligence", "Chatbots"],
    technologies: ["Python", "LangChain", "OpenAI API", "Flask"],
    icon: Briefcase,
    art: "finance",
  },
  {
    id: "stocksense",
    title: "StockSense",
    description:
      "A machine-learning stock forecasting project with an interactive dashboard and a forecast horizon of up to 90 days.",
    categories: ["Machine Learning"],
    technologies: ["Python", "scikit-learn", "Plotly", "Gradio"],
    icon: TrendingUp,
    art: "market",
    repository: "https://github.com/mrzaeem102-web/Ai-Stock-Analyzer",
  },
  {
    id: "object-detection-tracking",
    title: "AI Object Detection & Tracking System",
    description:
      "A real-time object detection and tracking application using a computer-vision workflow.",
    categories: ["Artificial Intelligence", "Machine Learning"],
    technologies: ["YOLO", "OpenCV", "PyTorch", "Streamlit"],
    icon: ScanEye,
    art: "vision",
  },
  {
    id: "ai-language-translator",
    title: "AI Language Translator",
    description:
      "A multilingual translation application pairing Hugging Face Transformers with a lightweight web interface.",
    categories: ["NLP & Translation"],
    technologies: ["Hugging Face Transformers", "HTML", "CSS", "JavaScript"],
    icon: Languages,
    art: "language",
    demo: "https://huggingface.co/spaces/mrzaeem102/ai-translator",
    demoLabel: "Open Space",
  },
];

export const skillGroups: {
  title: string;
  icon: LucideIcon;
  skills: string[];
}[] = [
  { title: "Programming", icon: Code2, skills: ["Python", "JavaScript"] },
  { title: "Frontend", icon: Briefcase, skills: ["HTML5", "CSS3", "JavaScript"] },
  {
    title: "Artificial Intelligence",
    icon: BrainCircuit,
    skills: ["AI Application Development", "AI Chatbots", "Prompt Engineering"],
  },
  {
    title: "Machine Learning",
    icon: TrendingUp,
    skills: ["Scikit-learn", "Classification Models", "Predictive Modeling"],
  },
  {
    title: "Deep Learning",
    icon: Network,
    skills: ["Neural Networks", "Deep Learning Concepts"],
  },
  {
    title: "Natural Language Processing",
    icon: Languages,
    skills: ["NLP", "Text Processing", "Language Translation"],
  },
  {
    title: "Frameworks & Platforms",
    icon: Workflow,
    skills: ["Hugging Face", "Gradio"],
  },
  {
    title: "Data Science",
    icon: ChartLine,
    skills: ["Data Analysis", "Data Classification", "Predictive Modeling"],
  },
];

export const interests: { name: string; icon: LucideIcon }[] = [
  { name: "Artificial Intelligence", icon: BrainCircuit },
  { name: "Machine Learning", icon: TrendingUp },
  { name: "Deep Learning", icon: Network },
  { name: "Natural Language Processing", icon: Languages },
  { name: "Computer Vision", icon: ScanEye },
  { name: "Conversational AI", icon: MessageCircle },
  { name: "Data Science", icon: ChartLine },
  { name: "Neural Networks", icon: Network },
  { name: "AI Automation", icon: Workflow },
  { name: "Prompt Engineering", icon: Sparkles },
];

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Interests", href: "#interests" },
  { label: "Contact", href: "#contact" },
];