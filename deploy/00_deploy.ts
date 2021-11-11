/* eslint-disable no-console */
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { ethers } from 'hardhat';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

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

    // Deploy BridgeETH
    await deploy('BridgeETH', {
      from: deployer,
      args: [tokenETH.address],
      log: true
    });
  } else if (chainId == '97') { // ----- bsctest -------------------------------
    console.log(`Deploying to chainId ${chainId} - BSCtest`);

    // Deploy TokenBSC
    const tokenBSC = await deploy('TokenBSC', {
      from: deployer,
      args: [],
      log: true
    });

    await deploy('BridgeBSC', {
      from: deployer,
      args: [tokenBSC.address],
      log: true
    });
  }

};

func.tags = ['TokenETH', 'BridgeETH'];

export default func;
