
Gui = {}
Gui.w = 1280;
Gui.h = 720;

Gui.textArea = {
	x: 270,
	y: 65,
	w: 740,
	h: 530,
	inset: 4,
	pad: {x: 20, y:10}
};

Gui.tooltipArea = {
	x: 1075,
	y: 195,
	w: 190,
	h: 390
};

Gui.inputtextArea = {
	x: 500,
	y: 175
};

Gui.barWidth = 145;

Gui.Init = function() {
	Gui.canvas = Raphael("wrap");
	Gui.canvas.setViewBox(0,0,Gui.w,Gui.h,true);
	Gui.canvas.setSize('100%', '100%');
	Gui.bg = Gui.canvas.image(Images.bg, 0, 0, Gui.w, Gui.h);
	var svg = document.querySelector("svg");
	svg.removeAttribute("width");
	svg.removeAttribute("height");
	
	Gui.canvas.rect(Gui.textArea.x, Gui.textArea.y, Gui.textArea.w, Gui.textArea.h).attr({"stroke-width": Gui.textArea.inset});
	Gui.debug = Gui.canvas.text(1230, 700, "Debug").attr({stroke: "#F00", fill:"#F00", font: SMALL_FONT}).hide();
	Gui.onresize();
	
	var barStart   = 85;
	var barWidth   = Gui.barWidth;
	var barHeigth  = 30;
	var border     = 6;
	var offsetX    = 6;
	var offsetY    = 30;
	
	Gui.party = Gui.canvas.set();
	Gui.partyObj = [];
	for(var i = 0; i < 4; ++i) {
		var charSet = Gui.canvas.set();
		var local = {
			portrait: Gui.canvas.image(Images.pc_male, 0, 0, 100, 100).transform("t"+20+","+(75+120*i)),
			hpBack  : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({"stroke-width": border, stroke: "#000", fill: "#fff"}).transform("t"+20+","+(85+120*i)),
			hpBar   : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({fill: "#f00"}).transform("t"+20+","+(85+120*i)),
			hpStr   : Gui.canvas.text(barStart+barWidth-5, 15, "9999/9999").attr({"text-anchor": "end", fill:"#fff", font: DEFAULT_FONT}).transform("t"+20+","+(85+120*i)),
			spBack  : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({"stroke-width": border, stroke: "#000", fill: "#fff"}).transform("t"+(20+offsetX)+","+(85+offsetY+120*i)),
			spBar   : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({fill: "#00f"}).transform("t"+(20+offsetX)+","+(85+offsetY+120*i)),
			spStr   : Gui.canvas.text(barStart+barWidth-5, 15, "9999/9999").attr({"text-anchor": "end", fill:"#fff", font: DEFAULT_FONT}).transform("t"+(20+offsetX)+","+(85+offsetY+120*i)),
			lpBack  : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({"stroke-width": border, stroke: "#000", fill: "#fff"}).transform("t"+(20+2*offsetX)+","+(85+2*offsetY+120*i)),
			lpBar   : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({fill: "#f0f"}).transform("t"+(20+2*offsetX)+","+(85+2*offsetY+120*i)),
			lpStr   : Gui.canvas.text(barStart+barWidth-5, 15, "9999/9999").attr({"text-anchor": "end", fill:"#fff", font: DEFAULT_FONT}).transform("t"+(20+2*offsetX)+","+(85+2*offsetY+120*i)),
			name    : Gui.canvas.text(-5, -10, "NAME").attr({"text-anchor": "start", fill:"#fff", font: LARGE_FONT}).transform("t"+20+","+(85+120*i)),
			lvl     : Gui.canvas.text(-3, 86, "X/Y").attr({"text-anchor": "start", fill:"#fff", font: SMALL_FONT}).transform("t"+20+","+(85+120*i))
		};
		
		charSet.push(local.portrait);
		charSet.push(local.hpBack);
		charSet.push(local.hpBar);
		charSet.push(local.hpStr);
		charSet.push(local.spBack);
		charSet.push(local.spBar);
		charSet.push(local.spStr);
		charSet.push(local.lpBack);
		charSet.push(local.lpBar);
		charSet.push(local.lpStr);
		charSet.push(local.name);
		charSet.push(local.lvl);
		Gui.party.push(charSet);
		Gui.partyObj.push(local);
	}
	Gui.enemy = Gui.canvas.set();
	Gui.enemyObj = [];
	for(var i = 0; i < 4; ++i) {
		var charSet = Gui.canvas.set();
		var local = {
			portrait: Gui.canvas.image(Images.pc_male, 0, 0, 100, 100).transform("t"+1020+","+(75+120*i)),
			hpBack  : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({"stroke-width": border, stroke: "#000", fill: "#fff"}).transform("t"+1020+","+(85+120*i)),
			hpBar   : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({fill: "#f00"}).transform("t"+1020+","+(85+120*i)),
			hpStr   : Gui.canvas.text(barStart+barWidth-5, 15, "9999/9999").attr({"text-anchor": "end", fill:"#fff", font: DEFAULT_FONT}).transform("t"+1020+","+(85+120*i)),
			spBack  : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({"stroke-width": border, stroke: "#000", fill: "#fff"}).transform("t"+(1020+offsetX)+","+(85+offsetY+120*i)),
			spBar   : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({fill: "#00f"}).transform("t"+(1020+offsetX)+","+(85+offsetY+120*i)),
			spStr   : Gui.canvas.text(barStart+barWidth-5, 15, "9999/9999").attr({"text-anchor": "end", fill:"#fff", font: DEFAULT_FONT}).transform("t"+(1020+offsetX)+","+(85+offsetY+120*i)),
			lpBack  : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({"stroke-width": border, stroke: "#000", fill: "#fff"}).transform("t"+(1020+2*offsetX)+","+(85+2*offsetY+120*i)),
			lpBar   : Gui.canvas.rect(barStart, 0, barWidth, barHeigth).attr({fill: "#f0f"}).transform("t"+(1020+2*offsetX)+","+(85+2*offsetY+120*i)),
			lpStr   : Gui.canvas.text(barStart+barWidth-5, 15, "9999/9999").attr({"text-anchor": "end", fill:"#fff", font: DEFAULT_FONT}).transform("t"+(1020+2*offsetX)+","+(85+2*offsetY+120*i)),
			name    : Gui.canvas.text(-5, -10, "NAME").attr({"text-anchor": "start", fill:"#fff", font: LARGE_FONT}).transform("t"+1020+","+(85+120*i)),
			lvl     : Gui.canvas.text(-3, 86, "X/Y").attr({"text-anchor": "start", fill:"#fff", font: SMALL_FONT}).transform("t"+1020+","+(85+120*i))
		};
		
		charSet.push(local.portrait);
		charSet.push(local.hpBack);
		charSet.push(local.hpBar);
		charSet.push(local.hpStr);
		charSet.push(local.spBack);
		charSet.push(local.spBar);
		charSet.push(local.spStr);
		charSet.push(local.lpBack);
		charSet.push(local.lpBar);
		charSet.push(local.lpStr);
		charSet.push(local.name);
		charSet.push(local.lvl);
		Gui.enemy.push(charSet);
		Gui.enemyObj.push(local);
	}
	
	Gui.overlay = Gui.canvas.set();
	Gui.location = Gui.canvas.text(300, 30, "LOC").attr({"text-anchor": "start", stroke: "#FFF", fill: "#FFF", font: LARGE_FONT});
	Gui.overlay.push(Gui.canvas.text(10, 690, "Coin:").attr({"text-anchor": "start", stroke: "#FFF", fill: "#FFF", font: DEFAULT_FONT}));
	Gui.overlay.push(Gui.canvas.text(880, 15, "Date:").attr({"text-anchor": "start", stroke: "#FFF", fill: "#FFF", font: DEFAULT_FONT}));
	Gui.overlay.push(Gui.canvas.text(880, 45, "Time:").attr({"text-anchor": "start", stroke: "#FFF", fill: "#FFF", font: DEFAULT_FONT}));
	Gui.coin = Gui.canvas.text(250, 690, "COIN").attr({"text-anchor": "end", stroke: "#FFF", fill: "#FFF", font: DEFAULT_FONT});
	Gui.date = Gui.canvas.text(1245, 15, "DATE").attr({"text-anchor": "end", stroke: "#FFF", fill: "#FFF", font: DEFAULT_FONT});
	Gui.time = Gui.canvas.text(1245, 45, "TIME").attr({"text-anchor": "end", stroke: "#FFF", fill: "#FFF", font: DEFAULT_FONT});
	Gui.overlay.push(Gui.coin);
	Gui.overlay.push(Gui.date);
	Gui.overlay.push(Gui.time);
	Gui.overlay.push(Gui.location);
	
    // Set up key listeners (input.js)
    Input.Init();
    
	// Set bg    
	Gui.BgColor = localStorage["bgcolor"] || "rgba(255, 255, 255, 0.2)";
    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
    Gui.FontFamily = localStorage["fontFamily"] || "Georgia, sans-serif, \"Arial\", \"Helvetica\"";
    document.getElementById("mainTextArea").style.fontFamily = Gui.FontFamily;
    Gui.FontSize = localStorage["fontSize"] || "large";
    document.getElementById("mainTextArea").style.fontSize = Gui.FontSize;
    Gui.ShortcutsVisible = parseInt(localStorage["ShortcutsVisible"]) == 1;
    
    // Basic menu
    Input.menuButtons[0].Setup("Data", DataPrompt, true);

    // Setup keyboard shortcuts
    // Row 1
    Input.buttons[0].SetKey(KEY_1);
    Input.buttons[1].SetKey(KEY_2);
    Input.buttons[2].SetKey(KEY_3);
    Input.buttons[3].SetKey(KEY_4);
    Input.navButtons[0].SetKey(KEY_5);
    // Row 2
   	Input.buttons[4].SetKey(KEY_Q);
    Input.buttons[5].SetKey(KEY_W);
    Input.buttons[6].SetKey(KEY_E);
    Input.buttons[7].SetKey(KEY_R);
    Input.navButtons[1].SetKey(KEY_T);
    // Row 3
    Input.buttons[8].SetKey(KEY_A);
    Input.buttons[9].SetKey(KEY_S);
    Input.buttons[10].SetKey(KEY_D);
    Input.buttons[11].SetKey(KEY_F);
    Input.navButtons[2].SetKey(KEY_G);
    
    // Explore buttons
    Input.exploreButtons[ExploreButtonIndex.Wait].SetKey(KEY_Z);
    Input.exploreButtons[ExploreButtonIndex.Sleep].SetKey(KEY_Z);
    Input.exploreButtons[ExploreButtonIndex.Look].SetKey(KEY_X);
    
    Input.menuButtons[0].SetKey(KEY_CONSOLE);
    
    Gui.ClearButtons();
}

Gui.SetGameState = function(state) {
	switch(gameState) {
		case GameState.Game:
			Input.menuButtonSet.show();
			Input.exploreButtonSet.show();
			break;
		case GameState.Event:
		case GameState.Credits:
		case GameState.Combat:
		case GameState.Cavalcade:
			Input.menuButtonSet.hide();
			Input.exploreButtonSet.hide();
		break;
	}
	Input.buttonSet.show();
	Input.navButtonSet.show();
}

Gui.onresize = function() {
	var w = $(window).width();
	var h = $(window).height();
	var ratioW = w/Gui.w;
	var ratioH = h/Gui.h;
	var xpos = 0, ypos = 0, ratio = 1;
	//alert("R:" + ratio + " RW:" + ratioW + " RH:" + ratioH);
	if(ratioW / ratioH > 1) {
		xpos  = (w-ratioH*Gui.w) / 2;
		ratio = ratioH;
	}
	else {
		ypos  = (h-ratioW*Gui.h) / 2;
		ratio = ratioW;
	}
	
	var textarea = document.getElementById("mainTextWrapper");
	textarea.style.left   = xpos + ratio * (Gui.textArea.inset/2+Gui.textArea.x) +"px";
	textarea.style.top    = ypos + ratio * (Gui.textArea.inset/2+Gui.textArea.y) +"px";
	textarea.style.width  = -2*Gui.textArea.pad.x + ratio * (-Gui.textArea.inset+Gui.textArea.w) +"px";
	textarea.style.height = -2*Gui.textArea.pad.y + ratio * (-Gui.textArea.inset+Gui.textArea.h) +"px";
	
	var inputtext = document.getElementById("textInputArea");
	inputtext.style.left   = xpos + ratio * Gui.inputtextArea.x +"px";
	inputtext.style.top    = ypos + ratio * Gui.inputtextArea.y +"px";
	
	var tooltip = document.getElementById("tooltipTextArea");
	tooltip.style.left   = xpos + ratio * Gui.tooltipArea.x +"px";
	tooltip.style.top    = ypos + ratio * Gui.tooltipArea.y +"px";
	tooltip.style.width  =        ratio * Gui.tooltipArea.w +"px";
	tooltip.style.height =        ratio * Gui.tooltipArea.h +"px";
}

Gui.Callstack = new Array();


Gui.FontPicker = function(back) {
	Text.Clear();
	Text.AddOutput("Set a new font/fontsize?");
	Text.Newline();
	Text.AddOutput("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ullamcorper tempus ligula, tristique fringilla magna eleifend sed. Phasellus posuere magna id eros tincidunt porta. Fusce id blandit lectus. Cras gravida, justo eu eleifend suscipit, nunc quam sollicitudin nulla, sit amet pulvinar neque dolor non nunc. Curabitur nec nibh in lectus fermentum dictum. Mauris quis massa sapien, eu laoreet nisi. Phasellus placerat aliquet felis, sit amet euismod libero pharetra eu. Aenean dolor mi, viverra in pellentesque vitae, luctus porta felis. Mauris placerat turpis eu nibh aliquet vel euismod nulla convallis. Morbi tellus dolor, pulvinar ut vestibulum sed, mattis vel diam. Curabitur ac tellus risus.");
	Text.Newline();
	Text.AddOutput("Integer posuere quam at odio pharetra dignissim sollicitudin leo accumsan. Curabitur eu pharetra urna. Vivamus et gravida tortor. Morbi vel porttitor urna. Donec vitae rutrum urna. Integer elit orci, gravida eget viverra et, tincidunt quis est. Aliquam erat volutpat. Sed euismod rutrum lectus, nec vehicula turpis volutpat et. Nulla mauris felis, eleifend a fringilla id, faucibus eget purus. Donec in neque in ligula condimentum lobortis.");
	
	var options = new Array();
	options.push({ nameStr : "Reset",
		func : function() {
		    Gui.FontFamily = "Georgia, sans-serif, \"Arial\", \"Helvetica\"";
		    document.getElementById("mainTextArea").style.fontFamily = Gui.FontFamily;
		    Gui.FontSize = "large";
		    document.getElementById("mainTextArea").style.fontSize = Gui.FontSize;
		}, enabled : true
	});
	options.push({ nameStr : "Font",
		func : function() {
			var font = prompt("Please enter fonts (css: font-families) to use, in order of priority.", Gui.FontFamily || "sans-serif, Georgia")
			if(font != null && font != "") {
				Gui.FontFamily = font;
				localStorage["fontFamily"] = Gui.FontFamily;
			    document.getElementById("mainTextArea").style.fontFamily = Gui.FontFamily;
			}
		}, enabled : true
	});
	options.push({ nameStr : "Size",
		func : function() {
			var size = prompt("Please enter desired font size (css: font-size). For example: small, medium, large.", Gui.FontSize || "large")
			if(size != null && size != "") {
				Gui.FontSize = size;
				localStorage["fontSize"] = Gui.FontSize;
			    document.getElementById("mainTextArea").style.fontSize = Gui.FontSize;
			}
		}, enabled : true
	});
	
	Gui.SetButtonsFromList(options, true, back);
}


Gui.BgColorPicker = function(back) {
	Text.Clear();
	Text.AddOutput("Set a new background color?");
	
	var options = new Array();
	options.push({ nameStr : "Light",
		func : function() {
			Gui.BgColor = "rgba(255, 255, 255, 0.2)";
			localStorage["bgcolor"] = Gui.BgColor;
		    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
		}, enabled : true
	});
	options.push({ nameStr : "Pink",
		func : function() {
			Gui.BgColor = "rgba(240, 48, 192, 0.6)";
			localStorage["bgcolor"] = Gui.BgColor;
		    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
		}, enabled : true
	});
	options.push({ nameStr : "Yellow",
		func : function() {
			Gui.BgColor = "rgba(240, 192, 48, 0.6)";
			localStorage["bgcolor"] = Gui.BgColor;
		    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
		}, enabled : true
	});
	options.push({ nameStr : "Cyan",
		func : function() {
			Gui.BgColor = "rgba(48, 240, 192, 0.6)";
			localStorage["bgcolor"] = Gui.BgColor;
		    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
		}, enabled : true
	});
	options.push({ nameStr : "Blue",
		func : function() {
			Gui.BgColor = "rgba(48, 192, 240, 0.6)";
			localStorage["bgcolor"] = Gui.BgColor;
		    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
		}, enabled : true
	});
	options.push({ nameStr : "Green",
		func : function() {
			Gui.BgColor = "rgba(120, 240, 48, 0.6)";
			localStorage["bgcolor"] = Gui.BgColor;
		    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
		}, enabled : true
	});
	options.push({ nameStr : "Purple",
		func : function() {
			Gui.BgColor = "rgba(192, 48, 240, 0.6)";
			localStorage["bgcolor"] = Gui.BgColor;
		    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
		}, enabled : true
	});
	options.push({ nameStr : "None",
		func : function() {
			Gui.BgColor = "rgba(0, 0, 0, 0.0)";
			localStorage["bgcolor"] = Gui.BgColor;
		    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
		}, enabled : true
	});Input.exploreButtons
	options.push({ nameStr : "Custom",
		func : function() {
			var col = prompt("Please enter desired background color. Format is rgba(R,G,B,A). Colors are in the range 0-255. Opacity is in the range 0-1.", Gui.BgColor || "rgba(255,255,255,1.0)")
			if(col != null && col != "") {
				Gui.BgColor = col;
				localStorage["bgcolor"] = Gui.BgColor;
			    document.getElementById("mainTextArea").style.backgroundColor = Gui.BgColor;
			}
		}, enabled : true
	});
	
	Gui.SetButtonsFromList(options, true, back);
}

Gui.ClearChoiceButtons = function() {
	for(var i = 0; i < Input.buttons.length; i++)
		Input.buttons[i].SetVisible(false);
}

Gui.ClearButtons = function() {
	for(var i = 0; i < Input.buttons.length; i++) {
		Input.buttons[i].enabledImage = Images.imgButtonEnabled;
		Input.buttons[i].SetVisible(false);
	}
	for(var i = 0; i < Input.navButtons.length; i++)
		Input.navButtons[i].SetVisible(false);
	for(var i = 0; i < Input.exploreButtons.length; i++)
		Input.exploreButtons[i].SetVisible(false);
}

Gui.NextPrompt = function(func, text) {
	Gui.ClearButtons();
	Input.buttons[0].Setup(text || "Next", func || PrintDefaultOptions, true);
}

Gui.SetButtonPage = function(list, page, state) {
	Gui.ClearChoiceButtons();
	var i,j;
	
	for(i=0, j=page*Input.buttons.length; i<Input.buttons.length && j<list.length; i++, j++) {
		var name = list[j].nameStr || "NULL";
		var func = list[j].func;
		var en = list[j].enabled || false;
		Input.buttons[i].enabledImage = list[j].image || Images.imgButtonEnabled;
		Input.buttons[i].Setup(name, func, en, list[j].obj, list[j].tooltip, state);
	}
}

Gui.SetButtonsFromList = function(list, backEnabled, backFunc, state, backState) {	
	Gui.ClearButtons();
	var currentPage = 0;
	backFunc = backFunc || PrintDefaultOptions;
	
	Gui.SetButtonPage(list, currentPage, state);
	
	var updateNav = function()
	{
		Input.navButtons[0].Setup(">>",
			function() {
				if(currentPage < (list.length / Input.buttons.length) - 1) {
					currentPage++;
					Gui.SetButtonPage(list, currentPage, state);
					updateNav();
				}
			}, true);
		Input.navButtons[0].SetVisible((list.length > Input.buttons.length &&
			currentPage < (list.length / Input.buttons.length) - 1));
		Input.navButtons[1].Setup("<<",
			function() {
				if(currentPage > 0) {
					currentPage--;
					Gui.SetButtonPage(list, currentPage, state);
					updateNav();
				}
			}, true);
		Input.navButtons[1].SetVisible((list.length > Input.buttons.length &&
			currentPage > 0));
		if(backEnabled)
			Input.navButtons[2].Setup("Back", backFunc, true);
	}
	
	updateNav();
	
	return function() { return currentPage; }
}

Gui.SetButtonCollectionPage = function(encounter, caster, list, ret, page) {
	Gui.ClearChoiceButtons();
	var i,j;
	for(i=0, j=page*Input.buttons.length; i<Input.buttons.length && j<list.length; i++, j++) {
		Input.buttons[i].SetFromAbility(encounter, caster, list[j], ret);
	}
}

Gui.SetButtonsFromCollection = function(encounter, caster, list, ret, backFunc) {	
	Gui.ClearButtons();
	var currentPage = 0;
	
	Gui.SetButtonCollectionPage(encounter, caster, list, ret, currentPage);
	
	var updateNav = function()
	{
		Input.navButtons[0].Setup(">>",
			function() {
				if(currentPage < (list.length / Input.buttons.length) - 1) {
					currentPage++;
					Gui.SetButtonCollectionPage(encounter, caster, list, ret, currentPage);
					updateNav();
				}
			}, true);
		Input.navButtons[0].SetVisible((list.length > Input.buttons.length &&
			currentPage < (list.length / Input.buttons.length) - 1));
		Input.navButtons[1].Setup("<<",
			function() {
				if(currentPage > 0) {
					currentPage--;
					Gui.SetButtonCollectionPage(encounter, caster, list, ret, currentPage);
					updateNav();
				}
			}, true);
		Input.navButtons[1].SetVisible((list.length > Input.buttons.length &&
			currentPage > 0));
		if(backFunc)
			Input.navButtons[2].Setup("Back", backFunc, true);
	}
	
	updateNav();
}

Gui.RenderParty = function(p, set, obj) {
	var i = 0;
	for(; i < p.Num(); ++i) {
		Gui.RenderEntity(p.Get(i), obj[i]);
		set[i].show();
	}
	for(; i < 4; ++i)
		set[i].hide();
}
Gui.RenderEntity = function(entity, obj) {
	
}

Gui.RenderLocation = function() {
	var name = party.location.nameFunc;
	var nameStr;
	if(isFunction(name))
		nameStr = name();
	else if(name)
		nameStr = name;
	else
		nameStr = "???";
	Gui.location.attr({text: nameStr});
}

Gui.Render = function() {
	switch (gameState) {
		case GameState.Credits:
			Gui.overlay.hide();
			Gui.party.hide();
			Gui.enemy.hide();
			break;
		
		case GameState.Combat:
			if(enemyParty)
				Gui.RenderParty(enemyParty, Gui.enemy, Gui.enemyObj);
			else
				Gui.enemy.hide();
			
		case GameState.Game:
		case GameState.Event:
			// TODO: !RENDER_PICTURES
			Gui.RenderParty(party, Gui.party, Gui.partyObj);
			
			// TODO: Time
			Gui.RenderTime();
			Gui.RenderLocation();
			Gui.overlay.show();
			
			break;
		case GameState.Cavalcade:
			
			
			// TODO: Time
			Gui.RenderTime();
			Gui.RenderLocation();
			Gui.overlay.show();
			break;
	}
	
	
	return;
	
	
	
	
	
	
	switch(gameState) {
		
	case GameState.Cavalcade:
		// Render party
		context.save();
		context.translate(20, 75);
		
		for(var i=0,j=cavalcade.players.length; i<j; i++) {
			context.save();
			
			var p = cavalcade.players[i];
			
			// Draw portrait, if any
			if(RENDER_PICTURES && p.avatar && p.avatar.combat)
				context.drawImage(p.avatar.combat, 0, 0);
			
			// Draw a shaded rect and a red X over pic if folded
			if(p.folded) {
				context.fillStyle = "rgba(0, 0, 0, 0.5)";
				context.fillRect(0,0,100,100);
				context.strokeStyle = "red";
				context.beginPath();
				context.moveTo(0,0);
				context.lineTo(100,100);
				context.moveTo(100,0);
				context.lineTo(0,100);
				context.lineWidth = 4;
				context.stroke();
			}
			
			// Draw name
			context.font = LARGE_FONT;
			context.textAlign = 'start';
			context.lineWidth = 4;
			context.strokeText(p.name, -10, 15);
			context.fillStyle = "white";
			context.fillText(p.name, -10, 15);
			
			// Draw player hand
			context.translate(20, 115);
			for(var k=0; k < 2; k++) {
				// Show cards when game is complete
				var showCard = cavalcade.round > 4;
				// don't show folded opponents
				if(p.folded) showCard = false;
				showCard |= p == player; // always show own

				if(showCard)
					context.drawImage(p.hand[k].Img, 0, 0);
				else
					context.drawImage(Images.card_back, 0 ,0);
				context.translate(110, 0);
			}
			
			context.restore();
			
			if(i==0) {
				context.restore();
				context.save();
				context.translate(1020, 75);
			}
			else
				context.translate(0, 300);
		}
		
		context.restore();
		
		// Draw house hand
		context.save();
		context.translate(25, 380);
		for(var i=0,j=cavalcade.house.length; i<j; i++) {
			// Show cards when game is complete
			var showCard = cavalcade.round > i + 1;
			if(showCard)
				context.drawImage(cavalcade.house[i].Img, 0, 0);
			else
				context.drawImage(Images.card_back, 0 ,0);
			context.translate(60, 25);
		}
		context.restore();
		
		Gui.RenderTime(context);
		Gui.RenderLocation(context);
		
		context.save();
		
		context.lineWidth = 4;
		context.strokeStyle = "black";
		context.fillStyle = "white";
		context.font = LARGE_FONT;
	
		var potStr   = cavalcade.pot;
		var roundStr = cavalcade.round - 1;
		if(roundStr < 1) roundStr = 1;
		if(roundStr > 3) roundStr = 3;
		
		context.textAlign = 'start';
		context.strokeText("Round: ", 550, 620);
		context.fillText("Round: ", 550, 620);
		context.textAlign = 'right';
		context.strokeText(roundStr, 850, 620);
		context.fillText(roundStr, 850, 620);
		
		context.textAlign = 'start';
		context.strokeText("Pot: ", 550, 670);
		context.fillText("Pot: ", 550, 670);
		context.textAlign = 'right';
		context.strokeText(potStr, 850, 670);
		context.fillText(potStr, 850, 670);
		
		context.restore();
		
		break;
	}
	
	// TODO, use on stats screen
	// Render character stats (temp)
	//Gui.RenderStatsScreen(context);
}

Gui.RenderTime = function() {
	var coinStr = party.coin;
	Gui.coin.attr({text: coinStr});
	
	var dateStr = world.time.DateString();
	Gui.date.attr({text: dateStr});
	
	var timeStr = world.time.TimeString();
	Gui.time.attr({text: timeStr});
}

Gui.RenderStatsScreen = function(context) {
	// Set up context for drawing text
	context.fillStyle = "black";
	context.textAlign = 'start';
	context.font = DEFAULT_FONT;

	context.save();
	context.translate(80, 100);
	
	context.fillText("Strength: ", 0, 0);
	context.fillText("Stamina: ", 0, 30);
	context.fillText("Dexterity: ", 0, 60);
	context.fillText("Intelligence: ", 0, 90);
	context.fillText("Spirit: ", 0, 120);
	context.fillText("Libido: ", 0, 150);
	context.fillText("Charisma: ", 0, 180);
	context.fillText("HP: ", 0, 210);
	context.fillText("SP: ", 0, 250);
	context.fillText("Lust: ", 0, 280);
	context.fillText("Level: ", 0, 310);
	context.fillText("Exp: ", 0, 350);
	context.fillText("Sex level: ", 0, 380);
	context.fillText("Sexp: ", 0, 410);
	
	context.translate(300, 0);
	context.textAlign = 'right';
	context.fillText(Math.floor(player.strength.Get()), 0, 0);
	context.fillText(Math.floor(player.stamina.Get()), 0, 30);
	context.fillText(Math.floor(player.dexterity.Get()), 0, 60);
	context.fillText(Math.floor(player.intelligence.Get()), 0, 90);
	context.fillText(Math.floor(player.spirit.Get()), 0, 120);
	context.fillText(Math.floor(player.libido.Get()), 0, 150);
	context.fillText(Math.floor(player.charisma.Get()), 0, 180);
	context.fillText(Math.floor(player.curHp) + "/" + Math.floor(player.HP()), 0, 210);
	context.fillText(Math.floor(player.curSp) + "/" + Math.floor(player.SP()), 0, 250);
	context.fillText(Math.floor(player.curLust) + "/" + Math.floor(player.Lust()), 0, 280);
	context.fillText(Math.floor(player.level), 0, 310);
	context.fillText(Math.floor(player.experience), 0, 350);
	context.fillText(Math.floor(player.sexlevel), 0, 380);
	context.fillText(Math.floor(player.sexperience), 0, 410);
	
	context.textAlign = 'start';
	
	context.restore();
}
