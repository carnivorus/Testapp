/**
 * Hier werden ein paar Hilfsmethoden definiert.
 */
'use strict';

var KINVEY_TEST = {
	appKey: 'kid_VT_xdCcXfq',
	appSecret: 'd01dc9922fa94c54af839cd038348534',
	sync: {enable: true, online: true}
};
var KINVEY_PRODUCTION = {
	appKey: 'kid_VPJ5lkzSZ5',
	appSecret: '803c605bc5a44908bab2cd98cee816e1',
	sync: {enable: true, online: false}
}
var KINVEY_DEVELOPMENT = {
	appKey: 'kid_TVaABCsBJq',
	appSecret: '01da72e073de47d4983d7ba671fe3357',
	sync: {enable: true, online: false}
}

/**
 * kinvey_init() initialisiert die Kinvey-Verbindung
 */
function kinveyInit() {
    var promise = Kinvey.init(KINVEY_TEST);/*.then(function(activeUser) {
	}).then(null, function(error) {
	});*/

	// Set online / offline
	/*if (navigator.onLine || !window.sessionStorage) {
		Kinvey.Sync.online();
	}
	else {
		Kinvey.Sync.offline();
	}*/
	
	$(window).on({
		offline: function() {
			return Kinvey.Sync.offline().then(function() {}, function(error) {
				throw ['Kinvey :: Umschaltung auf Offline-Modus nicht erfolgreich! ', error];
			});
		},
		online: function() {
			return setTimeout(function() {
				return Kinvey.Sync.online().then(function() {}, function(error) {
					throw ['Kinvey :: Umschaltung auf Online-Modus nicht erfolgreich! ', error];
				});
			}, 1000);
		}
	});

	return promise;
}

function getMessage(error) {
	return (error instanceof Error ? error.message : error.description);
}