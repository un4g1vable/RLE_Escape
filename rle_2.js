let fs = require('fs');
let arg = process.argv;
let s;
let i = 0, k = 1;
let res = "";

if (arg[2] == "code"){
    fs.readFile(arg[3], (err, data) => {
        if (err){
            console.error(err);
            return;
        }
        // ^ Если подаётся агрумент code - читаем файл, задаваемый в 3 аргумент
        s = data.toString();
        // ^ Приводим считанные данные к строке
        while (i < s.length){ // проходимся по строке
            while(s.charAt(i) == s.charAt(i + k))
                k++;
            i += k;
            // ^ пока символы повторяются - прибавляем к счётчику кол-ва повторений текущего символа
            while (k > 255){
                k -= 255;
                res += '#' + String.fromCharCode(255) + s.charAt(i - 1);
            }
            // ^ если счётчик перевалил за 255 - записываем в результат закодированное сообщение формата (#255(ascii)sym)
            if ((k >= 3) || (s.charAt(i - 1) == '#')){
                res += '#' + String.fromCharCode(k) + s.charAt(i - 1);
            }
            // ^ если текущих символов >=3 и <256, то записываем в результат закодированное сообщение формата (#k(ascii)sym)
            else{
                res += s.charAt(i).repeat(k);
            }
            // ^ иначе в результат записываем символ(ы), стоящий(ие) в изначальной строке
            k = 1;
            // ^ сбрасываем счётчик
        }
        fs.writeFile('code.txt', res, (err) => {
            if (err){
                console.err(err);
                return;
            }
            // ^ Записываем результат в файл code.txt
        });
    });
}

else if (arg[2] == 'decode'){
    fs.readFile(arg[3], (err, data) => {
        if (err){
            console.error(err);
            return;
        }
        // ^ Если подаётся агрумент decode - читаем файл, задаваемый в 3 аргумент
        s = data.toString();
        // ^ Приводим считанные данные к строке
        s = s.split('');
        // ^ разбиваем поэлементно строку в массив
        while (i < s.length) { // идём по строке
            if (s[i] == '#') {
                let t = s[i + 1].charCodeAt();
                res += s[i + 2].repeat(t);
                i += 3;
            } // ^ если встретили # - запсиываем в t количество повторений - в res записываем символ t раз
            else {
                res += s[i];
                i++;
            }
            // ^ если встретили просто символ - записываем в res
        }
        fs.writeFile('decode.txt', res, (err) => {
            if (err){
                console.error(err);
                return;
            }
            // ^ записываем получившийся результат в decode.txt
        });
    });
}
