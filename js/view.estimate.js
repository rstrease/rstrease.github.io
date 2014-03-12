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

		$("#submit").validate({
			submitHandler: function(form) {

				$.ajax({
					type: "POST",
					url: "php/estimate-form.php",
					data: {
						"first_name": $("#submit #first_name").val(),
						"last_name": $("#submit #last_name").val(),
						"email": $("#submit #email").val(),
						"phone": $("#submit #phone").val(),
						"address": $("#submit #address").val(),
						"city": $("#submit #city").val(),
						"state": $("#submit #state").val(),
						"zipcode": $("#submit #zipcode").val(),
						"company": $("#submit #company").val(),
						"agent": $("#submit #agent").val(),
						"message": $("#submit #message").val()
					},
					dataType: "json",
					success: function (data) {
						if (data.response == "success") {

							$("#contactSuccess").removeClass("hidden");
							$("#contactError").addClass("hidden");

							$("#submit #first_name, #submit #email, #submit #phone, #submit #address, #submit #city, #submit #state, #submit #zipcode, #submit #company, #submit #agent, #submit #message")
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
				first_name: {
					required: true
				},
				last_name: {
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
    			address: {
					required: true
    			},
    			city: {
					required: true
    			},
    			state: {
					required: true,
					minlength: 2,
					maxlength: 2
    			},
    			zipcode: {
					required: true,
					number: true,
					maxlength: 5,
					minlength: 5
    			},
    			company: {
					required: true
    			},
    			agent: {
					required: true
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
