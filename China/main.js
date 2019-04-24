//PROG 2700 - CLIENT SIDE PROGRAMMING
//TECH CHECK #3 - Array FUNctions

// Using the data retrieved from the API Endpoint, 
// write a function called 'getPopulation' that returns the total population
// for all countries that BOTH border China
// and list English as one of their official languages

//NOTE: You are NOT permitted to use FOR, FOREACH, or WHILE loops of any kind.
//      You must leverage the available JavaScript Array Iteration Functions to accomplish your goal.
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods

// MARKING
// 10/10 - Function is completed to spec and submitted within class time
//  8/10 - Function is completed to spec and submitted within grace period of twelve hours of Tech Check start time (ie before 8:30pm tonight)
//  6/10 - Function is completed to spec and submitted after twelve-hour grace period 8:30pm
//  0/10 - Function is not completed


(function(){

    fetch(`https://restcountries.eu/rest/v2/all`)
        .then(response => response.json())
        .then(json => {
            function getPopulation(data){                
                var totalPopulationBorderChina;
                countries = data.filter(country => country.borders.includes("CHN"));
                countries = countries.filter(country => country.languages.find(language => language.name=="English"));
                totalPopulationBorderChina = countries.map(country => country.population).reduce((prev, next) => prev + next);;
                return totalPopulationBorderChina;

            };
            //DO NOT MODIFY THIS CODE
            console.log(`TOTAL POPULATION: ${ getPopulation(json) }`);
            console.assert( getPopulation(json) === 1496659362, "Incorrect population total returned by getPopulation function" );

        })

    //WRITE YOUR FUNCTION BELOW THIS LINE


})();