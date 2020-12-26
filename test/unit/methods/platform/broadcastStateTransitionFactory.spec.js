const {
  v0: {
    BroadcastStateTransitionRequest,
    BroadcastStateTransitionResponse,
    PlatformPromiseClient,
  },
} = require('@xazab/dapi-grpc');

const XazabPlatformProtocol = require('@xazab/dpp');

const getDataContractFixture = require('@xazab/dpp/lib/test/fixtures/getDataContractFixture');

const broadcastStateTransitionFactory = require('../../../../lib/methods/platform/broadcastStateTransitionFactory');

describe('broadcastStateTransitionFactory', () => {
  let grpcTransportMock;
  let broadcastStateTransition;
  let options;
  let stateTransitionFixture;
  let response;

  beforeEach(function beforeEach() {
    response = new BroadcastStateTransitionResponse();

    grpcTransportMock = {
      request: this.sinon.stub().resolves(response),
    };

    const dataContractFixture = getDataContractFixture();
    const dpp = new XazabPlatformProtocol();
    stateTransitionFixture = dpp.dataContract.createStateTransition(dataContractFixture);

    options = {
      timeout: 1000,
    };

    broadcastStateTransition = broadcastStateTransitionFactory(grpcTransportMock);
  });

  it('should broadcast state transition', async () => {
    const result = await broadcastStateTransition(stateTransitionFixture, options);

    const request = new BroadcastStateTransitionRequest();
    request.setStateTransition(stateTransitionFixture);

    expect(grpcTransportMock.request).to.be.calledOnceWithExactly(
      PlatformPromiseClient,
      'broadcastStateTransition',
      request,
      options,
    );
    expect(result).to.equal(response);
  });
});
