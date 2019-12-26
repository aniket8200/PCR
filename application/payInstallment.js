'use strict';

// Bring key classes into scope, most importantly Fabric SDK network class
const fs = require('fs');
const yaml = require('js-yaml');
const { FileSystemWallet, Gateway } = require('fabric-network');

async function main() {

// 	Arguments : 

	const gateway = new Gateway();

	try {

		let connectionProfile = yaml.safeLoad(fs.readFileSync('../gateway/networkConnection.yaml', 'utf8'));
		
		let connectionOptions = {
	        identity: userName,
	        wallet: wallet,
	        discovery: { enabled: false, asLocalhost: true }

	    };

	    console.log('Connect to Fabric gateway.');
	    
	    await gateway.connect(connectionProfile, connectionOptions);
	    
	    const network = await gateway.getNetwork(channelName);

	    const contract = await network.getContract('contract');

	    const initiateLoanResponse = await contract.submitTransaction("payInstallment", loanKey, amountPaid, nextInstallmentAmount, nextInstallmentDate);

	    console.log("Installment Paid.");

	    console.log("Transaction Completed");
	}

	catch(error) {
		console.log(`Error processing transaction. ${error}`);
		console.log(error.stack);
	}

	finally {
		console.log('Disconnect from Fabric gateway.');
		gateway.disconnect();
	}
}

main().then(() => {

    console.log('Issue program complete.');

}).catch((e) => {

    console.log('Issue program exception.');
    console.log(e);
    console.log(e.stack);
    process.exit(-1);

});