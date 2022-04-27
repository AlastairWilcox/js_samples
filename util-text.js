/*
 Copyright (C) 2017 Alastair Brian Wilcox

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute,
 sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Functions to transform and normalise text
 *
 */
module.exports = {
    /**
     * Remove puntuation from a string
     *
     * @param text -  text to modify
     * @returns {string} - return new string without punctuation
     */
    stripPunctuation: function(text) {
        var out = "";

        var i = text.length;
        while(i--> 0) {
            var s = text[i];
            if(s === '(') {
                out = ' ' + out;
            } else if (s === ')') {
                out = ' ' + out
            } else if (s === '.') {
                out = ' ' + out
            } else if (s ===',') {
                out = ' ' + out
            } else if (s === "'") {
                //ignore
            } else if (s === '"') {
                out = ' ' + out
            } else if (s === '-') {
                out = ' ' + out
            } else if(s === '_') {
                out = ' ' + out
            } else if (s === ';') {
                out = ' ' + out
            } else if (s === '[') {
                out = ' ' + out
            } else if (s === ']') {
                out = ' ' + out
            } else if (s === '') {
                out = ' ' + out
            } else if(s === '@') {
                out = ' ' + out
            } else if(s === '#') {
                out = ' ' + out
            } else if(s === '?') {
                out = ' ' + out
            } else if(s === '/') {
                out = ' ' + out
            } else if (s === '//') {
                out = ' ' + out
            } else if (s === '|') {
                out = ' ' + out
            } else if(s === '>') {
                out = ' ' + out
            } else if(s === '<') {
                out = ' ' + out
            } else if(s === ':') {
                out = ' ' + out
            } else if(s === '\u2018') {
                //ignore
            } else if(s == '\u2019') {
                //ignore
            } else if( s === '\u201C'){
                //ignore
            } else if( s === '\u201D') {
                //ignore
            } else if( s === '$') {
                //ignore
            } else if(s === '£') {
                //ignore
            } else  out =  s + out;
        }
        return out;
    },
    /**
     * This function tokenizes a string
     *
     * This is a simple tokenization that trims text, converts it to lower case, removes punctuation then
     * tokenizes it by whitespace
     *
     * @param text - text to tokenize
     * @returns {Array} returns an array of tokens
     */
    tokenize: function(text) {
        var temp = [];

        if(text !== '') {
            temp = this.stripPunctuation(text.trim().toLowerCase()).split(/\s+/);
        } else {
            return temp;
        }


        // a very fast way to remove duplicates
        //reduce, placing the name of item in assoc. array. Then get keys to retrieve unique names
        return Object.keys(temp.reduce((p,c) => (p[c] = true,p) ,{}));
    },
    /**
     * Decode text that has XML encoding
     *
     * @param text
     * @returns {XML|void|string}
     */
    decodeXML: function(text) {
        return text.replace('&apos;','\'');
    },
    /**
     * makes a clone of an object but breaks all references to previous object
     * Adds a new field to the matching object
     *
     * @param objs
     * @param match [fieldname, value]
     * @param newItem  [fieldname, value]
     * @returns {*|Blob|ArrayBuffer|Array.<T>|string} returns new object
     */
    cloneMatchAdd: function(objs, match, newItem) {

        var clone = JSON.parse(JSON.stringify(objs));
        var i = clone.length;
        while(i--) {
            if(clone[i][match[0]] === match[1]) {
                clone[i][newItem[0]] = newItem[1];
                break;
            }
        }
        return clone;
    }
};