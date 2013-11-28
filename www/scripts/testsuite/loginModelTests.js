suite('LoginViewModel-Tests', function() {
	var model;
	
	test('Die Erstellung des LoginViewModel darf keinen Fehler werfen!', function() {
		model = new LoginViewModel();
	});

	test('Die Angabe eines falschen Benutzernamens muss eine Exception werfen!', function(done) {
		// Setze Benutzername und Passwort
		model.username('irgendwer');
		model.password('irgendwas');

		// Anmelden
		model.doLogin(function(err) {
			if(err === undefined)
				done('Hat keine Exception geworfen, obwohl der Benutzername falsch war!');
			else
				done();
		});
	});

	test('Die Anmeldung am Kinvey-Backend sollte erfolgreich sein und keine Fehler werfen!', function(done) {
		// Setze Benutzername und Passwort
		model.username('tester');
		model.password('rester');

		// Anmelden
		model.doLogin(done);
	});

	test('Eine erneute Erstellung eines LoginViewModel muss funktionieren ...', function() {
		model = new LoginViewModel();
	});

	test('... darf aber keine Login-Funktion mehr ausführen, selbst wenn Benutzername und Passwort falsch sind!', function(done) {
		model.doLogin(done);
	});
	
	test('Kinvey.getActiveUser() muss unseren Testuser zurückliefern', function(done) {
		if(Kinvey.getActiveUser() === null)
			return done('Kinvey.getActiveUser() lieferte null zurück!');
		return done();
	});
	
	test('Kinvey-Benutzer muss wieder abgemeldet werden können', function(done) {
		this.timeout(5000);
		model.doLogout(done);
	});
	
	test('Der Benutzer muss jetzt abgemeldet sein!', function() {
		if(Kinvey.getActiveUser() !== null)
			throw 'Kinvey.getActiveUser() lieferte nicht null zurück!';
	});
	
	test('doLogin auch ohne Parameter aufrufbar', function() {
		model.username('irgendwer');
		model.doLogin();
	});
});