/**
 * Get Landing
 * @param {*} req 
 * @param {*} res 
 */
function get(req, res) {
    require("../bazaarApi").GetAllProducts(function (instantBuyPrices) {
        require("../bazaarApi").GetNPCSellPrices(function (npcSellPrices) {
            var profitableItems = [];
            instantBuyPrices.forEach(instantBuyPrice => {
                if (npcSellPrices[instantBuyPrice.productId]) {
                    var buyPrice = instantBuyPrice.buySummary?.pricePerUnit;
                    if (buyPrice) {
                        var sellPrice = npcSellPrices[instantBuyPrice.productId].sellprice;
                        if (sellPrice - buyPrice > 0) {
                            profitableItems.push({"fullname": npcSellPrices[instantBuyPrice.productId].fullname, "buyPrice": buyPrice, "sellPrice": sellPrice, "profit": Math.round((sellPrice - buyPrice)*100)/100});
                        }
                    }
                }
            });
            var sortedProfitableItems = profitableItems.sort(function (a, b) {
                return b.profit - a.profit;
            });
            var FilterProfitableProducts = function (profitableItems) {
                var filteredProfitableItems = [];
                profitableItems.forEach(profitableItem => {
                    if (!profitableItem.fullname.includes("Perfect") && !profitableItem.fullname.includes("Flawless")) {
                        filteredProfitableItems.push(profitableItem);
                    }
                });
                return filteredProfitableItems;
            };
            res.render("landing/index", {
                title: "Bazaar -> NPC Profitability",
                items: FilterProfitableProducts(sortedProfitableItems)
            });
        });
    });
}

module.exports = {
    get: get
};