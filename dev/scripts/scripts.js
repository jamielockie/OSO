const thisApp = {};
thisApp.endpoint = 'https://api.github.com/search/repositories';
thisApp.userAgent = 'jamielockie'; 


thisApp.init = () => {
	console.log("connected!");
	thisApp.getRepos();
};

thisApp.getRepos = function() {
	$.ajax({
		url: thisApp.endpoint,
		dataType:'jsonp',
		method: 'GET',
		data: {
			authorization: 'Basic amFtaWVsb2NraWU6Smw1NjQ5Li4='
			},
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