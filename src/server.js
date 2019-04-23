var Crawler = require("crawler");
const shopSiteWords = ["customer", "shop", "sale", "sold", "buy", "bought", "cost", "pay", "credit card", "$", "cad", "dollar"];
const newsSiteWords = ["news", "celebrity", "finance", "business", "mail", "sports", "press", "media", "says", "report", "accident", "china", "u.s"];

var c = new Crawler({
    maxConnections : 10,

    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;

            console.log($("title").text());
            const allBodyText = $("body").text(); //get all of the text of the body html
            if (allBodyText.length > 0) {
                const shopSitePercentage = checkShopSite(allBodyText);
                console.log("Shopping site percentange: " + shopSitePercentage * 100 + "%.");
                const newsSitePercentage = checkNewsSite(allBodyText);
                console.log("News site percentange: " + newsSitePercentage * 100 + "%.");
                //console.log(allBodyText);
            }
        }
        done();
    }
});

c.queue('https://www.amazon.com');

c.queue('https://youtube.com');

//c.queue(['http://www.google.com/','http://www.yahoo.com']);
c.queue('http://www.yahoo.com');

function checkShopSite(textGroup) {
    const lowerText = textGroup.toLowerCase();
    var matchShopCounter = 0;
    
    for (item of shopSiteWords) {
        if (lowerText.includes(item)) {
            matchShopCounter++; 
        }
    }

    return percentage = matchShopCounter / shopSiteWords.length;
};

function checkNewsSite(textGroup) {
    const lowerText = textGroup.toLowerCase();
    var matchNewsCounter = 0;

    for (item of newsSiteWords) {
        if (lowerText.includes(item)) {
            matchNewsCounter++; 
        }
    }

    return percentage = matchNewsCounter / newsSiteWords.length;;
};


