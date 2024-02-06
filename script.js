let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', '*', '/'];

const screen = document.querySelector('.calc-screen p');

function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    screen.textContent = 0;
    screen.style.fontSize = '80px';
}

function clearLast(){
    if(a !== '' && b === ''){
        a = '';
        sign = '';
        finish = false;
        screen.textContent = 0;
        screen.style.fontSize = '80px';
    }
  
    if(a !== '' && b !== ''){
        b = '';
        sign = '';
        finish = false;
        screen.textContent = a;
        if(a.length <= 5) screen.style.fontSize = '80px';
    }
}

function spaces(i, len, key = ''){
    i = i.split(' ').join("").split("");
    if(key === '=' && len === 9){
        i.splice(3, 0, ' '); 
        i.splice(7, 0, ' ');
        return i.join("");
    }
    if(len === 3){
        i.splice(1, 0, ' ');
        return i.join("");
    }
    if(len === 5){
        i.splice(2, 0, ' ');
        return i.join("");
    } 
    if(len === 6){
        i.splice(3, 0, ' ');
        return i.join("");
    } 
    if(len === 7){
        i.splice(1, 0, ' ');
        i.splice(5, 0, ' ');
        return i.join("");
    } 
    if(len === 9){
        i.splice(2, 0, ' ');
        i.splice(6, 0, ' ');
        return i.join("");
    }
    if(len === 10){
        i.splice(3, 0, ' ');
        i.splice(7, 0, ' ');
        return i.join("");
    }
}

document.querySelector('.ac').onclick = clearLast;
document.querySelector('.c').onclick = clearAll;

document.querySelector('.calc-buttons').onclick = (event) => {
    if(!event.target.classList.contains('btn')) return;
    if(event.target.classList.contains('c')) return;
    if(event.target.classList.contains('ac')) return;

    screen.textContent = '';
    const key = event.target.textContent;

    if(a.length > 9) a = a.slice(0, 10);
    if(b.length > 9) b = b.slice(0, 10);
    if(a.length > 5 || b.length > 5){
        screen.style.fontSize = '54px';
    }   

    if(digit.includes(key)){
        if(b === '' && sign === ''){ 
            let aLen = a.length;
            if(key === '.') aLen--;

            if(!a.includes('.'))
                if([3,5,6,7,9,10].includes(aLen)) a = spaces(a, aLen);

            if(key === '.' && a.includes('.')){
                screen.textContent = a;
            }else if(key === '.' && a === ''){
                screen.textContent = 0;
            }else if(key === '0' && a === '0'){
                screen.textContent = 0;
            }else if(key !== '0' && a === '0'){ 
                if(key !== '.'){
                    a = key;
                    screen.textContent = key;
                } 
                else{
                    a += key;
                    screen.textContent = a;
                } 
            }else{
                a += key;
                screen.textContent = a;
            }
        }else if(a !== '' && b !== '' && finish){
            b = key;
            finish = false;
            screen.textContent = b;
        }else{
            let bLen = b.length;
            if(key === '.') bLen--;
            if(!b.includes('.'))
            if([3,5,6,7,9,10].includes(bLen)) b = spaces(b, bLen);

            if(key === '.' && b.includes('.')){
                screen.textContent = b;
            }else if(key === '.' && b === ''){
                screen.textContent = sign;
            }else if(key === '0' && b === '0'){
                screen.textContent = 0;
            }else if(key !== '0' && b === '0'){
                if(key !== '.'){
                    b = key;
                    screen.textContent = key;
                } 
                else{
                    b += key;
                    screen.textContent = b;
                } 
            }else{
                b += key;
                screen.textContent = b;
            }
        }
        
    }

    if(action.includes(key)){
        sign = key;
        screen.textContent = sign;
        return;
    }

    if(key === '='){
        a = a.toString().split(" ").join('');
        b = b.split(" ").join('');

        switch(sign){
            case '+':
                a = (a * 10 + b * 10) / 10;
                break;
            case '-':
                a -= b;
                break;
            case '*': 
                a *= b;
                break; 
            case '/':
                if(b === '0'){
                    screen.textContent = 'Помилка';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                } 
                a /= b;
                break;
        }

        a = a.toString();
        let aLen = a.length;
        if(a.includes('.')) aLen--;

        if(a.includes('.')){
            let splitDot = a.split('.');
            a = spaces(splitDot[0], splitDot[0].length) + '.' + splitDot[1];
        }else{
            if([3,5,6,7,9,10].includes(aLen)) a = spaces(a, aLen, '=');
        }

        if(a.length > 6) screen.style.fontSize = '54px';
        if(a.length > 9) screen.style.fontSize = '47px';
        
        screen.textContent = a;
        finish = true;
        // NaN
        // зсуває числа вліво
        // не рахує пробіли в = з крапкою
        //експонента працює навіть на малих числах
        //не обрізає числа після ='
        //видає undefined в числі перед комою
    }
}