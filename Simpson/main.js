//Choose an array method to implement for each of the incomplete functions.
function getGuntherCount(data){
    let numberOfEpisodes;
    numberOfEpisodes = data._embedded.episodes.length;

    return numberOfEpisodes;
}

function getTotalRuntimeMinutes(data){
    let totalRuntimeMinutes = 0;
    for(let i=0;i<data._embedded.episodes.length;i++){
        totalRuntimeMinutes += data._embedded.episodes[i].runtime;
    }
    return totalRuntimeMinutes;
}
function getTotalEpisodesInYear(data,year){
    let totalEpisodes = 0;
    for(let i=0;i<data._embedded.episodes.length;i++){
        if(data._embedded.episodes[i].airdate.slice(0,4)==year){
            totalEpisodes += 1;
        }
    }
    return totalEpisodes;
}
function getFemaleCastMembers(data){
    let totalFemaleCastMembers = 0;
    for(let i=0;i<data._embedded.cast.length;i++){
        if(data._embedded.cast[i].person.gender=="Female"){
            totalFemaleCastMembers += 1;
        }
    }
    return totalFemaleCastMembers;
}
function getEpisodeTitles(data,string){
    let totalEpisodes = 0;
    for(let i=0;i<data._embedded.episodes.length;i++){
        if(!data._embedded.episodes[i].summary==null){
            if(data._embedded.episodes[i].summary.search(string)!=-1){
                totalEpisodes += 1;
            }
        }
    }
    return totalEpisodes;
}
function getCastMembersOver55(data){
    let membersOver55 = 0;
    for(let i=0;i<data._embedded.cast.length;i++){
        if(parseInt(data._embedded.cast[i].person.birthday.slice(0,4))<1964){
            membersOver55 += 1;
        }
    }
    return membersOver55;
}
function getTotalRuntimeMinutesExcludingSeasonSix(data){
    let totalRuntimeMinutes = 0;
    for(let i=0;i<data._embedded.episodes.length;i++){
        if(data._embedded.episodes[i].season != 6){
            totalRuntimeMinutes += data._embedded.episodes[i].runtime;
        }
    }
    return totalRuntimeMinutes;
}
function getFirstFourSeasons(data){
    let newJSON = [];
    for(let i=0;i<data._embedded.episodes.length;i++){
        if(data._embedded.episodes[i].season <= 4){
            newJSON.push(data._embedded.episodes[i]);
        }
    }
    return newJSON;
}
function getEpisodeTallyBySeason(data){
    let newJSON = [];
    //season name & total episodes
    let maxSeason = 0;
    for(let i=0;i<data._embedded.episodes.length;i++){
        if(data._embedded.episodes[i].season > maxSeason){
            maxSeason = data._embedded.episodes[i].season
        }
    }
    for(let j=1;j<maxSeason+1;j++){
        let numberOfEpisodes = 0;
        for(let k=0;k<data._embedded.episodes.length;k++){
            if(data._embedded.episodes[k].season == j){
                numberOfEpisodes += 1;
            }
        }
        let obj = {'season name': j, 'total episodes': numberOfEpisodes};
        newJSON.push(obj);
    }
    return newJSON;
}
function capitalizeTheFriends(data){
    let reg = /\bjoey\b|\bchandler\b|\bross\b|\bmonica\b|\brachel\b|\bphoebe\b/gi
    return data._embedded.episodes.filter(ep => ep.summary = ((ep.summary) ?
    (ep.summary.replace(reg, match => match.toUpperCase())) : " "))
    .filter(ep => ep.name = ep.name.replace(reg, match => match.toUpperCase()))
}
//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

//Remember, you can chain together array function calls to attain your goals.
// Ex: array.filter().map()

//Get data for the TV Show "Friends"
fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output
		movieData = json

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        
        // where the character Gunther is mentioned in the episode summary.
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

        //3 - Create a function called getDateRangeEpisodeCount() that returns the number of episodes that aired in the year 2000
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));

    })

// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
// (or a combination) ON THE PROVIDED JSON DATA

// Define the required ten functions below this line...