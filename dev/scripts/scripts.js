const thisApp = {};
thisApp.endpoint = 'https://api.github.com/search/issues';
thisApp.userAgent = 'jamielockie'; 
thisApp.token = 'c10b97525d3cb61ee37390069c16765fd75f05';
thisApp.language = 'javascript';
thisApp.label__primary = "beginner";
// thisApp.repoArray = [];
thisApp.repoNameArray = [];
thisApp.repoDescArray = [];


thisApp.init = () => {
	thisApp.getIssues()
		// .then(thisApp.displayIssues);
};

thisApp.displayIssues = (issues) => {
	issues.forEach((issue, index) => {
		const labels = issue.labels
		const $container = $('<li>').addClass('card__container');
		const $cardTitle = $('<h3>').text(issue.title);
		const $cardByline = $('<h4>').text(issue.user.login);
		const $cardLink = $(`<a href=${ issue.html_url} target="_blank">Repo Link</a>`);

		const $repoName = $(`<h1>`).text(thisApp.repoNameArray[index]);
		const $repoDesc = $(`<h3>`).text(thisApp.repoDescArray[index]);

		$container.append($cardTitle,$cardByline,$cardLink,$repoName, $repoDesc);
		labels.forEach((label) => {
			thisApp.labels = $(`<p>${label.name}</p>`);
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
			q: `is:public  label:"help wanted" label:${thisApp.label__primary} language:${thisApp.language}`,
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
				console.log(res)
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