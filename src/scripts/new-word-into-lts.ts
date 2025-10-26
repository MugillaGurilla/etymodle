import * as fs from "fs";
import { supportedLanguages } from "../../data/supported-languages.js";
import { randomElement, sentencecase } from "../helpers/helpers.js";

class NewWord {
    private untranslated? : string;
    private translated? : string;
    private languageCode? : string;
    private language? : string;
    private milestones : Record<string, boolean> = {};

    public async init() : Promise<void> {
        this.fetchLanguage();
        await this.generateWord();
        await this.translate();
        this.writeData();
    }

    private async generateWord() : Promise<void> {
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

    private async translate() : Promise<void> {
        if (!this.milestones.wordGenerated) {
            throw new Error("Word not generated yet.");
        }

        const targetLanguage = "en"; 
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

    private fetchLanguage() : void {
        if (supportedLanguages.length === 0) {
            throw new Error("No supported languages available.");
        }
        
        if (!supportedLanguages) {
            throw new Error("Unavailable to fetch supported languages.");
        }

        this.language = sentencecase(randomElement(supportedLanguages));
        this.milestones.languageFetched = true;
    }

    private writeData() : void {
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

        let last : number = 1;
        fs.readdir("./answer/all/", (err, files) => {
            if (!files) {
                console.error("Could not read './answer/all directory");
            }; 
            const finalFile = files.pop();
            
            if (!finalFile) {
                last = 1;
            }
            else {
                const withoutExtension = finalFile.split(".")[0];
                last = parseInt(withoutExtension) + 1;
            };
            fs.writeFile(`./answer/all/${last}.json`, JSON.stringify(data, null, 2), (err) => {
                if (err) {
                    console.error("Error writing to file:", err);
                } else {
                    console.log("Data successfully written to today.json");
                }
            });
        });

    }
}

(async () => {
    const newWord = new NewWord();
    await newWord.init();
})();