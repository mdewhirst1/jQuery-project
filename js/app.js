class Card {
	constructor(name, suit, value) {
		this.name = name;
		this.suit = suit;
		this.value = value;
	}
}

class Deck {
	constructor() {
		this.cards = this.createDeck();
		this.discard = [];
	}

	createDeck() {
		var newDeck = [];
		//for each suit
		for (var i = 0; i < 4; i++) {
			var suit = "";
			//set suit
			switch(i){
				case 0:
					suit = "Spades"
				break;
				case 1:
					suit = "Hearts"
				break;
				case 2:
					suit = "Clubs"
				break;
				case 3:
					suit = "Diamonds"
				break;
				//default should be un-reachable
				default:
					suit = "HOW?!"
				break;
			}
			//for each number and face cards
			for (var j = 1; j <=13; j++){
				var card = "";
				//special names and values
				switch(j){
					case 1:
						card = new Card("Ace",suit,11);
					break;
					case 11:
						card = new Card("Jack",suit,10);
					break;
					case 12:
						card = new Card("Queen",suit,10);
					break;
					case 13:
						card = new Card("King",suit,10);
					break;
					default:
					//not special
						card = new Card(j,suit,j);
					break;
				}
				//add to array
				newDeck.push(card);
			}
		}
		//return array
		return newDeck;
	}

	shuffle(array) {
		//adds discard to deck and shuffles the deck
		var array = this.cards.concat(this.discard);
		//empty the discard pile
		this.discard = [];

		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		this.cards = array;
	}

	getCards(num) {
		//takes cards from the deck
		var cardsToGet = num;
		var cardsReturned = [];
		//can't take more cards than there are cards in the deck
		if (cardsToGet > this.cards.length) {
			cardsToGet = this.cards.length;
		}
		//get cards
		for (var i = cardsToGet; i > 0; i--) {
			var card = this.cards.pop();
			cardsReturned.push(card);
			//cards are put in discard pile
			this.discard.push(card);
		}
		//return cards to user
		return cardsReturned;
	}
}

//create the deck
var deck = new Deck();

$(function(){
	var main = $('#main');
	var other = $('#other');
	var blackJack = $('#blackJack');
	setPage();
	addEventListeners();
	play();
});

var play = function() {
	deck.shuffle();

	var hand = deck.getCards(2);
	var dealerHand = deck.getCards(2);
	var total = hand[0].value + hand[1].value;
	var dealerTotal = dealerHand[0].value + dealerHand[1].value;

	$(blackJack).find($('#hand')).html(hand[0].name + " of " + hand[0].suit + "</br>" + hand[1].name + " of " + hand[1].suit);
	$(blackJack).find($('#total')).html(total);

	$('#hit').on('click', function() {
		if ((hand.length)<5) {
			hand = hand.concat(deck.getCards(1));
			var handSize = hand.length-1;
			$(blackJack).find($('#hand')).append("</br>" + hand[handSize].name + " of " + hand[handSize].suit);

			total = total + hand[handSize].value;
			$(blackJack).find($('#total')).html(total);
		}
	});

	$(blackJack).find($('#stick')).on('click', function() {	
		while (dealerTotal < 16) {
			dealerHand = dealerHand.concat(deck.getCards(1));
			dealerTotal = dealerTotal + dealerHand[dealerHand.length-1].value;
		}

		if (total >= dealerTotal) {	
			alert("you win");
		} else {
			alert("you lost")
		}	
	});

	$(blackJack).find('#reset').on('click', function() {
		deck.shuffle();

		hand = deck.getCards(2);
		dealerHand = deck.getCards(2);
		total = hand[0].value + hand[1].value;
		dealerTotal = dealerHand[0].value + dealerHand[1].value;

		$(blackJack).find($('#hand')).html(hand[0].name + " of " + hand[0].suit + "</br>" + hand[1].name + " of " + hand[1].suit);
		$(blackJack).find($('#total')).html(total);
	})
}

var setPage = function() {
	$(other).slideUp();
	$(blackJack).slideUp();
}

var addEventListeners = function() {
	$('#mainLink').on('click', function() {
		$(main).slideDown();
		$(main).siblings().slideUp();
	});
	$('#otherLink').on('click', function() {
		$(other).slideDown();
		$(other).siblings().slideUp();
	});
	$('#blackJackLink').on('click', function() {
		$(blackJack).slideDown();
		$(blackJack).siblings().slideUp();
	});
	$('#get').on('click', function() {
		getBeer();
	});
}

var beerSettings = {
	"url": "https://punkapi.com/api/v1/beers/random",
	"headers": {
		"authorization": "Basic NTkwNDMxOTM3MjliNGQzNDhjZWI0MWFlY2ViMTFlYjA6",
	}
}

var getBeer = function() {
	$.ajax(beerSettings).done(function (response) {
		$('#beer').html("Name: " + response.name + "</br>Description: " + response.description);
	});
}