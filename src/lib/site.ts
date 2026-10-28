import { parse } from "yaml";
import profileSource from "../data/profile.yaml?raw";
import publicationsSource from "../data/publications.yaml?raw";

export const LANGS = ["ja", "en"] as const;
export type Lang = (typeof LANGS)[number];
type Localized = Record<Lang, string>;

export type PageKey = "home" | "works" | "profile" | "others";
export const PAGES: PageKey[] = ["home", "works", "profile", "others"];

export type PubType = "conference" | "journal" | "workshop" | "preprint" | "talk" | "presentation";

export interface Publication {
  type: PubType;
  year: number;
  venue: string;
  title: string;
  authors: string[];
  url?: string;
  note?: string;
  award?: string;
  equal?: boolean;
  links?: { label: string; url: string }[];
}

interface TimelineItem {
  period: string;
  current?: boolean;
  org: Localized;
  role: Localized;
}

export interface Profile {
  name: string;
  nameJa: string;
  affiliation: Localized;
  lead: Localized;
  about: Localized;
  interests: string[];
  social: { name: string; icon: "scholar" | "github" | "x"; url: string }[];
  highlights: { tag: string; award?: boolean; text: Localized }[];
  experience: TimelineItem[];
  education: TimelineItem[];
  badges: { label: string; url: string; image: string }[];
}

export const profile: Profile = parse(profileSource);
export const publications: Publication[] = parse(publicationsSource);

export const PUB_TYPES: { type: PubType; label: Localized }[] = [
  { type: "conference", label: { ja: "国際会議論文（査読付き）", en: "International Conference Papers (Refereed)" } },
  { type: "journal", label: { ja: "論文誌（査読付き）", en: "Journal Papers (Refereed)" } },
  { type: "workshop", label: { ja: "ワークショップ論文（査読付き）", en: "Workshop Papers (Refereed)" } },
  { type: "preprint", label: { ja: "プレプリント", en: "Preprints" } },
  { type: "talk", label: { ja: "招待講演・講義", en: "Talks & Lectures" } },
  { type: "presentation", label: { ja: "口頭・ポスター発表", en: "Presentations" } },
];

export function publicationsOf(type: PubType): Publication[] {
  // Array.prototype.sort is stable, so entries with the same year keep the file order.
  return publications.filter((p) => p.type === type).sort((a, b) => b.year - a.year);
}

export const UI = {
  ja: {
    nav: { home: "ホーム", works: "業績", profile: "プロフィール", others: "その他" },
    title: { home: "", works: "業績", profile: "プロフィール", others: "その他" },
    description: "高倉 将吉 (Shokichi Takakura) — LINEヤフー株式会社 リサーチエンジニア。機械学習・最適化・プライバシー保護技術の研究。",
    highlights: "Highlights",
    recent: "最近の論文",
    seeAll: "すべて見る →",
    worksLead: "論文・発表の一覧です。",
    all: "すべて",
    interests: "研究分野",
    experience: "職歴",
    education: "学歴",
    activities: "競技プログラミング・アウトプット",
    equal: "* 共同第一著者",
    toggleTheme: "テーマを切り替え",
  },
  en: {
    nav: { home: "Home", works: "Publications", profile: "Profile", others: "Others" },
    title: { home: "", works: "Publications", profile: "Profile", others: "Others" },
    description: "Shokichi Takakura — Research Engineer at LY Corporation, working on machine learning, optimization, and privacy-enhancing technologies.",
    highlights: "Highlights",
    recent: "Recent Papers",
    seeAll: "See all →",
    worksLead: "Publications, talks, and presentations.",
    all: "All",
    interests: "Research Interests",
    experience: "Experience",
    education: "Education",
    activities: "Competitive Programming & Writing",
    equal: "* Equal contribution",
    toggleTheme: "Toggle theme",
  },
} as const;

export function pagePath(page: PageKey, lang: Lang): string {
  const prefix = lang === "ja" ? "/" : `/${lang}/`;
  return page === "home" ? prefix : `${prefix}${page}/`;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Escapes text and turns `[label](url)` into links. */
export function inlineLinks(text: string): string {
  return escapeHtml(text).replace(
    /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>',
  );
}
