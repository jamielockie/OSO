const thisApp = {};
thisApp.endpoint = 'https://api.github.com/search/issues';
thisApp.userAgent = 'jamielockie'; 
thisApp.token = 'c10b97525d3cb61ee37390069c16765fd75f05';

thisApp.init = () => {
	console.log("connected!");
	thisApp.getRepos();
};

thisApp.getRepos = function() {
	console.log('Ajax')
	$.ajax({
		url: thisApp.endpoint,
		method: 'GET',
		dataType:'json',
		data: {
			// user-agent: 'jamielockie'
			token: thisApp.token,
			q: `is:open label:"help wanted" label:"beginner" language:css` 
			},
	})
	.then(function(res) {
		console.log(res)
	})
};

// var settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://api.github.com/search/repositories?q=label%3A%22help%20wanted%22&q=stars%3A15..100&is%3Apublic=",
// 	"method": "GET",
// 	"headers": {
// 		"authorization": "Basic amFtaWVsb2NraWU6Smw1NjQ5Li4=",

// 	}
// }

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

$(thisApp.init);