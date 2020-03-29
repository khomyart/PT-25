$(document).ready(function () {
	let justFoundResultOfCalculation = false;

	const display = $('#display');
	const displayNoJquery = document.querySelector('#display');
	const keyboard = {
		'1': $('#one').click(()=>displayString('1', display)),

		'2': $('#two').click(()=>displayString('2', display)),

		'3': $('#three').click(()=>displayString('3', display)),

		'4': $('#four').click(()=>displayString('4', display)),

		'5': $('#five').click(()=>displayString('5', display)),

		'6': $('#six').click(()=>displayString('6', display)),

		'7': $('#seven').click(()=>displayString('7', display)),

		'8': $('#eight').click(()=>displayString('8', display)),

		'9': $('#nine').click(()=>displayString('9', display)),

		'0': $('#zero').click(()=>displayString('0', display)),

		'.': $('#decimal').click(()=>displayString('.', display, displayNoJquery)),

		'^2': $('#square').click(()=>{
			let isStringHasNeededSymbolAtTheEnd = false;
			let neededSymbols = ['+', '-', '/', '*', '.'];

			neededSymbols.forEach((elem)=>{

				if (display.text().lastIndexOf(elem) === display.text().length - 1) {
					isStringHasNeededSymbolAtTheEnd = true;
				}	
			});

			if (display.text() === '0') {
				justFoundResultOfCalculation = false;
			} else if (isStringHasNeededSymbolAtTheEnd === false) {
				display.text(Math.pow(eval(display.text()), 2));
				justFoundResultOfCalculation = true;
			}				
		}),

		'^(1/2)': $('#sqrt').click(()=>{
			let isStringHasNeededSymbolAtTheEnd = false;
			let neededSymbols = ['+', '-', '/', '*', '.'];

			neededSymbols.forEach((elem)=>{

				if (display.text().lastIndexOf(elem) === display.text().length - 1) {
					isStringHasNeededSymbolAtTheEnd = true;
				}	
			});

			if (display.text() === '0') {
				justFoundResultOfCalculation = false;
			} else if (isStringHasNeededSymbolAtTheEnd === false) {
				display.text(Math.pow(eval(display.text()), 1/2));
				justFoundResultOfCalculation = true;
			}			
		}),

		'c': $('#calu-w3ls').click(()=>display.text('0')),

		'+-': $('#plus_minus').click(()=>{
			let neededSymbols = ['+', '-', '/', '*'];
			let lastPositionOfNeededSymbol = -1;

			neededSymbols.forEach((elem)=>{

				if (display.text().lastIndexOf(elem) > lastPositionOfNeededSymbol) {
					lastPositionOfNeededSymbol = display.text().lastIndexOf(elem);
				}	
			});

			if ((display.text() !== '0') && (lastPositionOfNeededSymbol === -1)) {
				display.text('-' + display.text());
				return 0;
			}

			if (lastPositionOfNeededSymbol === 0 ) {
				display.text(display.text().slice(1));
			}

			if (lastPositionOfNeededSymbol !== -1) {
				let devidedDisplayString = display.text().split('');

				if ((devidedDisplayString[lastPositionOfNeededSymbol] === '*' || 
					devidedDisplayString[lastPositionOfNeededSymbol] === '/') &&
					devidedDisplayString[lastPositionOfNeededSymbol+1] !== '-') {
					devidedDisplayString.splice(lastPositionOfNeededSymbol+1, 0, '-');
					display.text(devidedDisplayString.join(''));
					return 0;
				}

				if ((devidedDisplayString[lastPositionOfNeededSymbol-1] === '*' || 
					devidedDisplayString[lastPositionOfNeededSymbol-1] === '/') &&
					devidedDisplayString[lastPositionOfNeededSymbol] === '-') {
					devidedDisplayString.splice(lastPositionOfNeededSymbol, 1, '');
					display.text(devidedDisplayString.join(''));
					return 0;
				}

				if (devidedDisplayString[lastPositionOfNeededSymbol] === '+') {
					devidedDisplayString.splice(lastPositionOfNeededSymbol, 1, '-');
					display.text(devidedDisplayString.join(''));
					return 0;
				}

				if (devidedDisplayString[lastPositionOfNeededSymbol] === '-') {
					devidedDisplayString.splice(lastPositionOfNeededSymbol, 1, '+');
					display.text(devidedDisplayString.join(''));
					return 0;
				}
			}
		}),

		'/': $('#divide').click(()=>displayString('/', display)), 

		'*': $('#multiply').click(()=>displayString('*', display)),

		'-': $('#subtract').click(()=>displayString('-', display)),

		'+': $('#add').click(()=>displayString('+', display)), 

		'=': $('#equals').click(()=>{
			let neededSymbols = ['+', '-', '/', '*'];
			let lastPositionOfNeededSymbol = -1;

			neededSymbols.forEach((elem)=>{

				if (display.text().lastIndexOf(elem) > lastPositionOfNeededSymbol) {
					lastPositionOfNeededSymbol = display.text().lastIndexOf(elem);
				}	
			});

			let isStringHasNeededSymbolAtTheEnd = false;
			neededSymbols.push('.');

			neededSymbols.forEach((elem)=>{

				if (display.text().lastIndexOf(elem) === display.text().length - 1) {
					isStringHasNeededSymbolAtTheEnd = true;
				}	
			});

			//"=" cannot be pressed, if display hasn't at least one of needed symbols (+,-,*,/) and if
			//needed (special) symbol placed at the end
			if (lastPositionOfNeededSymbol !== -1 && isStringHasNeededSymbolAtTheEnd === false) {
				display.text(eval(display.text()));
				justFoundResultOfCalculation = true;
			}
		})
	}

	function displayString(value, display, displayNoJquery) 
	{
		let currentDisplayValue = display.text();

		//When calculation has been done
		if (justFoundResultOfCalculation === true) {

			//When we have just '0' symbol at the beginning of calculating and pressing '.' button
			//display accepts '0.' value instead of just '.'
			if (value === '.') {
				//pure js has been used here becouse jquery doesn't work (in result calculator displays '.'' instead of needed '0.')
				displayNoJquery.innerText = '0.'
				//display.text('0.');
				justFoundResultOfCalculation = false;
				return 0;
			}

			//When we want to start calculating by typing some number, currentDisplayValue accepts new value
			//and from this moment new calculating has begun (justFoundResultOfCalculation was 'true', become 'false')
			if (currentDisplayValue === '0') {
				display.text(value);
				justFoundResultOfCalculation = false;
				return 0;
			}

			//When calculation is done (by pressing '=') we receive a result number.
			//If we typing some special symbol, currentDisplayValue won't reset, instead
			//algorythm takes result number and adding to it special symbol which was typed by us
			if (value === '+' || value === '-' || 
				value === '*' || value === '/') {
				justFoundResultOfCalculation = false;
				display.text(currentDisplayValue + value);
			} else {
				justFoundResultOfCalculation = false;
				display.text(value);
			}
			return 0;
		}

		//When calculation is continuous 
		if (justFoundResultOfCalculation === false) {

			//make possible to display something like '0/123' or '0+12312' or etc
			//without this 'if' it would be impossible to add something to 0 (0+, 0/, 0-) wich placed on display
			//at the beginning of calculation, new button value will replace it
			if ((currentDisplayValue === '0') && (value !== '.')) {

				if (value === '+' || value === '-' || 
					value === '*' || value === '/' || value === '.') {
					display.text(currentDisplayValue + value);
					return 0;
				} else {
					display.text(value);
					return 0;
				}
			} 

			//fixes problem with this situation: 12+13.02.03.12.32 => 12+13.02031232
			//but while this 'if' exists it needs to have additional check (down below) to prevent situation
			//when we have last symbols in a currentDisplayValue like those (+,-,/,*) and '.' symbol
			//can be written after them, like that: 13+3+. => 13+3+
			if (value === '.') {
				lastPositionOfDotOnScreen = currentDisplayValue.lastIndexOf('.');

				let neededSymbols = ['+', '-', '/', '*'];
				let lastPositionOfNeededSymbol = -1;

				neededSymbols.forEach((elem)=>{

					if (display.text().lastIndexOf(elem) > lastPositionOfNeededSymbol) {
						lastPositionOfNeededSymbol = currentDisplayValue.lastIndexOf(elem);
					}	
				});

				if (lastPositionOfDotOnScreen <= lastPositionOfNeededSymbol) {

					//additional check to make currentDisplayValue more correct (without 13+. or 345/. issues) and prettier
					if (value === '+' || value === '-' || 
						value === '*' || value === '/' || value === '.'	) {
						let neededSymbols = ['+', '-', '/', '*', '.'];
						let lastPositionOfNeededSymbol = -1;

						neededSymbols.forEach((elem)=>{

							if (currentDisplayValue.lastIndexOf(elem) > lastPositionOfNeededSymbol) {
								lastPositionOfNeededSymbol = currentDisplayValue.lastIndexOf(elem);
							}	
						});

						if (lastPositionOfNeededSymbol !== (currentDisplayValue.length - 1)) {
							display.text(currentDisplayValue + value);
							return 0;
						} else {
							return 0;
						}
					}

				} else {
					return 0;
				}
			}

			//replace '0' without '.' with correct value (to prevent something like 13+02/ => 13+2)
			if ((((currentDisplayValue.lastIndexOf('+0') === currentDisplayValue.length - 2) ||
				(currentDisplayValue.lastIndexOf('/0') === currentDisplayValue.length - 2) ||
				(currentDisplayValue.lastIndexOf('*0') === currentDisplayValue.length - 2) ||
				(currentDisplayValue.lastIndexOf('-0') === currentDisplayValue.length - 2)) &&
				(currentDisplayValue.length >= 2))
				&& (value !== '.')) {
				currentDisplayValue = currentDisplayValue.slice(0, currentDisplayValue.length - 1);
				display.text(currentDisplayValue + value);
				return 0;
			}

			//fixes problem with possibility of endless typing special (needed) symbols,
			//resolves problem with something like this => 32+++ => 32+, 34+54....12+ => 34+54.12+
			if (value === '+' || value === '-' || 
				value === '*' || value === '/' || value === '.'	) {
				let neededSymbols = ['+', '-', '/', '*', '.'];
				let lastPositionOfNeededSymbol = -1;

				neededSymbols.forEach((elem)=>{

					if (currentDisplayValue.lastIndexOf(elem) > lastPositionOfNeededSymbol) {
						lastPositionOfNeededSymbol = currentDisplayValue.lastIndexOf(elem);
					}	
				});

				if (lastPositionOfNeededSymbol !== (currentDisplayValue.length - 1)) {
					display.text(currentDisplayValue + value);
					return 0;
				} else {
					return 0;
				}
			}

		 	display.text(currentDisplayValue + value);
		 	return 0;
		}
	} 
});





