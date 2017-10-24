const thisApp = {};
thisApp.endpoint = 'https://api.github.com/search/issues';
thisApp.userAgent = 'jamielockie'; 
thisApp.token = 'c10b97525d3cb61ee37390069c16765fd75f05';
thisApp.label__primary = "beginner";
// thisApp.repoArray = [];
thisApp.repoNameArray = [];
thisApp.repoDescArray = [];

thisApp.language = 'javascript';


thisApp.init = () => {
	thisApp.getIssues()
	thisApp.events()
		// .then(thisApp.displayIssues);
};

thisApp.events = function() {

	// on submit of Form element
	$('.userInputs').on('submit', function(e) { 
		e.preventDefault();
		// Grab Input Value and put in formInputs Object
		thisApp.language = $(this).find('.inputs__languageType').val();
		$('.gallery').empty();
		thisApp.getIssues()
		console.log(thisApp.language)
	});
};

thisApp.displayIssues = (issues) => {
	issues.forEach((issue, index) => {
		const labels = issue.labels
		const $container = $('<li>').addClass('card__container');
		const $issueName = $('<h5>').text(issue.title);
		const $cardByline = $('<h6>').text(issue.user.login);
		const $cardLink = $(`<a href=${ issue.html_url} target="_blank">Repo Link</a>`);

		const $repoName = $(`<h3>`).text(thisApp.repoNameArray[index]);
		const $repoDesc = $(`<h4>`).text(thisApp.repoDescArray[index]);

		$container.append($repoName,$repoDesc,$issueName,$cardByline,$cardLink);
		labels.forEach((label) => {
			thisApp.labels = $(`<p>${label.name}</p>`).addClass('label');

			$container.append(thisApp.labels);
		})
		$('.gallery').append($container);
	});
};

thisApp.getIssues = () => {
	// Makes initial Ajax call to get object of issues
	const issueCall = $.ajax({
		url: thisApp.endpoint,
		method: 'GET',
		dataType:'json',
		data: {
			// user-agent: 'jamielockie'
			// token: thisApp.token,
			q: `is:public is:open label:"help wanted" label:${thisApp.label__primary} language:${thisApp.language}`,
			// sort: 'stars',
			},
	})
	.then(function(res) {
		const issues = res.items;
		res.items.forEach((repo) => {
			let repoUrl = repo.repository_url;
			const repoCall = $.ajax({
				url: repoUrl,
				method:'GET',
				dataType: 'json',
				data: {
					// token: thisApp.token
				},
			})
			.then(function(res) {
				// console.log(res)
				const repoName = res.name
				thisApp.repoNameArray.push(repoName);

				const repoDesc = res.description
				thisApp.repoDescArray.push(repoDesc) 
			})
		})
		$.when(issueCall)
			.then(function() {
				thisApp.displayIssues(issues);
			});
	})
};

$(thisApp.init);