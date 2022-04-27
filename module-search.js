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
 * A module to perform a searches
 *
 * Tokenization is performed elsewhere
 *
 *
 */
module.exports = {

    /**
     * Test for search terms in a list of tokens then perform boolean logic on the result
     *
     * @param searchTerms - an array of words that are being searched for
     * @param logic - AND OR NOT
     * @param tokens - an array of tokens to be searched
     * @param found - an empty arry to be modified and store found items
     * @returns {boolean} = result of if an item passes
     */
    filterItems: function(searchTerms, logic, tokens, found) {
        var searchResults = [];
        var finalResult = false;

        //find if a search term is in the list of Items
        //this is the fastest and simplest way to iterate through an array
        var i = searchTerms.length;
        while(i--) {
            //old search function
            //searchResults.push(tokens.indexOf(searchTerms[i]) > -1 ? 1:0);

            if(tokens.indexOf(searchTerms[i]) > -1) {
                searchResults.push(1);
                found.push(searchTerms[i]);
            } else {
                searchResults.push(0);
            }

        }

        //reduce result of searches
        var result;
        if(searchResults.length > 0) {
            result = searchResults.reduce((a,c) => a+c);
        } else {
           result = -1;
        }


        //Final yes or no based on logic type
        if(logic === 'AND' || logic === 'and')  {

            finalResult = result === searchTerms.length;

        } else if (logic === 'OR' || logic === 'or') {

            finalResult = result > 0;

        } else if (logic === 'NOT' || logic ==='not') {

            finalResult = result === 0;

        } else if(logic =='ALL' || logic == 'all') {

            finalResult = 1;

        }
        return finalResult;
    }
};