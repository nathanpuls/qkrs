function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return results[2].replace(/\+/g, " ");
}

let specialParam;
specialParam = getParameterByName('q', 'http://127.0.0.1:5500/search/?q=%23ccc');

console.log(specialParam);



if (/%|!/.test(searchParam))  {
    console.log('Special found:', searchParam);
 }