// run setTimeout recursively to solve problem of long sentences and short words in succession
function runTimeout(callback, time) {
    setTimeout(() => {
        callback();
    }, time);
}

function startWordChange(wordList, ele, wordSpeed, letterSpeed) {
    let currentWord = wordList[0];
    let nextWord = wordList[1];
    let wordIndex = 0;
    let maxLength = nextWord.length;

    let changeWord = setInterval(() => {
        let charIndex = 0;

        // go back to first index when reach end of array
        if (wordIndex === wordList.length - 1) {
            currentWord = wordList[wordIndex];
            // reset wordIndex
            wordIndex = -1;
            nextWord = wordList[0];
        } else {
            currentWord = wordList[wordIndex];
            nextWord = wordList[wordIndex + 1];
        }

        // sync word lengths between current and next word
        let difference = nextWord.length - currentWord.length;
        if (difference > 0) {
            currentWord = currentWord + " ".repeat(difference);
            maxLength = currentWord.length;
        } else if (difference < 0) {
            nextWord = nextWord + " ".repeat(Math.abs(difference));
            maxLength = nextWord.length;
        }

        // change letters from current word to next word
        let changeLetter = setInterval(() => {
            currentWord = replaceAt(currentWord, charIndex, nextWord.charAt(charIndex));
            $(ele).text(currentWord);
            charIndex++;
            if (charIndex >= nextWord.length) {
                clearInterval(changeLetter);
            }
        }, letterSpeed);

        wordIndex++;
    }, wordSpeed + (letterSpeed * maxLength));
}

function replaceAt(str, index, char) {
    return str.substr(0, index) + char + str.substr(index + 1);
}