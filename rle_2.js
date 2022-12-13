
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
        s = data.toString();
        while (i < s.length){
            while(s.charAt(i) == s.charAt(i + k))
                k++;
            i += k;
            while (k > 255){
                k -= 255;
                res += '#' + String.fromCharCode(255) + s.charAt(i - 1);
            }
            if ((k >= 3) || (s.charAt(i - 1) == '#')){
                res += '#' + String.fromCharCode(k) + s.charAt(i - 1);
            }
            else{
                res += s.charAt(i).repeat(k);
            }
            k = 1;
        }
        fs.writeFile('code.txt', res, (err) => {
            if (err){
                console.err(err);
                return;
            }
        });
    });
}

else if (arg[2] == 'decode'){
    fs.readFile(arg[3], (err, data) => {
        if (err){
            console.error(err);
            return;
        }
        s = data.toString();
        s = s.split('');
        while (i < s.length) {
            if (s[i] == '#') {
                let t = s[i + 1].charCodeAt();
                res += s[i + 2].repeat(t);
                i += 3;
            }
            else {
                res += s[i];
                i++;
            }
        }
        fs.writeFile('decode.txt', res, (err) => {
            if (err){
                console.error(err);
                return;
            }
        });
    });
}