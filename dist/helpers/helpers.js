"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowercase = exports.uppercase = exports.sentencecase = exports.randomElement = void 0;
const randomElement = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};
exports.randomElement = randomElement;
const sentencecase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
exports.sentencecase = sentencecase;
const uppercase = (str) => {
    return str.toUpperCase();
};
exports.uppercase = uppercase;
const lowercase = (str) => {
    return str.toLowerCase();
};
exports.lowercase = lowercase;
