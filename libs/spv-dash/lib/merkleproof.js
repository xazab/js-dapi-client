

module.exports = getMerkleProof = function(blockHash, txHash, filterAddr) {

    this.store.get(blockHash)
        .then(localBlock => {
            if (!localBlock) {
                throw new Exception(`header block with hash ${blockHash} not found on local spv chain`)
            }
            else {
                return getMerkleProofs(localBlock.hash, localBlock.merkleRoot, filterAddr);
            }
        })
        .then(proofs => {

            if (proofs.length == 0) {
                //coinbase tx only so 
                //merkle root matches txHash so can do this check here
                console.log('SPV VALIDTION SUCCESS')
            }
            else if (proofs.contains(txHash)) {//wont execute (pseudo code)
                //because its difficult to build a chain form genesis up to a block that contains more than the coinbase tx
                //a check still needs to be done here (the txHash should be in the set of proofs which is matching transactions of the bloom filter)
                //earlier versions of the POC did sucessfully test this without depending on the locally constructed SPV chain
                console.log('SPV VALIDTION SUCCESS')
            }
            else {
                console.log('SPV FAILED')
            }


        })
        .catch(err => {
            console.log(err);
        })
}

getMerkleProofs = function(localBlockHash, localMerkleRoot, filterAddr = null) {

    return new Promise(function(resolve, reject) {
        //test.insight.dash.siampm.com
        var Peer = require('bitcore-p2p-dash').Peer;
        var Pool = require('bitcore-p2p-dash').Pool;
        var peer = new Peer({ host: 'test.insight.dash.siampm.com', port: '19999', network: 'testnet' }); //local: 127.0.0.1
        var pool = new Pool({ network: 'testnet' });

        peer.on('ready', function() {

            //not working
            if (filterAddr) {
                var BloomFilter = require('bitcore-p2p-dash').BloomFilter;
                var code = new Buffer(filterAddr, 'base64');
                var filter = BloomFilter.create(1, 0.1);
                filter.insert(code);
            }

            //Investigate pool/peer message mix, seems to be only way to get it to work
            pool.sendMessage(peer.messages.FilterLoad(filter));
            pool.sendMessage(peer.messages.GetData.forFilteredBlock(localBlockHash));
        })

        pool.on('peerheaders', function(peer, message) {
            console.log('peerheaders:' + JSON.stringify(message))
        });

        pool.on('peermerkleblock', function(peer, message) {

            if (utils.getCorrectedHash(message.merkleBlock.header.merkleRoot) != localMerkleRoot) {
                reject('merkle roots does not match on spv chain')
            }
            else {
                let bmp = require('bitcoin-merkle-proof');
                try {
                    resolve(
                        bmp.verify({
                            flags: message.merkleBlock.flags,
                            hashes: message.merkleBlock.hashes.map(h => Buffer.from(h, 'hex')),
                            numTransactions: message.merkleBlock.numTransactions,
                            merkleRoot: message.merkleBlock.header.merkleRoot
                        }))
                }
                catch (e) {
                    reject(e)
                }
            }
        });

        //https://en.bitcoin.it/wiki/Protocol_documentation#Inventory_Vectors
        //Only types 0 - 4 but currently getting types of 15, 16, 7, 8 ??
        peer.on('inv', function(message) {
            // console.log(`inv: ${JSON.stringify(message.inventory)}`)

            if (message.inventory.filter(i => i.type == 3).length > 0) {
                console.log('MERKLE BLOCK !!!!' + JSON.stringify(message.inventory)); //not happening :(
            }
        });

        peer.on('tx', function(message) {
            console.log(`tx: ${message.transaction}`)
        });

        peer.on('addr', function(message) {
            console.log(`addr: ${JSON.stringify(message.addresses)}`)
        });

        peer.on('disconnect', function() {
            console.log('connection closed');
        })

        peer.on('error', function(err) {
            console.log(err);
        })

        pool.connect();
        peer.connect();
    })

}

