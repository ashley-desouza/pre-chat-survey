$(function () {
	// Function to add and remove classes to DOM elements.
	function replaceClass (fieldName, removeClass, addClass) {
		if (typeof fieldName !== 'undefined') {
			if (typeof removeClass !== 'undefined') {
				if (Array.isArray(removeClass)) {
					removeClass.forEach(function (item) {
						fieldName.removeClass(item);
					})
				} else {
					fieldName.removeClass(removeClass);
				}
			}
			if (typeof addClass !== 'undefined') {
				if (Array.isArray(addClass)) {
					addClass.forEach(function (item) {
						fieldName.addClass(item);
					})
				} else {
					fieldName.addClass(addClass);
				}
			}	
		}
	}

	// Check if the 'Billing and Payments' button is clicked.
	// If it is clicked, then replace the 'Routing Guide' with the 'Pre Chat Survey'
	$('#iconBilling').on('click', function () {
		var routingGuide = $('#routingGuide'),
			preChatSurvey = $('#preChatSurvey');
		
		if(routingGuide.hasClass('hideClass')) { 
			routingGuide.removeClass('hideClass');
			preChatSurvey.addClass('hideClass');
		} else { 
			preChatSurvey.removeClass('hideClass');
			routingGuide.addClass('hideClass');
		}
	});
	
	// Input field is in focus as well as out of focus. Add appropriate background colors.
	$('input[type=text]').on('focus', function () {
		$(this).addClass('colorFill');
	}).on('blur', function () {
		$(this).removeClass('colorFill');
	});
	
	// Check if 'California' is selected from the 'States' dropdown.
	// If this is the case, then add the additional dropdown which asks the user if the phone was purchased in California.
	$("#states" ).on('change', function () {
		var phonePurchaseLoc = $('#phonePurchaseLoc');
		// If 'California' is selected as the State.
		if ($(this).val() === 'california') {
			$(this).addClass('colorFill');
			// Add the additional dropdown
			phonePurchaseLoc.removeClass('hideClass');
		} else {
			// If 'California' is not the state.
			if ($(this).hasClass('colorFill')) {
				$(this).removeClass('colorFill');
				// Remove the additional dropdown
				phonePurchaseLoc.addClass('hideClass');
			}
		}
	} );
	
	// Form Submit
	// Not relying on the default HTML5 form validation such as 'required' attribute in order to have greater control over custom messages and styles
	$('#chatForm').on('submit', function (event) {
		// NOTE: Not able to use the alert icon in the validation styling as it is not available in the assets provided.
		event.preventDefault();
		
		// Capture the main div elements
		var mainContent = $('#mainContent'),
			preChatSurvey = $('#preChatSurvey'),
			preChatSurveyComplete = $('#preChatSurveyComplete');
		
		// Capture the required fields - Full Name and Mobile Phone Number
		var fullName = $('#fullName'),
			fullNameValue = fullName.val(), // Value from the Full Name field
			fullNameRequired = $('#fullNameRequired'), // span element
			
			mobilePhoneNumber = $('#mobilePhoneNumber'),
			mobilePhoneNumberValue = mobilePhoneNumber.val(),  // Value from the Mobile Phone Number field
			mobileNumberRequired = $('#mobileNumberRequired'), // span element
			pattern = /(\d{3}-\d{3}-\d{4})/; // Match this pattern for a valid Mobile Phone Number
		
		// Check if Full Name field is empty
		if(fullNameValue.trim() === '') {
			// Add and remove appropriate classes
			replaceClass(fullName, 'elementStyling', 'requiredFieldBorder');
			replaceClass(fullNameRequired, 'hideClass', 'requiredField');
			return false; // Stop Execution
		} else {
			// Add and remove appropriate classes
			if(fullName.hasClass('requiredFieldBorder')) {
				replaceClass(fullName, 'requiredFieldBorder', 'elementStyling');
			}
			if (!fullNameRequired.hasClass('hideClass')) {
				replaceClass(fullNameRequired, 'requiredField', 'hideClass');			
			}
		}
		
		// Check if Mobile Phone Number field is empty
		if(mobilePhoneNumberValue.trim() === '') {
			// Add and remove appropriate classes
			replaceClass(mobilePhoneNumber, 'elementStyling', ['requiredFieldBorder', 'requiredFieldBackgroundColor']);
			mobileNumberRequired.text('Mobile Number is a required field');
			replaceClass(mobileNumberRequired, 'hideClass', 'requiredField');
			return false; // Stop Execution
			// Check if Mobile Phone Number field is a valid phone number by matching against the valid phone number pattern
		} else if(!mobilePhoneNumberValue.match(pattern)) {
			// Add and remove appropriate classes
			replaceClass(mobilePhoneNumber, 'elementStyling', ['requiredFieldBorder', 'requiredFieldBackgroundColor']);
			mobileNumberRequired.text('Please enter a valid phone number');
			replaceClass(mobileNumberRequired, 'hideClass', 'requiredField');
			return false; // Stop Execution		
		} else {
			// Add and remove appropriate classes
			if(mobilePhoneNumber.hasClass('requiredFieldBorder')) {
				replaceClass(mobilePhoneNumber, 'requiredFieldBorder', 'elementStyling');
			}
			if(mobilePhoneNumber.hasClass('requiredFieldBackgroundColor')) {
				replaceClass(mobilePhoneNumber, 'requiredFieldBackgroundColor', 'elementStyling');
			}			
			if (!mobileNumberRequired.hasClass('hideClass')) {
				replaceClass(mobileNumberRequired, 'requiredField', 'hideClass');			
			}		
		}
		
		// If all validation tests pass, redirect to the Chat Agent.
		mainContent.addClass('hideClass');
		preChatSurvey.addClass('hideClass');
		preChatSurveyComplete.removeClass('hideClass');
	});
	
});