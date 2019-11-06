'use strict';


let input = document.querySelectorAll('.input-field input'),
	fuelType = input[0],
	price = input[1],
	expenseFuel = input[2],
	weightCurb = input[3],
	tankVolume = input[4],
	temperatureWeather = input[5],
	routeLength = input[6];

// console.log(fuelType.textContent);

let twoWay = document.querySelector('[type="checkbox"]');

let btn = document.getElementsByClassName('btn'),
	btnCalc = btn[1],
	btnSend = btn[0];

let output = document.getElementsByClassName('output'),
priceForKm = output[0],
priceForHKm = output[1],
priceForTank = output[2],
countRefill = output[3],
priceForRoute = output[4];


class Calculate{
	constructor(price, expenseFuel, tankVolume, routeLength, temperatureWeather, twoWayRadioBtn ){
		this.expenseFuel = expenseFuel;
		this.price = price;
		this.tankVolume = tankVolume;
		this.routeLength = routeLength;
		this.temperatureWeather = temperatureWeather;
		this.twoWayRadioBtn = twoWayRadioBtn;
	}

	//расход топлива на 1 км
	_toCountWeightFuelForKm(){
		return (this.expenseFuel + this._weaterDependence()) / 100;
	}

	_weaterDependence(){
		let coefficient = 0;
		if (this.temperatureWeather > 19) {
			coefficient = 0;
			console.log(`Расход постоянный ${coefficient}`);
		} 
		else if(this.temperatureWeather <= 15 && this.temperatureWeather > 5){
			coefficient = 0.3;
			console.log(`Расход увеличен ${coefficient}`);
		}
		else if(this.temperatureWeather < 5){
			coefficient = 0.5;
		}
		console.log(`Расход увеличен ${coefficient * this.expenseFuel }`);
		return coefficient * this.expenseFuel;
	}

	//Цена за 1 км
	toCalcPriceForKm(){
		return (this._toCountWeightFuelForKm() * this.price).toFixed(3);
	}
	//Цена за 100 км
	toCalcHKm(){
		return (this.toCalcPriceForKm() * 100).toFixed(2);
	}
	//Цена за полный бак
	toCalcForTank(){
		return (this.tankVolume * this.price).toFixed(2);
	}
	//Количество заправок
	toCountRefill(){
		return ((this.routeLength * this._toCountWeightFuelForKm()) / this.tankVolume).toFixed(1);
	}
	//Цена за весь маршрут
	toCalcPriceForRoute(){
		if (this.twoWayRadioBtn) {
			return ((this.routeLength * 2) * this.toCalcPriceForKm()).toFixed(2);		
		}
		else {
			return (this.routeLength * this.toCalcPriceForKm()).toFixed(2);
		}

	}
	
}

btnCalc.addEventListener('click', function () {
	console.log('Start Calculating');
	// price, weightCurb, tankVolume, routeLength, temperatureWeather 
	let calc = new Calculate(+price.value, +expenseFuel.value, +tankVolume.value, +routeLength.value, +temperatureWeather.value, twoWay.checked);
	
	// let calc = new Calculate(28.4,3.4,14,300, 0);
	// console.log(+price.value);
	// calc._weaterDependence();
	console.log(twoWay.checked);

	priceForKm.textContent = calc.toCalcPriceForKm();
	priceForHKm.textContent = calc.toCalcHKm();
	priceForTank.textContent = calc.toCalcForTank();
	countRefill.textContent = calc.toCountRefill();
	priceForRoute.textContent = calc.toCalcPriceForRoute();

});