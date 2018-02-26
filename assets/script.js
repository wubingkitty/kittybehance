$(function(){
	
	// REPLACE THIS !!
	var key = 't7ptTIwdevqytSm4ok5JMCHzhf1aQxM3';	// Your unique key - https://www.behance.net/dev
	var behanceUser = 'Bingcat'; 				// example - Manuel from Yoobee Creative Catchup #3

// ================================== HOME PAGE TEMPLATE ====================================================================

	// If the ID #index has been rendered on the page, then run this <code></code>
	if($('#home').length > 0) {

		var urlProjects = 'https://api.behance.net/v2/users/' + behanceUser + '/projects?client_id=' + key;

		// AJAX request
		$.ajax({

			url: urlProjects,
			dataType: 'jsonp',

			// let's show a little preloader to the user while they wait for a nice User Experience
			beforeSend: function(res) {
				$('<div class="pre-loader"> <img class="icon" src="loading.gif"> </div>').prependTo('body');
			},

			// when the ajax request is complete do all of these things
			success: function(res) {

				// Success! We can get rid of the preloader now...
				$('.pre-loader').detach();

				var projects = res.projects;

				// https://www.behance.net/dev/api/endpoints/1
				projects.forEach(function(project) {
					$('<li class="each">'  + '<img class="image" src="' + project.covers.original +'">'+ '<h4>' + project.name + '</h4>'+   '<a href="project.html?projectid=' + project.id + '">See more</a></li>').appendTo('ul.projects');
				});
			},

			// if the ajax request fails do these things as a fallback
			error: function(res) {
				$('<h1> Error!! </h1>').appendTo('body');
			}

		}); // END ajax request

	} // END HOMEPAGE template

// ================================== PROJECT PAGE TEMPLATE ====================================================================

	// If the ID #project has been rendered on the page, then run this code
	if($('#project').length > 0) {
 
		var pageURL = new URL(document.location);
		var params = pageURL.searchParams;
		var projectid = params.get('projectid');
		var urlProject = 'http://www.behance.net/v2/projects/' + projectid + '?api_key=' + key;

		// AJAX request
		$.ajax({

			url: urlProject,
			dataType: 'jsonp',

			// let's show a little preloader to the user while they wait for a nice User Experience
			beforeSend: function(res){
				$('<div class="pre-loader">  <img class="icon" src="loading.gif"> </div>').prependTo('body');
			},

			// when the ajax request is complete do all of these things
			success: function(res) {

				// Success! We can get rid of the preloader now...
				$('.pre-loader').detach();

				var project = res.project;

				// show the project details like this
				$('<h1 class="detailTitle">' + project.name +'</h1>').appendTo('.greyline');
				$('<h3 class="published">' + 'published:'+' '+ moment.unix(project.published_on).fromNow() + '</h3>').appendTo('.greyline');
				$('<p class="des">' + project.description + '</p>').appendTo('.greyline');
				// using Moment JS for clean and easy to use time format
				// https://momentjs.com/docs/#/displaying/fromnow/
				// https://momentjs.com/docs/#/displaying/unix-timestamp/
				
				$('<img class="detailPhoto" src="' + project.covers.original + '">').appendTo('.container');
			},

			// if the ajax request fails do these things as a fallback
			error: function(res) {
				$('<h1> Error!! </h1>').appendTo('body');

			}

		});

	}



//==================================== get fields from behance API =======================================//

	/* 'res' is responsive by behance server */
    /* Changed by Behance API: https://www.behance.net/dev/api/endpoints/2
	/* https://api.behance.net/v2/users/matiascorea?client_id=1234567890  */
	var urlUsers = "https://api.behance.net/v2/users/" + behanceUser + "?client_id=" + key;
	$.ajax({
		url:urlUsers,
		dataType:'jsonp',

		success: function(res) {
			var user = res.user;
			$('<h1 class="title">' +'List of Behance projects for' + " " + user.username + '</h1>'+'<h2 class="fields">' +'Fields:' + " " + user.fields + '</h2>').prependTo('.line');
			
		}

	})
	
});