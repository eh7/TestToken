# ERC-20 TestToken 

# With extra USD conversion function

Specifications;
1. Create Symbol: Test, ERC 20 Contract 
2. Add Contract function for Get/Set Token USD price 
3. Add Contract function to get Total USD price of minted tokens (Contract Owner can be able to call This function )


TESTING SETUP

commands to setup dev environment:

> git clone https://github.com/eh7/TestToken.git

> cd TestToken

> npm install -g truffle


THEN TO TEST

> truffle test

OR

TO INTERACT WITH CONTRACT IN THE CONSOLE 

> truffle develop

> deploy

> let instance = await TestToken.at('address of contract see output from last command deploy, TestToken.address')

> instance.getTotalUSDPriceMintedTokens()

> instance.setTokenUSDPrice(150)

> instance.getTokenUSDPrice()

> ...other.contract.methods...


# PART 2 Task

-Create simple ERC20 token 

-Create library to add/remove address to blacklist in contract(be able to call add/remove function for only contract owner) 

-When user mint token, check if that user address is in blacklist or not 

-if user address is not in blacklist, then check if current date is before 3/31/2021. 

-if current date is before 3/31/2021, user can't mint token


