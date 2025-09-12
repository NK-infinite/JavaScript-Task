const Input = document.getElementById('input');
const buttons = ['0','1','2','3','4','5','6','7','8','9','.','+','-','*','/'];

let current = "";

let num1 = null;
let operator = null;

buttons.forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        Input.value += id;
        current += id;
    });
});

// remove all
document.getElementById('AC').addEventListener('click', () => {
    Input.value = '';
    current = "";
    num1 = null;
    operator = null;
});

// removw one by one 
document.getElementById('C').addEventListener('click', () => {
    Input.value = Input.value.slice(0, -1);
    current = current.slice(0, -1);
});

// operators (+ - * /)
['+','-','*','%','/'].forEach(op => {
    document.getElementById(op).addEventListener('click', () => {
        if (current !== "") {
            num1 = parseFloat(current);
            operator = op;
            Input.value += op;
            current = "";
        }
    });
});

// calculating logic
document.getElementById('=').addEventListener('click', () => {
    if (num1 !== null && operator && current !== "") {
        let num2 = parseFloat(current);
        let result = 0;

        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                result = num1 / num2;
                break;
                case '%':
                result = num1 / 100 * num2;
                break;
            default:
                result = num2;
        }

        Input.value = result;
        current = result.toString();
        num1 = null;
        operator = null;
    }
});
