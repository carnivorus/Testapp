suite('Utils-Tests', function() {
	test('kinveyInit() darf keinen Fehler werfen und nicht undefined sein!', function(done) {
		this.timeout(5000);
		promise = kinveyInit();
		if(promise == undefined)
			throw "ist undefined!";
		promise.then(function() {
			done();
		});
	});
});