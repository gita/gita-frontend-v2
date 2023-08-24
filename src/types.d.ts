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

interface GitaLanguage {
  description: string;
}

interface GitaVerse {
  verse_number: number;
  chapter_number: number;
  id: number;
  text: string;
  transliteration: string;
  word_meanings: string;
  gita_chapter: {
    verses_count: number;
  };
  gita_commentaries: GitaLanguage[];
  gita_translations: GitaLanguage[];
}

interface Verse {
  gita_verses: GitaVerse[];
}

interface VerseOfTheDay {
  date: string;
  id: number;
  verse_order: number;
}

interface VersesOfTheDay {
  verse_of_the_day: VerseOfTheDay[];
}

interface GitaChapterData {
  chapter_summary: string;
  chapter_number: number;
  name_translated: string;
  verses_count: number;
}

interface GitaChapter {
  gita_chapters_by_pk: GitaChapterData;
  gita_verses: GitaVerse[];
}

interface AdvancedSettings {
  devnagari: boolean;
  verseText: boolean;
  synonyms: boolean;
  translation: boolean;
  purport: boolean;
}

interface LanguageSettings {
  translationAuthor: {
    id: number;
    name: string;
    language: string;
  };
  commentaryAuthor: {
    id: number;
    name: string;
    language: string;
  };
}

type CurrentVerse = Omit<GitaVerse, "word_meanings" | "text">;

interface SvgProps {
  className: string;
}
