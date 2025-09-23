import { coolLetters } from "../../data/loading-screen.js";

export const randomElement = (array : Array<any>) : any => {
    return array[Math.floor(Math.random() * array.length)];
}

export const sentencecase = (str : string) : string => {
    return str.charAt(0).toUpperCase() + lowercase(str.slice(1));
}

export const uppercase = (str : string) : string => {
    return str.toUpperCase();
}

export const lowercase = (str : string) : string => {
    return str.toLowerCase();
}

export const removeFromArray = (array: Array<any>, specific: any) : Array<any> => {
    return array.filter(item => item !== specific);
}

export const addStylesheet = (type: string, name: string, load: string) : void => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `./src/components/${load}/${type}s/${name}/${name}.css`;
    document.head.appendChild(link);
}

export const removeLoadingScreenOnLoad = () : void => {
    const div = document.querySelector("div.loading-area") as HTMLElement;
    if (!div) {
        throw new Error("LoadingScreen: No div.loading-area found");
    }
    div.setAttribute("data-testid", "loading-area");
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            div.textContent = randomElement(coolLetters);
        }, i * 500);
    };
    div.addEventListener("click", (event) => {
        div.remove();
    });
    setTimeout(() => {
        div.remove();
    }, 5000);
}