let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
let first_player_hand   = [];
let second_player_hand  = [];

function checkSameSuit(pokerHand){
    let sameSuit = true;
    let suit = pokerHand[0].suit;
    for(let i=0;i<pokerHand.length;i++){
        if(suit != pokerHand[i].suit)
            sameSuit = false;
    }
    if(sameSuit){
        suit = pokerHand[1].suit;
        for(let i=0;i<pokerHand.length;i++){
            if(suit != pokerHand[i].suit)
                sameSuit = false;
        }
    }
    if(sameSuit){
        suit = pokerHand[2].suit;
        for(let i=0;i<pokerHand.length;i++){
            if(suit != pokerHand[i].suit)
                sameSuit = false;
        }
    }
    if(sameSuit){
        suit = pokerHand[3].suit;
        for(let i=0;i<pokerHand.length;i++){
            if(suit != pokerHand[i].suit)
                sameSuit = false;
        }
    }
    return sameSuit;
}

function scoreHand(pokerHand)
{
    //Since poker score gets the highest of possible combinations, we need to check from highest to lowest.
    //We have two attributes: value(number), suit(shape)
    /*Rank of poker combination: 
        Royal Flush(100000) > Straight Flush(90600~91300, 92000) > Four of a kind(80200~81400) > Full House(70203~71413) > 
        Flush(60000) > Straight(50600~51300, 52000: A2345, 53000: AKQJ10) > Three of a Kind(40200~41400) >
        Two Pair(30302~42013) > Pair(20200~21300, 22000) > High Card(7~13, 20)
    */
    let score;
    let values = [];
    for(let i=0;i<pokerHand.length;i++){
        let cardValue = pokerHand[i].value;
        if(cardValue=="JACK"){
            cardValue = 11;
        }
        if(cardValue=="QUEEN"){
            cardValue = 12;
        }
        if(cardValue=="KING"){
            cardValue = 13;
        }
        if(cardValue=="ACE"){
            cardValue = 0;
        }
        values.push(cardValue);
    }
    values.sort(function(a, b){return a-b});
    //However, we need to know we can categorize Flush family & non-Flush family
    if(checkSameSuit(pokerHand)){//Flush Family
        if(values[0]==0 && values[1]==10 && values[2]==11 && values[3]==12 && values[4]==13)//Royal Straight Flush
            score = 100000;
        else if(values[0]==0 && values[1]==2 && values[2]==3 && values[3]==4 && values[4]==5)//Back Straight Flush
            score = 92000;
        else if(values[0]==0 && values[1]==2 && values[2]==3 && values[3]==4 && values[4]==13)
            score = 91300;
        else if(values[0]==0 && values[1]==2 && values[2]==3 && values[3]==12 && values[4]==13)
            score = 91300;
        else if(values[0]==0 && values[1]==2 && values[2]==11 && values[3]==12 && values[4]==13)
            score = 91300;
        else if(values[0]==2 && values[1]==3 && values[2]==4 && values[3]==5 && values[4]==6)
            score = 90600;
        else if(values[0]==3 && values[1]==4 && values[2]==5 && values[3]==6 && values[4]==7)
            score = 90700;
        else if(values[0]==4 && values[1]==5 && values[2]==6 && values[3]==7 && values[4]==8)
            score = 90800;
        else if(values[0]==5 && values[1]==6 && values[2]==7 && values[3]==8 && values[4]==9)
            score = 90900;
        else if(values[0]==6 && values[1]==7 && values[2]==8 && values[3]==9 && values[4]==10)
            score = 91000;
        else if(values[0]==7 && values[1]==8 && values[2]==9 && values[3]==10 && values[4]==11)
            score = 91100;
        else if(values[0]==8 && values[1]==9 && values[2]==10 && values[3]==11 && values[4]==12)
            score = 91200;
        else//Just Flush
            score = 60000;
    }
    else{//Non-Flush Family
        if(values[0]==values[1]){//At least a Pair(0,0,***)
            if(values[0]==values[2]){//At least Three of a Kind(0,0,0,**)
                if(values[0]==values[3] || values[0]==values[4]){//Four of a Kind(0000*)
                    score = 80000 + parseInt(values[0]) * 100;
                    if(score == 80000)
                        score = 82000;
                }
                else if(values[3]==values[4]){//Full House;(00011)
                    if(values[0]==0)
                        score = 72000 + parseInt(values[3]);
                    else
                        score = 70000 + parseInt(values[0]) * 100 + parseInt(values[3]);
                }
                else{//Three of a Kind(000**)
                    if(values[0]==0)
                        score = 42000;
                    else
                        score = 40000 + parseInt(values[0]) * 100;
                }
            }
            else{//One Pair, Two Pairs, Full House(00***)
                if(values[2]==values[3]){//At least Two Pairs(0011*)
                    if(values[2]==values[4]){//Full House(00111)
                        if(values[0]==0)
                            score = 70020 + parseInt(values[2]) * 100;
                        else
                            score = 70000 + parseInt(values[2]) * 100 + parseInt(values[0]);
                    }
                    else{//Two Pairs(0011*)
                        if(values[0]==0)
                            score = 32000 + parseInt(values[2]);
                        else
                            score = 30000 + parseInt(values[2]) * 100 + parseInt(values[0]);
                    }
                }
                else if(values[3]==values[4]){//Two Pairs(00122)
                    if(values[0]==0)
                        score = 32000 + parseInt(values[3]);
                    else
                        score = 30000 + parseInt(values[3]) * 100 + parseInt(values[0]);
                }
                else{//One Pair(00***)
                    if(values[0]==0)
                        score = 22000;
                    else
                        score = 20000 + parseInt(values[0]) * 100;
                }
            }
        }
        else{
            if(values[1]==values[2]){//At least a Pair(011**)
                if(values[1]==values[3]){//At least Three of a Kind(0111*)
                    if(values[1]==values[4])//Four of a kind(01111)
                        score = 80000 + parseInt(values[1]) * 100; // values[1] cannot be Ace
                    else//cannot be full house because it was sorted. -> Three of a Kind(0111*)
                        score = 40000 + parseInt(values[1]) * 100; // values[1] cannot be Ace
                }
                else if(values[3]==values[4])//Two Pairs(01122)
                    score = 30000 + parseInt(values[3]) * 100 + parseInt(values[1]);//values[1] and values[3] cannot be Ace
                else
                    score = 20000 + parseInt(values[1]) * 100;//values[1] cannot be Ace
            }
            else{
                if(values[2]==values[3]){//At least a pair(0122*)
                    if(values[2]==values[4])//Three of a Kind(01222)
                        score = 40000 + parseInt(values[2]) * 100;
                    else//One Pair(0122*)
                        score = 20000 + parseInt(values[2]) * 100;
                }
                else{
                    if(values[3]==values[4])//Pair(01233)
                        score = 20000 + parseInt(values[3]) * 100;
                    else if(values[0]==0 && values[1]==10 && values[2]==11 && values[3]==12 && values[4]==13)//Royal Straight
                        score = 53000;
                    else if(values[0]==0 && values[1]==2 && values[2]==3 && values[3]==4 && values[4]==5)//Back Straight
                        score = 52000;
                    else if(values[0]==0 && values[1]==2 && values[2]==3 && values[3]==4 && values[4]==13)
                        score = 51300;
                    else if(values[0]==0 && values[1]==2 && values[2]==3 && values[3]==12 && values[4]==13)
                        score = 51300;
                    else if(values[0]==0 && values[1]==2 && values[2]==11 && values[3]==12 && values[4]==13)
                        score = 51300;
                    else if(values[0]==2 && values[1]==3 && values[2]==4 && values[3]==5 && values[4]==6)
                        score = 50600;
                    else if(values[0]==3 && values[1]==4 && values[2]==5 && values[3]==6 && values[4]==7)
                        score = 50700;
                    else if(values[0]==4 && values[1]==5 && values[2]==6 && values[3]==7 && values[4]==8)
                        score = 50800;
                    else if(values[0]==5 && values[1]==6 && values[2]==7 && values[3]==8 && values[4]==9)
                        score = 50900;
                    else if(values[0]==6 && values[1]==7 && values[2]==8 && values[3]==9 && values[4]==10)
                        score = 51000;
                    else if(values[0]==7 && values[1]==8 && values[2]==9 && values[3]==10 && values[4]==11)
                        score = 51100;
                    else if(values[0]==8 && values[1]==9 && values[2]==10 && values[3]==11 && values[4]==12)
                        score = 51200;
                    else if(values[0]==0)
                        score = 20;
                    else
                        score = values[4];
                }
            }
        }
    }
    return(score);
}

function combinationFromScore(score){
    /*Rank of poker combination: 
        Royal Flush(100000) > Straight Flush(90600~91300, 92000) > Four of a kind(80200~81400) > Full House(70203~71413) > 
        Flush(60000) > Straight(50600~51300, 52000: A2345, 53000: AKQJ10) > Three of a Kind(40200~41400) >
        Two Pair(30302~42013) > Pair(20200~21300, 22000) > High Card(7~13, 20)
    */
    let combination;
    if(score == 100000)
        combination = "Royal Straight Flush";
    else if(score >= 90000)
        combination = "Straight Flush";
    else if(score >= 80000)
        combination = "Four of a kind";
    else if(score >= 70000)
        combination = "Full House";
    else if(score >= 60000)
        combination = "Flush";
    else if(score >= 50000)
        combination = "Straight";
    else if(score >= 40000)
        combination = "Three of a Kind";
    else if(score >= 30000)
        combination = "Two Pairs";
    else if(score >= 20000)
        combination = "Pair";
    else
        combination = "High Card";
    return combination;
}

fetch(url)
.then((resp) => resp.json())
.then(function(res) {

  let deck_id = res.deck_id;
  url = "https://deckofcardsapi.com/api/deck/" + deck_id + "/draw/?count=10"

  fetch(url)
  .then((resp) => resp.json())
  .then(function(res) 
  {
    
      for(let i=0;i<5;i++)
      {
          first_player_hand.push(res.cards[i])
          second_player_hand.push(res.cards[i+5])
      }
      
      document.querySelector("#player_one_score").innerHTML = "TBD";
      document.querySelector("#player_two_score").innerHTML = "TBD";
      
      document.querySelector("#player_one_card_one").setAttribute("src",first_player_hand[0].image);
      document.querySelector("#player_two_card_one").setAttribute("src",second_player_hand[0].image);
      document.querySelector("#player_one_card_two").setAttribute("src",first_player_hand[1].image);
      document.querySelector("#player_two_card_two").setAttribute("src",second_player_hand[1].image);
      document.querySelector("#player_one_card_three").setAttribute("src",first_player_hand[2].image);
      document.querySelector("#player_two_card_three").setAttribute("src",second_player_hand[2].image);
      document.querySelector("#player_one_card_four").setAttribute("src",first_player_hand[3].image);
      document.querySelector("#player_two_card_four").setAttribute("src",second_player_hand[3].image);
      document.querySelector("#player_one_card_five").setAttribute("src",first_player_hand[4].image);
      document.querySelector("#player_two_card_five").setAttribute("src",second_player_hand[4].image);


      first_player_score = scoreHand(first_player_hand);
      second_player_score = scoreHand(second_player_hand);

      first_player_combination = combinationFromScore(first_player_score);
      second_player_combination = combinationFromScore(second_player_score);

      if(first_player_score > second_player_score){
        document.getElementById('player_one').style.backgroundColor = 'blue';
        document.getElementById('player_two').style.backgroundColor = 'red';
      }
      else if(first_player_score < second_player_score){
        document.getElementById('player_one').style.backgroundColor = 'red';
        document.getElementById('player_two').style.backgroundColor = 'blue';
      }
      else{
        document.getElementById('player_one').style.backgroundColor = 'purple';
        document.getElementById('player_two').style.backgroundColor = 'purple';
      }

      document.querySelector("#player_one_score").innerHTML = first_player_combination+"("+first_player_score+")";
      document.querySelector("#player_two_score").innerHTML = second_player_combination+"("+second_player_score+")";

      console.log();
      
     /*
     testFirstPlayer = [{suit: "HEART", value: "ACE"},{suit: "HEART", value: "KING"},{suit: "HEART", value: "QUEEN"},{suit: "HEART", value: "JACK"},{suit: "HEART", value: "10"}];
     testSecondPlayer = [{suit: "CLOVER", value: "2"},{suit: "HEART", value: "2"},{suit: "SPADE", value: "2"},{suit: "DIAMOND", value: "2"},{suit: "HEART", value: "9"}];
     first_player_score = scoreHand(testFirstPlayer);
     second_player_score = scoreHand(testSecondPlayer);
     first_player_combination = combinationFromScore(first_player_score);
     second_player_combination = combinationFromScore(second_player_score);
     document.querySelector("#player_one_score").innerHTML = first_player_combination+"("+first_player_score+")";
     document.querySelector("#player_two_score").innerHTML = second_player_combination+"("+second_player_score+")";
     */


  });
});



