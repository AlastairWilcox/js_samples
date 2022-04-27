# js_samples
This is part of a client side search engine. It has been simplified and does not use all of the potential search features within an RSS file.

These modules read and tokenize a RSS feed, store it in memory and provide a simple search function. The search function uses binary logic to filter the final results.

The code is a little antiquated and does not use ES6 language features.
It was based on much older pre ES6 version.

## Search Types  
* All - Return everything.
* And - Return articles where all search terms match.
* OR  - Return any article that has at least on search term. 
* Not - Return all articles that do not contain any of search terms.

## Process
A RSS(XML) feed is read and the text is tokenized; words are delimited by whitespace, punctuation is removed and case is converted. The tokens are stored for searches. Once the file has been tokenized and stored in memory, it can be searched. The search tries to match tokenized search terms to tokenized text. Once the matching is complete a reduce function will filter out the results using the selected binary logic.
It is loosely based on Map-Reduce.  

## Modules
### module-search.js
This module performs the token matching and applies the reduce function.

### util-text.js
This module has all of the text utils to decode XML and tokenize text.

### module-searchable-cached-xml-file.js
This is the main module that reads and tokenizes the file and applies a search to the data.


