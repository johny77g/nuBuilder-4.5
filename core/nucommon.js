window.nuDialog = new nuCreateDialog('');
window.nuFORM = new nuFormObject();
window.nuRESPONSIVE = new nuResponseForm();
window.nuOnLoad = null;
window.nuBeforeSaveGlobal = null;
window.nuLoadBrowseGlobal = null;
window.nuLoadEditGlobal = null;
window.nuOnLookupPopulatedGlobal = null;
window.nuOnPopupOpenedGlobal = null;
window.nuHideMessage = true;
window.nuDragID = 1000;
window.nuLastForm = '';
window.nuNEW = '';
window.nuColor = '';
window.nuImage = '';
window.nuSESSION = '';
window.nuDRAGLINEVSTART = '';
window.nuDRAGLINEVID = '';
window.nuLASTRECORD = '';
window.nuMESSAGES = [];
window.nuSAVED = true;
window.nuImages = [];
window.nuOPENER = [];
window.nuSUBFORMROW = [];
window.nuSUBFORMJSON = [];
window.nuSCHEMA = [];
window.nuLANGUAGE = [];
window.nuFIELD = [];
window.nuHASH = [];
window.nuBEFORE = [];
window.nuAFTER = [];
window.nuBROWSERESIZE = {
	x_position: 0,
	mouse_down: false,
	moving_element: '',
	pointer: '',
	current_cell_width: 0,
	next_cell_left: 0,
	array_current_cell_left: '',
	last_moved_element: ''
};

String.prototype.nuEndsWith = function(substr, ignoreCase) {

	if (ignoreCase === undefined || ignoreCase === false) return this.endsWith(substr);
	return this.toLowerCase().endsWith(substr.toLowerCase());

}

String.prototype.nuStartsWith = function(substr, ignoreCase) {

	if (ignoreCase === undefined || ignoreCase === false) return this.startsWith(substr);
	return this.toLowerCase().startsWith(substr.toLowerCase());

}

String.prototype.nuReplaceAll = function (str1, str2, ignore) {
	return this.replace(new RegExp(str1.replace(/([\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, function (c) { return "\\" + c; }), "g" + (ignore ? "i" : "")), str2);
};

String.prototype.ltrim = function () {
	return this.replace(/^\s+/, "");
}

String.prototype.rtrim = function () {
	return this.replace(/\s+$/, "");
}

String.prototype.containsAny = String.prototype.containsAny || function (arr) {

	for (var i = 0; i < arr.length; i++) {
		if (this.indexOf(arr[i]) > -1) {
			return true;
		}
	}
	return false;

};

String.prototype.fixNbsp = function () {
	return this.replace(/\xA0/g, " ")
}

String.prototype.capitalise = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.toTitleCase = function () {
	return this.toLowerCase().replace(/^(\w)|\s(\w)/g, (grp) => grp.toUpperCase());
}

String.prototype.justNumbers = function () {
	return this.replace(/[^0-9]/g, '');
}

String.prototype.withoutNumbers = function () {
	return this.replace(/\d+/g, '');
}

String.prototype.nuInsertString = function (index, string) {

	if (index > 0) {
		return this.substring(0, index) + string + this.substr(index);
	}

	return string + this;

};

String.prototype.isEmpty = function () {
	return (this === null || this.length === 0);
}

Date.prototype.withoutTime = function () {
	var d = new Date(this);
	d.setHours(0, 0, 0, 0);
	return d;
}

Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
}

String.prototype.nuFormat = function () {
	var args;
	args = arguments;
	if (args.length === 1 && args[0] !== null && typeof args[0] === 'object') {
		args = args[0];
	}
	return this.replace(/{([^}]*)}/g, function (match, key) {
		return (typeof args[key] !== "undefined" ? args[key] : match);
	});
};
// Examples:
// "This is an example from {name}".format({name:"Blaine"});
// "This is an example from {0}".format("Blaine");

$.fn.enterKey = function (fnc) {
	return this.each(function () {
		$(this).keypress(function (e) {
			if (e.key == 'Enter') {
				fnc.call(this, e);
			}
		})
	})
}

$.fn.nuFocusWithoutScrolling = function () {

	let t = $(this)[0];

	if (t === undefined) {
		return;
	}

	let x = t.scrollX, y = t.scrollY;

	this.focus();
	t.scrollTo(x, y);
	return this;

};

jQuery.fn.extend({
	nuEnable: function (enable) {
		return this.each(function () {
			nuEnable(this.id, enable);
		});
	},
	nuDisable: function () {
		return this.each(function () {
			nuDisable(this.id);
		});
	},
	nuShow: function (visible, openTab) {
		return this.each(function () {
			nuShow(this.id, visible, openTab);
		});
	},
	nuHide: function () {
		return this.each(function () {
			nuHide(this.id);
		});
	},
	nuRemove: function () {
		return this.each(function () {
			nuRemove(this.id);
		});
	},
	nuSelectRemoveEmpty: function (setIndex) {
		return this.each(function () {
			nuSelectRemoveEmpty(this.id, setIndex);
		});
	},
	nuGetValue: function (method) {
		return nuGetValue(this.attr('id'), method);
	},
	nuSetValue: function (v, method, change) {
		return this.each(function () {
			return nuSetValue(this.id, v, method, change);
		});
	},
	nuGetText: function () {
		return nuGetValue(this.attr('id'), 'text');
	},
	nuSetText: function (v) {
		return this.each(function () {
			return nuSetValue(this.id, v, 'text');
		});
	},
	nuTranslate: function (method) {
		return this.each(function () {
			nuSetValue(this.id, nuTranslate(nuGetValue(this.id, method)), method);
		});
	},
	nuRemoveFormatting: function () {
		return nuFORM.removeFormatting($(this).val(), $(this).attr('data-nu-format'));
	},
	nuIsVisible: function () {
		return nuIsVisible(this.attr('id'));
	},
	nuIsHidden: function () {
		return nuIsHidden(this.attr('id'));
	},
	nuIsDisabled: function () {
		return nuIsDisabled(this.attr('id'));
	},
	nuIsEnabled: function () {
		return nuIsEnabled(this.attr('id'));
	},
	nuSetPlaceholder: function(placeholder, translate) {
		return nuSetPlaceholder(this.attr('id'), placeholder, translate);
	},
	nuTogglePassword: function(show) {
		return this.each(function() {
			let $input = $(this);
			let type = $input.attr('type') === 'password' ? 'text' : 'password';
			if (show !== undefined) {
				type = show ? 'text' : 'password';
			}
			$input.attr('type', type);
		});
  }

});

function nuPad4(i) {
	return nuPad(i, 4);
}

function nuPad3(i) {
	return nuPad(i, 3);
}

function nuPad2(i) {
	return nuPad(i, 2);
}

function nuPad(i, length, pad) {

	if (typeof (pad) == "undefined") { var pad = 0; }
	return i.toString().padStart(length, pad).toString();

}

function nuGlobalAccess() {
	return window.global_access;
}

function loginInputKeyup(event) {
	if (event.key == 'Enter') {
		$('input#submit').click();
	}
}

function nuOpener(t, f, r, filter, parameters) {

	nuSetSuffix();

	this.id = String(Date.now()) + String(window.nuSuffix);
	this.form_id = f;
	this.record_id = r;
	this.type = t;

	this.filter = nuDefine(filter);
	this.parameters = nuDefine(parameters);

}

function nuOpenerAppend(t, k) {
	window.nuOPENER[window.nuOPENER.length - 1][t] = k;
}

function nuGetOpenerById(pOPENER, pid) {

	for (var i = 0; i < pOPENER.length; i++) {
		if (pOPENER[i].id == pid) {
			return pOPENER[i];
		}
	}

	return;
}

function nuRemoveOpenerById(o, pid) {

	for (var i = 0; i < o.length; i++) {

		if (o[i].id == pid) {
			o.splice(i, 1);
		}

	}

}

function nuGetBreadcrumb(bc) {

	if (window.nuOnBeforeGetBreadcrumb) {
		if (nuOnBeforeGetBreadcrumb(bc) == false) return;
	}

	nuCursor('progress');

	var a = arguments.length;
	var e = nuFORM.edited;

	if (a == 0) {
		var b = nuFORM.breadcrumbs.length - 1;
	} else {
		var b = bc;
	}

	window.nuTimesSaved = -1;

	if (e && nuFORM.getCurrent().form_type != 'launch') {

		if (!confirm(nuTranslate('Leave this form without saving?'))) {
			nuCursor('default');
			return;
		}

	}

	window.nuFORM.removeAfter(b);

	var c = window.nuFORM.getCurrent();

	if (c === undefined) {
		getNuDragDialogIframes().remove();
	} else {
		nuForm(c.form_id, c.record_id, c.filter, c.search, 1);
	}


}

function nuOpenPreviousBreadcrumb(b) {

	const breadcrumbs = window.nuFORM.breadcrumbs;
	const modal = parent.$('#nuModal');

	if (modal.length) {
		nuClosePopup();
		return true;
	}

	b = b ? b + 1 : 2;

	const l = breadcrumbs.length;
	if (l > 1) {
		nuGetBreadcrumb(l - b);
		return true;
	}
	
	return false;

}

function nuDisplayError(e) {

	if (e.errors === undefined || e.errors.length == 0) {			//-- no error messages
		return false;
	}

	let msgDiv = nuMessage(e.errors);

	if (window.nuOnMessage) {
		nuOnMessage(msgDiv, e.errors);
	}

	return e.after_event == false;								//-- errors are really just messages if from after save or after delete.

}

function nuFormatAjaxErrorMessage(jqXHR, exception) {

    const errorMessages = {
        0: nuTranslate('Not connected. Please verify your network connection.'),
        403: [`<h3>${nuTranslate('Access Forbidden.')}</h3>`, jqXHR.responseText],
        404: nuTranslate('The requested page was not found.') + ' [404]',
        500: nuTranslate('Internal Server Error.') + ' [500]',
        parsererror: nuTranslate('Requested JSON parse failed.'),
        timeout: nuTranslate('Time out error.'),
        abort: nuTranslate('Ajax request aborted.'),
    };

    const errorMessage = errorMessages[jqXHR.status] || errorMessages[exception] ||
        [`<h3>${nuTranslate('Uncaught Error.')}</h3>`, jqXHR.responseText]


    return errorMessage;

}

function nuLogin(loginTopRow, nuconfigNuWelcomeBodyInnerHTML, logonMode='normal', onlySsoExcept={}, lastUser="") {

	var HTML = String(nuconfigNuWelcomeBodyInnerHTML).trim();
	loginTopRow = String(loginTopRow).trim();
	window.nuSESSION = '';
	window.nuFORM = new nuFormObject();

	$('body').html('');

	var defaulTopRow = `
						<tr>
							<td align='center' style='padding:0px 0px 0px 33px; text-align:center;'>
							<img src='core/graphics/logo.png'><br><br>
							</td>
						</tr>
			`;

	var topRow = loginTopRow == '' ? defaulTopRow : loginTopRow;

	var h1 = `
			<div id='outer' style='width:100%'>
			<form id='nuLoginForm' action='#' method='post' onsubmit='return false'>
				<div id='login' class='nuLogin'>
					<table align="center">`
						+ topRow + `
			`;
	var h2sso = `
						<tr>
							<td align='center' style='text-align:center' colspan='2'>
								<input id='submitSSO' style='width:90px' type='submit' class='nuButton' onclick='nuSSOLoginRequest()' value='SSO Log in'/>
								<br><br>
							</td>
						</tr>`;
	var h3normal = `
						<tr>
							<td><div style='width:90px; margin-bottom: 5px;'>Username</div><input class='nuLoginInput' id='nuusername' autocomplete='off' /><br><br></td>
						</tr>
						<tr>
							<td><div style='width:90px; margin-bottom: 5px;'>Password</div><input class='nuLoginInput' id='nupassword' type='password' autocomplete='off' onkeypress='nuSubmit(event)'/><br></td>
						</tr>
						<tr>
							<td style='text-align:center' colspan='2'><br><br>
								<input id='submit' style='width:90px' type='submit' class='nuButton' onclick='nuLoginRequest()' value='Log in'/>
							</td>
						</tr>`;
	var h4 = `
					</table>
				</div>
			</form>
			</div>
	`;


	if(logonMode == 'normal') {
		var h = h1 + h3normal + h4;
	} else if (logonMode == 'sso') {
		var h = h1 + h2sso + h4;
	} else if (logonMode == 'both') {
		if (lastUser in onlySsoExcept || "allusers" in onlySsoExcept) {  // Selectively show username/password login option if found in 'onlySsoExcept' dictionary - most users only see SSO button
			var h = h1 + h2sso + h3normal + h4;
		} else {
			var h = h1 + h2sso + h4;
		}
	} else {  // Original/normal mode
		var h = h1 + h3normal + h4;
	}

	var H = HTML == '' ? h : HTML;

	var e = document.createElement('div');

	e.setAttribute('id', 'loginbg');

	window.nuLoginU = window.nuLoginU === undefined ? '' : window.nuLoginU;
	window.nuLoginP = window.nuLoginP === undefined ? '' : window.nuLoginP;

	$('body').html(H);

	if (nuIsMobile()) {
		$('body').css('width', 300).css('height', 300);
	}

	if (window.nuLoginU == '' && window.nuLoginP == '') {
		$('#nuusername').focus();
	}

	if (window.nuLoginU != '' && window.nuLoginP == '') {

		$('#nuusername').val(window.nuLoginU);
		$('#nupassword').focus();

	}

	if (window.nuLoginU != '' && window.nuLoginP != '') {

		$('#nuusername').val(window.nuLoginU);
		$('#nupassword').val(window.nuLoginP);

		nuLoginRequest();

	}

	if (sessionStorage.logout == 'true') {
		nuMessage(['You have been logged out']);
	}

	sessionStorage.logout = '';

}

function nuSubmit(e) {

	if (e.key == 'Enter') {
		$('#submit').click();
	}

}

function nuBuildLookup(t, s, like) {

	if ($(t).prop('disabled')) { return; }

	nuCursor('progress');

	let obj = $('#' + t.id);
	var f = obj.attr('data-nu-form-id');
	var tar = obj.attr('data-nu-target');
	var p = obj.attr('data-nu-prefix');
	window.nuSubformRow = Number(p.substr(p.length - 3));

	if (arguments.length < 3) {
		like = '';
	}

	window.nuOPENER.push(new nuOpener('F', f, ''));

	var open = window.nuOPENER[window.nuOPENER.length - 1];

	if (parent.window == window) {
		let left = nuIsMobile() ? 0 : 50;
		window.nuDialog.createDialog(left, 25, 50, 50, '');
	} else {
		window.nuDialog.createDialog(0, 30, 50, 50, '');
	}

	$('#nuDragDialog')
		.css('visibility', 'hidden')
		.append('<iframe style="border-style:none;right:5px;top:35px;width:400px;height:400px;position:absolute" id="nuWindow" src="index.php?&opener=' + open.id + '&target=' + tar + '&search=' + s + '&like=' + like + '&browsefunction=lookup&iframe=1"></iframe>');

}

function nuCanArrangeObjects() {
	return nuGlobalAccess() && nuSERVERRESPONSE.objects.length > 0;
}

function nuPopup(f, r, filter) {

	nuCursor('progress');

	if (!nuGlobalAccess() && f == 'nuobject') { return; }
	if (r == '-2' && !nuCanArrangeObjects()) { return; }

	$('#nuCalendar').remove();

	window.nuOPENER.push(new nuOpener('F', f, r, filter));

	var id = window.nuOPENER[window.nuOPENER.length - 1].id;

	if (parent.window == window) {
		let left = nuIsMobile() ? 0 : 50;
		window.nuDialog.createDialog(left + window.pageXOffset, 25 + window.pageYOffset, 50, 50, '');
	} else {
		window.nuDialog.createDialog(0, 30, 50, 50, '');
	}

	$('#nuDragDialog')
		.css('visibility', 'hidden')
		.append('<iframe style="border-style:none;right:5px;top:35px;width:400px;height:400px;position:absolute" id="nuWindow" src="index.php?opener=' + id + '&browsefunction=browse&iframe=1"></iframe>')
		.prepend('<div id="nuDraggingBox" style="position:absolute; bottom:0px; right:0px; width:20px; height:20px; z-index:200"></div>');


	if (window.nuOnPopupOpenedGlobal) {
		nuOnPopupOpenedGlobal(f, r, filter);
	}

}

function nuOptionsListAction(f, r, filter) {

	if (!(nuIsMacintosh() ? window.event.metaKey : window.event.ctrlKey)) {
		nuPopup(f, r, filter)
	} else {
		nuForm(f, r, filter, '', '');
	}
}

//-- object for dragging dialog --//

function nuCreateDialog(t) {

	this.startX = 0;
	this.startY = 0;
	this.moveX = 0;
	this.moveY = 0;
	this.title = t;
	this.pos = {};

	this.move = function (event) {

		this.moveX = event.clientX - this.startX;
		this.moveY = event.clientY - this.startY;
		this.startX = event.clientX;
		this.startY = event.clientY;

		if (event.buttons == 1) {
			this.moveDialog(event);
		}

		var dir = event.target.parentElement.baseURI.includes('nureportdesigner') ? '' : 'core/';

		if (event.target.id == 'dialogClose') {
			$('#dialogClose').attr("src", dir + "graphics/close_red.png");
		} else {
			$('#dialogClose').attr("src", dir + "graphics/close.png");
		}

	}

	this.click = function (event) {

		if (event.target.id == 'dialogClose') {

			if ($('#nuWindow').contents().find('#nuSaveButton.nuSaveButtonEdited').length > 0) {

				if (!confirm(nuTranslate('Leave this form without saving?'))) {
					return false;
				}

			}
			$('#nuDragDialog').remove();
			$('#nuModal').remove();
			$('body').off('.popup');

		}

	}


	this.down = function (event) {

		window.nuCurrentID = event.target.id;

		if (event.target.id == 'dialogTitleWords') {

			$('#nuDragDialog').append('<div id="nuPopupModal"></div>');
		}

	}

	this.moveDialog = function (e) {

		if (window.nuCurrentID == 'nuModal') { return; }

		var s = document.getElementById('nuDragDialog');
		if (s === null) return;

		var o = s.style;
		var l = parseInt(o.left, 10) + this.moveX;
		var t = parseInt(o.top, 10) + this.moveY;

		if (e.target.classList == '' && e.target.id != 'nuSelectBox') {

			o.left = l + 'px';
			o.top = t + 'px';

		}

	}

	this.createDialog = function (l, t, w, h, title) {

		var callerName = this.createDialog.caller.name;
		nuDialog.dialog = callerName;

		var e = document.createElement('div');

		var translation = nuTranslate(title);

		e.setAttribute('id', 'nuDragDialog');

		let scrollHeight = Math.max(
			document.body.scrollHeight, document.documentElement.scrollHeight,
			document.body.offsetHeight, document.documentElement.offsetHeight,
			document.body.clientHeight, document.documentElement.clientHeight
		);

		$('body').append('<div id="nuModal" style="height:' + scrollHeight + 'px"></div>')
			.append(e);

		var subDir = callerName == 'nuPopup' || callerName == 'nuBuildLookup' ? 'core/' : '';

		$('#nuDragDialog').addClass('nuDragDialog nuDragNoSelect')
			.css({
				'left': l,
				'top': t,
				'width': w,
				'height': h,
				'background-color': '#fff',
				'z-index': 3000,
				'position': 'absolute',
				'visibility': 'hidden'
			})
			.html('<div id="dialogTitle" class="nuDialogTitle"><div id="dialogTitleWords">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + translation + '</div><img id="dialogClose" src="' + subDir + 'graphics/close.png" style="position:absolute; top:2px; left:0px"></div>')

		const $body = $('body');
		if (!$body.attr('data-nu-popup-events')) {
			$body.attr('data-nu-popup-events', '')
				.on('mousemove.popup', function (event) { nuDialog.move(event); })
				.on('click.popup', function (event) { nuDialog.click(event); })
				.on('mousedown.popup', function (event) { nuDialog.down(event); })
				.on('mouseup.popup', function (event) { window.nuCurrentID = ''; $('#nuPopupModal').remove(); })
				.on('dblclick.popup', function (event) { nuResizeWindow(event); })
		}

		this.startX = l;
		this.startY = t;

	}

}

function nuReformat(t) {

	function nuReapplyFormat(v, f) {

		let r = nuFORM.removeFormatting(v, f);
		return nuFORM.addFormatting(r, f);

	}

	let o = $('#' + t.id);
	let f = o.attr('data-nu-format');
	let v = o.val();

	if (f == '' || v == '') {
		return v;
	}

	if (f[0] == 'D') {

		let a = nuReapplyFormat(v, f);
		if (v != a) {

			o.val('');

			if (window.nuFormatValueClearedGlobal) {
				nuFormatValueClearedGlobal(o, v);
			}

			if (window.nuFormatValueCleared) {
				nuFormatValueCleared(o, v);
			}

		}

	}

	if (f[0] == 'N') {

		let a = nuReapplyFormat(v, f);
		o.val(a);

	}

}


function nuOpenAce(lang, obj) {

	var ts = new Date().getTime();
	window.nuAce = [lang, obj];

	window.open('core/nuace.php?' + ts);

}


function nuRunIt(t, email, type) {

	var r = $('#' + t.id).attr('data-nu-row');
	var c = '000';
	var p = $('#' + r + c).html();

	if (arguments.length < 3) {										//-- set type

		var type = $('#' + r + '001').html();					//-- report - PDF,or procedure - PHP

	}

	if (arguments.length == 1) {										//-- set email

		var email = 0;

	}

	var f = $('#' + t.id).attr('data-nu-primary-key');
	var i = nuRecordId();

	if (email == 1) {

		if (type == 'php') {
			nuEmailPHP(i);
		}

		if (type == 'pdf') {
			nuEmailPDF(i);
		}

	} else {

		if (type == 'php') {
			nuGetPHP(f, p);
		}

		if (type == 'pdf') {
			nuGetReport(f, p);
		}

	}

}

function nuBindCtrlEvents() {

	var nuCtrlKeydownListener = function (e) {

		if (e.key === 'F3' || ((nuIsMacintosh() ? e.metaKey : e.ctrlKey) && e.key === 'f')) { // exclude Ctrl + f
			window.nuNEW = 0;
		} else {
			if (e.key == 'Control') {
				window.nuNEW = 1;
			}

		}

	}

	$(document).keydown(function (e) {

		if((e.key === 'PageDown' || e.key === 'PageUp') && nuFormType() == 'browse'){
			const $nuRecord = $("#nuRECORD");
			const scrollBy = e.key === 'PageDown' ? 400 : -400;
			$nuRecord.scrollTop($nuRecord.scrollTop() + scrollBy);
		}

		if (e.key == 'Escape') {

			if (nuIsVisible('nuMessageDiv')) {
				$('#nuMessageDiv').remove();
			} else if (nuIsVisible('nuOptionsListBox')) {
				$('#nuOptionsListBox').remove();
			} else if (parent.$('#nuModal').length == 1) {
				let ae = document.activeElement;
				$(ae).blur();
				$(ae).focus();
				if (nuFormsUnsaved() == 0) {
					nuClosePopup();
				} else {
					if (confirm(nuTranslate('Leave this form without saving?'))) {
						nuClosePopup();
					}
				}
			} else if (nuFormType() == 'browse') {
				nuSearchAction("");
			}

		}

		if ((nuIsMacintosh() ? e.metaKey : e.ctrlKey) && e.shiftKey) {

			window.nuNEW = 0;

			e.preventDefault();

			var g = nuGlobalAccess();
			var formId = window.nuFORM.getCurrent().form_id;

			if (nuFormType() == 'browse' || nuFormType() == 'edit') {

				if (e.code == 'KeyF' && g) {						//-- f		Form Properties
					nuPopup("nuform", formId);
				} else if (e.code == 'KeyO' && g) {					//-- O		Object List
					nuPopup("nuobject", "", formId);
				} else if (e.code == 'KeyM' && g) {					//-- m		Form Info
					nuShowFormInfo();
				} else if (e.code == 'KeyE' && g) {					//-- e		Database
					nuVendorLogin('PMA');
				} else if (e.code == 'KeyI' && g) {					//-- i		Sessions
					nuForm("nusession","","", "", 2);
				} else if (e.code == 'KeyQ' && g) {					//-- e		File Manager
					nuVendorLogin("TFM");
				} else if (e.code == 'KeyB' && g) {					//-- b		Backup
					nuRunBackup();
				} else if (e.code == 'KeyR') {						//-- r		Refresh
					nuGetBreadcrumb();
				} else if (e.code == 'KeyU' && g) {					//-- u		Setup
					nuForm('nusetup', '1', '', '', 2);
				} else if (e.code == 'KeyD' && g) {					//-- d		nuDebug Results
					nuPopup("nudebug", "");
				} else if (e.code == 'KeyY' && g) {					//-- y		Current Properties
					nuPrettyPrintMessage(e, nuCurrentProperties());
				} else if (e.code == 'KeyL') {						//-- l		Log out
					nuAskLogout();
				}

			}

			if (nuFormType() == 'browse') {

				if (e.code == 'KeyC' && g) {						//-- c		Searchable Columns
					nuGetSearchList();
				} else if (e.code == 'KeyS') {						//-- s		Search
					nuSearchAction();
				} else if (e.code == 'KeyA' && g) {					//-- a		Add
					nuAddAction();
				} else if (e.code == 'KeyP' && g) {					//-- p		Print
					nuPrintAction();
				}

			}

			if (nuFormType() == 'edit') {

				if (e.code == 'KeyA' && nuCanArrangeObjects()) {	//-- a		Arrange Objects
					nuPopup(formId, "-2");
				} else if (e.code == 'KeyQ' && !g) {				//-- q		Change Password
					nuPopup("nupassword", "5b6bb7108a75efc", "");
				} else if (e.code == 'KeyH' && g) {					//-- t		Add Object
					nuPopup('nuobject', '-1', '');
				} else if (e.code == 'KeyG' && g) {					//-- G		Object Grid
					nuForm("nuobjectgrid", formId, "", "", 2);
				} else if (e.code == 'KeyS') {						//-- s		Save
					$(":focus").blur();
					nuSaveAction();
				} else if (e.code == 'KeyC') {						//-- c		Clone
					nuCloneAction();
				} else if (e.code == 'KeyY') {						//-- y		Delete
					nuDeleteAction();
				} else if (e.code == 'ArrowRight') {				//-- ->		Select next tab
					nuSelectNextTab(1);
				} else if (e.code == 'ArrowLeft') {					//-- <-		Select previous tab
					nuSelectNextTab(-1);
				}

			}

			var nosearch = window.nuFORM.getProperty('nosearch_columns');
			var searchIndex = -1;

			//Numbers
			const numberCode = e.code.replace('Digit','');
			if (numberCode >= "1" && numberCode <= "9") {
				searchIndex = Number(numberCode) - 1;
			}

			if (searchIndex != -1) {

				if ($.inArray(searchIndex, nosearch) != '-1') {

					nosearch.pop(searchIndex);
					$('#nusort_' + searchIndex).removeClass('nuNoSearch');

				} else {

					nosearch.push(searchIndex);
					$('#nusort_' + searchIndex).addClass('nuNoSearch');

				}

			}

			window.nuFORM.setProperty('nosearch_columns', nosearch);
		}
	});

	var nuCtrlKeyupListener = function (e) {

		window.nuNEW = 0;
	}

	$(document).on('keydown.nubindctrl', nuCtrlKeydownListener);

	$(document).on('keyup.nubindctrl', nuCtrlKeyupListener);

}

function nuUnbindDragEvents() {
	$(document).off('.nubindctrl');
}

function nuTranslate(obj) {

	if (Array.isArray(obj)) {

		let arr = obj;
		arr.forEach(function(item, index) {
			const l = nuLANGUAGE.find(elem => elem.english === item);
			arr[index] = !l ? item : l.translation;
		})

		return arr;

	} else {
		if (!obj) return '';

		str = String(obj);
		if (str.charAt(0) == '|') return str.substring(1);

		const l = nuLANGUAGE.find(elem => elem.english === str);
		return !l ? str : l.translation;
	}

}

function nuTranslateToEnglish(str) {

	if (!str) return '';

	str = String(str);
	if (str.charAt(0) === '|') return str.substring(1);

	const l = nuLANGUAGE.find(({translation}) => translation === str);
	return l ? l.english : str;

}

function nuIsOpener() {
	return window.opener !== null;
}

function nuPreview(a) {

	const r = nuRecordId();

	if (r === '-1') {

		alert(nuTranslate('Form must be saved first..'));
		return;

	}

	const arg = a === undefined ? '-3' : '';
	nuPopup(r, arg);

}

function nuPopPHP(e, nuE) {			//-- used in database

	var i = nuRecordId();

	if (i == '') {

		alert(nuTranslate('Cannot create Event Until This Form Has Been Saved..'));
		return;

	}

	nuPopup('nuphp', i + '_' + nuE, 'justphp');

}


function nuPopSQL(e, nuE) {			//-- used in database

	var i = nuRecordId();

	if (i == '') {

		alert(nuTranslate('Cannot create SQL Until This Form Has Been Saved..'));
		return;

	}

	nuPopup('nuselect', i + '_' + nuE, 'justsql');

}

function nuPopJS() {				//-- used in database

	var i = $('#sob_all_zzzzsys_form_id').val();

	if (i == '') {

		alert(nuTranslate('Cannot Create Event Until This Form Has Been Saved..'));
		return;

	}

	nuPopup('nuform', i, 'justjs');

}

function nuGetLookupFields(id) {

	const prefix = id.slice(0, -4);
	const $id = $('#' + id);
	const lookupFields = [];

	if ($id.length === 1) {
		const type = $id.attr('data-nu-type');
		if (type === 'subform') {
			lookupFields.push(prefix, id, prefix + 'description');
		} else {
			lookupFields.push('nunosuchfield', id, 'nunosuchfield');
		}
	}

	return lookupFields;

}

function nuObjectComponents(i) {

	let o = [i, 'label_' + i];
	const obj = $('#' + i);
	if (obj.attr('data-nu-type') == 'lookup') o.push(i + 'code', i + 'button', i + 'description')
	if (obj.hasClass('select2-hidden-accessible')) o.push(i + '_select2');

	return o;

}

function nuEnable(i, enable) {

	if (enable === false) {
		nuDisable(i);
		return;
	}

	const ids = Array.isArray(i) ? i : [i];

	$.each(ids, function(index) {

		const id = ids[index];
		const components = nuObjectComponents(id);

		for (let c = 0; c < components.length; c++) {

			if (c === 1) {
				continue;
			} // skip label

			let $current = $('#' + components[c]);

			$current
				.removeClass('nuReadonly')
				.prop('readonly', false)
				.prop('disabled', false);

			if (c === 2) { //-- button
				$current.on("click", () => nuBuildLookup(components[c], ""));
			}

		}

	});

}

function nuDisable(i) { //-- Disable Edit Form Object

	const ids = Array.isArray(i) ? i : [i];

	$.each(ids, function(index) {
		const id = ids[index];
		const components = nuObjectComponents(id);

		for (let c = 0; c < components.length; c++) {
			if (c === 1) {
				continue;
			} // skip label

			let $current = $('#' + components[c]);
			$current
				.addClass('nuReadonly')
				.prop('readonly', true)
				.prop('disabled', true);

			if (c === 2) { //-- button
				$current.off();
			}
		}
	});

}

function nuReadonly(i) {

	const o = nuObjectComponents(i);

	o.forEach((component, index) => {
		if (index === 1) return; 		// Skip label
		$('#' + component)
			.addClass('nuReadonly')
			.attr('onclick', "return false")
			.prop('readonly', true);
	});

}

function nuShow(i, visible, openTab) {

	var arr = [];
	if (!$.isArray(i)) {
		arr.push(i);
	} else {
		arr = i;
	}

	let counter = 0;
	for (var s = 0; s < arr.length; s++) {

		if (visible === false) {
			nuHide(arr[s]);
		} else {

			var o = nuObjectComponents(arr[s]);

			for (var c = 0; c < o.length; c++) {

				var t = String($('#' + o[c]).attr('data-nu-tab'));

				if (nuIsHidden(o[c])) {
					if (t[0] == 'x') {

						$('#' + o[c])
							.attr('data-nu-tab', t.substr(1))
							.show();

					} else {

						$('#' + o[c]).show();

					}
					counter++;
				}

			}

		}

		if (openTab !== false && counter > 0) nuOpenTab($('.nuTabSelected')[0].id.substr(5));

	}

}


function nuHide(i) {

	var arr = [];
	if (!$.isArray(i)) {
		arr.push(i);
	} else {
		arr = i;
	}

	for (var s = 0; s < arr.length; s++) {
		var o = nuObjectComponents(arr[s]);

		for (var c = 0; c < o.length; c++) {

			var t = String($('#' + o[c]).attr('data-nu-tab'));

			if (t[0] == 'x') {

				$('#' + o[c])
					.hide();

			} else {

				$('#' + o[c])
					.attr('data-nu-tab', 'x' + t)
					.hide();

			}

		}
	}

}


function nuRemove(i) {

	const arr = Array.isArray(i) ? i : [i];

	for (const s of arr) {

		const o = nuObjectComponents(s);

		for (const c of o) {
			$('#' + c).remove();
		}
	}

}

function nuIsVisible(i) {
	return $('#' + i).is(':visible');
}

function nuIsHidden(i) {
	return !$('#' + i).is(':visible');
}

function nuIsEnabled(i) {
	let o = $('#' + i);
	return !o.is(':disabled') && !o.hasClass('nuReadonly');
}

function nuIsDisabled(i) {
	let o = $('#' + i);
	return o.is(':disabled') || o.hasClass('nuReadonly');
}

function nuAddThousandSpaces(s, c) {
	return s.replace(/\B(?=(\d{3})+(?!\d))/g, c)
}

function nuDuplicates(arr) {

	var s = arr.slice().sort();
	var d = [];

	for (var i = 0; i < arr.length - 1; i++) {

		if (s[i + 1] == s[i]) {
			d.push(s[i]);
		}

	}

	return d;

}

function nuResizeWindow(e) {

	if (e.target.id !== 'dialogTitleWords') return;

	const dialog = $('#nuDragDialog');
	const dialogLeft = parseInt(dialog.css('left'), 10);
	const win = $('#nuWindow');
	const dragOptionsBox = $('.nuDragOptionsBox');

	if (dialogLeft === 2) {
		const contentWin = getNuDragDialogIframes()[0].contentWindow;
		dialog.css(contentWin.nuDialogSize);
		win.css(contentWin.nuWindowSize);
	} else {

		dialog.css({
			top: 0,
			left: 2,
			width: window.innerWidth - 30,
			height: window.innerHeight
		});

		const dialogWidth = dragOptionsBox.length ? parseInt(dragOptionsBox.css('width'), 10) : 0;

		win.css({
			top: 30,
			width: parseInt(dialog.css('width'), 10) - dialogWidth - 10,
			height: parseInt(dialog.css('height'), 10) - 50
		});

	}
}

function nuGetFunctionList() {

	var f = '';

	for (var k in window) {

		if (window.hasOwnProperty(k)) {

			if (String(k).substr(0, 2) === 'nu') {
				f += k + "\n";
			}

		}

	}

	return f;

}

function nuID() {

	nuSetSuffix();

	window.nuUniqueID = 'c' + String(Date.now());

	return window.nuUniqueID + String(window.nuSuffix);

}

function nuSetSuffix(a) {

	if (arguments.length == 1) {
		window.nuSuffix = a;
	}

	if (window.nuSuffix == 9999) {
		window.nuSuffix = 0
	} else {
		window.nuSuffix++;
	}


}

function nuWhen(timestamp) {

	if (!timestamp) return;

	const secondsElapsed = Math.ceil((Date.now() / 1000) - timestamp);
	const timeUnit = secondsElapsed === 1 ? 'second' : 'seconds';
	return `${secondsElapsed} ${timeUnit} ago`;

}

function nuSpaces(s) {
	return String('&nbsp;').repeat(s);
}

function nuAddEditFieldsToHash(w) {

	var d = nuFORM.data()[0];
	var f = d.fields;
	var r = d.rows[0];

	for (let i = 2; i < f.length; i++) {
		w[f[i]] = r[i];
	}

	return w;

}

function nuOnFocus(e) {
	$('.nuTabSelected').attr('nu-data-active-element', document.activeElement.id);
}

function nuClick(e) {

	const t = $(e.target);

	if (t.parent().parent().attr('class') !== 'ctxmenu') {
		nuContextMenuClose();
	}

	if (!t.hasClass('nuOptionsItem') && ! t.hasClass('nuSearchCheckbox') && ! t.hasClass('nuOptionsList')
	&& ! $(e.target.parentElement).hasClass('nuOptionsList')) {
		$('#nuSearchList').remove();
	}

	if (!t.hasClass('nuIcon') && ! t.hasClass('nuOptionsList') && ! t.hasClass('nuOptionsListTitle')) {
		$('#nuOptionsListBox').remove();
	}

	if (e.target.id != 'nuMessageDiv' && t.attr('data-nu-option-title') != 'Help') {

		if (window.nuHideMessage) {
			$('#nuMessageDiv').remove();
		}

		window.nuHideMessage = true;

	}

	if (t.attr('type') != 'nuDate' && !t.hasClass('nuCalendar')) {
		$('#nuCalendar').remove();
	}

}

function nuAddSlashes(s) {
	return String(s).replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}


function nuOpenTab(i) {
	$('#nuTab' + i).click();
}

function nuSelectedTabNumber(parent = null) {

	const t = parent === null ? window.nuFORM.getProperty('tab_start') : window.parent.nuFORM.getProperty('tab_start');
	return t.length == 0 ? null : t[0].tabNumber;

}

function nuSelectedTabId(parent = null) {

	const n = nuSelectedTabNumber(parent);
	if (n === null) return null;
	return parent === null ? $('#nuTab' + n).attr('data-nu-tab-id') : parent.$('#nuTab' + n).attr('data-nu-tab-id');

}

function nuSelectedTab(parent = null) {

	const n = nuSelectedTabNumber(parent);
	if (n === null) return null;
	return parent === null ? $('#nuTab' + n) : parent.$('#nuTab' + n);

}

function nuSelectedTabTitle(parent = null) {

	const n = nuSelectedTabNumber(parent)
	if (n === null) return null;
	return parent === null ? $('#nuTab' + n).html() : parent.$('#nuTab' + n).html();

}

function nuSelectNextTab(i) {

	const selectedTab = $('.nuTabSelected')[0];
	const selectedTabId = selectedTab.id.substring(5);
	const nextTabId = parseInt(selectedTabId, 10) + i;
	const e = document.getElementById('nuTab' + nextTabId);
	if (e) {
		nuSelectTab(e);
	}

}

function nuHideHolders(h) {

	for (let i = 0; i < arguments.length; i++) {

		if (arguments[i] == 0) { $('#nuActionHolder').hide(); }
		if (arguments[i] == 1) { $('#nuBreadcrumbHolder').hide(); }
		if (arguments[i] == 2) { $('#nuTabHolder').hide(); }

	}

}

function nuRemoveHolders(h) {

	for (let i = 0; i < arguments.length; i++) {

		if (arguments[i] == 0) { $('#nuActionHolder').remove(); }
		if (arguments[i] == 1) { $('#nuBreadcrumbHolder').remove(); }
		if (arguments[i] == 2) { $('#nuTabHolder').remove(); }

	}

}

function nuAttachFontAwesome(i, c, s, after) {

	const size = nuDefine(s, 'medium');

	let o = '#' + i;
	if (i instanceof jQuery) {
		o = i;
	}

	const html = '<i style="font-size:' + size + '" class="' + 'fa-fw ' + c + '"></i>';
	let obj = $(o);
	if (obj.length === 0) return;

	let h = obj.html().trim();
	let nbsp = h.length == 0 ? '' : '&nbsp';

	if (after === true) {
		obj.append(nbsp + html);
	} else {
		obj.prepend(html + nbsp);
	}

}

function nuAttachHTML(i, text, after) {

	let o = '#' + i;
	if (i instanceof jQuery) {
		o = i;
	}

	if (after === true) {
		$(o).append('&nbsp;' + text);
	} else {
		$(o).prepend(text + '&nbsp;');
	}

}

function nuAttachFile(j, c) {

	if (window.nuGraphics.indexOf(c + '.png') != -1) {						//-- check filenames in graphics dir.

		$(j)
			.css('background-image', 'url("graphics/' + c + '.png')
			.css('background-repeat', 'no-repeat')
			.css('padding', '0px 0px 0px 0px')
			.css('text-align', 'left')

		return;

	}

	if (nuImages[c] !== undefined) {

		var p = JSON.parse(g);
		var b = atob(p.file);

		$(j)
			.css('background-image', 'url("' + b + '")')
			.css('background-repeat', 'no-repeat')
			.css('padding', '0px 0px 0px 0px')
			.css('text-align', 'left')

		return;

	}

}

function nuButtonIcon(j) {

	$(j).css({
		'text-align': 'left',
		'padding': '0px 0px 0px 35px',
		'background-size': '30px',
		'background-repeat': 'no-repeat'
	});

}

function nuChart(i, t, a, h, x, y, st, is) {

	let obj = document.getElementById(i);
	if (obj === null) return;

	a = eval(a);

	if (a === undefined || a === '' || a.length === 0) { return; }

	try {
		google.charts.load('current', { 'packages': ['corechart'] });
	} catch (error) {
		return;
	}

	google.charts.setOnLoadCallback(drawVisualization);

	function drawVisualization() {

		let data = google.visualization.arrayToDataTable(a);
		let wrapper = new google.visualization.ChartWrapper({

			chartType: t,
			dataTable: data,
			containerId: i,

			options: {
				title: h,
				vAxis: { title: y },
				hAxis: { title: x },
				seriesType: st,
				isStacked: is,
			}

		});

		var readyListener = google.visualization.events.addListener(wrapper, 'ready', function () {
			if (window.nuChartOnReady) {
				google.visualization.events.removeListener(readyListener);
				nuChartOnReady(i, wrapper);
			}
		});

		wrapper.draw();

		window[i + '_wrapper'] = wrapper;

	}

}

function nuEncode(s) {
	return window.btoa(unescape(encodeURIComponent(s)))
}

function nuDecode(s) {
	return decodeURIComponent(escape(window.atob(s)))
}

function nuAddRow(id, setFocus = true) {

	const o = nuSubformObject(id);
	const index = nuPad3(o.rows.length - 1) + o.fields[1];
	$(`#${id}${index}`).change();

	if (setFocus) {
		const newIndex = nuPad3(o.rows.length) + o.fields[1];
		const $newInput = $(`#${id}${newIndex}`);
		$newInput.focus();
	}

}

function nuAccessLevelGroup() {
	return nuSERVERRESPONSE.access_level_group;
}

function nuAccessLevelCode() {
	return nuSERVERRESPONSE.access_level_code;
}

function nuAccessLevelId() {
	return nuSERVERRESPONSE.access_level_id;
}

function nuUserName() {
	return nuSERVERRESPONSE.user_name;
}

function nuUserPosition() {
	return nuSERVERRESPONSE.user_position;
}

function nuUserDepartment() {
	return nuSERVERRESPONSE.user_department;
}

function nuUserA11Y() {
	return nuSERVERRESPONSE.user_a11y;
}

function nuUserTeam() {
	return nuSERVERRESPONSE.user_team;
}

function nuUserCode() {
	return nuSERVERRESPONSE.user_code;
}
function nuUserAdditional1() {
	return nuSERVERRESPONSE.user_additional1;
}

function nuUserAdditional2() {
	return nuSERVERRESPONSE.user_additional2;
}

function nuUserId() {
	return nuSERVERRESPONSE.user_id;
}

function nuUserLogin() {
	return nuSERVERRESPONSE.login_name;
}

function nuUserLanguage() {
	const l = nuSERVERRESPONSE.language;
	return l === null ? '' : l;
}

function nuDatabase() {
	return nuSERVERRESPONSE.database;
}

function nuClosePopup() {

	parent.$('#nuModal').remove();
	parent.$('#nuDragDialog').remove();

}

function nuStopClick(e) {

	if (window.nuCLICKER != '' && ((nuIsMacintosh() ? e.metaKey : e.ctrlKey) == false)) {
		$(e.target).prop('onclick', null).off('click');
	}
}

function nuIsSaved() {

	return window.nuSAVED;
}

function nuAscendingSortColumn(a, b) {

	if (a.value < b.value) { return -1; }
	if (a.value > b.value) { return 1; }

	return 0;

}

function nuDecendingSortColumn(b, a) {

	if (a.value < b.value) { return -1; }
	if (a.value > b.value) { return 1; }

	return 0;

}

function nuAscendingSortNumberColumn(a, b) {

	if (Number(a.value) < Number(b.value)) { return -1; }
	if (Number(a.value) > Number(b.value)) { return 1; }

	return 0;

}

function nuDecendingSortNumberColumn(b, a) {

	if (Number(a.value) < Number(b.value)) { return -1; }
	if (Number(a.value) > Number(b.value)) { return 1; }

	return 0;

}

function nuEmbedObject(f, d, w, h) {

	if (f == '') { return; }

	w = nuDefine(w, 300);
	h = nuDefine(h, 300);

	const obj = JSON.parse(f);
	const type = obj.type;
	const url = atob(obj.file);

	var el = document.createElement("EMBED");
	el.setAttribute("type", type);
	el.setAttribute("src", url);

	if (w !== -1) el.setAttribute("width", w + "px");
	if (h !== -1) el.setAttribute("height", h + "px");

	$('#' + d).html('');
	document.getElementById(d).appendChild(el);

}

function nuVendorLogin(appId) {
	window.open("core/nuvendorlogin.php?sessid=" + window.nuSESSION + "&appId=" + appId + "&table=" + nuSERVERRESPONSE.table);
}

function nuIsMobile() {
	return navigator.userAgent.toLowerCase().split('mobile').length > 1;
}

function nuIsMacintosh() {
	return /mac/i.test(navigator.userAgentData ? navigator.userAgentData.platform : navigator.platform);
}

function nuTransformScale() {

	if ($('body').css('transform') == 'none') {
		return 1;
	}

	return Number($('body').css('transform').split('(')[1].split(',')[0]);

}

function nuStopBrowserResize() {

	if (nuFormType() == 'browse') {
		nuFORM.breadcrumbs[nuFORM.breadcrumbs.length - 1].refreshed = 1;
	}

}

function nuDisableBrowseResize() {

	if (nuFormType() == 'browse') {
		$("div[id^='nuBrowseTitle']")
			.off('mousedown.nuresizecolumn')
			.off('touchstart.nuresizecolumn')
			.off('touchmove.nuresizecolumn')
			.off('touchstart.nuresizecolumn');
	}

}

function nuDragTitleEvents() {

	if (nuFormType() != 'browse') { 
	return; 
	}
    
	let colWidths = nuFORM.getCurrent().column_widths || nuGetColumWidths();

	nuSetBrowseColumns(colWidths);

	$('#nubody').on('mousemove.nuresizecolumn', function (event) { nuDragBrowseColumn(event, 'pointer'); });
	$browseTitle = $('.nuBrowseTitle');
 
	$('#nubody').on('mouseup.nuresizecolumn', function (event) { nuEndBrowseResize(); });
	$browseTitle.on('mousedown.nuresizecolumn', function (event) { nuDownBrowseResize(event, 'pointer') });
	$browseTitle.on('touchstart.nuresizecolumn', function (event) { nuDownBrowseResize(event, 'finger_touch'); });
	$browseTitle.on('touchmove.nuresizecolumn', function (event) { nuDragBrowseColumn(event, 'finger_touch'); });
	$browseTitle.on('touchend.nuresizecolumn', function (event) { nuEndBrowseResize(event); });
	$browseTitle.on('touchcancel.nuresizecolumn', function (event) { nuEndBrowseResize(event); });

}


function nuRemovePX(s) {
	return Number(String(s).split('px')[0]);
}

function nuImportUsersFromCSV(file, delimiter) {

	file = nuDefine(file, 'user_import.csv');

	nuSetProperty('NUIMPORTUSERS_file', file);
	nuSetProperty('NUIMPORTUSERS_delimiter', delimiter);

	nuRunPHP('NUIMPORTUSERS', '', 0);

}

function nuIsIframe() {

	return parent.window.nuDocumentID != window.nuDocumentID && parent.window.nuDocumentID !== undefined;

}

// After clicking a button (Save, Delete, Print, Clone etc.), disable it for 1.3 secs to prevent a user from double-clicking it.

function nuPreventButtonDblClick() {

	$('.nuActionButton, .nuButton, #nuLogout').not(".nuAllowDblClick").click(function () {
		const button = $(this);
		if (button.hasClass('nuReadonly') || button.hasClass('nuAllowDblClick')) {
			return;
		}

		const id = button.attr("id");
		nuDisable(id);

		setTimeout(function () {
			nuEnable(id);
		}, 1300);
	});

}

function nuAddBackButton() {

	var b = $('.nuBreadcrumb').length;
	if (b > 0) {
		nuAddActionButton('BackBtn', nuTranslate('Back'), 'if (!nuFORM.edited) { nuDisable(this.id) }; nuOpenPreviousBreadcrumb();');
	}

}

function nuEnableBrowserBackButton() {

	window.history.pushState({ page: 1 }, "", "");
	window.onpopstate = function (event) {
		if (event) {
			nuOpenPreviousBreadcrumb();
		}
	}

}

function nuSetBrowserTabTitle(prefix) {

	var t = window.nuFORM.getProperty('title');
	if (t === '') {
		t = "Properties";
	}
	prefix = prefix === '' ? '' : prefix + ' - ';
	document.title = prefix + t;

}

function nuSetPlaceholder(i, placeholder = null, translate = true) {

	const $i = $('#' + i);

	if (!placeholder) {
		placeholder = $i.attr('data-nu-format').substring(2);
	}

	if (translate) {
		placeholder = nuTranslate(placeholder);
	}

	$i.attr('placeholder', placeholder);

}

function nuSetToolTip(i, message, labelHover) {

	// Show tooltip on object hover
	$("#" + i).hover(function () {
		$(this).attr("title", message);
	});

	if (labelHover === true) {
		// Show tooltip on label hover
		$("#label_" + i).hover(function () {
			$(this).attr("title", message);
		});
	}
}

function nuAddDatalist(i, arr, showAllOnArrowClick) {

	if (!$.isArray(arr)) {
		console.error('Argument #2 is not an array in nuAddDatalist() for object ' + i);
		return;
	}

	var id = i + "_datalist";
	var datalist = document.getElementById(id);

	if (!datalist) {
		datalist = document.createElement('datalist');
		datalist.id = id;
		document.body.appendChild(datalist);
		if (showAllOnArrowClick !== false) nuDatalistShowAllOnArrowClick(i);
	} else {
		datalist.innerHTML = '';
	}

	arr.forEach(function (data) {

		var option = document.createElement('option');
		option.value = $.isArray(data) ? data[0] : data;
		if (data.length == 2) option.text = $.isArray(data) ? data[1] : data;
		datalist.appendChild(option);
	});

	$('#' + i).attr('list', datalist.id).attr('autocomplete', 'off');

}

function nuLabelOnTop(include, exclude, offsetTop = -18, offsetLeft = 0) {

	include = include || nuSERVERRESPONSE.objects.map(obj => obj.id);
	exclude = exclude || [];

	for (let i = 0; i < include.length; i++) {

		if (jQuery.inArray(include[i], exclude) == -1) {
			$element = $('#' + include[i]);
			$('#' + 'label_' + include[i]).css({
				'top': $element.cssNumber('top') + offsetTop
				, 'left': $element.cssNumber('left') + offsetLeft
				, 'text-align': 'left'
			});

		$element.attr('data-nu-label-position', 'top');

		}
	}

}

jQuery.fn.nuLabelOnTop = function (offsetTop = -18, offsetLeft = 0) {

	return this.each(function () {

		$element = $(this);
		$('#' + 'label_' + this.id).css({
			'top': $element.cssNumber("top") + offsetTop
			, 'left': $element.cssNumber("left") + offsetLeft
			, 'text-align': 'left'
		});

		$element.attr('data-nu-label-position', 'top');

	});

};

jQuery.fn.cssNumber = function (prop) {

	var v = parseInt(this.css(prop), 10);
	return isNaN(v) ? 0 : v;

};

function nuEnableDisableAllObjects(v, excludeTypes, excludeIds) {

	excludeTypes = nuDefine(excludeTypes, []);
	excludeIds = nuDefine(excludeIds, []);

	const r = JSON.parse(JSON.stringify(nuSERVERRESPONSE));
	for (let i = 0; i < r.objects.length; i++) {
		const obj = r.objects[i];

		if ($.inArray(obj.type, excludeTypes) == -1 && $.inArray(obj.id, excludeIds) == -1 && obj.type !== 'contentbox') {
			nuEnable(obj.id, v);
		}
	}

}

function nuEnableAllObjects(excludeTypes, excludeIds) {

	nuEnableDisableAllObjects(true, excludeTypes, excludeIds);

}

function nuDisableAllObjects(excludeTypes, excludeIds) {

	nuEnableDisableAllObjects(false, excludeTypes, excludeIds);

}

function nuInsertTextAtCaret(i, text) {

	var o = $('#' + i);

	const textarea = o[0];

	textarea.setRangeText(
		text,
		textarea.selectionStart,
		textarea.selectionEnd,
		'end'
	);

	o.change();

}

function nuObjectIdFromId(i) {

	if (i !== null) {

		var f = window.nuSERVERRESPONSE;
		var objId;
		for (var o = 0; o < f.objects.length; o++) {
			if (f.objects[o].id == i) {
				objId = f.objects[o].object_id;
				return objId;
			}
		}
	}

	return null;
}

/*
* Set the column size of a Browse Screen
*
* @param	{int}	column	- Column number (first column = 0, second column = 1 etc.)
* @param	{int}	size		- Size in pixels
*/
function nuSetBrowseColumnSize(column, size) {

	var cw = this;
	if (nuIsIframe()) {
		cw = parent.$("#" + window.frameElement.id)[0].contentWindow;
	}
	cw.nuFORM.breadcrumbs[cw.nuFORM.breadcrumbs.length - 1].column_widths[column] = size;
	cw.nuSetBrowseColumns(cw.nuFORM.breadcrumbs[cw.nuFORM.breadcrumbs.length - 1].column_widths)

}

function nuCreateAppendHTML(htmlStr) {

	var df = document.createDocumentFragment()
		, temp = document.createElement('div');
	temp.innerHTML = htmlStr;
	while (temp.firstChild) {
		df.appendChild(temp.firstChild);
	}
	return df;
}

function nuSelectMultiWithoutCtrl(i, active) {

	var id = i === undefined || i === null ? 'select' : '#' + i;

	if (active == false) {
		$(id + "[multiple] option").off('mousedown.selectmultinoctrl');
		return;
	}

	$(id + "[multiple] option").on('mousedown.selectmultinoctrl', function (event) {
		if (event.shiftKey) return;
		event.preventDefault();
		this.focus();
		var scroll = this.scrollTop;
		event.target.selected = !event.target.selected;
		this.scrollTop = scroll;
		$(this).parent().change();
	});

}

function nuSelectRemoveEmpty(elementId, setIndex) { 

	const selector = elementId === undefined ? 'select' : `#${elementId}`;

	 
	$(`${selector}    option`).each(function() {  
		if ($(this).val().trim() === "" && $(this).text().trim() === "") {   
			$(this).remove();  
		} 
	});

	if (setIndex !== undefined) $(`#${elementId}`).prop('selectedIndex', setIndex);

}

function nuSelectRemoveOption(id, value) {

	const $select = typeof id === 'object' ? id : $('#' + id);
	const $option = $select.find(`[value="${value}"]`);
	$option.remove();

	return $select;

}

function nuSelectRemoveMultiple(i) {

	var id = i === undefined || i === null ? 'select' : '#' + i;
	$(id + "[multiple]").removeAttr('multiple').attr('size', '5');

}

function nuSelectSelectAll(id, value) {

	if (value === undefined) var value = true;

	$("#" + id).find('option:not(:empty)').prop('selected', value);
	$("#" + id).change();

}

function nuSelectSelectedValueArray(id) {

	var a = [];
	$('#' + id + ' option:selected').each(function (index) {
		if ($(this).val() !== '') {
			a.push($(this).val())
		}
	});

	return a;

}

function nuSelectSelectedTextArray(id) {

	var a = [];
	$('#' + id + ' option:selected').each(function (index) {
		if ($(this).val() !== '') {
			a.push($(this).text())
		}
	});

	return a;

}

function nuPasteText(i) {

	navigator.clipboard.readText()
		.then(text => {
			$('#' + i).val(text);
		});

}

function nuCopyText(i) {
	return nuCopyToClipboard($('#' + i).val());
}

function nuCopyToClipboard(s) {

	navigator.clipboard.writeText(s).then(function () {
		return true;
	}, function () {
		return false;
	});

}

function nuCursor(c) {

	document.documentElement.style.cursor = c;
	parent.document.documentElement.style.cursor = c;

}

/*	*** Based on highlight v5: Highlights arbitrary terms.
	*** Renamed to nuHighlight using the className nuBrowseSearch
	*** <http://johannburkard.de/blog/programming/javascript/highlight-javascript-text-higlighting-jquery-plugin.html>
	*** MIT license.
	*** Johann Burkard <http://johannburkard.de> / <mailto:jb@eaio.com>
*/

jQuery.fn.nuHighlight = function (pat) {
	function innerHighlight(node, pat) {
		var skip = 0;
		if (node.nodeType == 3) {
			var pos = node.data.toUpperCase().indexOf(pat);
			pos -= (node.data.substr(0, pos).toUpperCase().length - node.data.substr(0, pos).length);
			if (pos >= 0) {
				let spannode = document.createElement('span');
				spannode.className = 'nuBrowseSearch';
				let middlebit = node.splitText(pos);
				const middleclone = middlebit.cloneNode(true);
				spannode.appendChild(middleclone);
				middlebit.parentNode.replaceChild(spannode, middlebit);
			//	spannode.setAttribute("onclick", "nuSelectBrowse(event, this.parentElement)");
				skip = 1;
			}
		} else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
			for (var i = 0; i < node.childNodes.length; ++i) {
				i += innerHighlight(node.childNodes[i], pat);
			}
		}
		return skip;
	}
	return this.length && pat && pat.length ? this.each(function () {
		innerHighlight(this, pat.toUpperCase());
	}) : this;
};

function nuInputMaxLength(id, maxLength, labelId) {

	const $input = $('#' + id);
	$input.attr('maxlength', maxLength);

	if (labelId) {
		const $label = $('#' + labelId);
		$label.html(`${maxLength}/${maxLength}`);
		$input.on('input', function() {
			const textLen = maxLength - this.value.length;
			$label.html(`${textLen}/${maxLength}`);
		});
	}

}

function nuDebugMode() {
	return nuUXOptions["nuDebugMode"];
}

function nuDebugOut(obj, i) {

	if (nuDebugMode() && obj.length == 0) {
		console.warn(nuTranslate('Object does not exist:'), i);
		return true;
	}

	return false;

}

function nuGetValue(i, method) {

	var obj = $('#' + i);
	if (i === undefined || nuDebugOut(obj, i)) return null;

	if (obj.is(':checkbox')) return obj.is(":checked");
	if (obj.is('select') && method === 'text') return $("#" + i + " option:selected").text().fixNbsp();
	if (method === undefined && obj.is(':button')) return obj.text();

	switch (method) {
		case 'html':
			return obj.html();
		case 'val':
			return obj.val();
		case 'text':
			return obj.text();
		default:
			return obj.val();
	}

}

function nuGetText(i, method) {
	return nuGetValue(i, 'text');
}

function nuSetValue(i, v, method, change) {

	var obj = $('#' + i);

	if (i === undefined || nuDebugOut(obj, i)) return false;

	change = (change || change === undefined);

	if (method === undefined && obj.is(':button')) {
		obj.text(v);
	} else if (obj.is(':checkbox')) {
		if (change) obj.prop('checked', v).change();
	} else if (obj.is('select') && method === 'text') {
		$('#' + i + ' option').each(function () {
			if ($(this).text().fixNbsp() === v) {
				$(this).prop("selected", "selected");
				if (change) obj.change();
				return true;
			}
		});

	} else {

		switch (method) {
			case 'html':
				obj.html(v);
				break;
			case 'text':
				obj.text(v);
				break;
			default:
				obj.val(v);
				if (change) obj.change();
		}
	}

	return true;

}

function nuSetText(i, v) {
	return nuSetValue(i, v, 'text');
}

function nuCurrentDate(format) {

	let d = new Date();
	let
		yyyy = d.getFullYear(),
		mm = nuPad2(d.getMonth() + 1),
		dd = nuPad2(d.getDate());

	let df = yyyy + '-' + mm + '-' + dd;
	if (format !== undefined) {
		df = nuFORM.addFormatting(df, 'D|' + format);
	}

	return df;

};

function nuCurrentDateTime(format) {

	let d = new Date();
	let
		yyyy = d.getFullYear(),
		mm = nuPad2(d.getMonth() + 1),
		dd = nuPad2(d.getDate()),
		hh = nuPad2(d.getHours()),
		nn = nuPad2(d.getMinutes()),
		ss = nuPad2(d.getSeconds());

	let df = yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + nn + ':' + ss;
	if (format !== undefined) {
		df = nuFORM.addFormatting(df, 'D|' + format);
	}

	return df;

};

function nuSetDateValue(i, d) {

	var obj = $('#' + i);

	if (i === undefined || nuDebugOut(obj, i)) return false;

	if (d === undefined) {
		var d = new Date();
	}

	var df = d.getFullYear() + '-' + nuPad2(d.getMonth() + 1) + '-' + nuPad2(d.getDate());

	var format = obj.attr('data-nu-format');
	obj.val(nuFORM.addFormatting(df, format)).change();

	return true;

}

function nuArrayIsUnique(arr) {
	return arr.length === new Set(arr).size;
}

function nuArrayColumn(arr, n) {
	return arr.map(x => x[n]);
}

function nuBase64decode(str) {

	const text = atob(str);
	const length = text.length;
	const bytes = new Uint8Array(length);

	for (let i = 0; i < length; i++) {
		bytes[i] = text.charCodeAt(i);
	}

	const decoder = new TextDecoder(); // default is utf-8
	return decoder.decode(bytes);

}

function nuBase64encode(str) {

	let encode = encodeURIComponent(str).replace(/%([a-f0-9]{2})/gi, (m, $1) => String.fromCharCode(parseInt($1, 10)))
	return btoa(encode);

}

function nuOpenWiki(page) {
	window.open('https://wiki.nubuilder.cloud/index.php' + page);
}

function nuSetLabelText(i, str, translate) {

	if (translate === true) { str = nuTranslate(str); }

	let label = $('#label_' + i);
	let lwidth = nuGetWordWidth(str);

	let obj = $('#' + i);
	let left = obj.cssNumber('left');
	let top = obj.cssNumber('top');

	label.css({
		'top': Number(top),
		'left': Number(left) - lwidth - 17,
		'width': Number(lwidth + 12)
	}).html(str);

	if (obj.attr('data-nu-label-position') == 'top') {
		obj.nuLabelOnTop();
	}

}

function nuRunBackup() {

	if (! nuGlobalAccess()) return;

	const c = confirm(nuTranslate("Perform the Backup now?"));
	if (c === true) {
		nuMessage(nuTranslate("Backup is running") + "...");
		nuRunPHPHidden("NUBACKUP", 0);
	}

}

function nuAddCSSStyle(styleString, id) {

	let i = id === undefined ? 'nucssstyle' : id;
	$('#' + i).remove();

	let regex = /( |<([^>]+)>)/ig;
	styleString = styleString.replace(regex, "");

	if (styleString.trim() === '') return;

	let css = document.createElement('style');
	css.id = i;
	css.appendChild(document.createTextNode(styleString));
	document.getElementsByTagName("head")[0].appendChild(css);

}

function nuObjectClassList(i) {

	let c = $('#' + i).attr('class');
	return c === undefined ? '' : c.split(/\s+/).join(' ');

}

function nuGetStorageItem(key, storage) {

	var storage = storage === undefined || storage === 'session' ? window.sessionStorage : window.localStorage;

	const itemStr = storage.getItem(key)

	if (!itemStr) {
		return null
	}

	const item = JSON.parse(itemStr)
	const now = new Date()

	if (now.getTime() > item.expiry && item.expiry !== null) {
		storage.removeItem(key)
		return null
	}
	return item.value;

}

function nuSetStorageItem(key, value, storage, ttl) {

	var storage = storage === undefined || storage === 'session' ? window.sessionStorage : window.localStorage;

	const now = new Date()
	const item = {
		value: value,
		expiry: ttl === undefined ? null : now.getTime() + ttl * 1000,
	}
	storage.setItem(key, JSON.stringify(item));

}

function nuCtrlCmdShiftName(keyName) {

	if (keyName === '') return '';
	const modifier = nuIsMacintosh() ? 'Cmd' : 'Ctrl';
	return modifier + '+Shift+' + keyName;

}

function nuDateIsValid(date) {

	return (
		Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date)
	);

}

function nuEscapeHTML(string) {

	if (typeof string !== 'string') return '';

	let replacements= {"<": "&lt;", ">": "&gt;","&": "&amp;", '"': "&quot;","'": "&#039;"};
	return string.replace(/[<>&"]/g, function(character) {
		return replacements[character];
	});

}

function nuDelay(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function nuInsertAtCaret(id, string) {

	const txt = $('#' + id);
	const caretPos = txt[0].selectionStart;
	const value = txt.val();

	txt.val(value.substring(0, caretPos) + string + value.substring(caretPos));
	txt.focus();

	const endOfText = caretPos + string.length;
	txt.prop('selectionStart', endOfText);
	txt.prop('selectionEnd', endOfText);

}
