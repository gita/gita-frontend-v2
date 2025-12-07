/**
 * Type definitions for static JSON data files
 * These types match the structure from the mobile app's assets/data/
 */

// index.json types
export interface Language {
  code: string;
  name: string;
}

export interface AuthorLanguage {
  code: string;
  content: ("commentary" | "translation")[];
}

export interface Author {
  id: number;
  name: string;
  sampradaya: string;
  affiliation: string;
  languages: AuthorLanguage[];
}

export interface LanguageAuthors {
  translation_authors: string[];
  commentary_authors: string[];
}

export interface GitaIndex {
  languages: Language[];
  authors: Author[];
  language_authors: Record<string, LanguageAuthors>;
}

// chapters.json types
export interface LocalizedString {
  en?: string;
  hi?: string;
  gu?: string;
  te?: string;
  ta?: string;
  or?: string;
  es?: string;
  sa?: string;
}

export interface ChapterData {
  chapter_number: number;
  verses_count: number;
  name: LocalizedString;
  description: LocalizedString;
  oneliner: LocalizedString;
}

// common/common_{lang}.json types
export interface CommonVerse {
  verse_number: string;
  sanskrit_text: string;
  transliteration: string;
  word_meanings: string; // v4 data format - word meanings as a single string
  sanskrit_audio?: string;
}

export interface CommonChapter {
  chapter_number: string;
  verses: CommonVerse[];
}

export interface CommonData {
  language_code: string;
  chapters: CommonChapter[];
}

// authors/author_{id}_{lang}.json types
export interface AuthorVerse {
  verse_number: string;
  translation?: string;
  commentary?: string | null;
}

export interface AuthorChapter {
  chapter_number: number;
  verses: AuthorVerse[];
}

export interface AuthorData {
  author_id: number;
  author_name: string;
  language_code: string;
  chapters: AuthorChapter[];
}

// Lookup maps for efficient querying
export type VerseLookup = Map<string, CommonVerse>; // key: "chapter.verse"
export type AuthorVerseLookup = Map<string, AuthorVerse>; // key: "chapter.verse"
export type ChapterLookup = Map<number, ChapterData>;
