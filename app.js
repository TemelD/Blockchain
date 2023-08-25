const express = require('express');
const app = express();
const path = require('path');
const Web3 = require('web3');
const TruffleContract = require('truffle-contract');
const MarriageContract = require('./build/contracts/MarriageContract.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
const web3 = new Web3(web3Provider);
const marriageContract = TruffleContract(MarriageContract);
marriageContract.setProvider(web3Provider);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/create-contract', async (req, res) => {
    const spouse1 = req.body.spouse1;
    const spouse2 = req.body.spouse2;
    const accounts = await web3.eth.getAccounts();

    const contractInstance = await marriageContract.new(spouse1, spouse2, { from: accounts[0] });

    res.send(`Marriage contract deployed at address: ${contractInstance.address}`);
});

app.get('/create-contract', async (req, res) => {
    res.redirect('/');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
