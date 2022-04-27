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
 * This module reads XML files, caches the results and filters the results
 *
 *
 */

var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var txtUtils = require('./util-text');
var search = require('./module-search');

var xmlFiles = [];


/**
 * Function to read XML and cache results by filename then call a render function
 *
 * @param filename - name of file to read
 * @param renderFn - function to render results
 * @param copyFn - function to convert the XML to a suitable  array
 * @param filterFN - function to filter results before render
 */
var readXml = function(filename, renderFn, copyFn, filterFn) {

    if(typeof xmlFiles[filename] === 'undefined') {
        fs.readFile(filename, function(err, data) {
            parser.parseString(data, function (err, result) {
                xmlFiles[filename] = copyFn(result);
                renderFn(filterFn(xmlFiles[filename]));
            });
        });
    } else {
        renderFn(filterFn(xmlFiles[filename]));
    }
};

/**
 * Function to read XML object and place it in an RSS format object
 *
 * @param result - XML
 * @returns {Array} of rssItems
 */
var readRSS = function(result) {
    var rssItems = [];
    var items = result['rss']['channel'][0]['item'];


    var i = items.length;
    while (i--) {
        var title = txtUtils.decodeXML(items[i]['title'][0]);
        var description = txtUtils.decodeXML(items[i]['description'][0]);
        var tokens = txtUtils.tokenize(description + " " + title);

        rssItems.push({
            title: title,
            link: items[i]['link'][0],
            description: description,
            source: items[i]['source'][0]['_'],
            pubDate: items[i]['pubDate'][0],
            tokens: tokens
        });
    }

    return rssItems;
};

module.exports = {
    /**
     * Read and cache RSS file, this function does not filter the results
     *
     * @param filename - filename of file to read
     * @param renderFn - render function for results
     */
    getRSS: function(filename, renderFn) {

        //Empty Filter function
        var filterFn = function(result) {
            return result;
        };

        readXml(filename, renderFn, readRSS, filterFn);
    },
    /**
     * This function will read, cache, then filter the results of a RSS file
     *
     * The filtering is performed after caching
     *
     * @param filename - filename of file to read
     * @param renderFn - render function for results
     * @param searchString - search String
     * @param searchType - AND OR NOT
     */
    searchRSS: function (filename, renderFn, searchString, searchType) {

        //Filter the results using search string and search type
        var filterFn = function (items) {
            var out = [];

            //tokenize search terms
            var searchTerms = txtUtils.tokenize(searchString);
            //console.log(searchTerms);

            //perform search
            var i = items.length;
            while(i--) {
                var found = [];
                //there are cleaner ways to do this - later
                if(search.filterItems(searchTerms,searchType,items[i].tokens, found )) {

                    //make a copy so that the original is not changed
                    var item = JSON.parse(JSON.stringify(items[i]));
                    item['found'] = found;
                    item['searchType'] = searchType;
                    out.push(item);

                    //console.log('.................................................................');
                    //console.log(searchTerms + '  ' + searchType);
                    //console.log(items[i].tokens);
                }
            }
            return out;
        };

        readXml(filename, renderFn, readRSS, filterFn);
    }
};