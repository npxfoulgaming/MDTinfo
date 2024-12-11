'use strict';

let buffer = [];
let officersInvolved = new Set();
let darkmodeState;
let alreadySpecifiedRobbery = false;


function report() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) localStorage.setItem('callsign', callsign);
	if (!callsign) callsign = '[missing]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
	buffer = [];

	let InmateName = document.getElementById('inmatename').value;
	let ContrabandFound = document.getElementById('contraband').value;
	let ContrabandStatus = document.getElementById('status').value;
	let ConfiscatedPockets = document.getElementById('confiscatedpockets').value;

	if (InmateName) buffer.push(`**Inmate Name:** ${InmateName}`);
	if (ContrabandFound) buffer.push(`**Contraband Found:** ${ContrabandFound}`);
	if (ContrabandStatus) buffer.push(`**Status:** ${ContrabandStatus}`);
	buffer.push('');
	if (callsign) buffer.push(`**Signed**`);
	if (callsign) buffer.push(`*${callsign}*`);
	if (ConfiscatedPockets) buffer.push(`${ConfiscatedPockets}`);

	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}
function report2() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) localStorage.setItem('callsign', callsign);
	if (!callsign) callsign = '[missing]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
	buffer = [];

	let InmateName2 = document.getElementById('inmatename2').value;
	let visitor1 = document.getElementById('visitor1').value;
	let visitor2 = document.getElementById('visitor2').value;
	let visitor3 = document.getElementById('visitor3').value;
	let visitor1cash = document.getElementById('visitor1cash').value;
	let visitor2cash = document.getElementById('visitor2cash').value;
	let visitor3cash = document.getElementById('visitor3cash').value;
	let contraband2 = document.getElementById('contraband2').value;
	let status2 = document.getElementById('status2').value;
	let pockets2 = document.getElementById('pockets2').value;

	buffer.push(`**Name & Callsign:** ${callsign}`);
	if (InmateName2) buffer.push(`**Inmate Name:** ${InmateName2}`);

	let visitorfinal = ''
	if (visitor1 || !visitor2 || !visitor3) visitorfinal = (`${visitor1}`);
	if (visitor2) visitorfinal = (`${visitor1} | ${visitor2}`);
	if (visitor3) visitorfinal = (`${visitor1} | ${visitor2} | ${visitor3}`);
	if (visitorfinal) buffer.push(`**Name(s) of Individuals visiting:** ${visitorfinal}`)

	buffer.push(`**Any contraband found?:** ${contraband2}`);

	let visitorcashfinal = ''
	if (visitor1cash || !visitor2cash || !visitor3cash) visitorcashfinal = (`$${visitor1cash}`);
	if (visitor2cash) visitorcashfinal = (`$${visitor1cash} | $${visitor2cash}`);
	if (visitor3cash) visitorcashfinal = (`$${visitor1cash} | $${visitor2cash} | $${visitor3cash}`);
	if (visitorcashfinal) buffer.push(`**Money count of each individual:** ${visitorcashfinal}`)

	if (status2) buffer.push(`**Status:** ${status2}`);
	if (pockets2) buffer.push(`${pockets2}`);

	return document.getElementById('reportBody2').innerHTML = buffer.join("\n");
}
function report3() {
	let callsign = document.getElementById('yourself').value.trim();
	if (callsign) localStorage.setItem('callsign', callsign);
	if (!callsign) callsign = '[missing]';
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
	buffer = [];

	let InmateName3 = document.getElementById('inmatename3').value;
	let InmateName32 = document.getElementById('inmatename32').value;
	let InmateName33 = document.getElementById('inmatename33').value;
	let NumberOfInmates = document.getElementById('numberofinmates').value;

	let sentencelength1 = document.getElementById('sentencelength1').value;
	let sentencelength2 = document.getElementById('sentencelength2').value;
	let sentencelength3 = document.getElementById('sentencelength3').value;

	let inmatenamesfinal = ''
	if (InmateName3 || !InmateName32 || !InmateName33) inmatenamesfinal = (`${InmateName3}`);
	if (InmateName32) inmatenamesfinal = (`${InmateName3} | ${InmateName32}`);
	if (InmateName33) inmatenamesfinal = (`${InmateName3} | ${InmateName32} | ${InmateName33}`);
	if (inmatenamesfinal) buffer.push(`**Names of Inmate(s):** ${inmatenamesfinal}`);

	if (NumberOfInmates) buffer.push(`**Number of Inmates:** ${NumberOfInmates}`);

	let sentencelengthfinal = ''
	if (sentencelength1 || !sentencelength2 || !sentencelength3) sentencelengthfinal = (`${sentencelength1} months`);
	if (sentencelength2) sentencelengthfinal = (`${sentencelength1} months | ${sentencelength2} months`);
	if (sentencelength3) sentencelengthfinal = (`${sentencelength1} months | ${sentencelength2} months | ${sentencelength3} months`);
	if (sentencelengthfinal || inmatenamesfinal) buffer.push(`**Sentence Length(s):** ${sentencelengthfinal}`);

	buffer.push(`**COs Present:**`);
	
	return document.getElementById('reportBody3').innerHTML = buffer.join("\n");
}

/// Report 1
let inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="text2"], textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));
let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));
let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));
/// Report 2
let inputs2 = document.querySelectorAll('input[type="text"], input[type="number"], input[type="text2"], textarea');
inputs2.forEach(i => i.addEventListener('keyup', report2, false));
let checkboxes2 = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes2.forEach(i => i.addEventListener('click', report2, false));
let selectOptions2 = document.querySelectorAll('select');
selectOptions2.forEach(i => i.addEventListener('click', report2, false));
/// Report 3
let inputs3 = document.querySelectorAll('input[type="text"], input[type="number"], input[type="text2"], textarea');
inputs3.forEach(i => i.addEventListener('keyup', report3, false));
let checkboxes3 = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes3.forEach(i => i.addEventListener('click', report3, false));
let selectOptions3 = document.querySelectorAll('select');
selectOptions3.forEach(i => i.addEventListener('click', report3, false));

function loadName() {
	let callsign = '';
	if (localStorage.getItem('callsign')) callsign = localStorage.getItem('callsign');
	document.getElementById('yourself').value = callsign;
}

// Listen for a click on the button
function updateDarkmode() {
	// Then toggle (add/remove) the .dark-theme class to the body
	let darkmode = document.getElementById('darkmode').checked;
	if (darkmode) {
		localStorage.setItem("darkmode", true);
		darkmodeState = 'true';
	} else if (!darkmode) {
		localStorage.setItem("darkmode", false);
		darkmodeState = 'false';
	}
	document.body.classList.toggle('dark-theme');
}

function loadDarkmode() {
	let darkmodeSetting = localStorage.getItem("darkmode");
	if (!darkmodeSetting || darkmodeSetting === 'undefined' || darkmodeSetting === 'false') {
		localStorage.setItem("darkmode", false);
		darkmodeState = 'false';
	}
	if (darkmodeSetting == 'true') {
		document.getElementById('darkmode').checked = true;
		document.body.classList.toggle('dark-theme');
		darkmodeState = 'true';
	}
	loadName();
}

let officers = null;
let matched = [];

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
document.getElementById('copyReport2').addEventListener('click', copy2, false);
function clearSelection() {
	if (window.getSelection) {
		window.getSelection().removeAllRanges();
	} else if (document.selection) {
		document.selection.empty();
	}
}
document.getElementById('copyReport3').addEventListener('click', copy3, false);
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
function copy2() {
	document.getElementById('reportBody2').select();
	try {
		document.execCommand('copy');
		showCopiedPopup();
		clearSelection();
	} catch(e) {
		console.log("Copy error: " + e);
	}
}
function copy3() {
	document.getElementById('reportBody3').select();
	try {
		document.execCommand('copy');
		showCopiedPopup();
		clearSelection();
	} catch(e) {
		console.log("Copy error: " + e);
	}
}
