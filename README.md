# ERC-20 TestToken 

# With extra USD conversion function

Specifications;
1. Create Symbol: Test, ERC 20 Contract 
2. Add Contract function for Get/Set Token USD price 
3. Add Contract function to get Total USD price of minted tokens (Contract Owner can be able to call This function )

TESTING

In terminal command line:

npm install -g truffle

truffle test

OR

truffle develop

deploy

let instance = await TestToken.at('address of contract see output from last command deploy')

instance.getTotalUSDPriceMintedTokens()

instance.setTokenUSDPrice(150)

instance.getTokenUSDPrice(150)

