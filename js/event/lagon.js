/*
 * 
 * Define Lagon
 * 
 */

function Lagon(storage) {
	Entity.call(this);
	
	this.name              = "Lagon";
	this.maxHp.base        = 3000;
	this.maxSp.base        = 500;
	this.maxLust.base      = 500;
	// Main stats
	this.strength.base     = 100;
	this.stamina.base      = 120;
	this.dexterity.base    = 150;
	this.intelligence.base = 90;
	this.spirit.base       = 100;
	this.libido.base       = 100;
	this.charisma.base     = 80;
	
	this.level             = 20;
	this.sexlevel          = 15;
	
	this.combatExp         = 800;
	this.coinDrop          = 1500;
	
	this.body.DefMale();
	// TODO: Special avatar
	this.avatar.combat     = Images.lago_male;
	
	this.Butt().buttSize.base = 2;
	
	this.body.SetRace(Race.rabbit);
	
	TF.SetAppendage(this.Back(), AppendageType.tail, Race.rabbit, Color.white);
	
	this.body.SetBodyColor(Color.white);
	
	this.body.SetEyeColor(Color.blue);

	// Set hp and mana to full
	this.SetLevelBonus();
	this.RestFull();
	
	if(storage) this.FromStorage(storage);
}
Lagon.prototype = new Entity();
Lagon.prototype.constructor = Lagon;


Lagon.prototype.FromStorage = function(storage) {
	this.relation.base       = parseFloat(storage.rel)     || this.relation.base;
	
	// Load flags
	for(var flag in storage.flags)
		this.flags[flag] = parseInt(storage.flags[flag]);
}

Lagon.prototype.ToStorage = function() {
	var storage = {};
	if(this.relation.base != 0) storage.rel    = this.relation.base;
	storage.flags = this.flags;
	
	return storage;
}
