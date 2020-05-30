//VARIABLE DEC:-----------------------------------------
var subBtn, btnFn, descField, valField, totalBudget, incLabVal, expLabVal, init, dataStruct, radioInc, radioExp, ulKeyInc, ulKeyExp;



//STORING ELEMENTS------------------------------------------------
descField = document.getElementById('descField');
valField = document.getElementById('valField');
totalBudget = document.querySelector('.totalBudget');
incLabVal = document.querySelector('.incomeLabelValue');
expLabVal = document.querySelector('.expenseLabelValue');
radioInc = document.getElementById('radInc');
radioExp = document.getElementById('radExp');
ulKeyInc = document.querySelector('.incomeListUL');
ulKeyExp = document.querySelector('.expenseListUL');
dataStruct = {
    top: {
        inc: 0,
        exp: 0,
        budget: 0
    },
    bottom: {
        inc: [],
        exp: [],
        type: ''
    }
}


//INITIAL FUNCTION
init = function() {
    totalBudget.textContent = dataStruct.top.budget;
    incLabVal.textContent = dataStruct.top.inc;
    expLabVal.textContent = dataStruct.top.exp;
}
init();


//EVENT LISTENERS-------------------------------------------------
subBtn = document.getElementById('subBtn');
subBtn.addEventListener('click', function() { btnFn(); });

document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13)
        btnFn();
});


//FUNCTIONS------------------------------------------------------
btnFn = function() {
    if (descField.value !== '' && valField.value !== '' && valField.value !== 0) {
        radioInc.checked === true ? dataStruct.bottom.type = 'inc' : dataStruct.bottom.type = 'exp';
        if (dataStruct.bottom.type === 'inc') {
            dataStruct.bottom.inc.push(valField.value);
        } else {
            dataStruct.bottom.exp.push(valField.value);
        }

        var textInc = '<li><div class="incomeListDescription"> %desc%</div> : <div class="incomeListValue"> %val%</div><button class="delete" id="button-%id%">X</button></li>';

        var textExp = '<li><div class="expenseListDescription"> %desc%</div> : <div class="expenseListValue"> %val%</div><button class="delete" id="button-%id%">X</button></li>';

        if (dataStruct.bottom.type === 'inc') {
            textInc = textInc.replace('%desc%', descField.value);
            textInc = textInc.replace('%val%', valField.value);
            ulKeyInc.insertAdjacentHTML('beforeend', textInc);
        } else {
            textExp = textExp.replace('%desc%', descField.value);
            textExp = textExp.replace('%val%', valField.value);
            ulKeyExp.insertAdjacentHTML('beforeend', textExp);
        }

        var temp = 0;
        for (var i = 0; i < dataStruct.bottom.inc.length; i++) {
            temp += parseFloat(dataStruct.bottom.inc[i]);
        }
        var temp1 = 0;
        for (var i = 0; i < dataStruct.bottom.exp.length; i++) {
            temp1 += parseFloat(dataStruct.bottom.exp[i]);
        }
        dataStruct.top.inc = temp.toFixed(2);
        dataStruct.top.exp = temp1.toFixed(2);
        incLabVal.textContent = dataStruct.top.inc;
        expLabVal.textContent = dataStruct.top.exp;
        totalBudget.textContent = (dataStruct.top.inc - dataStruct.top.exp).toFixed(2);
        descField.value = '';
        valField.value = '';
        descField.focus();
    }
};