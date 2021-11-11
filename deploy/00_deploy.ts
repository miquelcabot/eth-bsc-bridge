/* eslint-disable no-console */
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { TokenETH } from '../typechain/TokenETH';
// eslint-disable-next-line camelcase
import { TokenETH__factory } from '../typechain/factories/TokenETH__factory';
import { TokenBSC } from '../typechain/TokenBSC';
// eslint-disable-next-line camelcase
import { TokenBSC__factory } from '../typechain/factories/TokenBSC__factory';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let owner: SignerWithAddress;
  // eslint-disable-next-line prefer-const
  [owner] = await ethers.getSigners();

  const chainId = await getChainId();

  if (chainId == '4') { // ----- rinkeby ---------------------------------------
    console.log(`Deploying to chainId ${chainId} - Rinkeby`);

    // Deploy TokenETH
    const tokenETH = await deploy('TokenETH', {
      from: deployer,
      args: [],
      log: true
    });

    // Mint to owner
    const tokenETHContract: TokenETH = TokenETH__factory.connect(tokenETH.address, owner);
    await tokenETHContract.mint(
      owner.address,
      ethers.utils.parseEther('1000')
    );

    // Deploy BridgeETH
    const bridgeETH = await deploy('BridgeETH', {
      from: deployer,
      args: [tokenETH.address],
      log: true
    });

    // Set owner to bridgeETH
    await tokenETHContract.updateOwner(
      bridgeETH.address
    );
  } else if (chainId == '97') { // ----- bsctest -------------------------------
    console.log(`Deploying to chainId ${chainId} - BSCtest`);

    // Deploy TokenBSC
    const tokenBSC = await deploy('TokenBSC', {
      from: deployer,
      args: [],
      log: true
    });

    // Deploy BridgeBSC
    const bridgeBSC = await deploy('BridgeBSC', {
      from: deployer,
      args: [tokenBSC.address],
      log: true
    });

    // Set owner to bridgeBSC
    const tokenBSCContract: TokenBSC = TokenBSC__factory.connect(tokenBSC.address, owner);
    await tokenBSCContract.updateOwner(
      bridgeBSC.address
    );
  }
};

func.tags = ['TokenETH', 'BridgeETH', 'TokenBSC', 'BridgeBSC'];

export default func;
