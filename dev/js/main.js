var date = '';
var dateArray = [];
var secondNumber = [];
var fullNumbers = [];
var matrix = [];
var destiny = 0;
$(document).ready(function () {
    $('.matrix_date').datepicker({
        language: 'ru-RU',
        startView: 2
    });
    $('.matrix__input').change(function () {
        getLoader();
        clearDate();
        replaceDate();
        dateArray = clearArray(dateArray);
        secondNumbers();
        fullNumbers = dateArray.concat(secondNumber);
        fullNumbers = toInteger();
        matrix = getMatrix();
        destiny = destinyNumber();
        showMatrix();
        getLinks();
        deleteLoader();

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
    var arrayNoSymbol = date.split('.');
    arrayNoSymbol.forEach(function(item, index) {
        var arr = item.split('');
        dateArray = dateArray.concat(arr);
    });

}
function clearArray(array) {
    if(array[0] == 0) {
        array.splice(0,1);
    }
    if (array[1] == 0) {
        array.splice(1,1);
    }
    if(array[2] == 0) {
        array.splice(2,1);
    }
    return array;
}
function secondNumbers() {
    secondNumber[0] = firstSecondNumber();
    secondNumber[1] = secondSecondNumber(secondNumber[0]);
    secondNumber[2] = thirdSecondNumber();
    secondNumber[3] = secondSecondNumber(secondNumber[2]);
}
function firstSecondNumber() {
    var sum = 0;
    dateArray.forEach(function (item, index) {
        sum+=parseInt(item, 10);
    });
    return sum;
}
function secondSecondNumber(number) {
    var sum = 0;
    var numbersSplit = number.toString().split('');
    numbersSplit.forEach(function (item,index) {
       sum+=parseInt(item, 10);
    });

    return sum;
}
function thirdSecondNumber() {
    var full = secondNumber[0];
    var sum = Math.abs(full - (2 * parseInt(dateArray[0], 10)));
    return sum;
}
function toInteger() {
    var arr = [];
    fullNumbers.forEach(function (item, index) {
        var str = item.toString();
        var stringArray = str.split('');
        stringArray.forEach(function (val, key) {
            //console.log(val);
            var num = parseInt(val, 10);
            //console.log(num);
            arr = arr.concat(num);
        });
    });
    return arr;
}
function getMatrix() {
    var arr = [];
    var arrayUnique = [];
    for (var i = 1; i <= 9; i++) {
        arr[i-1] = '';
        arrayUnique[i-1] = 0;
        fullNumbers.forEach(function (item,index) {
            if(item == i) {
                arr[i-1]+=''+i;
                arrayUnique[i-1]++;
            }
        })
    }
    console.log(arr);
    arr[9] = arrayUnique[2] + arrayUnique[4] + arrayUnique[6];
    arr[10] = arrayUnique[3] + arrayUnique[4] + arrayUnique[5];
    arr[11] = arrayUnique[1] + arrayUnique[4] + arrayUnique[7];
    arr[12] = arrayUnique[0] + arrayUnique[3] + arrayUnique[6];
    arr[13] = arrayUnique[2] + arrayUnique[5] + arrayUnique[8];
    return arr;
}
function destinyNumber() {
    var sum = 0;
    sum = secondSecondNumber(secondNumber[1]);
    return sum;
}

function getLoader() {
    $('.result').addClass('loader');
}
function deleteLoader() {
    setTimeout(function () {
        $('.result').addClass('loader-fade');
    }, 500);

    setTimeout(function () {
        $('.result').removeClass('loader loader-fade');
        $('.result').addClass('show');
    }, 250)
}
function showMatrix() {
    var text = secondNumber.join();
    $('.result__answer[data-answer=second-number]').text(text);
    $('.result__answer[data-answer=date]').text(date);
    $('.result__answer[data-answer=destiny-number]').text(destiny);
    //console.log(matrix);
    matrix.forEach(function (item, index) {
        $('.result__item p[data-index='+index+']').text(item || 'Пусто');
    });
}
function getLinks() {
    $('input[name=matrix]').val(matrix);
    $('input[name=dates]').val(date);
    $('input[name=destiny]').val(destiny);
}
$('.modal__open').click(function (event) {
   var title = $(this).attr('data-theme');
   $('.modal__title').text(title);
   $('.modal').fadeIn();
});
$(document).mouseup(function (e) {
    var elem = $('.modal');
    var elems = $('.modal__wrapper');
    if (!elems.is(e.target)
        && elems.has(e.target).length === 0) {
        $('.modal').fadeOut();
    }
});