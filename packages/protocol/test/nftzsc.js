const NonFungibleToken = artifacts.require("NonFungibleToken");
const NFTZSC = artifacts.require("NFTZSC");
const Client = require('../../anonymous.js/src/client.js');

contract("NFTZSC", async (accounts) => {
    let alice; // will reuse...

    it("should allow minting and approving", async () => {
        const nft = await NonFungibleToken.deployed();
        const nftzsc = await NFTZSC.deployed();
        await nft.mint(accounts[0]);
        await nft.approve(nftzsc.contract._address);
        const balance = await nft.balanceOf.call(accounts[0]);
        assert.equal(
            balance,
            1,
            "Minting failed"
        );
    });

    it("should allow initialization", async () => {
        const nftzsc = await NFTZSC.deployed();
        alice = new Client(web3, nftzsc.contract, accounts[0]);
        await alice.register();
    });

    it("should allow funding", async () => {
        await alice.deposit(100);
    });

    it("should allow withdrawing", async () => {
        await alice.withdraw(10);
    });

    it("should allow transferring", async () => {
        const nftzsc = await NFTZSC.deployed();
        const bob = new Client(web3, nftzsc.contract, accounts[0]);
        const carol = new Client(web3, nftzsc.contract, accounts[0]);
        const dave = new Client(web3, nftzsc.contract, accounts[0]);
        const miner = new Client(web3, nftzsc.contract, accounts[0]);
        await Promise.all([bob.register(), carol.register(), dave.register(), miner.register()]);
        alice.friends.add("Bob", bob.account.public());
        alice.friends.add("Carol", carol.account.public());
        alice.friends.add("Dave", dave.account.public());
        alice.friends.add("Miner", miner.account.public());
        await alice.transfer("Bob", 10, ["Carol", "Dave"], "Miner");
        await new Promise((resolve) => setTimeout(resolve, 100));
        assert.equal(
            bob.account.balance(),
            10,
            "Transfer failed"
        );
        const fee = await nftzsc.fee.call();
        assert.equal(
            miner.account.balance(),
            fee,
            "Fees failed"
        );
    });
});