import { assert, expect } from "chai";
import { BigNumberish } from "ethers";
import { deployments, ethers, network } from "hardhat";
import { developmentChains } from "../helper-hardhat-config";
import { MyToken } from "../typechain-types";
import { INITIAL_SUPPLY } from "../helper-hardhat-config";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import getPermitSignature from "../utils/signPermit";

developmentChains.includes(network.name)
  ? describe.skip
  : describe("MyToken Staging Test", function () {
      let myToken: MyToken,
        deployer: SignerWithAddress,
        user1: SignerWithAddress;

      beforeEach(async function () {
        const accounts = await ethers.getSigners();
        deployer = accounts[0];
        user1 = accounts[1];

        myToken = await ethers.getContract("MyToken");
      });

      describe("permit function", function () {
        it("Should permit another address to spend tokens", async function () {
          const spender = user1.address;
          const value = ethers.parseEther("1");
          const deadline = Math.floor(Date.now() / 1000) + 3600;

          // Sign the permit message
          const signed = await getPermitSignature(
            deployer,
            myToken,
            spender,
            value.toString(),
            deadline.toString()
          );

          const myTokenUser1 = myToken.connect(user1);
          await myTokenUser1.permit(
            deployer.address,
            spender,
            value,
            deadline,
            signed.v,
            signed.r,
            signed.s
          );

          // Now user1 can transfer tokens on behalf of deployer
          await myTokenUser1.transferFrom(
            deployer.address,
            user1.address,
            value
          );

          // Check the balance of user1
          const user1Balance = await myToken.balanceOf(user1.address);
          expect(user1Balance).to.equal(value);
        });
      });
    });
