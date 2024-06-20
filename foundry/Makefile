-include .env

build:; forge build

deploy-sepolia:; 
	forge script script/DeployBlood.s.sol:DeployBlood --rpc-url $(SEPOLIA_RPC_URL) --account sepoliaWallet --password-file .password --sender $(SEPOLIA_WALLET) --broadcast --verify --etherscan-api-key $(API_KEY) -vvvv

deploy-anvil:; 
	forge script script/DeployBlood.s.sol:DeployBlood --rpc-url $(ANVIL_RPC_URL) --account anvilWallet --password-file .password  --broadcast 

withdraw:
	cast send $(CONTRACT_ADDRESS) "withdraw()" --rpc-url $(SEPOLIA_RPC_URL) --account sepoliaWallet --password-file .password