'use strict';

let buffer = [];

function report() {
	const ind = "        ";
	let date = new Date().toLocaleDateString('en-US');
    buffer = []
	/// Pull from HTML
	let aluminum = document.getElementById('aluminum').value;
	let steel = document.getElementById('steel').value;
	let scrap = document.getElementById('scrap').value;
	let rubber = document.getElementById('rubber').value;
	let glass = document.getElementById('glass').value;
	/// Warehouse values
	let aluminumWarehouseValue = 50
	let steelWarehouseValue = 60
	let scrapWarehouseValue = 30
	let rubberWarehouseValue = 8
	let glassWarehouseValue = 20
	/// Mechanic Average Price values
	let aluminumMechanicValue = 70
	let steelMechanicValue = 90
	let scrapMechanicValue = 50
	let rubberMechanicValue = 12
	let glassMechanicValue = 30
	/// Calculations warehouse
	let aluminumWarehouseFinal = (aluminumWarehouseValue * aluminum);
	let steelWarehouseFinal = (steelWarehouseValue * steel);
	let scrapWarehouseFinal = (scrapWarehouseValue * scrap);
	let rubberWarehouseFinal = (rubberWarehouseValue * rubber);
	let glassWarehouseFinal = (glassWarehouseValue * glass);
	/// Calculations mechanic
	let aluminumMechanicFinal = (aluminumMechanicValue * aluminum);
	let steelMechanicFinal = (steelMechanicValue * steel);
	let scrapMechanicFinal = (scrapMechanicValue * scrap);
	let rubberMechanicFinal = (rubberMechanicValue * rubber);
	let glassMechanicFinal = (glassMechanicValue * glass);
	/// Calculate weight in lbs
	let weight = ((aluminum * 5) + (steel * 5) + (scrap * 5) + (rubber * 5) + (glass * 5));
	/// Calculate Total
	let WarehouseValuetotal = (aluminumWarehouseFinal + steelWarehouseFinal + scrapWarehouseFinal + rubberWarehouseFinal + glassWarehouseFinal);
	let MechanicValuetotal = (aluminumMechanicFinal + steelMechanicFinal + scrapMechanicFinal + rubberMechanicFinal + glassMechanicFinal);
	/// Calculate Percentage Increase
	let percentageincrease = (Math.round((MechanicValuetotal / WarehouseValuetotal) * 100));
	/// Print out text
	buffer.push('Sale Prices:');
	buffer.push('');
	if (aluminum) buffer.push('Aluminum:');
	if (aluminum) buffer.push(`Warehouse: $${aluminumWarehouseFinal} | Mechanic: $${aluminumMechanicFinal}`);
	if (aluminum) buffer.push('');
	if (steel) buffer.push('Steel:');
	if (steel) buffer.push(`Warehouse: $${steelWarehouseFinal} | Mechanic: $${steelMechanicFinal}`);
	if (steel) buffer.push('');
	if (scrap) buffer.push(`Scrap:`);
	if (scrap) buffer.push(`Warehouse: $${scrapWarehouseFinal} | Mechanic: $${scrapMechanicFinal}`);
	if (scrap) buffer.push('');
	if (rubber) buffer.push(`Rubber:`);
	if (rubber) buffer.push(`Warehouse: $${rubberWarehouseFinal} | Mechanic: $${rubberMechanicFinal}`);
	if (rubber) buffer.push(``);
	if (glass) buffer.push(`Glass:`);
	if (glass) buffer.push(`Warehouse: $${glassWarehouseFinal} | Mechanic: $${glassMechanicFinal}`);
	if (glass) buffer.push('');
	buffer.push(`Total weight of materials: ${weight}lbs`);
	buffer.push(`Total Warehouse Value: $${WarehouseValuetotal} | Mechanic: $${MechanicValuetotal}`);
	buffer.push(`Percentage Increase: ${percentageincrease}% more money!`);
	/// Return it to HTML page
	return document.getElementById('reportBody').innerHTML = buffer.join("\n");
}
/// Allow inputs from webpage
let inputs = document.querySelectorAll('input[type="text"], input[type="number"], input[type="emerald"] textarea');
inputs.forEach(i => i.addEventListener('keyup', report, false));
/// Allow checkboxes from webpage
let checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
checkboxes.forEach(i => i.addEventListener('click', report, false));
/// Allow select options
let selectOptions = document.querySelectorAll('select');
selectOptions.forEach(i => i.addEventListener('click', report, false));