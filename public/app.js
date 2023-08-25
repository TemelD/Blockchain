window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.enable();
        } catch (error) {
            console.error("User denied account access");
        }
    } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }

    fetch('/contracts/MarriageContract.json')
        .then((response) => response.json())
        .then(async (json) => {
            let contract = json;

            const contractAddress = web3.eth.defaultAccount; 
            const contractAbi = contract.abi;
        
            const marriageContract = new web3.eth.Contract(contractAbi, contractAddress);
        
            const statusElement = document.getElementById('status');
            const marryButton = document.getElementById('marryButton');
        
            marryButton.addEventListener('click', async () => {
                let address2 = document.getElementById('address2').textContent;
                if(address2 == "") return; 

                const accounts = await web3.eth.getAccounts();
                await marriageContract.methods.setMarried().send({ from: accounts[0] });
                const married = await marriageContract.methods.getMarried().call();
                statusElement.textContent = married ? "Married!" : "Not Married";

                
            });
        
            const married = await marriageContract.methods.getMarried().call();
            statusElement.textContent = married ? "Married!" : "Not Married";
        });
});