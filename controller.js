const http = require('http');

module.exports.post = (req, res) => {
    const userData = req.body;
    const url = "http://iss.moex.com/iss/statistics/engines/futures/markets/indicativerates/securities.json";
    var usd = '';
    http.get(url, (moexRes) => {
        let sourceData = '';
        moexRes.on('data', (chunk) => {
            sourceData += chunk;
        });
        moexRes.on('end', () => {
            const data = JSON.parse(sourceData).securities.data;
            const arr = data.filter((data) => { return data.includes("USD/RUB"); });
            usd = arr[0][3];
            userData.forEach(element => { element.val += usd; });
            res.send(userData);
        });
    });
}