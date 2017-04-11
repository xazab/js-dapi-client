const has = require('../util/has.js');
const {uuid}=require('khal');

exports.init = function() {
    let self = this;
    return async function(query, update){
        return new Promise(async function (resolve, reject) {
            if(self._config.verbose) console.log('Discover - init - Fetch valid MN list');
            let fetched = await self.Discover.Masternode.fetcher();
            if(fetched.length>0){
                self.Discover.Masternode.validMNList = fetched;
            }
            if(self._config.verbose) console.log(`Discover - init - Fetched ${fetched.length} MNs`);
            if(self._config.verbose) console.log(`Discover ready \n`)
            return resolve(true);
        });
    }
}