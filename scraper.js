var http = require("request"), 
    cheerio = require("cheerio");

function process(err,resp,body) {
	var $ = cheerio.load(body);
	
	var nextLink = $("a.button.next:not(.inactive)").first().attr("href");
	if(nextLink)
		request(url, process);

	$("a.external.title").each(function(i, e) {
		request($(e).attr("href"), function (err, resp, body) {
			var $ = cheerio.load(body);
			if($("th:contains(power)+td:contains(150)").length > 0)
				console.log("<a href='" + $(e).attr("href") + "'>" + $(e).attr("title") + "</a><br/>");
		});
    });
}

request("http://www.autotrader.co.uk/search/used/cars/ford/focus/postcode/sn153qj/radius/1500/transmission/manual/body-type/hatchback/quantity-of-doors/5/fuel-type/petrol/price-to/12000/price-from/9000/maximum-mileage/up_to_25000_miles/maximum-age/up_to_3_years_old/sort/default/engine-size-cars/1-4l_to_1-6l/onesearchad/used%2Cnearlynew%2Cnew", process);