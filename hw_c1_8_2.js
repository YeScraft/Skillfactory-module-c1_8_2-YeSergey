function jQuery(selector, context = document){
    this.elements = Array.from(context.querySelectorAll(selector));
    return this;
}
/* Убрал один element из fn и стала работать строка №45, в предыдущем
задании пришлось писать this.elements.forEach((element, index) =>.
Перебор кнопок - строка №70 также работает. Поясните мне пожалуйста если,
что не так сделал. Если писать fn.call(element, element, index) тоже все
работает.
*/
jQuery.prototype.each = function (fn){
    this.elements.forEach((element, index) => fn(element, index));
    //this.elements.forEach((element, index) => fn.call(element, element, index));
    return this;
}

// Метод введён для наглядности при проверке.
jQuery.prototype.click = function (fn){
    this.each((element) => element.addEventListener("click", fn));
    return this;
}

// Метод jQuery.prototype.text()
jQuery.prototype.text = function (text=""){
    /* Получает текст выбранного элемента в наборе. 
    Если таких элементов несколько, получит содержимое всех элементов, 
    разделенные пробелом.
    */
    if (!text){
        content = "";
        this.each((element) => content += " " + element.textContent);
        return content;
    }
    /*Задает новое содержимое для выбранных элементов.
    */
    else if (typeof(text) === 'string'){
        this.each((element) => element.textContent = text);
        return this;
    }
    /*Заменяет содержимое каждого выбранного элемента в наборе
     на возвращенное функцией function значение. Функция вызывается, 
     для каждого из выбранных элементов.
    */
    else if (typeof(text) === 'function'){
        this.each((element, index) => element.textContent=(text(element.textContent, index)));
    }
    else {
        return console.log("Некорректный формат данных");
    }
}

const $ = (selector) => new jQuery(selector);

// Проверка каждого из трёх условий:

// $("#button").click(function(){
//     console.log($("p").text());
// });

// $("#button").click(function(){
//     $("p").text("ХА <b>XAXAXA</b>")
// });

$("#button").click(function(){
    $("p").text(function(currentHtmlString, index){
        return "Старое содержимое элемента под индексом " + index + ": <b>" + currentHtmlString + "</b>";
    });
});

$("button").click(e => console.log(e.target));
