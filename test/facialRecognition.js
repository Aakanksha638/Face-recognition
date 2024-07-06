const { expect } = require('chai');
const FacialRecognition = artifacts.require('FacialRecognition');

contract('FacialRecognition', (accounts) => {
    let contractInstance;

    // Address for testing
    const userAddress = accounts[0];

    // Dummy hash for testing
    const dummyHash = web3.utils.sha3('dummyHash');
    const anotherDummyHash = web3.utils.sha3('anotherDummyHash');

    // Before each test, deploy a new contract instance
    beforeEach(async () => {
        contractInstance = await FacialRecognition.new();
    });

    it('should register a new user with a hash', async () => {
        await contractInstance.registerUser(dummyHash, { from: userAddress });
        const storedHash = await contractInstance.userHashes(userAddress);
        expect(storedHash).to.equal(dummyHash);
    });

    it('should verify a user with the correct hash', async () => {
        await contractInstance.registerUser(dummyHash, { from: userAddress });
        const isVerified = await contractInstance.verifyUser.call(dummyHash, { from: userAddress });
        expect(isVerified).to.be.true;
    });

    it('should not verify a user with an incorrect hash', async () => {
        await contractInstance.registerUser(dummyHash, { from: userAddress });
        const isVerified = await contractInstance.verifyUser.call(anotherDummyHash, { from: userAddress });
        expect(isVerified).to.be.false;
    });
});
