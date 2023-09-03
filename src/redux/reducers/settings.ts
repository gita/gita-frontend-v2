import * as t from "../Types";

const initialVerse: GitaVerse = {
  verse_number: 1,
  chapter_number: 1,
  id: 1,
  text: "",
  transliteration: "",
  word_meanings: "",
  gita_chapter: {
    verses_count: 1,
  },
  prev_chapter_verses_count: 0,
  gita_commentaries: [{ description: "" }],
  gita_translations: [{ description: "" }],
};

interface Settings {
  loading: boolean;
  fontSize: string;
  fontFamily: string;
  spacing: string;
  bg: string;
  currentVerse: GitaVerse;
}

const initialState = {
  loading: false,
  fontSize: "large", //small, large todo: change to exact values
  fontFamily: "proxima", //Tisa Pro, Georgia, Avenir, Proxima Nova
  spacing: "large", //small, medium, large todo: change to exact values
  bg: "bg-light-bg", //bg-light-bg, bg-yellow-bg, bg-dark-bg
  currentVerse: initialVerse,
};

const settings = (prevState = initialState, action): Settings => {
  switch (action.type) {
    case t.LOAD_SETTINGS:
      return {
        ...prevState,
        loading: true,
      };
    case t.EDIT_SETTINGS:
      return {
        ...prevState,
        ...action.payLoad,
      };
    case t.SET_CURRENT_VERSE:
      return {
        ...prevState,
        currentVerse: action.payLoad,
      };
    default: {
      return { ...prevState };
    }
  }
};

export default settings;
