function TestLib() {
	var self = this;

	self.triggerCustomEvent = function(eventPath, eventDesc, eventType, customData) {
		return wrapFunction("triggerCustomEvent", arguments);
	};

	self.triggerButtonClickEvent = function(eventPath, eventDesc, eventType, customData) {
		return wrapFunction("triggerButtonClickEvent", arguments);
	};

	self.triggerSearchEvent = function(eventPath, eventDesc, eventType, customData) {
		return wrapFunction("triggerSearchEvent", arguments);
	};

	function wrapFunction(funcName, args) {
		var arr = new Array();
		for (var i = 0; i < args.length; i++) {
			arr[i] = args[i];
		}

		var data = (JSON && JSON.stringify) ? JSON.stringify([funcName, arr]) : stringify([funcName, arr]);
        if(navigator.userAgent.match(/Android/i)) {
            // test - it's an name of an object when we add javascriptInterface object from the android cpde
            test.sendJsEvent(data);
            return;
        }
        // for iOS
        if (window.external && window.external.Notify) {
            window.external.Notify(TestRequest);
        } else {
            var TestGateway = document.createElement('iframe');
            TestGateway.setAttribute('src', TestRequest);
            TestGateway.setAttribute('style', 'display:none;');
            TestGateway.setAttribute('frameborder', '0');
            TestGateway.setAttribute('height', '0px');
            TestGateway.setAttribute('width', '0px');
            document.getElementsByTagName('body')[0].appendChild(TestGateway);
            TestGateway.parentNode.removeChild(TestGateway);
            TestGateway = null;
        }
    }

	function stringify(args) {
		if (typeof JSON === "undefined") {
			var s = "[";
			var i, type, start, name, nameType, a;
			for (i = 0; i < args.length; i++) {
				if (args[i] !== null) {
					if (i > 0) {
						s = s + ",";
					}
					type = typeof args[i];
					if ((type === "number") || (type === "boolean")) {
						s = s + args[i];
					} else if (args[i] instanceof Array) {
						s = s + "[" + args[i] + "]";
					} else if (args[i] instanceof Object) {
						start = true;
						s = s + '{';
						for (name in args[i]) {
							if (args[i][name] !== null) {
								if (!start) {
									s = s + ',';
								}
								s = s + '"' + name + '":';
								nameType = typeof args[i][name];
								if ((nameType === "number")
										|| (nameType === "boolean")) {
									s = s + args[i][name];
								} else if ((typeof args[i][name]) === 'function') {
									// don't copy the functions
									s = s + '""';
								} else if (args[i][name] instanceof Object) {
									s = s + PhoneGap.stringify(args[i][name]);
								} else {
									s = s + '"' + args[i][name] + '"';
								}
								start = false;
							}
						}
						s = s + '}';
					} else {
						a = args[i].replace(/\\/g, '\\\\');
						a = a.replace(/"/g, '\\"');
						s = s + '"' + a + '"';
					}
				}
			}
			s = s + "]";
			return s;
		} else {
			return JSON.stringify(args);
		}
	}
};

var testLib = new TestLib();