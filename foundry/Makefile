-include .anvil-env

ARGS ?= "Dodot", "Madrid", 1
WALLET ?= ""
deploy-anvil:; 
	forge script script/DeployBlood.s.sol:DeployBlood --rpc-url $(ANVIL_RPC_URL) --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --broadcast 

deploy-tsc:; 
	forge script script/DeployBlood.s.sol:DeployBlood --legacy --rpc-url $(TRIAS_RPC_URL) --account trias-testnet --password-file .password  --broadcast 

script-run:;
	forge script script/Actions.s.sol:Actions --legacy --rpc-url $(TRIAS_RPC_URL) --account trias-testnet --password-file .password 

script-signUp:;
	forge script script/Actions.s.sol:Actions $(SIGNUP) -s "signUp(string,string,uint8)" --legacy --rpc-url $(TRIAS_RPC_URL) --account $(WALLET) --password-file .password --broadcast

script-donate:;
	forge script script/Actions.s.sol:Actions $(ARGS) -s "donate(address)" --legacy --rpc-url $(TRIAS_RPC_URL) --account $(WALLET) --password-file .password --broadcast


