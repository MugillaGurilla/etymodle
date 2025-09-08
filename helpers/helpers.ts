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