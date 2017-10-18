const thisApp = {};
thisApp.endpoint = 'https://api.github.com/search/issues';
thisApp.userAgent = 'jamielockie'; 
thisApp.token = 'c10b97525d3cb61ee37390069c16765fd75f05';
thisApp.language = 'javascript';
thisApp.label__primary = "beginner";



thisApp.init = () => {
	thisApp.getIssues()
		.then(thisApp.displayIssues);
};

thisApp.displayIssues = (issues, i) => {
	issues.forEach((issue) => {
		const $container = $('<li>').addClass('card__container')
		const $cardTitle = $('<h3>').text(issue.title);
		const $cardByline = $('<h4>').text(issue.user.login);
		const $cardLink = $(`<a href=${ issue.html_url} target="_blank">Repo Link</a>`);
		
		const $labels = $(`<p>`).text(issue.labels);
		
		this.issue.labels.forEach((label) => {
			console.log(label.name)
		});
		// label container work 
		// const $cardLabelContainer = $('<div>').addClass('label__container')
		// issue.labels.forEach( function(label) {
		// 	console.log()
		// 	const $label = $('<p>').text(label.name);
		// 	$cardLabelContainer.append($label)
		// 	$('.card__container').append($cardLabelContainer)
		// });


		$container.append($cardTitle,$cardByline,$cardLink,$labels);
		$('.gallery').append($container);
	});
}

thisApp.getIssues = () => {
	console.log('Ajax')
	return $.ajax({
		url: thisApp.endpoint,
		method: 'GET',
		dataType:'json',
		data: {
			// user-agent: 'jamielockie'
			token: thisApp.token,
			q: `is:public label:${thisApp.label__primary} label:"help wanted" language:${thisApp.language}`,
			// sort: 'stars',
			},
	})
	.then(function(res) {
		const issues = res.items;
		console.log(res);
		thisApp.displayIssues(issues)
	})
};

$(thisApp.init);