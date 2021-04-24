const { assert } = require("chai");

const KokomoToken = artifacts.require('KokomoToken');

contract('KokomoToken', ([alice, bob, carol, dev, minter]) => {
    beforeEach(async () => {
        this.cake = await KokomoToken.new({ from: minter });
    });


    it('mint', async () => {
        await this.cake.mint(alice, 1000, { from: minter });
        assert.equal((await this.cake.balanceOf(alice)).toString(), '1000');
    })
});
