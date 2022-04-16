var fetch = require('fetch').fetchUrl;

function GetAllProducts(callback) {
    var instantBuyPrices = [];
    fetch('https://api.hypixel.net/skyblock/bazaar', {headers:{"User-Agent": "Bazaar-Npc-Calculator"}}, function(error, meta, body) {
        if (error) {
            console.log(error);
        } else {
            var json = JSON.parse(body);
            var products = json.products;
            Object.keys(products).forEach(function(key) {
                var product = products[key];
                instantBuyPrices.push({"productId": product.product_id, "buySummary": product.buy_summary[0]});
            });
            callback(instantBuyPrices);
        }
    });
}

function GetNPCSellPrices(callback) {
    var npcSellPrices = {};
    fetch('https://api.hypixel.net/resources/skyblock/items', {headers:{"User-Agent": "Bazaar-Npc-Calculator"}}, function(error, meta, body) {
        if (error) {
            console.log(error);
        } else {
            var json = JSON.parse(body);
            var items = json.items;
            items.forEach(function(item) {
                if (item?.npc_sell_price) {
                    npcSellPrices[item.id] = {"fullname": item.name, "sellprice":item.npc_sell_price};
                }
            });
            callback(npcSellPrices);
        }
    });
}

function FilterProfitableProducts(profitableItems) {
    
}

module.exports = {
    GetAllProducts: GetAllProducts,
    GetNPCSellPrices: GetNPCSellPrices
};