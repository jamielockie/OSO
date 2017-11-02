const thisApp = {};
thisApp.endpoint = 'https://api.github.com/search/issues';
thisApp.userAgent = 'jamielockie'; 
thisApp.token = 'c10b97525d3cb61ee37390069c16765fd75f05';
thisApp.label__primary = "beginner";
thisApp.repoArray = [];
thisApp.repoNameArray = [];
thisApp.repoDescArray = [];

thisApp.formInputs = {};
thisApp.formInputs.language = 'JavaScript'
thisApp.formInputs.label = 'beginner'


thisApp.init = () => {
	thisApp.getIssues()
	thisApp.events()
};

thisApp.events = function() {
	$('.form__container').on('submit', function(e) { 
		e.preventDefault();
		$('.cardsContainer').empty();
		// Grab Input Value and put in formInputs Object
		thisApp.formInputs.language = $(this).find('.form__input--language').val();
		thisApp.formInputs.label = $(this).find('.form__input--label').val();
		thisApp.getIssues()
	});
};

thisApp.displayIssues = (issues) => {
	thisApp.repoArray.splice(0, thisApp.repoArray.length);
	issues.forEach((issue, index) => {
		thisApp.repoArray.push(issue);
		let urlStringArray = `${issue.html_url}`.split("/")
		const labels = issue.labels
		const $container = $('<li>').addClass('card__container');
		const $issueName = $('<h3>').text(issue.title).addClass('card__desc');
		const $cardByline = $(`<p>Issue opened by <a class="card__user--link" href="https://github.com/${issue.user.login}">${issue.user.login}</a></p>`).addClass('card__user');
		const $cardLink = $(`<div class="card__linkContainer"><a class="card__link btn--crisp" href=${ issue.html_url} target="_blank">Go to Issue</a></div>`)
		const $repoName = $(`<h2><span>${urlStringArray[3]}</span> / ${urlStringArray[4]}</h2>`).addClass('card__title');
		$container.append($repoName,$issueName,$cardByline);
		const $labelContainer = $('<div>').addClass('card__labelContainer');
		const $labelTagContainer = $('<ul>').addClass('card__labelTagContainer');
		labels.forEach((label) => {
			const $labels = $(`<li>${label.name}</li>`).addClass('card__label');
			$labelTagContainer.append($labels);
			$labelContainer.append($cardLink, $labelTagContainer,)
			$container.append($labelContainer);
		})
		$('.cardsContainer').append($container);
	});
	if (thisApp.repoArray.length == 0) {
		swal({
			title: "Uh oh!",
			text: `Try using a label like "beginner", "hacktoberfest", or "up-for-grabs"`,
			icon: "error",
			buttons: "Try Again!",
			closeModal: true
		});
	}
};

thisApp.getIssues = () => {
	const issueCall = $.ajax({
		url: thisApp.endpoint,
		method: 'GET',
		dataType:'json',
		data: {
			q: `is:public is:open label:"help wanted" label:${thisApp.formInputs.label} language:${thisApp.formInputs.language}`,
			sort: 'updated',
			},
	})
	.then(function(res) {
		const issues = res.items;
		$.when(issueCall)
			.then(function() {
				thisApp.displayIssues(issues);
			});
	})
};

$(thisApp.init);