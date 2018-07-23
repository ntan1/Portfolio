$(document).ready(function () {

    $('#change1').text(currentWord);

    startWordChange(wordList, $('#change1'), wordSpeed, letterSpeed);
});
