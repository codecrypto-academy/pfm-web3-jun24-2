-include .anvil-env

deploy-anvil:; 
	forge script script/DeployBlood.s.sol:DeployBlood --rpc-url $(ANVIL_RPC_URL) --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast 

deploy-tsc:; 
	forge script script/DeployBlood.s.sol:DeployBlood --legacy --rpc-url $(TRIAS_RPC_URL) --account trias-testnet --password-file .password  --broadcast 


