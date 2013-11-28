// Beispiel-Objekt für einen Arbeitsgang
var sampleWorkRoutine = {
	"group": "Nährstoffzufuhr",
	"subItems": [
		{
			"name": "Kunstdünger",
			"paramItems": ["Kunstdünger_Item1", "Kunstdünger_Item2", "Kunstdünger_Item3"
			],
			"params": [
				{"type": "string", "name": "name", "title": "Düngername", "default": "", "enabled": true},
				{"type": "float", "name": "amount", "title": "kg/ha", "default": "", "enabled": true},
				{"type": "bool", "name": "ufd", "title": "Unterfußdüngung", "default": "", "enabled": true },
				{"type": "euro", "name": "price", "title": "Kosten", "default": ["123,43 €", "123,43 €", "123,43 €"], "enabled": true},
				{"type": "float", "name": "special", "title": "Special-Param", "default": ["W1", "W2", "W3"], "enabled": false}
			]
		},
		{
			"name": "Gülle",
			"paramItems": ["Gülle_Item1"],
			"params": [
				{"type": "string", "name": "name", "title": "Düngername", "default": "", "enabled": true},
				{"type": "float", "name": "amount", "title": "kg/ha", "default": "", "enabled": true},
				{"type": "bool", "name": "ufd", "title": "Unterfußdüngung", "default": "", "enabled": true},
				{"type": "euro", "name": "price", "title": "Kosten", "default": ["123,43 €", "123,43 €", "123,43 €"], "enabled": true},
				{"type": "float", "name": "special", "title": "Special-Param", "default": ["W1", "W2", "W3"], "enabled": false}
			]
		}
	],
	"newItemTitle": "+ neue Düngerart"
};

/**
 * Diese Funktion (Konstruktor) definiert ein neues WorkRoutinesViewModel. Es werden
 * alle workGroups dieses Benutzers zurückgegeben (Aufbau des Objekts siehe Beispiel oben).
 * 
 * @returns {WorkRoutinesViewModel}
 */
function WorkRoutinesViewModel() {
	var that = this;
	this.workGroups = ko.observableArray();
	this.selectedItem = ko.observable({});
	this.selectedParamItem = ko.observable([0]);
	this.selectedGroup = ko.observable('');
	this.acres = ko.observableArray();

	this.init = function(callback) {
		// Arbeitsgänge von der Datenbank holen
		that.workGroups.removeAll();
		Kinvey.DataStore.find('customWorkRoutines').then(function(workRoutineList) {
			$(workRoutineList).each(function(idx, ele) {
				that.workGroups.push(ele);
			});
			console.log('updated workGroups (count: ' + that.workGroups().length + ')');
			if (callback !== undefined && typeof (callback) === 'function')
				return callback();
		}, function(error) {
			if (callback !== undefined && typeof (callback) === 'function')
				return callback(getMessage(error));
			throw ['Kinvey :: Fehler beim Auslesen der Arbeitsgänge', error];
		});
		
		Kinvey.DataStore.find('acres').then(function(acres) {
			$(acres).each(function(idx, ele) {
				that.acres.push(ele);
			});
			console.log('updated acres (count: ' + that.acres().length + ')');
			if (callback !== undefined && typeof (callback) === 'function')
				return callback();
		}, function(error) {
			if (callback !== undefined && typeof (callback) === 'function')
				return callback(getMessage(error));
			throw ['Kinvey :: Fehler beim Auslesen der Felder', error];
		});
	};
	
	this.saveWorkRoutine = function() {
		var workRoutine = {};
		workRoutine.group = that.selectedGroup();
		workRoutine.date = new Date();
		workRoutine.title = that.selectedItem().name;
		workRoutine.params = [{name:'paramItem', value: that.selectedParamItem()[0]}];
		for(i = 0; i < that.selectedItem().params.length; ++i)
		{
			var param = that.selectedItem().params[i];
			param.value = $("input[name='" + param.name + "']").val();
			workRoutine.params.push(param);
		}
		
		// TODO: Worker und Felder müssen noch ausgewählt und hinzugefügt werden!
		workRoutine.worker = $("input[name='worker']").val();
		workRoutine.acres = [];
		$('#acreList').each(function() {
			workRoutine.acres.push($(this).val());
		});
		
		try
		{
			Kinvey.DataStore.save('workRoutines', workRoutine);
		}
		catch(e)
		{
			alert(getMessage(e));
		}
	};

	this.selectItem = function(item, group) {
		that.selectedItem(item);
		that.selectedGroup(group);
	};
	
	this.switchVisibility = function(data, event) {
		var bSetVisible = true;
		if ($(event.currentTarget).next().hasClass('visible')) {
			bSetVisible = false;
		}
		
		$(".Submenu").each(function(i, e) {
			$(e).addClass("invisible");
			$(e).removeClass("visible");
		});
		
		if (!bSetVisible) {
            $(event.currentTarget).next().removeClass('visible');
            $(event.currentTarget).next().addClass('invisible');
        }
        else {
				$(event.currentTarget).next().removeClass('invisible');
				$(event.currentTarget).next().addClass('visible');
        }
	}

	this.init();
}