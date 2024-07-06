// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FacialRecognition {
    mapping(address => bytes32) public userHashes;

    event UserRegistered(address indexed user, bytes32 hash);
    event UserVerified(address indexed user, bool success);

    function registerUser(bytes32 hash) public {
        userHashes[msg.sender] = hash;
        emit UserRegistered(msg.sender, hash);
    }

    function verifyUser(bytes32 hash) public returns (bool) {
        bool success = (userHashes[msg.sender] == hash);
        emit UserVerified(msg.sender, success);
        return success;
    }
}
