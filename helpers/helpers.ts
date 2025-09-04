export const randomElement = (array : Array<any>) => {
    return array[Math.floor(Math.random() * array.length)];
}

export const sentencecase = (str : string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const uppercase = (str : string) => {
    return str.toUpperCase();
}

export const lowercase = (str : string) => {
    return str.toLowerCase();
}