module.exports = {
  testnet: {
    seeds: [
      'seed-1.testnet.networks.xazab.xyz',
      'seed-2.testnet.networks.xazab.xyz',
      'seed-3.testnet.networks.xazab.xyz',
      'seed-4.testnet.networks.xazab.xyz',
      'seed-5.testnet.networks.xazab.xyz',
    ],
    network: 'testnet',
  },
  evonet: {
    seeds: [
      'seed-1.evonet.networks.xazab.xyz',
      'seed-2.evonet.networks.xazab.xyz',
      'seed-3.evonet.networks.xazab.xyz',
      'seed-4.evonet.networks.xazab.xyz',
      'seed-5.evonet.networks.xazab.xyz',
    ],
    network: 'evonet',
  },
  local: {
    dapiAddresses: ['127.0.0.1'],
    network: 'regtest',
  },
};
