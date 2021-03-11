# ERC-20 TestToken 

# With extra USD conversion function

Specifications;
1. Create Symbol: Test, ERC 20 Contract 
2. Add Contract function for Get/Set Token USD price 
3. Add Contract function to get Total USD price of minted tokens (Contract Owner can be able to call This function )

TESTING

commands to setup dev environment:
> git clone https://github.com/eh7/TestToken.git
> cd TestToken
> npm install -g truffle

THEN TO TEST

> truffle test

OR

> truffle develop

> deploy

> let instance = await TestToken.at('address of contract see output from last command deploy')

> instance.getTotalUSDPriceMintedTokens()

> instance.setTokenUSDPrice(150)

> instance.getTokenUSDPrice()

