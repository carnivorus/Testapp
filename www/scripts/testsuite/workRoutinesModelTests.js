suite('WorkRoutinesViewModel-Tests', function() {
	var model, loginModel;
	
	suiteSetup(function(done) {
		this.timeout(5000);
		// Anmelden am Kinvey-Backend
		loginModel = new LoginViewModel();
		loginModel.username('tester');
		loginModel.password('rester');
		loginModel.doLogin(done);
	});
	
	suiteTeardown(function(done) {
		loginModel.doLogout(done);
	});
	
	test('Erstelle ein neues WorkRoutinesViewModel', function() {
		model = new WorkRoutinesViewModel();
	});
	
	test('Mindestens ein Arbeitsgang muss vorhanden sein!', function(done) {
		model.init(function(err) {
			if(err !== undefined)
				return done(getMessage(err));
			else if(model.workGroups().length <= 0)
				return done('Konnte zwar die Arbeitsgänge holen, waren aber keine vorhanden!');
			else
				done();
		});
	});
});