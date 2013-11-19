var request = require("request"),
	cheerio = require("cheerio"),
	INITIAL_URL = "http://www.autotrader.co.uk/search/used/cars/ford/focus/postcode/sn153qj/radius/1500/transmission/manual/body-type/hatchback/quantity-of-doors/5/fuel-type/petrol/price-to/12000/price-from/9000/maximum-mileage/up_to_25000_miles/maximum-age/up_to_3_years_old/sort/default/engine-size-cars/1-4l_to_1-6l/onesearchad/used%2Cnearlynew%2Cnew",
	SELECTOR = "th:contains(power)+td:contains(150)";

function process(err, resp, body) {
	var $ = cheerio.load(body);
	var nextLink = $("a.button.next:not(.inactive)").first().attr("href");
	if (nextLink)
		request(nextLink, process);

	$("a.external.title").each(function(i, e) {
		request($(e).attr("href"), function(err, resp, body) {
			if (cheerio.load(body)(SELECTOR).length > 0)
				console.log("<a href='" + $(e).attr("href") + "'>" + $(e).attr("title") + "</a><br/>");
		});
	});
}

request(INITIAL_URL, process);