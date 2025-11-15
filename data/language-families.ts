export type LanguageFamily =
  | "semitic"
  | "germanic"
  | "slavic"
  | "indo-aryan"
  | "uralic"
  | "niger-congo: bantu"
  | "dravidian"
  | "romance"
  | "austronesian"
  | "turkic";

export const familyToLanguages : Record<LanguageFamily, Array<string>> = {
  "semitic": ["arabic", "amharic", "maltese", "hausa"],
  "germanic": ["german", "dutch", "danish", "norwegian", "swedish"],
  "slavic": ["russian", "czech", "croatian", "serbian", "polish", "slovak", "bosnian"],
  "indo-aryan": ["hindi", "sanskrit", "bengali", "gujarati", "punjabi"],
  "uralic": ["finnish", "estonian", "hungarian"],
  "niger-congo: bantu": ["swahili", "xhosa", "zulu", "kinyarwanda", "igbo", "yoruba"],
  "dravidian": ["tamil", "malayalam", "telugu"],
  "romance": ["latin", "french", "italian", "romanian", "portuguese", "catalan", "corsican"],
  "austronesian": ["filipino", "indonesian", "malay", "maori", "javanese", "khmer", "vietnamese"],
  "turkic": ["azerbaijani", "turkish", "uzbek", "turkmen"],
};

export const languageToFamily: Record<string, LanguageFamily> = {
  arabic: "semitic",
  amharic: "semitic",
  maltese: "semitic",
  hausa: "semitic",

  german: "germanic",
  dutch: "germanic",
  danish: "germanic",
  norwegian: "germanic",
  swedish: "germanic",

  russian: "slavic",
  czech: "slavic",
  croatian: "slavic",
  serbian: "slavic",
  polish: "slavic",
  slovak: "slavic",
  bosnian: "slavic",

  hindi: "indo-aryan",
  sanskrit: "indo-aryan",
  bengali: "indo-aryan",
  gujarati: "indo-aryan",
  punjabi: "indo-aryan",

  finnish: "uralic",
  estonian: "uralic",
  hungarian: "uralic",

  swahili: "niger-congo: bantu",
  xhosa: "niger-congo: bantu",
  zulu: "niger-congo: bantu",
  kinyarwanda: "niger-congo: bantu",
  igbo: "niger-congo: bantu",
  yoruba: "niger-congo: bantu",

  tamil: "dravidian",
  malayalam: "dravidian",
  telugu: "dravidian",

  latin: "romance",
  french: "romance",
  italian: "romance",
  romanian: "romance",
  portuguese: "romance",
  catalan: "romance",
  corsican: "romance",

  filipino: "austronesian",
  indonesian: "austronesian",
  malay: "austronesian",
  maori: "austronesian",
  javanese: "austronesian",
  khmer: "austronesian",
  vietnamese: "austronesian",

  azerbaijani: "turkic",
  turkish: "turkic",
  uzbek: "turkic",
  turkmen: "turkic",
};
