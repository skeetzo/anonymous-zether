// SPDX-License-Identifier: Apache License 2.0
pragma solidity ^0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NonFungibleToken is ERC721 {
    constructor () ERC721("Anonymous Zether", "ZTH") {
        // etc
    }

    function mint(address account) external { // just for testing---expose the method.
        _mint(account);
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    // function transfer(address to, uint256 tokenId) public virtual override returns (bool) {
    //     address owner = _msgSender();
    //     _transfer(owner, to, tokenId);
    //     return true;
    // }
}
