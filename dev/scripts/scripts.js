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


thisApp.init = () => {
	thisApp.getIssues()
	thisApp.events()
		// .then(thisApp.displayIssues);
};

thisApp.events = function() {

	// on submit of Form element
	$('.form__container').on('submit', function(e) { 
		e.preventDefault();
		$('.cardsContainer').empty();
		// Grab Input Value and put in formInputs Object
		thisApp.formInputs.language = $(this).find('.form__input--language').val();
		
		thisApp.formInputs.label = $(this).find('.form__input--label').val();
		// thisApp.formInputs.keyword = $(this).find('.keyword').val();
		thisApp.getIssues()
		console.log(thisApp.formInputs)
	});
};




thisApp.displayIssues = (issues) => {
	issues.forEach((issue, index) => {
		// console.log(issue)
		// console.log(issue)
		let urlStringArray = `${issue.html_url}`.split("/")
		// console.log(urlStringArray)

		const labels = issue.labels
		const $container = $('<li>').addClass('card__container');
		const $issueName = $('<h5>').text(issue.title);
		const $cardByline = $('<h6>').text(issue.user.login);
		const $cardLink = $(`<a href=${ issue.html_url} target="_blank">Repo Link</a>`);
		
		const $repoName = $(`<h2>`).text(urlStringArray[3]);

		$container.append($repoName,$issueName,$cardByline,$cardLink);
		const $labelContainer = $('<ul>').addClass('label__container');
		labels.forEach((label) => {
			const $labels = $(`<li>${label.name}</li>`).addClass('label');
			$labelContainer.append($labels);
			$container.append($labelContainer);
		})
		$('.cardsContainer').append($container);
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
		console.log(issues)
		$.when(issueCall)
			.then(function() {
				thisApp.displayIssues(issues);
			});
	})
};

$(thisApp.init);