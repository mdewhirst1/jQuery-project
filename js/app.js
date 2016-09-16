$(function(){
	var main = $('#main');
	var other = $('#other');
	var somethingElse = $('#somethingElse');
	setPage();
	addEventListeners();
});

var setPage = function() {
	$(other).slideUp();
	$(somethingElse).slideUp();
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
	$('#somethingElseLink').on('click', function() {
		$(somethingElse).slideDown();
		$(somethingElse).siblings().slideUp();
	});
}