//  Name: Steven Champagne
//  Course: SENG 511
//  
//
function getStats(txt) {
    
    let wordsArray = txt.toLowerCase().replace(/[^\w\s]/gi, " ").replace(/\s+/gi, " ").trim().split(/\s+/gi);
    let linesArray = txt.toLowerCase().match(/^.*((\r\n|\n|\r)|$)/gm); // all lines
    let nRemovedLines = linesArray.map(string => string.replace(/((\r\n|\n|\r)|$)/g, ""));
    let nonEmptyLinesArray = nRemovedLines.filter(function (line) {
        for (chars of line){
            if (chars.trim().length > 0){
                return chars.trim();
            }
        }
    });

    return {
        nChars: get_nChars(),
        nWords: get_nWords(),
        nLines: get_nLines(),
        nNonEmptyLines: get_nNonEmptyLines(),
        maxLineLength: get_maxLineLength(),
        averageWordLength: get_averageWordLength(),
        palindromes: get_palindrome(),
        longestWords: get_longestWords(),
        mostFrequentWords: get_mostFrequentWords()
    };

    function get_nChars(){
        return txt.length;
    }

    function get_nWords(){
        if (wordsArray.toString() != ''){
            return wordsArray.length;
        }else{
            return 0;
        }
    }

    function get_nLines(){
        if (linesArray.toString() != ''){
            return linesArray.length;
        }else{
            return 0;
        }
    }

    function get_nNonEmptyLines(){
        if (nonEmptyLinesArray == undefined){
            return 0;
        }
        else{
            return nonEmptyLinesArray.length;;
        }
    }

    function get_maxLineLength(){
        if (nRemovedLines.toString() != ''){
            let max = 0;
            for(chars of nRemovedLines){
                if(chars.length > max){
                    max = chars.length;
                }
            }
            return max;
        }else{
            return 0;
        }
    }

    function get_averageWordLength(){
        if (wordsArray.toString() != ''){
            let sumChars = 0;
            for (word of wordsArray){
                sumChars += word.length;
            }
            return sumChars/wordsArray.length;
        }else{
            return 0;
        }
    }

    function get_palindrome(){
        palindrome = [];
        for (word of wordsArray){
            if (word.length > 2 && word === word.split('').reverse().join('')){
                palindrome.push(word);
            }
        }
        return palindrome;
    }

    function get_longestWords(){
        if (wordsArray.toString() != ''){
            let compareFxn = function (a ,b){
                if (a.length < b.length) return 1;
                if (a.length > b.length) return -1;
                if (a.length === b.length){
                    if(a < b) return -1;
                    if(a > b) return 1;
                    if ( a === b ) return null;
                }
            }

            let filterFxn = function(item, pos, ary) {
                return !pos || item != ary[pos - 1];
            }

            return wordsArray.sort(compareFxn).filter(filterFxn).slice(0,10);
        }else{
            return [];
        }
    }

    function get_mostFrequentWords(){
        let ctr = {};

        for (word of wordsArray){
            if (word in ctr){
                ctr[word] += 1;
            }else{
                ctr[word] = 1;
            }
        }

        sortable = [];
        for(word in ctr){
            sortable.push([word, ctr[word]]);
        }

        // because sort doesnt work here ...
        compareFxn2 = function (a, b){
            if(a[1] < b[1]) return 1;
            if(a[1] > b[1]) return -1;
            if(a[1] === b[1]){
                if (a[0] < b[0]) return -1;
                if (a[0] > b[0]) return 1;
                else return 0;
            }
        }

        sortable.sort(compareFxn2);

        // because slice doesn't work here ...
        function mySlice(min, max){
            let out = [];
            sortMax = max <= sortable.length ? max : sortable.length;
            for (let i = min;  i < sortMax; i++){
                out.push(sortable[i]);
            }
            return out;
        }

        let topTen = mySlice(0,10);

        // now format the output
        i = 0;
        let stringArray = [];
        for (one of topTen){
            let s = one[0] + "(" + one[1] + ")";
            stringArray[i] = s;
            i++;
        }

        return stringArray;
    }
}

