$(document).ready(function() {

	new WOW().init();

	$(".burger, .overlay, .menu__list a").on("click", menu);

	setTimeout(function() {
		$(".menu, .main").addClass("-green");
	}, 2100);

	setTimeout(function() {
		$(".main__title").addClass("-green");
	}, 2500);

	$('#fullpage').fullpage({
		anchors:['slide1', 'slide2'],
		scrollBar: true,
		responsiveWidth: 620,
		afterLoad: function(section, origin, destination, direction){
			if (section === "slide2") {
				$(".burger").addClass("section-2");
			}
			else {
				$(".burger").removeClass("section-2");
			}		
		}		
	});

	noUiSlider.create($("#love")[0], {
		start: [0, 50],
		connect: true,
		tooltips: [false, true],
		range: {
			'min': 0,
			'max': 100
		}
	});	

	$("#love")[0].noUiSlider.on('update', function (values, handle) {
		let tooltip = $("#love").find(".noUi-tooltip"),
			input = $("#love").find("input.value"),
			value = Math.round($(tooltip).text());
		if (value < 5) {
			$(tooltip).css("left", "140%");
		}
		else if(value > 95) {
			$(tooltip).css("left", "-65%");
		}
		else {
			$(tooltip).css("left", "50%");
		}
		$(tooltip).html("на все " + value + "%");
		$(input).val(value);
	});

	noUiSlider.create($("#time")[0], {
		start: [2, 30],
		connect: true,
		margin: 5,
		range: {
			'min': 2,
			'max': 70
		}
	});	

	$("#time")[0].noUiSlider.on('update', function (values, handle) {
		let connect = $("#time").find(".noUi-connect"),
			value = $("#time").find(".noUi-handle-lower").attr("aria-valuenow"),
			leftPostion = 0,
			width = $(connect).width() * getScaleX(connect[0]),
			minMaxValues = values[handle],
			minValue, maxValue,
			inputMin = 	$("#time").find("input.min-value"),
			inputMax = $("#time").find("input.max-value");
		if (value > 2) {
			leftPostion = value / 68 * 100;
			$(".input__title").css("left", "calc(" + leftPostion + "% - 10px)");			
		}
		else {
			if (width <= 20) {
				$(".input__title").css("left", "0%");
			}
			else {
				$(".input__title").css("left", "8px");
			}			
		}
		if (handle) {
			maxValue = Math.round(minMaxValues);
			$(".input__title").find(".max").html(maxValue);
			$(inputMax).val(maxValue);
		} 
		else {
			minValue = Math.round(minMaxValues);
			$(".input__title").find(".min").html(minValue);
			$(inputMin).val(minValue);
		}
		$(".input__title").css("width", width + "px");
	});	

	$.mask.definitions['h'] = "[9]"
	$(".form__phone").mask("+7 (h99) 999-99-99");

	$(".form").validate({
		rules: {
			name: "required",
			phone: {
				matches: "[0-9]+",
				required: true,
				minlength: 10
			}
		},		
		errorClass: "-error",
		errorPlacement: function(error,element) {
			return true;
		},
		submitHandler: function(form, event) {
			event.preventDefault();
			$(".form").html("<h2 class='form__success'>Ваша заявка успешно отправлена</h2>");
		}
	});

});

$(document).on("mousemove", function(event) {
	$(".parallax").each(function() {
		const speed = $(this).attr("data-speed");

		const x = (window.innerWidth - event.pageX * speed) / 100;
		const y = (window.innerHeight - event.pageY * speed) / 100;

		$(this).css("transform", "translate(" + x + "px," + y + "px)");
	});
});

function getScaleX(element) {
  var style = window.getComputedStyle(element);
  var matrix = new WebKitCSSMatrix(style.transform);
  return matrix.a;
}

const menu = () => {
	if($(".burger").hasClass("-active")) {
		$(".burger").removeClass("-active");
		$(".menu__inside").removeClass("-active");
		$(".overlay").removeClass("-active");
		setTimeout(function() {
			$(".overlay").fadeOut(0);
			$(".overlay").css("z-index", "-1");
		}, 300);
	}
	else {
		$(".burger").addClass("-active");
		$(".overlay").css("z-index", "3");
		$(".overlay").fadeIn(0);
		$(".overlay").addClass("-active");
		setTimeout(function() {
			$(".menu__inside").addClass("-active");
		}, 300);			
	}
}

jQuery.validator.methods.matches = function( value, element, params ) {
	var re = new RegExp(params);
	return this.optional( element ) || re.test( value );
}