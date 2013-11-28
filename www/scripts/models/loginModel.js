/**
 * Diese Funktion (Konstruktor) erstellt ein neues LoginViewModel.
 * 
 * @returns {LoginViewModel}
 */
function LoginViewModel() {
	var that = this;
	
	this.username = ko.observable("tester");
	this.password = ko.observable("rester");
	this.isLoggedIn = false;				// View muss Eingabefelder disablen
	
	// Überprüfe, ob User schon angemeldet ist
	if(Kinvey.getActiveUser() !== null) {
		this.isLoggedIn = true;
		// TODO: Weiterleiten bzw. Ansicht wechseln, da Benutzer schon angemeldet ist!
	}	
	/**
	 * Diese Funktion führt die Anmeldung eines Benutzers am Kinvey-Backend durch.
	 * Soll auf die Anmeldung gewartet werden, kann eine Callback-Funktion übergeben
	 * werden. War der Anmelde-Vorgang erfolgreich, wird die Callback-Funktion ohne
	 * Parameter aufgerufen. War die Anmeldung nicht erfolgreich, wird eine Fehlermeldung
	 * als String übergeben. Diese enthält momentan noch den Kinvey-Fehlertext.
	 * 
	 * TODO: Fehlertext auf deutsch zurückliefern (für Testzwecke aber in Englisch sinnvoll).
	 * TODO: Überprüfen, ob die throws hier überhaupt sinnvoll sind.
	 * 
	 * @param {function(err)} callback
	 * @returns {undefined}
	 */

	this.doLogin = function(callback) {
	    if (that.isLoggedIn)
	    {
	        window.location = "#MainMenu";
	        return;
	    }
			//if(callback !== undefined && typeof(callback) === 'function')
			//	return callback();
			//else
			//	return;
		
		var p = Kinvey.User.login(this.username(), this.password());
		p.then(function() {
			// TODO: Weiterleiten bzw. Ansicht wechseln
			that.isLoggedIn = true;
			workRoutinesViewModel.init();
			console.log('logged in');
			window.location = "#MainMenu";
			if(callback !== undefined)
				return callback();
		}, function(error) {
			if(callback !== undefined)
				return callback(getMessage(error));
			throw ['Kinvey :: Login fehlgeschlagen!', error];
		});
	};
	
	this.doLogout = function(callback) {
		Kinvey.User.logout({success: function(resp) {
				that.isLoggedIn = false;
				console.log('logged out');
				workRoutinesViewModel.init();
				if(callback !== undefined && typeof(callback) === 'function') callback();
			}, error: function(err) {
				if(callback !== undefined  && typeof(callback) === 'function') callback(getMessage(err));
			}
		});
	};
}