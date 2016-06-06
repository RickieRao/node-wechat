var cheerio = require('cheerio');
var grab = require('../models/grabhtml.js');
var searchCfg = require('../config/searchcfg.json');
var searchCloud = module.exports;

// the search provider
var searchParam = searchCfg.searchparams;
var returnLength = searchCfg.searchresultreturnlength;

// return search results
searchCloud.search = function(queryString,returnRes){
	//var searchResArray = [];
	var resultString = "";
	
	grab.getHtml(bindSearchURL(queryString),function(data){
		if(data){
			var shortenResult = {};
			var result =  parseGetResultArr(data);
			//console.log(result.discriptions);
		    shortenResult.links = cutResult(result.links);
		    shortenResult.discriptions = cutResult(result.discriptions);
			for (i = 0;i<shortenResult.links.length;i++){
				// join discriptions and links 
				resultString+=shortenResult.discriptions[i] +'\n'+shortenResult.links[i]+'\n\n\n';
			}

			//resultString = resultArr[0];
			console.log("resultString:  \n"+resultString);
			return returnRes(resultString);
		}
	});
	
	//return resultString;
};

var parseGetResultArr = function(htmlString){

	var result = {};
	result.links = [];
	result.discriptions = [];

	$ = cheerio.load(htmlString);

	$('.cse-search-result_content_item_top_a').each(function(){
		result.links.push($(this).attr('href'));
	});

	$('.cse-search-result_content_item_mid').each(function(){
		var arr = $(this).text().trim().split(' ');
		var downloadCount = "";

		for(x in arr){
			if(arr[x].indexOf("下载次数") > -1){
				downloadCount = arr[x];
				break;
			}
			// if no download sum exists, put an empty string
			downloadCount = "";
		}

		// get name of the shared resource, remove tags like <b>, note that in cheerio use text() instead of html()
		result.discriptions.push(arr[0].replace("文件名:","").replace(/<(?:.|\n)*?>/gm, '') + " " + downloadCount);
		
		
	});

	return result;
};

var cutResult = function(resultArray){
	var returnArr = [];
	if(resultArray.length<=returnLength){
		return resultArray;
	}
	for( i = 0; i < returnLength; i++){
		returnArr.push(resultArray[i]);
	}
	return returnArr;
};

// bind the encoded query string to search url
var bindSearchURL = function(queryString){
	console.log(searchCfg.searchurl+encodeURI(queryString));
	return searchCfg.searchurl+encodeURI(queryString);
};