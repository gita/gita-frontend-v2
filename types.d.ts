interface TChapter {
  id: number;
  chapter_number: number;
  chapter_summary: string;
  name_translated: string;
  verses_count: number;
}

interface ChaptersProps {
  chapters: TChapter[];
}

interface NewsletterFormData {
  name: string;
  email: string;
}

interface Node {
  authorId: number;
  description: string;
  languageId: number;
}

interface Verse {
  verseNumber: number;
  chapterNumber: number;
  id: number;
  text: string;
  transliteration: string;
  wordMeanings: string;
  gitaTranslationsByVerseId: { nodes: Node[] };
  gitaCommentariesByVerseId: { nodes: Node[] };
}

interface GitaVerse {
  id: string;
  verseNumber: number;
  wordMeanings: string;
  transliteration: string;
}

interface GitaChapter {
  chapterSummary: string;
  chapterNumber: number;
  nameTranslated: string;
  versesCount: number;
  gitaVersesByChapterId: {
    nodes: GitaVerse[];
  };
}

interface AdvanceSettings {
  devnagari: boolean;
  verseText: boolean;
  synonyms: boolean;
  translation: boolean;
  purport: boolean;
}

interface LanguageSettings {
  language: {
    id: number;
    language: string;
  };
  translationAuthor: {
    id: number;
    name: string;
  };
  commentaryAuthor: {
    id: number;
    name: string;
  };
}

type CurrentVerse = Omit<
  Verse,
  | "wordMeanings"
  | "text"
  | "gitaTranslationsByVerseId"
  | "gitaCommentariesByVerseId"
>;

interface SvgProps {
  className: string;
}
