(function($) {

	"use strict";

	$(window).stellar({
    responsive: true,
    parallaxBackgrounds: true,
    parallaxElements: true,
    horizontalScrolling: false,
    hideDistantElements: false,
    scrollProperty: 'scroll'
  });


	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	// loader
	var loader = function() {
		setTimeout(function() { 
			if($('#ftco-loader').length > 0) {
				$('#ftco-loader').removeClass('show');
			}
		}, 1);
	};
	loader();

	var carousel = function() {
		$('.carousel-testimony').owlCarousel({
			center: true,
			loop: true,
			autoplay: true,
			autoplaySpeed:2000,
			items:1,
			margin: 30,
			stagePadding: 0,
			nav: false,
			navText: ['<span class="ion-ios-arrow-back">', '<span class="ion-ios-arrow-forward">'],
			responsive:{
				0:{
					items: 1
				},
				600:{
					items: 2
				},
				1000:{
					items: 3
				}
			}
		});

	};
	carousel();

	$('nav .dropdown').hover(function(){
		var $this = $(this);
		// 	 timer;
		// clearTimeout(timer);
		$this.addClass('show');
		$this.find('> a').attr('aria-expanded', true);
		// $this.find('.dropdown-menu').addClass('animated-fast fadeInUp show');
		$this.find('.dropdown-menu').addClass('show');
	}, function(){
		var $this = $(this);
			// timer;
		// timer = setTimeout(function(){
			$this.removeClass('show');
			$this.find('> a').attr('aria-expanded', false);
			// $this.find('.dropdown-menu').removeClass('animated-fast fadeInUp show');
			$this.find('.dropdown-menu').removeClass('show');
		// }, 100);
	});


	$('#dropdown04').on('show.bs.dropdown', function () {
	  console.log('show');
	});

	// scroll
	var scrollWindow = function() {
		$(window).scroll(function(){
			var $w = $(this),
					st = $w.scrollTop(),
					navbar = $('.ftco_navbar'),
					sd = $('.js-scroll-wrap');

			if (st > 150) {
				if ( !navbar.hasClass('scrolled') ) {
					navbar.addClass('scrolled');	
				}
			} 
			if (st < 150) {
				if ( navbar.hasClass('scrolled') ) {
					navbar.removeClass('scrolled sleep');
				}
			} 
			if ( st > 350 ) {
				if ( !navbar.hasClass('awake') ) {
					navbar.addClass('awake');	
				}
				
				if(sd.length > 0) {
					sd.addClass('sleep');
				}
			}
			if ( st < 350 ) {
				if ( navbar.hasClass('awake') ) {
					navbar.removeClass('awake');
					navbar.addClass('sleep');
				}
				if(sd.length > 0) {
					sd.removeClass('sleep');
				}
			}
		});
	};
	scrollWindow();

	var counter = function() {
		
		$('#section-counter, .wrap-about, .ftco-counter').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {

				var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
				$('.number').each(function(){
					var $this = $(this),
						num = $this.data('number');
						console.log(num);
					$this.animateNumber(
					  {
					    number: num,
					    numberStep: comma_separator_number_step
					  }, 7000
					);
				});
				
			}

		} , { offset: '95%' } );

	}
	counter();


	var contentWayPoint = function() {
		var i = 0;
		$('.ftco-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('ftco-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .ftco-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn ftco-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft ftco-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight ftco-animated');
							} else {
								el.addClass('fadeInUp ftco-animated');
							}
							el.removeClass('item-animate');
						},  k * 50, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};
	contentWayPoint();


	
	// magnific popup
	$('.image-popup').magnificPopup({
    type: 'image',
    closeOnContentClick: true,
    closeBtnInside: false,
    fixedContentPos: true,
    mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
     gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      verticalFit: true
    },
    zoom: {
      enabled: true,
      duration: 300 // don't foget to change the duration also in CSS
    }
  });

  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

  $('[data-toggle="popover"]').popover()
	$('[data-toggle="tooltip"]').tooltip()

})(jQuery);

////////////////////////////////////////////////////////////////////////////////
let url=location.href;




function ajaxCallback(file, callback){
    $.ajax({
        url: "js/" + file,
        method: "get",
        dataType: "json",
        success: function(arr){
            callback(arr)
        },
        error: function(xhr){
            console.log(xhr);
        }
    })
}



//PRODUCT PAGE
if(url.indexOf("product.html")!=-1){


	//SORTIRANJE I FILTRIRANJE
	$('#sortiranje').change(sortFunction);
	// $('#genreDiv').change(filterByGenre);
   
	function sortFunction(){
		ajaxCallback("books.json",showBooks);
	}
	
	// function filterByGenre(book){
    //     let choosenGenre = [];

	// 	$('.genre:checked').each(function(el){
	// 		choosenGenre.push(parseInt($(this).val()));
	// 	});
	// 	if(choosenGenre.length > 0){
	// 		return book.filter(x => choosenGenre.includes(x.genre))
	// 	}
    //     return book;
	// }
    
	function sortBooks(genreArray) {
		let sortType = document.getElementById('sortiranje').value
		switch(sortType) {
			case 'asc':
				return genreArray.sort((previous, next) =>
				previous.name > next.name ? 1 : -1
			)
			case 'priceAsc':
				return genreArray.sort((previous, next) =>
				previous.price.new > next.price.new ? 1 : -1
			)
			case 'priceDesc':
				return genreArray.sort((previous, next) =>
				previous.price.new < next.price.new ? 1 : -1
			)
		
		}
	} 
	try{
        ajaxCallback("books.json", showBooks);
    }
    catch{
        console.log("Error!");
    }
	function showBooks(book){
		book = sortBooks(book);
		// book=filterByGenre(book);
		let print='<div class="row" >';

		book.forEach(product => {
			print+=`
						<div class="col-md-4 d-flex">
							<div class="product ftco-animate">
								<div class="img d-flex align-items-center justify-content-center" style="background-image: url(images/${product.img.src});">
								<div class="desc">
									<p class="meta-prod d-flex">
										<a class="addCart d-flex align-items-center justify-content-center " href="#" ><span class="flaticon-shopping-bag"></span></a>
									</p>
								</div>
								</div>
								<div class="text text-center">
									${obradaStatusa(product.status)}
									<span class="category">${categoryName(product.category)}</span>
									<h2>${product.name}</h2>
									<h6>${product.author}</h6>
									<p class="mb-0">${obradaCene(product.price)}</p>
								</div>
							</div>
						</div>
		`
		});
		print+='</div>'
		document.getElementById('productsCover').innerHTML=print;
	}
	

}
function obradaCene(price){
	let html="";

	
	if(price.old != null){
		html+=`<span class="price price-sale">${price.old}$ </span>`;
	}
	html+=`<span class="price">${price.new}$ </span>`;
	return html;
}
function obradaStatusa(status){
	let html="";

	if(status=="Sale"){
		html+=`<span class="sale">${status}</span>`;
	}
	else if(status=="New"){
		html+=`<span class="new">${status}</span>`;
	}
	else html="";

	return html;
}
function categoryName(category){
	let html="";

	if(category==1){
		html+="Romance";
	}
	else if(category==2){
		html+="Mystery";
	}
	else if(category==3){
		html+="Fantasy";
	}
	else{
		html+="Horror";
	}
return html;
}


//INDEX PAGE
if(url.indexOf("index.html")!=-1){

	ajaxCallback("category.json",showIconProducts);
	ajaxCallback("books.json",showNewArrivals);

	function showIconProducts(icon){
		let print='';

		icon.forEach(category =>{
			print+= `
				<div class="col-lg-2 col-md-4 ">
					<div class="sort w-100 text-center ftco-animate">
						<div class="img" style="background-image: url(images/${category.img.src});"></div>
						<h3>${category.name}</h3>
					</div>
				</div>
			`
		});																																																																													
		document.getElementById('categ').innerHTML=print;
	};

	function showNewArrivals(arrival){
		let print='<div class="row" >';
		arrival.forEach(product =>{
			if(product.status=="New"){
				// console.log(product.status);
				print+=`
				<div class="col-md-3 d-flex">
					<div class="product ftco-animate">
						<div class="img d-flex align-items-center justify-content-center" style="background-image: url(images/${product.img.src});">
						
						</div>
						<div class="text text-center">
							${obradaStatusa(product.status)}
							<span class="category">${categoryName(product.category)}</span>
							<h2>${product.name}</h2>
							<h6>${product.author}</h6>
							<p class="mb-0">${obradaCene(product.price)}</p>
						</div>
					</div>
				</div>
				`
			}
			else{
				print+="";
			}
		})
		
		print+=`</div>`;

		document.getElementById('newArrival').innerHTML=print;
	}
	
}

//CONTACT PAGE

if(url.indexOf("contact.html")!=-1){
	createContactForm();
  var numErorr=0;
	function createContactForm() {
		let contactform = document.querySelector(".contact-form-parent");
		let form, section, label, input, p;
	
		form = document.createElement("form");
		form.name = "forma-prijava";
		form.id = "forma-prijava";
		contactform.appendChild(form);
	  
		// First and last name section
		section = document.createElement("div");
		section.classList.add("mb-3");
		
		label = document.createElement("label");
		label.htmlFor = "namelname";
		label.classList.add("form-label");
		label.innerHTML = "First name and last name";
		section.appendChild(label);
	
		input = document.createElement("input");
		input.type = "text";
		input.id = "namelname";
		input.classList.add("form-control");
		section.appendChild(input);
	
		p = document.createElement("p");
		p.id = "poruka-ime";
		p.className = "alert alert-danger mt-3 hide";
		section.appendChild(p);
	
		form.appendChild(section);
		// End of First and last name section
	
		// Email section
		section = document.createElement("div");
		section.classList.add("mb-3");
		
		label = document.createElement("label");
		label.htmlFor = "tbEmail";
		label.classList.add("form-label");
		label.innerHTML = "Email";
		section.appendChild(label);
	
		input = document.createElement("input");
		input.type = "text";
		input.id = "tbEmail";
		input.classList.add("form-control");
		section.appendChild(input);
	
		p = document.createElement("p");
		p.id = "poruka-email";
		p.className = "alert alert-danger mt-3 hide";
		section.appendChild(p);
	
		form.appendChild(section);
		// End of Email section
	
		// Address section
		section = document.createElement("div");
		section.classList.add("mb-3");
		
		label = document.createElement("label");
		label.htmlFor = "tbAdress";
		label.classList.add("form-label");
		label.innerHTML = "Address";
		section.appendChild(label);
	
		input = document.createElement("input");
		input.type = "text";
		input.id = "tbAdress";
		input.classList.add("form-control");
		section.appendChild(input);
	
		p = document.createElement("p");
		p.id = "poruka-adresa";
		p.className = "alert alert-danger mt-3 hide";
		section.appendChild(p);
	
		form.appendChild(section);
		// End of Address section
	
		// // Destination section
		// section = document.createElement("div");
		// section.classList.add("mb-3");
		
		// input = document.createElement("select");
		// input.id = "ddlDestination";
		// input.classList.add("form-select");
	
		// let destinations = ["Choose destination", "Canada", "Cruise", "Amazon", "Africa", "Europe", "Hawaii"];
	
		// destinations.forEach((x, i) => {
		// 	let option = document.createElement("option");
		// 	option.value = i;
		// 	option.innerHTML = x;
		// 	option.ariaPlaceholder = "Choose destination";
		// 	input.appendChild(option); 
		// });
	
		// section.appendChild(input);
	 
		// p = document.createElement("p");
		// p.id = "poruka-destinacija";
		// p.className = "alert alert-danger mt-3 hide";
		// section.appendChild(p);
	
		// form.appendChild(section);
		// End of Destination section
	
		// Gender section
		// section = document.createElement("div");
		// section.classList.add("mb-3");
		
		let genders = [
			{ gender: "Male",   id: "rbB", value: "B" }, 
			{ gender: "Female", id: "rbS", value: "S" }
		];
	
		let div = document.createElement("div");
	
		genders.forEach(x => {
			let option = document.createElement("div");
			option.classList.add("form-check");
	
			let input = document.createElement("input");
			input.type = "radio";
			input.classList.add("form-check-input");
			input.name = "rbGender";
			input.id = x.id;
			input.value = x.value;
			option.appendChild(input);
	
			let label = document.createElement("label");
			label.classList.add("form-check-label");
			label.htmlFor = x.id;
			label.innerHTML = x.gender;
			option.appendChild(label);
	
			div.appendChild(option);
		});
	
		section.appendChild(div);
	
		p = document.createElement("p");
		p.id = "poruka-pol";
		p.className = "alert alert-danger mt-3 hide";
		section.appendChild(p);
	
		form.appendChild(section);
		// End of Gender section
	
		// Terms and Conditions section
		section = document.createElement("div");
		section.classList.add("mb-3");
	
		div = document.createElement("div");
	
		let content = document.createElement("div");
		content.classList.add("form-check");
	
		input = document.createElement("input");
		input.classList.add("form-check-input");
		input.type = "checkbox";
		input.value = "WD";
		input.id = "chbWD";
		input.name = "chbPredmeti";
		content.appendChild(input);
	
		label = document.createElement("label");
		label.classList.add("form-check-label");
		label.htmlFor = "chbWD";
		label.innerHTML = "I agree with terms and conditions";
		content.appendChild(label);
	
		div.appendChild(content);
	
		section.appendChild(div);
		
		p = document.createElement("p");
		p.id = "poruka-uslovi-koriscenja";
		p.className = "alert alert-danger mt-3 hide";
		section.appendChild(p);
	
		form.appendChild(section);
		// End of Terms and Conditions section
	
		// Note section
		section = document.createElement("div");
		section.classList.add("mb-3");
	
		label = document.createElement("label");
		label.htmlfor = "taNapomena";
		label.classList.add("form-label");
		label.innerHTML = "Ask us question..";
		section.appendChild(label);
	
		let textarea = document.createElement("textarea");
		textarea.id = "taNapomena";
		textarea.classList.add("form-control");
		section.appendChild(textarea);
	
		p = document.createElement("p");
		p.id = "poruka-napomena";
		p.className = "alert alert-danger mt-3 hide";
		section.appendChild(p);
	
		form.appendChild(section);
		// End of Note section
	
		// Submit Button section
		section = document.createElement("div");
	
		input = document.createElement("input");
		input.type = "button";
		input.value = "Send";
		input.className = "btn btn-primary";
		input.id = "btnPrijava";
		input.addEventListener("click", proveraForme);
		section.appendChild(input);
		
		p = document.createElement("p");
		p.id = "porukaUspeh";
		p.className = "alert alert-success mt-3 hide";
		section.appendChild(p);
  
		form.appendChild(section);
		// End of Submit Button section
	}
	
	function proveraForme() {
	
		let porukaIme = document.querySelector("#poruka-ime");
		let inputIme = document.querySelector("#namelname");
		ProveraRegularnogIzraza(inputIme, porukaIme, reImePrezime, "First and last name are not in good format: Example: Ketrin Pirs");
	
		let porukaEmail = document.querySelector("#poruka-email");
		let inputEmail = document.querySelector("#tbEmail");
		ProveraRegularnogIzraza(inputEmail, porukaEmail, reEmail, "Email is not in good format. Example: ketrinpirs@gmail.com");
	
		let porukaAdresa = document.querySelector("#poruka-adresa");
		let inputAdresa = document.querySelector("#tbAdress");
		ProveraRegularnogIzraza(inputAdresa, porukaAdresa, reAdresa, "Adress is not in good format. Example: Kralja Petra I 44 ");
	
		let ddlDestinacija = document.querySelector("#ddlDestination");
		let porukaDestinacija = document.querySelector("#poruka-destinacija");
	
		// if (ddlDestinacija.value == 0) {
		// 	porukaDestinacija.classList.remove("hide");
		// 	porukaDestinacija.innerHTML = "Choose destination!";
		// 	numErorr++;
		// } else {
		// 	porukaDestinacija.classList.add("hide");
		// 	porukaDestinacija.innerHTML = "";
		// }
	
		let rbGenderValue = document.querySelector('input[name="rbGender"]:checked');
		let porukaPol = document.querySelector("#poruka-pol");
	
		if (!rbGenderValue) {
			porukaPol.classList.remove("hide");
			porukaPol.innerHTML = "Choose gender!";
			numErorr++;
		} else {
			porukaPol.classList.add("hide");
			porukaPol.innerHTML = "";
		}
	
		let cbUslovi = document.querySelector("#chbWD");
		let porukaUslovi = document.querySelector("#poruka-uslovi-koriscenja");
	
		if (!cbUslovi.checked) {
			porukaUslovi.classList.remove("hide");
			porukaUslovi.innerHTML = "You need to accept terms and conditions!";
			numErorr++;
		} else {
			porukaUslovi.classList.add("hide");
			porukaUslovi.innerHTML = "";
		}
  
  
		if(numErorr==0){
		  document.querySelector("#forma-prijava").reset();
		  porukaUspeh.classList.remove("hide");
		  porukaUspeh.innerHTML = "Success!";
		}
	}
	  
	let reImePrezime = /^[A-Z][a-z]{1,10}\s[A-Z][a-z]{1,10}$/;
	let reEmail = /^\w([\.-]?\w+\d*)*@\w+\.\w{2,6}$/;
	let reAdresa = /^(([A-Z][a-z]{1,15}(\.)?)|([1-9][0-9]{0,2}(\.)?))[a-zA-Z0-9\s\/\-]+$/;
	
	function ProveraRegularnogIzraza(objekat, porukaObjekat, re, poruka)
	{
		if (!re.test(objekat.value)) {
			porukaObjekat.classList.remove("hide");
			porukaObjekat.innerHTML = poruka;
			numErorr++;
		} else {
			porukaObjekat.classList.add("hide");
			porukaObjekat.innerHTML = "";
		}
	}
}

//LOCAL STORAGE

let carts = document.getElementsByClassName('addCart');

console.log(carts);

for(i=0; i<carts.length; i++){
	console.log('working');
}	

//END LOCAL STORAGE