const thisApp = {};
thisApp.endpoint = 'https://api.github.com/search/issues';
thisApp.userAgent = 'jamielockie'; 
thisApp.token = 'c10b97525d3cb61ee37390069c16765fd75f05';
thisApp.label__primary = "beginner";
// thisApp.repoArray = [];
thisApp.repoNameArray = [];
thisApp.repoDescArray = [];

thisApp.formInputs = {};
thisApp.formInputs.language = 'JavaScript'
thisApp.formInputs.label = 'beginner'
thisApp.formInputs.query = ''


thisApp.init = () => {
	thisApp.getIssues()
	thisApp.events()
		// .then(thisApp.displayIssues);
};

thisApp.events = function() {

	// on submit of Form element
	$('.userInputs').on('submit', function(e) { 
		e.preventDefault();
		$('.gallery').empty();
		// Grab Input Value and put in formInputs Object
		thisApp.formInputs.language = $(this).find('.language').val();
		thisApp.formInputs.label = $(this).find('.label').val();
		thisApp.formInputs.query = $(this).find('.keyword').val();
		// console.log(thisApp.formInputs.language)
		// console.log(thisApp.formInputs.label)
		// console.log(thisApp.formInputs.query)
		thisApp.getIssues()
	});
};




thisApp.displayIssues = (issues) => {
	issues.forEach((issue, index) => {
		// console.log(issue)
		const labels = issue.labels
		const $container = $('<li>').addClass('card__container');
		const $issueName = $('<h5>').text(issue.title);
		const $cardByline = $('<h6>').text(issue.user.login);
		const $cardLink = $(`<a href=${ issue.html_url} target="_blank">Repo Link</a>`);
		let urlStringArray = `${issue.html_url}`.split("/")
		console.log(urlStringArray)
		const $repoName = $(`<h1>`).text(urlStringArray[3]);
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
			q: `is:public is:open label:"help wanted" label:${thisApp.formInputs.label} language:${thisApp.formInputs.language}`,
			sort: 'created',
			},
	})
	.then(function(res) {
		const issues = res.items;
		// console.log(issues)
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
				// console.log(res)
				const repoName = res.name
				// console.log(repoName)
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