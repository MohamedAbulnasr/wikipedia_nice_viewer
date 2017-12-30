			$(document).ready(function() {
				$("#searcher").focus();
			});

			function getResults() {
					var lmt=1+10;
					var ur="https://en.wikipedia.org/w/api.php?action=opensearch&search=";
					ur+=encodeURI($("#searcher").val());
					ur+="&limit="+lmt+"&format=json";
					$.ajax({
						url: ur,
						type: 'GET',
						dataType: 'jsonp',
						beforeSend: setHeaders
					})
					.done(function(data) {
						console.log("success");
						$("ul").html("");
						for (var i = 1; i < lmt; i++) {
							if (!data[1][i]) {
								$("#list").append('<li class="lst">'
								+'<h3>'+'No mach found'+'</h3>'
								+'</li>');
								break;
							}
								$("#list").append('<li class="lst">'
								+'<a href= '+data[3][i]+' target="_blank"><h3>'+data[1][i]+'</h3>'
								+'<h4>'+data[2][i]+'</h4></a>'
								+'</li>');
						}
						$("#searcher").blur();
					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});
					function setHeaders(xhr) {
						xhr.setRequestHeader('Api-User-Agent', 'Example/1.0');
						xhr.setRequestHeader('contentType', 'application/json');
					}
			}
