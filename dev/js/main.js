var date = '';
var dateArray = [];
var secondNumber = [];
var fullNumbers = [];
var matrix = [];
$(document).ready(function () {
    $('.matrix__input').datepicker({
        language: 'ru-RU',
        startView: 2
    });
    $('.matrix__input').change(function () {
        clearDate();
        replaceDate();
    });
});
function clearDate() {
    date = '';
    dateArray = [];
    secondNumber = [];
    matrix = [];
}
function replaceDate() {
    date = $('.matrix__input').val();
    console.log(date);
    var arrayNoSymbol = date.split('.');
    arrayNoSymbol.forEach(function(item, index) {
        var arr = item.split('');
        console.log(arr);
        dateArray = dateArray.concat(arr);
    });
    console.log(dateArray)
}