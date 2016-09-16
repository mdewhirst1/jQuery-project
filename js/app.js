$(function(){
	addEventListeners();
});

var addEventListeners = function() {
	$('#mainLink').on('click', function() {
		$('#main').removeClass('hidden');
		$('#main').siblings().addClass('hidden');
	});
	$('#otherLink').on('click', function() {
		$('#other').removeClass('hidden');
		$('#other').siblings().addClass('hidden');
	});
	$('#somethingElseLink').on('click', function() {
		$('#somethingElse').removeClass('hidden');
		$('#somethingElse').siblings().addClass('hidden');
	});
}