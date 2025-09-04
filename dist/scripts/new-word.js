"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const supported_languages_1 = require("./data/supported-languages");
const helpers_1 = require("../helpers/helpers");
class NewWord {
    constructor() {
        this.milestones = {};
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.fetchLanguage();
            yield this.generateWord();
            yield this.translate();
            this.verifyAllData();
        });
    }
    generateWord() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.milestones.languageFetched) {
                throw new Error("Language not fetched yet.");
            }
            try {
                const raw = yield fetch(`https://raw.githubusercontent.com/eymenefealtun/all-words-in-all-languages/refs/heads/main/${this.language}/${this.language}.txt`);
                const all = (yield raw.text()).split(",");
                this.untranslated = (0, helpers_1.randomElement)(all);
                this.milestones.wordGenerated = true;
            }
            catch (error) {
                throw new Error("Failed to fetch word list or generate word.");
            }
            ;
        });
    }
    translate() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.milestones.wordGenerated) {
                throw new Error("Word not generated yet.");
            }
            const targetLanguage = "en";
            // const sourceLanguage = this.language?.slice(0, 2) || "auto";
            const sourceLanguage = "auto";
            const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${sourceLanguage}&tl=${targetLanguage}&q=${this.untranslated}`;
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`Translation API error: ${response.statusText}`);
                }
                const data = yield response.json();
                this.translated = data[0][0];
                this.languageCode = data[0][1];
                this.milestones.wordTranslated = true;
            }
            catch (error) {
                throw new Error("Failed to fetch meaning from translation API: " + error);
            }
        });
    }
    ;
    fetchLanguage() {
        if (supported_languages_1.supportedLanguages.length === 0) {
            throw new Error("No supported languages available.");
        }
        if (!supported_languages_1.supportedLanguages) {
            throw new Error("Unavailable to fetch supported languages.");
        }
        this.language = (0, helpers_1.randomElement)(supported_languages_1.supportedLanguages);
        this.milestones.languageFetched = true;
    }
    verifyAllData() {
        if (!this.milestones.wordTranslated) {
            throw new Error("Word not translated yet.");
        }
        console.log("Untranslated Word:", this.untranslated);
        console.log("Translated Word:", this.translated);
        console.log("Language Code:", this.languageCode);
        console.log("Language:", this.language);
        const data = {
            untranslated: this.untranslated,
            translated: this.translated,
            language: this.language,
            languageCode: this.languageCode,
        };
        fs.writeFile("./answer/today.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            }
            else {
                console.log("Data successfully written to today.json");
            }
        });
    }
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const newWord = new NewWord();
    yield newWord.init();
}))();
