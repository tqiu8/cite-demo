
annotorious.plugin.Server = function(opt_config_options) {
	console.log('server loaded')
};

annotorious.plugin.Server.prototype.initPlugin = function(anno) {
	console.log(db);
	var collection = db.get('annotations');
	anno.addHandler('onAnnotationCreated', function(annotation) {
	  	console.log('annotation created 2')
  	});
};