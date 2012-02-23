var likegg = {};

likegg.config = {
		'urlCallback': 'http://localhost/likegg/service.php'
	,	'userId'     : 0
	,	'onClass'    : 'onClass'
	,	likeCallback : function (){likegg.parse();}
};

likegg.parse = function (root) {
	$('[data-likegg="likeggeable"]', root).each(function(index, element){
		//Search for the attribute id
		var id = null;
		
		$('[data-id]', element).each(function() {
			id = $(this).attr('data-id');
		});

		//Retrieve info (global count + status by user)
		var params = {id: id, userId: likegg.config.userId};
		
		likegg.getInfo (params, element);
	});
};

likegg.updateElement = function (info, element)
{
		console.log(element, info);
	//Search for element where to put the global count + status by user
	$('[data-count]', element).each(function() {
		console.log($(this));
		$(this).text(info.count);
	});

	$('[data-status]', element).each(function() {
		$(this).toggleClass(likegg.config.onClass, info.status);
	});

};

likegg.getInfo = function (params, element)
{
	var urlCallback = likegg.config.urlCallback;
/*	
	for(var key in params) {
		urlCallback = urlCallback.replace("${"+key+"}", params[key]);
	}*/

	params.method = "getInfo";

	//Request to urlCallback, returns info in JSON 
	return jQuery.get(urlCallback, params, function (data){ var info = JSON.parse(data);likegg.updateElement(info, element); });	

/*	var info = {count: Math.floor(Math.random()*22), status: true }; */

};

likegg.like = function (element)
{
	var success = true;
	//Request to urlCallback, method: CLICK
	var id = $(element).attr('data-id');

	return success;	
};

$(document).ready(function(){
	likegg.parse ();
});
