
#  Sign up DC
# ARGS='"Hospital La Fe", "Valencia", 1' WALLET="donationCenter" make script-signUp
# #  Sign up Lab
# ARGS='"Roche", "Madrid", 2' WALLET="laboratory" make script-signUp
# #  Sign up Trader
# ARGS='"Johnson & Johnson", "Madrid", 3' WALLET="trader" make script-signUp

# Donate
# ARGS='0x625acD3d2Be745ae2cf042749a0FEdAF63342b78' WALLET="donationCenter" make script-donate
source ../.env.local



cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "signUp(string,string,uint8)" "Hospital La Fe", "Valencia", 1 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account donationCenter --password-file .password
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "signUp(string,string,uint8)" "Hospital La Fe", "Valencia", 2 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "signUp(string,string,uint8)" "Hospital La Fe", "Valencia", 3 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account trader --password-file .password

# Donate function
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "donate(address)" "0x625acD3d2Be745ae2cf042749a0FEdAF63342b78" --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account donationCenter --password-file .password --value 0.001ether
# Enviar al Laboratorio
cast send $NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS "transferFrom(address,address,uint256)" 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 1 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account donationCenter --password-file .password

# Procesar
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "process(uint256)" 1 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password


cast send $NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS "approve(address,uint256)" $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS 2 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "listItem(address,uint256,uint256)" $NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS 2 120 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS "approve(address,uint256)" $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS 3 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "listItem(address,uint256,uint256)" $NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS 3 1150 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS "approve(address,uint256)" $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS 4 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "listItem(address,uint256,uint256)" $NEXT_PUBLIC_BLD_DONATION_CONTRACT_ADDRESS 4 11212234 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password



# List item function 

cast send $NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS "approve(address,uint256)" $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS 1 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "listItem(address,uint256,uint256)" $NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS 1 1 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS "approve(address,uint256)" $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS 2 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "listItem(address,uint256,uint256)" $NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS 2 1 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS "approve(address,uint256)" $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS 3 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password
cast send $NEXT_PUBLIC_BLD_TRACKER_CONTRACT_ADDRESS "listItem(address,uint256,uint256)" $NEXT_PUBLIC_BLD_DERIVATIVE_CONTRACT_ADDRESS 3 1 --legacy --rpc-url $NEXT_PUBLIC_NETWORK_RPC --account laboratory --password-file .password


