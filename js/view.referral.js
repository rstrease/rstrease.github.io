var Contact = {

	initialized: false,

	initialize: function() {

		if (this.initialized) return;
		this.initialized = true;

		this.build();
		this.events();

	},

	build: function() {

		this.validations();

	},

	events: function() {

		

	},

	validations: function() {

		$("#referralForm").validate({
			submitHandler: function(form) {

				$.ajax({
					type: "POST",
					url: "php/referral-form.php",
					data: {
						"name": $("#referralForm #name").val(),
						"email": $("#referralForm #email").val(),
						"phone": $("#referralForm #phone").val(),
						"ref_name": $("#referralForm #ref_name").val(),
						"ref_email": $("#referralForm #ref_email").val(),
						"ref_phone": $("#referralForm #ref_phone").val(),

					},
					dataType: "json",
					success: function (data) {
						if (data.response == "success") {

							$("#contactSuccess").removeClass("hidden");
							$("#contactError").addClass("hidden");

							$("#referralForm #name, #referralForm #email, #referralForm #phone, #referralForm #ref_name, #referralForm #ref_email, #referralForm #ref_phone")
								.val("")
								.blur()
								.closest(".control-group")
								.removeClass("success")
								.removeClass("error");

							if(($("#contactSuccess").position().top - 80) < $(window).scrollTop()){
								$("html, body").animate({
									 scrollTop: $("#contactSuccess").offset().top - 80
								}, 300);								
							}
							
						} else {

							$("#contactError").removeClass("hidden");
							$("#contactSuccess").addClass("hidden");

							if(($("#contactError").position().top - 80) < $(window).scrollTop()){
								$("html, body").animate({
									 scrollTop: $("#contactError").offset().top - 80
								}, 300);								
							}

						}
					}

				});
			},
			rules: {
				name: {
					required: true
				},
				email: {
					required: true,
					email: true
				},
				phone: {
      				required: true,
      				phoneUS: true
    			},
    			ref_name: {
    				required: true
    			},
    			ref_email: {
    				required: true,
    				email: true
    			},
    			ref_phone: {
    					required: true,
    					phoneUS: true
    			}
			},
			
			highlight: function (element) {
				$(element)
					.closest(".control-group")
					.removeClass("success")
					.addClass("error");
			},
			success: function (element) {
				$(element)
					.closest(".control-group")
					.removeClass("error")
					.addClass("success");
			}
		});

	}

};

Contact.initialize();
