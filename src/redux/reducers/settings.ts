import { EDIT_SETTINGS } from "redux/constants";
import { SettingsState } from "redux/types";

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

const initialState = {
  loading: false,
  fontSize: "large", //small, large todo: change to exact values
  fontFamily: "proxima", //Tisa Pro, Georgia, Avenir, Proxima Nova
  spacing: "large", //small, medium, large todo: change to exact values
  bg: "bg-light-bg", //bg-light-bg, bg-yellow-bg, bg-dark-bg
  currentVerse: initialVerse,
};

type Action = {
  type: typeof EDIT_SETTINGS;
  payLoad: Partial<SettingsState>;
};

const settings = (prevState = initialState, action: Action): SettingsState => {
  switch (action.type) {
    case EDIT_SETTINGS:
      return {
        ...prevState,
        ...action.payLoad,
      };
    default: {
      return { ...prevState };
    }
  }
};

export default settings;
