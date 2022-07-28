import { reactive, computed, ref, JSZip, DateTree, onMounted, watchEffect, onBeforeUnmount, ms } from "./vendor.es.js";
import { useGun, currentRoom, gun } from "./useDraw.es.js";
import { detectMimeType } from "./useFile.es.js";
import { useZip, usePost, addPost } from "./useZip.es.js";
import { parseMd } from "./useMd.es.js";
const langParts = {
  noun: {
    en: "noun",
    ru: "\u0441\u0443\u0449",
    underline: "solid"
  },
  adj: {
    en: "adjective",
    ru: "\u043F\u0440\u0438\u043B",
    underline: "wavy"
  },
  verb: {
    en: "verb",
    ru: "\u0433\u043B\u0430\u0433",
    underline: "double"
  },
  adv: {
    en: "adverb",
    ru: "\u043D\u0430\u0440\u0435\u0447",
    underline: "dotted"
  }
};
const languages = [
  {
    "code": "aa",
    "name": "Afar",
    "native": "Afar"
  },
  {
    "code": "ab",
    "name": "Abkhazian",
    "native": "\u0410\u04A7\u0441\u0443\u0430"
  },
  {
    "code": "af",
    "name": "Afrikaans",
    "native": "Afrikaans"
  },
  {
    "code": "ak",
    "name": "Akan",
    "native": "Akana"
  },
  {
    "code": "am",
    "name": "Amharic",
    "native": "\u12A0\u121B\u122D\u129B"
  },
  {
    "code": "an",
    "name": "Aragonese",
    "native": "Aragon\xE9s"
  },
  {
    "code": "ar",
    "name": "Arabic",
    "native": "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
    "rtl": 1
  },
  {
    "code": "as",
    "name": "Assamese",
    "native": "\u0985\u09B8\u09AE\u09C0\u09AF\u09BC\u09BE"
  },
  {
    "code": "av",
    "name": "Avar",
    "native": "\u0410\u0432\u0430\u0440"
  },
  {
    "code": "ay",
    "name": "Aymara",
    "native": "Aymar"
  },
  {
    "code": "az",
    "name": "Azerbaijani",
    "native": "Az\u0259rbaycanca / \u0622\u0630\u0631\u0628\u0627\u064A\u062C\u0627\u0646"
  },
  {
    "code": "ba",
    "name": "Bashkir",
    "native": "\u0411\u0430\u0448\u04A1\u043E\u0440\u0442"
  },
  {
    "code": "be",
    "name": "Belarusian",
    "native": "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0430\u044F"
  },
  {
    "code": "bg",
    "name": "Bulgarian",
    "native": "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438"
  },
  {
    "code": "bh",
    "name": "Bihari",
    "native": "\u092D\u094B\u091C\u092A\u0941\u0930\u0940"
  },
  {
    "code": "bi",
    "name": "Bislama",
    "native": "Bislama"
  },
  {
    "code": "bm",
    "name": "Bambara",
    "native": "Bamanankan"
  },
  {
    "code": "bn",
    "name": "Bengali",
    "native": "\u09AC\u09BE\u0982\u09B2\u09BE"
  },
  {
    "code": "bo",
    "name": "Tibetan",
    "native": "\u0F56\u0F7C\u0F51\u0F0B\u0F61\u0F72\u0F42 / Bod skad"
  },
  {
    "code": "br",
    "name": "Breton",
    "native": "Brezhoneg"
  },
  {
    "code": "bs",
    "name": "Bosnian",
    "native": "Bosanski"
  },
  {
    "code": "ca",
    "name": "Catalan",
    "native": "Catal\xE0"
  },
  {
    "code": "ce",
    "name": "Chechen",
    "native": "\u041D\u043E\u0445\u0447\u0438\u0439\u043D"
  },
  {
    "code": "ch",
    "name": "Chamorro",
    "native": "Chamoru"
  },
  {
    "code": "co",
    "name": "Corsican",
    "native": "Corsu"
  },
  {
    "code": "cr",
    "name": "Cree",
    "native": "Nehiyaw"
  },
  {
    "code": "cs",
    "name": "Czech",
    "native": "\u010Cesky"
  },
  {
    "code": "cu",
    "name": "Old Church Slavonic / Old Bulgarian",
    "native": "\u0441\u043B\u043E\u0432\u0463\u043D\u044C\u0441\u043A\u044A / slov\u011Bn\u012Dsk\u016D"
  },
  {
    "code": "cv",
    "name": "Chuvash",
    "native": "\u0427\u0103\u0432\u0430\u0448"
  },
  {
    "code": "cy",
    "name": "Welsh",
    "native": "Cymraeg"
  },
  {
    "code": "da",
    "name": "Danish",
    "native": "Dansk"
  },
  {
    "code": "de",
    "name": "German",
    "native": "Deutsch"
  },
  {
    "code": "dv",
    "name": "Divehi",
    "native": "\u078B\u07A8\u0788\u07AC\u0780\u07A8\u0784\u07A6\u0790\u07B0",
    "rtl": 1
  },
  {
    "code": "dz",
    "name": "Dzongkha",
    "native": "\u0F47\u0F7C\u0F44\u0F0B\u0F41"
  },
  {
    "code": "ee",
    "name": "Ewe",
    "native": "\u0190\u028B\u025B"
  },
  {
    "code": "el",
    "name": "Greek",
    "native": "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC"
  },
  {
    "code": "en",
    "name": "English",
    "native": "English"
  },
  {
    "code": "eo",
    "name": "Esperanto",
    "native": "Esperanto"
  },
  {
    "code": "es",
    "name": "Spanish",
    "native": "Espa\xF1ol"
  },
  {
    "code": "et",
    "name": "Estonian",
    "native": "Eesti"
  },
  {
    "code": "eu",
    "name": "Basque",
    "native": "Euskara"
  },
  {
    "code": "fa",
    "name": "Persian",
    "native": "\u0641\u0627\u0631\u0633\u06CC",
    "rtl": 1
  },
  {
    "code": "ff",
    "name": "Peul",
    "native": "Fulfulde"
  },
  {
    "code": "fi",
    "name": "Finnish",
    "native": "Suomi"
  },
  {
    "code": "fj",
    "name": "Fijian",
    "native": "Na Vosa Vakaviti"
  },
  {
    "code": "fo",
    "name": "Faroese",
    "native": "F\xF8royskt"
  },
  {
    "code": "fr",
    "name": "French",
    "native": "Fran\xE7ais"
  },
  {
    "code": "fy",
    "name": "West Frisian",
    "native": "Frysk"
  },
  {
    "code": "ga",
    "name": "Irish",
    "native": "Gaeilge"
  },
  {
    "code": "gd",
    "name": "Scottish Gaelic",
    "native": "G\xE0idhlig"
  },
  {
    "code": "gl",
    "name": "Galician",
    "native": "Galego"
  },
  {
    "code": "gn",
    "name": "Guarani",
    "native": "Ava\xF1e'\u1EBD"
  },
  {
    "code": "gu",
    "name": "Gujarati",
    "native": "\u0A97\u0AC1\u0A9C\u0AB0\u0ABE\u0AA4\u0AC0"
  },
  {
    "code": "gv",
    "name": "Manx",
    "native": "Gaelg"
  },
  {
    "code": "ha",
    "name": "Hausa",
    "native": "\u0647\u064E\u0648\u064F\u0633\u064E",
    "rtl": 1
  },
  {
    "code": "he",
    "name": "Hebrew",
    "native": "\u05E2\u05D1\u05E8\u05D9\u05EA",
    "rtl": 1
  },
  {
    "code": "hi",
    "name": "Hindi",
    "native": "\u0939\u093F\u0928\u094D\u0926\u0940"
  },
  {
    "code": "ho",
    "name": "Hiri Motu",
    "native": "Hiri Motu"
  },
  {
    "code": "hr",
    "name": "Croatian",
    "native": "Hrvatski"
  },
  {
    "code": "ht",
    "name": "Haitian",
    "native": "Kr\xE8yol ayisyen"
  },
  {
    "code": "hu",
    "name": "Hungarian",
    "native": "Magyar"
  },
  {
    "code": "hy",
    "name": "Armenian",
    "native": "\u0540\u0561\u0575\u0565\u0580\u0565\u0576"
  },
  {
    "code": "hz",
    "name": "Herero",
    "native": "Otsiherero"
  },
  {
    "code": "ia",
    "name": "Interlingua",
    "native": "Interlingua"
  },
  {
    "code": "id",
    "name": "Indonesian",
    "native": "Bahasa Indonesia"
  },
  {
    "code": "ie",
    "name": "Interlingue",
    "native": "Interlingue"
  },
  {
    "code": "ig",
    "name": "Igbo",
    "native": "Igbo"
  },
  {
    "code": "ii",
    "name": "Sichuan Yi",
    "native": "\uA187\uA259 / \u56DB\u5DDD\u5F5D\u8BED"
  },
  {
    "code": "ik",
    "name": "Inupiak",
    "native": "I\xF1upiak"
  },
  {
    "code": "io",
    "name": "Ido",
    "native": "Ido"
  },
  {
    "code": "is",
    "name": "Icelandic",
    "native": "\xCDslenska"
  },
  {
    "code": "it",
    "name": "Italian",
    "native": "Italiano"
  },
  {
    "code": "iu",
    "name": "Inuktitut",
    "native": "\u1403\u14C4\u1483\u144E\u1450\u1466"
  },
  {
    "code": "ja",
    "name": "Japanese",
    "native": "\u65E5\u672C\u8A9E"
  },
  {
    "code": "jv",
    "name": "Javanese",
    "native": "Basa Jawa"
  },
  {
    "code": "ka",
    "name": "Georgian",
    "native": "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8"
  },
  {
    "code": "kg",
    "name": "Kongo",
    "native": "KiKongo"
  },
  {
    "code": "ki",
    "name": "Kikuyu",
    "native": "G\u0129k\u0169y\u0169"
  },
  {
    "code": "kj",
    "name": "Kuanyama",
    "native": "Kuanyama"
  },
  {
    "code": "kk",
    "name": "Kazakh",
    "native": "\u049A\u0430\u0437\u0430\u049B\u0448\u0430"
  },
  {
    "code": "kl",
    "name": "Greenlandic",
    "native": "Kalaallisut"
  },
  {
    "code": "km",
    "name": "Cambodian",
    "native": "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A"
  },
  {
    "code": "kn",
    "name": "Kannada",
    "native": "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1"
  },
  {
    "code": "ko",
    "name": "Korean",
    "native": "\uD55C\uAD6D\uC5B4"
  },
  {
    "code": "kr",
    "name": "Kanuri",
    "native": "Kanuri"
  },
  {
    "code": "ks",
    "name": "Kashmiri",
    "native": "\u0915\u0936\u094D\u092E\u0940\u0930\u0940 / \u0643\u0634\u0645\u064A\u0631\u064A",
    "rtl": 1
  },
  {
    "code": "ku",
    "name": "Kurdish",
    "native": "Kurd\xEE / \u0643\u0648\u0631\u062F\u06CC",
    "rtl": 1
  },
  {
    "code": "kv",
    "name": "Komi",
    "native": "\u041A\u043E\u043C\u0438"
  },
  {
    "code": "kw",
    "name": "Cornish",
    "native": "Kernewek"
  },
  {
    "code": "ky",
    "name": "Kirghiz",
    "native": "K\u0131rg\u0131zca / \u041A\u044B\u0440\u0433\u044B\u0437\u0447\u0430"
  },
  {
    "code": "la",
    "name": "Latin",
    "native": "Latina"
  },
  {
    "code": "lb",
    "name": "Luxembourgish",
    "native": "L\xEBtzebuergesch"
  },
  {
    "code": "lg",
    "name": "Ganda",
    "native": "Luganda"
  },
  {
    "code": "li",
    "name": "Limburgian",
    "native": "Limburgs"
  },
  {
    "code": "ln",
    "name": "Lingala",
    "native": "Ling\xE1la"
  },
  {
    "code": "lo",
    "name": "Laotian",
    "native": "\u0EA5\u0EB2\u0EA7 / Pha xa lao"
  },
  {
    "code": "lt",
    "name": "Lithuanian",
    "native": "Lietuvi\u0173"
  },
  {
    "code": "lu",
    "name": "Luba-Katanga",
    "native": "Tshiluba"
  },
  {
    "code": "lv",
    "name": "Latvian",
    "native": "Latvie\u0161u"
  },
  {
    "code": "mg",
    "name": "Malagasy",
    "native": "Malagasy"
  },
  {
    "code": "mh",
    "name": "Marshallese",
    "native": "Kajin Majel / Ebon"
  },
  {
    "code": "mi",
    "name": "Maori",
    "native": "M\u0101ori"
  },
  {
    "code": "mk",
    "name": "Macedonian",
    "native": "\u041C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438"
  },
  {
    "code": "ml",
    "name": "Malayalam",
    "native": "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02"
  },
  {
    "code": "mn",
    "name": "Mongolian",
    "native": "\u041C\u043E\u043D\u0433\u043E\u043B"
  },
  {
    "code": "mo",
    "name": "Moldovan",
    "native": "Moldoveneasc\u0103"
  },
  {
    "code": "mr",
    "name": "Marathi",
    "native": "\u092E\u0930\u093E\u0920\u0940"
  },
  {
    "code": "ms",
    "name": "Malay",
    "native": "Bahasa Melayu"
  },
  {
    "code": "mt",
    "name": "Maltese",
    "native": "bil-Malti"
  },
  {
    "code": "my",
    "name": "Burmese",
    "native": "\u1019\u103C\u1014\u103A\u1019\u102C\u1005\u102C"
  },
  {
    "code": "na",
    "name": "Nauruan",
    "native": "Dorerin Naoero"
  },
  {
    "code": "nb",
    "name": "Norwegian Bokm\xE5l",
    "native": "Norsk bokm\xE5l"
  },
  {
    "code": "nd",
    "name": "North Ndebele",
    "native": "Sindebele"
  },
  {
    "code": "ne",
    "name": "Nepali",
    "native": "\u0928\u0947\u092A\u093E\u0932\u0940"
  },
  {
    "code": "ng",
    "name": "Ndonga",
    "native": "Oshiwambo"
  },
  {
    "code": "nl",
    "name": "Dutch",
    "native": "Nederlands"
  },
  {
    "code": "nn",
    "name": "Norwegian Nynorsk",
    "native": "Norsk nynorsk"
  },
  {
    "code": "no",
    "name": "Norwegian",
    "native": "Norsk"
  },
  {
    "code": "nr",
    "name": "South Ndebele",
    "native": "isiNdebele"
  },
  {
    "code": "nv",
    "name": "Navajo",
    "native": "Din\xE9 bizaad"
  },
  {
    "code": "ny",
    "name": "Chichewa",
    "native": "Chi-Chewa"
  },
  {
    "code": "oc",
    "name": "Occitan",
    "native": "Occitan"
  },
  {
    "code": "oj",
    "name": "Ojibwa",
    "native": "\u140A\u14C2\u1511\u14C8\u142F\u14A7\u140E\u14D0 / Anishinaabemowin"
  },
  {
    "code": "om",
    "name": "Oromo",
    "native": "Oromoo"
  },
  {
    "code": "or",
    "name": "Oriya",
    "native": "\u0B13\u0B21\u0B3C\u0B3F\u0B06"
  },
  {
    "code": "os",
    "name": "Ossetian / Ossetic",
    "native": "\u0418\u0440\u043E\u043D\u0430\u0443"
  },
  {
    "code": "pa",
    "name": "Panjabi / Punjabi",
    "native": "\u0A2A\u0A70\u0A1C\u0A3E\u0A2C\u0A40 / \u092A\u0902\u091C\u093E\u092C\u0940 / \u067E\u0646\u062C\u0627\u0628\u064A"
  },
  {
    "code": "pi",
    "name": "Pali",
    "native": "P\u0101li / \u092A\u093E\u0934\u093F"
  },
  {
    "code": "pl",
    "name": "Polish",
    "native": "Polski"
  },
  {
    "code": "ps",
    "name": "Pashto",
    "native": "\u067E\u069A\u062A\u0648",
    "rtl": 1
  },
  {
    "code": "pt",
    "name": "Portuguese",
    "native": "Portugu\xEAs"
  },
  {
    "code": "qu",
    "name": "Quechua",
    "native": "Runa Simi"
  },
  {
    "code": "rm",
    "name": "Raeto Romance",
    "native": "Rumantsch"
  },
  {
    "code": "rn",
    "name": "Kirundi",
    "native": "Kirundi"
  },
  {
    "code": "ro",
    "name": "Romanian",
    "native": "Rom\xE2n\u0103"
  },
  {
    "code": "ru",
    "name": "Russian",
    "native": "\u0420\u0443\u0441\u0441\u043A\u0438\u0439"
  },
  {
    "code": "rw",
    "name": "Rwandi",
    "native": "Kinyarwandi"
  },
  {
    "code": "sa",
    "name": "Sanskrit",
    "native": "\u0938\u0902\u0938\u094D\u0915\u0943\u0924\u092E\u094D"
  },
  {
    "code": "sc",
    "name": "Sardinian",
    "native": "Sardu"
  },
  {
    "code": "sd",
    "name": "Sindhi",
    "native": "\u0938\u093F\u0928\u0927\u093F"
  },
  {
    "code": "se",
    "name": "Northern Sami",
    "native": "S\xE1megiella"
  },
  {
    "code": "sg",
    "name": "Sango",
    "native": "S\xE4ng\xF6"
  },
  {
    "code": "sh",
    "name": "Serbo-Croatian",
    "native": "Srpskohrvatski / \u0421\u0440\u043F\u0441\u043A\u043E\u0445\u0440\u0432\u0430\u0442\u0441\u043A\u0438"
  },
  {
    "code": "si",
    "name": "Sinhalese",
    "native": "\u0DC3\u0DD2\u0D82\u0DC4\u0DBD"
  },
  {
    "code": "sk",
    "name": "Slovak",
    "native": "Sloven\u010Dina"
  },
  {
    "code": "sl",
    "name": "Slovenian",
    "native": "Sloven\u0161\u010Dina"
  },
  {
    "code": "sm",
    "name": "Samoan",
    "native": "Gagana Samoa"
  },
  {
    "code": "sn",
    "name": "Shona",
    "native": "chiShona"
  },
  {
    "code": "so",
    "name": "Somalia",
    "native": "Soomaaliga"
  },
  {
    "code": "sq",
    "name": "Albanian",
    "native": "Shqip"
  },
  {
    "code": "sr",
    "name": "Serbian",
    "native": "\u0421\u0440\u043F\u0441\u043A\u0438"
  },
  {
    "code": "ss",
    "name": "Swati",
    "native": "SiSwati"
  },
  {
    "code": "st",
    "name": "Southern Sotho",
    "native": "Sesotho"
  },
  {
    "code": "su",
    "name": "Sundanese",
    "native": "Basa Sunda"
  },
  {
    "code": "sv",
    "name": "Swedish",
    "native": "Svenska"
  },
  {
    "code": "sw",
    "name": "Swahili",
    "native": "Kiswahili"
  },
  {
    "code": "ta",
    "name": "Tamil",
    "native": "\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD"
  },
  {
    "code": "te",
    "name": "Telugu",
    "native": "\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41"
  },
  {
    "code": "tg",
    "name": "Tajik",
    "native": "\u0422\u043E\u04B7\u0438\u043A\u04E3"
  },
  {
    "code": "th",
    "name": "Thai",
    "native": "\u0E44\u0E17\u0E22 / Phasa Thai"
  },
  {
    "code": "ti",
    "name": "Tigrinya",
    "native": "\u1275\u130D\u122D\u129B"
  },
  {
    "code": "tk",
    "name": "Turkmen",
    "native": "\u0422\u0443\u0440\u043A\u043C\u0435\u043D / \u062A\u0631\u0643\u0645\u0646"
  },
  {
    "code": "tl",
    "name": "Tagalog / Filipino",
    "native": "Tagalog"
  },
  {
    "code": "tn",
    "name": "Tswana",
    "native": "Setswana"
  },
  {
    "code": "to",
    "name": "Tonga",
    "native": "Lea Faka-Tonga"
  },
  {
    "code": "tr",
    "name": "Turkish",
    "native": "T\xFCrk\xE7e"
  },
  {
    "code": "ts",
    "name": "Tsonga",
    "native": "Xitsonga"
  },
  {
    "code": "tt",
    "name": "Tatar",
    "native": "Tatar\xE7a"
  },
  {
    "code": "tw",
    "name": "Twi",
    "native": "Twi"
  },
  {
    "code": "ty",
    "name": "Tahitian",
    "native": "Reo M\u0101`ohi"
  },
  {
    "code": "ug",
    "name": "Uyghur",
    "native": "Uy\u01A3urq\u0259 / \u0626\u06C7\u064A\u063A\u06C7\u0631\u0686\u06D5"
  },
  {
    "code": "uk",
    "name": "Ukrainian",
    "native": "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"
  },
  {
    "code": "ur",
    "name": "Urdu",
    "native": "\u0627\u0631\u062F\u0648",
    "rtl": 1
  },
  {
    "code": "uz",
    "name": "Uzbek",
    "native": "\u040E\u0437\u0431\u0435\u043A"
  },
  {
    "code": "ve",
    "name": "Venda",
    "native": "Tshiven\u1E13a"
  },
  {
    "code": "vi",
    "name": "Vietnamese",
    "native": "Ti\u1EBFng Vi\u1EC7t"
  },
  {
    "code": "vo",
    "name": "Volap\xFCk",
    "native": "Volap\xFCk"
  },
  {
    "code": "wa",
    "name": "Walloon",
    "native": "Walon"
  },
  {
    "code": "wo",
    "name": "Wolof",
    "native": "Wollof"
  },
  {
    "code": "xh",
    "name": "Xhosa",
    "native": "isiXhosa"
  },
  {
    "code": "yi",
    "name": "Yiddish",
    "native": "\u05D9\u05D9\u05B4\u05D3\u05D9\u05E9",
    "rtl": 1
  },
  {
    "code": "yo",
    "name": "Yoruba",
    "native": "Yor\xF9b\xE1"
  },
  {
    "code": "za",
    "name": "Zhuang",
    "native": "Cuengh / T\xF4\xF4 / \u58EE\u8BED"
  },
  {
    "code": "zh",
    "name": "Chinese",
    "native": "\u4E2D\u6587"
  },
  {
    "code": "zu",
    "name": "Zulu",
    "native": "isiZulu"
  }
];
function usePosts(tag) {
  if (!tag)
    return;
  const gun2 = useGun();
  const posts = reactive({});
  const backlinks = reactive({});
  gun2.user(currentRoom.pub).get("posts").map().on(function(data, key) {
    let index = key.indexOf(tag);
    if (index == -1)
      return;
    let author = key.slice(-87);
    let from = key.slice(0, 44);
    let to = key.slice(45, 89);
    if (index == 0) {
      posts[to] = posts[to] || {};
      posts[to][author] = data;
    } else {
      backlinks[from] = backlinks[from] || {};
      backlinks[from][author] = data;
    }
  });
  const countPosts = computed(() => {
    let count = 0;
    for (let hash in posts) {
      inner_loop:
        for (let author in posts[hash]) {
          if (posts[hash][author]) {
            count++;
            break inner_loop;
          }
        }
    }
    return count;
  });
  const countBacklinks = computed(() => {
    let count = 0;
    for (let hash in backlinks) {
      inner_loop:
        for (let author in backlinks[hash]) {
          if (backlinks[hash][author]) {
            count++;
            break inner_loop;
          }
        }
    }
    return count;
  });
  const downloading = ref(false);
  async function downloadPosts() {
    downloading.value = true;
    downloading.value = !await downloadFeed(tag, posts);
  }
  function uploadPosts(ev) {
    uploadFeed(tag, ev);
  }
  return {
    posts,
    backlinks,
    countPosts,
    countBacklinks,
    downloadPosts,
    downloading,
    uploadPosts
  };
}
async function downloadFeed(tag, posts) {
  if (!posts)
    return;
  const { zip, zipPost, downloadZip } = useZip();
  const fullPosts = {};
  for (let hash in posts) {
    fullPosts[hash] = usePost({ tag, hash }).post;
    await zipPost({ ...fullPosts[hash] });
  }
  await downloadZip({ title: `#${tag}` });
  return true;
}
function uploadFeed(tag, files) {
  [...files].forEach(async (file) => {
    const zip = await JSZip.loadAsync(file);
    if (zip.comment) {
      console.info("Zip file comment: " + zip.comment);
    }
    zip.forEach(async (path, entry) => {
      var _a;
      if (path.endsWith("index.md")) {
        let title = path.slice(0, -9);
        let md = await entry.async("string");
        let { frontmatter, content } = parseMd(md);
        frontmatter = frontmatter || {};
        frontmatter.title = (frontmatter == null ? void 0 : frontmatter.title) || title;
        if (frontmatter.icon) {
          const icon = await zip.file(`${title}/${frontmatter.icon}`).async("base64");
          const iconMime = detectMimeType(icon);
          frontmatter.icon = `data:${iconMime};base64,${icon}`;
        }
        if (frontmatter.cover) {
          const cover = await ((_a = zip == null ? void 0 : zip.file(`${title}/${frontmatter.cover}`)) == null ? void 0 : _a.async("base64"));
          const coverMime = detectMimeType(cover);
          frontmatter.cover = `data:${coverMime};base64,${cover}`;
        }
        let post = { ...frontmatter, content };
        addPost(tag, post);
      }
    });
  });
}
function sortByDate$1(e) {
  const arr = Object.entries(e.data);
  let sorted = arr.sort((a, b) => {
    if (!a || !b)
      return 0;
    let timeA = Date.parse(a[0]);
    let timeB = Date.parse(b[0]);
    return timeB - timeA;
  });
  postMessage({ sorted, count: arr.length });
}
const newWorker = function(funcObj) {
  var blobURL = URL.createObjectURL(new Blob(["onmessage=", funcObj.toString()], {
    type: "application/javascript"
  })), worker = new Worker(blobURL);
  URL.revokeObjectURL(blobURL);
  return worker;
};
function sortByDate(e) {
  const arr = Object.entries(e.data);
  let sorted = arr.sort((a, b) => {
    if (!a || !b)
      return 0;
    let timeA = Date.parse(a[0]);
    let timeB = Date.parse(b[0]);
    return timeB - timeA;
  });
  postMessage({ sorted, count: arr.length });
}
function useLog({
  name = "logs",
  after = "2021-01-01",
  before = "2023-01-01"
} = {}) {
  const gun2 = useGun();
  const treeRoot = gun2.get(name);
  const tree = new DateTree(treeRoot, "minute");
  const dateTree = reactive({});
  const sorted = ref([]);
  const count = ref(0);
  let query;
  onMounted(() => {
    var w = newWorker(sortByDate);
    query = tree.on(function(d, date) {
      if (!(d == null ? void 0 : d.event))
        return;
      dateTree[date] = d;
    }, { gte: after, lt: before });
    watchEffect(() => {
      w.postMessage(JSON.parse(JSON.stringify(dateTree)));
    });
    w.onmessage = (e) => {
      sorted.value = e.data.sorted;
      count.value = e.data.count;
    };
  });
  onBeforeUnmount(() => {
    query.off();
  });
  function putNow(data) {
    if (!data)
      return;
    tree.get(new Date()).put({ event: "now", data });
  }
  return { dateTree, sorted, count, putNow };
}
function logEvent(event = "text", data) {
  if (!data) {
    console.log("No data to log");
    return;
  }
  const tree = new DateTree(gun.get("logs"), "minute");
  let theData = { event, ...data };
  tree.get(new Date()).put(theData);
}
function formatDate(date) {
  if (!date)
    return;
  let theDate = new Date(date);
  return {
    date: theDate.toLocaleDateString("en-CA"),
    time: theDate.toLocaleTimeString("ru-RU"),
    ms: ms(Date.now() - theDate.getTime())
  };
}
export { downloadFeed, formatDate, langParts, languages, logEvent, newWorker, sortByDate$1 as sortByDate, uploadFeed, useLog, usePosts };
