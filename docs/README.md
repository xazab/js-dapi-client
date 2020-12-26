## DAPI-Client

[![NPM Version](https://img.shields.io/npm/v/@xazab/dapi-client)](https://www.npmjs.com/package/@xazab/dapi-client)
[![Build Status](https://travis-ci.com/xazab/js-dapi-client.svg?branch=master)](https://travis-ci.com/xazab/js-dapi-client)
[![Release Date](https://img.shields.io/github/release-date/xazab/js-dapi-client)](https://github.com/xazab/js-dapi-client/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

Client library used to access Xazab DAPI endpoints

This library enables HTTP-based interaction with the Xazab blockchain and Xazab
Platform via the decentralized API ([DAPI](https://github.com/xazab/dapi))
hosted on Xazab masternodes.

 - `DAPI-Client` provides automatic server (masternode) discovery using either a default seed node or a user-supplied one
 - `DAPI-Client` maps to DAPI's [RPC](https://github.com/xazab/dapi/tree/master/lib/rpcServer/commands) and [gRPC](https://github.com/xazab/dapi/tree/master/lib/grpcServer/handlers) endpoints

### Install

### ES5/ES6 via NPM

In order to use this library in Node, you will need to add it to your project as a dependency.

Having [NodeJS](https://nodejs.org/) installed, just type in your terminal :

```sh
npm install @xazab/dapi-client
```

### CDN Standalone

For browser usage, you can also directly rely on unpkg :

```
<script src="https://unpkg.com/@xazab/dapi-client"></script>
```


## Licence

[MIT](https://github.com/xazab/js-dapi-client/blob/master/LICENCE.md) © Dash Core Group, Inc. | © Xazab Foundation
