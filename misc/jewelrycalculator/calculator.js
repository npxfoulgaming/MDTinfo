'use strict';

let buffer = [];

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []
	/// Pull from HTML
    let silverwatches = document.getElementById('silverwatches').value;
	let goldwatches = document.getElementById('goldwatches').value;
	let necklaces = document.getElementById('necklaces').value;
	let diamonds = document.getElementById('diamonds').value;
	/// Silverwatches Average Values
	let sw1 = (308);
	let sw2 = (328);
	let sw3 = (318);
	let sw4 = (308);
	let sw5 = (308);
	/// Goldwatches Average Values
	let gw1 = (1469);
	let gw2 = (1399);
	let gw3 = (1470);
	let gw4 = (1399);
	let gw5 = (1399);
	/// Necklaces Average Values
	let ns1 = (537);
	let ns2 = (598);
	let ns3 = (501);
	let ns4 = (503);
	let ns5 = (600);
	let ns6 = (529);
	/// Diamonds Average Values
	let dm1 = (4500);
	let dm2 = (5050);
	let dm3 = (4700);
	let dm4 = (4690);
	let dm5 = (4800);
	/// Calculations
	let silverwatchaverage = ((sw1 + sw2 + sw3 + sw4 + sw5) / 5);
	let goldwatchaverage = ((gw1 + gw2 + gw3 + gw4 + gw5) / 5);
	let necklacesaverage = ((ns1 + ns2 + ns3 + ns4 + ns5 + ns6) / 6);
	let diamondsaverage = ((dm1 + dm2 + dm3 + dm4 + dm5) / 5);
	/// ReportBody Information Text
	buffer.push(`Rough Prices for your Jewelry:`);
    buffer.push(`(Prices are calculated by taking the average of 5 different sales)`);
	buffer.push(``);
	if (silverwatches) buffer.push(`SilverWatches: $${silverwatchaverage}`);
	buffer.push(``);
	if (goldwatches) buffer.push(`GoldWatches: $${goldwatchaverage}`);
	buffer.push(``);
	if (necklaces) buffer.push(`Necklaces: $${necklacesaverage}`);
	buffer.push(``);
	if (diamonds) buffer.push(`Diamonds: $${diamondsaverage}`);

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}

let inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="emerald"] textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));

let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));

let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));

function showCopiedPopup() {
	let popup = document.getElementById("myPopup");
	popup.classList.toggle("show");
	setTimeout(function() {
		popup.classList.toggle("show");
	}, 3500);
}

document.getElementById('copyReport').addEventListener('click', copy, false);
function clearSelection() {
	if (window.getSelection) {
		window.getSelection().removeAllRanges();
	} else if (document.selection) {
		document.selection.empty();
	}
}
function copy() {
	document.getElementById('reportBody').select();
	try {
		document.execCommand('copy');
		showCopiedPopup();
		clearSelection();
	} catch(e) {
		console.log("Copy error: " + e);
	}
}
