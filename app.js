//VARIABLE DEC:-----------------------------------------
var subBtn, btnFn, descField, valField, totalBudget, incLabVal, expLabVal, init, dataStruct, radioInc, radioExp, ulKeyInc, ulKeyExp, calcSetUI, idInc, idExp;



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


//Data Structure which will be used to store the user input and other calculations
dataStruct = {
    top: {
        inc: 0,
        exp: 0,
        budget: 0
    },
    bottom: {
        inc: [],
        incID: [],
        exp: [],
        expID: [],
        type: ''
    }
}


//INITIAL SETTER which sets all the values to zero initially

totalBudget.textContent = dataStruct.top.budget;
incLabVal.textContent = dataStruct.top.inc;
expLabVal.textContent = dataStruct.top.exp;
idInc = 0;
idExp = 0;



//EVENT LISTENERS-------------------------------------------------

//Listener for submit/enter button

//For Mouse Event:
subBtn = document.getElementById('subBtn');
subBtn.addEventListener('click', function() { btnFn(); });


//For KeyBoard Event
document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13)
        btnFn();
});


//FUNCTIONS------------------------------------------------------
btnFn = function() {
	
	//check that the field is not empty
    if (descField.value !== '' && valField.value !== '' && valField.value !== 0) {
		
		//check which radio button is checked
        radioInc.checked === true ? dataStruct.bottom.type = 'inc' : dataStruct.bottom.type = 'exp';
        if (dataStruct.bottom.type === 'inc') {
			
			//push data to the data structure created according to the checked type
            dataStruct.bottom.inc.push(parseFloat(valField.value));
            dataStruct.bottom.incID.push(idInc);
            idInc++;
        } else {
			
			//else block for the above statement
            dataStruct.bottom.exp.push(parseFloat(valField.value));
            dataStruct.bottom.expID.push(idExp);
            idExp++;
        }
		
		
		//hardcoding the list to the UI, for both income and expense list
        var textInc = '<li ><div class="incomeListDescription"> %desc%</div> : <div class="incomeListValue"> %val%</div><button class="delete" id = "incomeListId-%idid%">X</button></li>';

        var textExp = '<li ><div class="expenseListDescription"> %desc%</div> : <div class="expenseListValue"> %val%</div><button class="delete" id="expenseListId-%idid%">X</button></li>';


		//replacing all the values which are required from the data strucutre for both the cases
        if (dataStruct.bottom.type === 'inc') {
            textInc = textInc.replace('%desc%', descField.value);
            textInc = textInc.replace('%val%', valField.value);
            textInc = textInc.replace('%idid%', dataStruct.bottom.inc.length - 1);
            ulKeyInc.insertAdjacentHTML('beforeend', textInc);
        } else {
            textExp = textExp.replace('%desc%', descField.value);
            textExp = textExp.replace('%val%', valField.value);
            textExp = textExp.replace('%idid%', dataStruct.bottom.exp.length - 1);
            ulKeyExp.insertAdjacentHTML('beforeend', textExp);

        }
		
		
		//function to set the UI after the changes are done to the internal data structure
        calcSetUI();


		//coming back to the description field after the submit to make it better for the user
        descField.value = '';
        valField.value = '';
        descField.focus();
    }
};


//Setting up an event fot the deletion of list items.
//We use EVENT DELEGATION to avoid the unndefined error for seeting event to an element which does not exist while the DOM loades initially
document.querySelector('.bottomContainer').addEventListener('click', function(event) {
	
	//only perform this operation if an id exist for the block. We did this intentionaly as we didn't provided any it to the other elements in the same block
    if (event.target.id !== '') {
        var storeID = event.target.id;
        var splidID = storeID.split('-');
        var incexpID = splidID[0];
        var arrID = splidID[1];
		//Most tricky part of the whole program. I used another array to store the ids and then use it to delete the elemets from the internal data structure
        if (incexpID === 'incomeListId') {
            var index = dataStruct.bottom.incID.indexOf(parseInt(arrID));
            dataStruct.bottom.inc.splice(index, 1);
            dataStruct.bottom.incID.splice(index, 1);
        } else {
            var index = dataStruct.bottom.expID.indexOf(parseInt(arrID));
            dataStruct.bottom.exp.splice(index, 1);
            dataStruct.bottom.expID.splice(index, 1);
        }
    }
    calcSetUI();
	
	//setting the display to none to hide it from the webpage
    document.getElementById(storeID).parentElement.style.display = 'none';
});


//A function which sets the UI according to the Internal Data Structure
calcSetUI = function() {
    var temp = 0;
    for (var i = 0; i < dataStruct.bottom.inc.length; i++) {
        temp += parseFloat(dataStruct.bottom.inc[i]);
    }
    var temp1 = 0;
    for (var i = 0; i < dataStruct.bottom.exp.length; i++) {
        temp1 += parseFloat(dataStruct.bottom.exp[i]);
    }
    dataStruct.top.inc = parseFloat(temp).toFixed(2);
    dataStruct.top.exp = parseFloat(temp1).toFixed(2);
    dataStruct.top.budget = (dataStruct.top.inc - dataStruct.top.exp).toFixed(2);
    incLabVal.textContent = dataStruct.top.inc;
    expLabVal.textContent = dataStruct.top.exp;
    totalBudget.textContent = dataStruct.top.budget;
}