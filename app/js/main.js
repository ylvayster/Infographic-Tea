/*jshint esversion: 6 */

$(function(){
/*Tea object - create one with all the data for each brew*/
class typeOfTea{
	constructor (brewingTime, brewingTemp, caffeine, extraFact){
	this.brewingTime = brewingTime;
	this.brewingTemp = brewingTemp;
	this.caffeine = caffeine;
	this.extraFact = extraFact; } 
}

/*Creation of tea objects*/
let blackTea = new typeOfTea("3-5 min", "95-100 °C" , "yes", "Black tea is often flavoured with different aromas, dried fruit and/or flowers. A classic black tea blend is Earl Grey, which is flavoured with bergamot, a citrus fruit.");
let greenTea = new typeOfTea("2-3 min", "70-85 °C" , "yes", "Green tea is the type of tea most commonly drunk in China and Japan. It is believed to be good for your digestion and is therefore often drunk during meals.");
let whiteTea = new typeOfTea("3-10 min", "75 °C" , "yes", "White tea is a very exclusive kind of tea. The tea is made out of buds of the Camelia Sinensis bush, which are hand plucked once every spring before it is carefully dried.");
let rooibos = new typeOfTea(">3 min", "95 °C" , "no", "Since rooibos tea doesn't contain tannins in the same amount as true teas, you can adjust your brewing time according to taste without risking your tea becoming bitter.");
let matcha = new typeOfTea("0", "60-70 °C" , "yes", "Since matcha tea is a fine powder whisked in water, you drink the powder as well - hence no brewing time. The matcha tea powder can also be used to flavour desserts and smoothies.");
let herbalTea = new typeOfTea(">3 min", "95-100 °C" , "no", "Herbal tea generally does not contain caffeine, but there might be exceptions. Check your ingredients! Adjust brewing time according to taste.");

/*HIDE/SHOW FACT DIV's*/
$("div.facts").on("click", function () {
	$(this).toggleClass("active");
	$(this).find("div.factText").slideToggle(800);
	$(this).find("div.arrow").toggleClass("rotate"); //rotate arrow div
		$('html, body').animate({
		scrollTop: $(this).offset().top  //scrolls to top of clicked div to increase readability
	}, 1500);
});

/*CHANGE STYLES ON DIV's .TEAS ON HOVER*/
$("div.teas").hover(function(){
	$(this).css("backgroundColor", "rgb(255,255,255)");
	}, function(){
	$(this).css("backgroundColor", "transparent");
	}
);

/*ADDS BORDER STYLING TO CHOSEN TEA IN "TEA SELECTION" MENU WHEN CLICKED*/
$("div.teas").on("click", function(){
	$("div.teas").each(function(){
		let isActive = ($(this).attr("class") === "teas active" ? true : false);
		if(isActive){
			$(this).toggleClass("active"); //remove active class from other teas if present
		}
	});
	$(this).addClass("active");
});

/*ASSIGN BREW FACTS TO DIV ACCORDING TO WHICH TEA IS CHOSEN*/
$("div.teas").on("click", function(){
	let tea = $(this).attr("id");
	let teaText = $(this).find("p")[0].innerHTML + " tea";
	let teaObject;

	$("span#chosenBrew").html(teaText.toLowerCase());
	
	switch(tea){				//decide which object to access according to this id (see let tea)
		case "blackTea":
		teaObject = blackTea;
		break;
		case "greenTea":
		teaObject = greenTea;
		break;
		case "whiteTea":
		teaObject = whiteTea;
		break;
		case "rooibos":
		teaObject = rooibos;
		break;
		case "matcha":
		teaObject = matcha;
		break;
		case "herbalTea":
		teaObject = herbalTea;
		break;
	}

	$("#brewFact1").html(`<img src=\"img/temperature.png\" alt=\"Brewing temperature icon\" class=\"brewIcon\"><h4>Brewing temperature</h4><p> ${teaObject.brewingTemp} </p>`);
	$("#brewFact2").html(`<img src=\"img/brewingTime.png\" alt=\"Brewing time icon\" class=\"brewIcon\"><h4>Brewing time</h4><p> ${teaObject.brewingTime} </p>`);
	$("#brewFact3").html(`<img src=\"img/caffeine.png\" alt=\"Caffeine icon\" class=\"brewIcon\"><h4>Contains caffeine?</h4><p> ${teaObject.caffeine} </p>`);
	$("#brewFact4").html(`<p> ${teaObject.extraFact} </p>`);
});

/*SHOW BREW FACTS assigned above*/
$("div.teas").on("click", function(){
	$("div#info").hide();						 //hide tip	
	$("div.brewFact").fadeTo("slow", 1);		 //fade in brewing facts
	$("div#currentBrew").addClass("gradient");	 //to fade out background picture when brewing facts are shown
	$("#crossDiv").fadeTo("slow", 1);			 //show closing symbol cross

	/*auto scroll to increase readability of displayed facts*/
	if($("body").width() >= 1200 ){
	$("html, body").animate({
		scrollTop: $("#right").offset().top
	}, 1200);
	} else {
	$("html, body").animate({
		scrollTop: $("#currentBrew").offset().top
	}, 1200);
	}

	/*Remove facts when closing symbol cross is clicked*/
	$("#crossDiv").on("click", function(){
		$("div.brewFact").hide();
		$("#crossDiv").hide();
		$("div#currentBrew").removeClass("gradient");
		$("div.teas").each(function(){
			let isActive = ($(this).attr("class") === "teas active" ? true : false);
			if(isActive){
			$(this).removeClass("active");
			}
			});
		$("span#chosenBrew").html("tea");
		$("div#info").fadeTo(500, 1);
		});
});

});