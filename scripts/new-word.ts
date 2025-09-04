import * as fs from "fs";
import { supportedLanguages } from "./data/supported-languages";
import { randomElement } from "../helpers/helpers";

class NewWord {
    private untranslated?: string;
    private translated?: string;
    private languageCode?: string;
    private language?: string;
    private milestones: Record<string, boolean> = {};

    public async init() {
        this.fetchLanguage();
        await this.generateWord();
        await this.translate();
        this.verifyAllData();
    }

    private async generateWord() {
        if (!this.milestones.languageFetched) {
            throw new Error("Language not fetched yet.");
        }

        try {
            const raw = await fetch(`https://raw.githubusercontent.com/eymenefealtun/all-words-in-all-languages/refs/heads/main/${this.language}/${this.language}.txt`)
            const all = (await raw.text()).split(",");
            this.untranslated = randomElement(all);
            this.milestones.wordGenerated = true;
        } catch (error) {
            throw new Error("Failed to fetch word list or generate word.");
        };
    }

    private async translate() {
        if (!this.milestones.wordGenerated) {
            throw new Error("Word not generated yet.");
        }

        const targetLanguage = "en"; 
        // const sourceLanguage = this.language?.slice(0, 2) || "auto";
        const sourceLanguage = "auto";
        const url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=${sourceLanguage}&tl=${targetLanguage}&q=${this.untranslated}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Translation API error: ${response.statusText}`);
            }
            const data = await response.json();

            this.translated = data[0][0];
            this.languageCode = data[0][1];
            this.milestones.wordTranslated = true;
        }
        catch (error) {
            throw new Error("Failed to fetch meaning from translation API: " + error);
        }
    };

    private fetchLanguage() {
        if (supportedLanguages.length === 0) {
            throw new Error("No supported languages available.");
        }
        
        if (!supportedLanguages) {
            throw new Error("Unavailable to fetch supported languages.");
        }

        this.language = randomElement(supportedLanguages);
        this.milestones.languageFetched = true;
    }

    private verifyAllData() {
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
        }

        fs.writeFile("./answer/today.json", JSON.stringify(data, null, 2), (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            } else {
                console.log("Data successfully written to today.json");
            }
        });
    }
}

(async () => {
    const newWord = new NewWord();
    await newWord.init();
})();