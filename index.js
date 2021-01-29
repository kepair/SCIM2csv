const axios = require('axios');

async function makeGetRequest() {

    const config = {
        method: 'get',
        url: 'https://preferredsuccess-ias.accounts.ondemand.com/service/scim/Users/P000251',
        headers: { 'Content-Type': 'application/scim+json' },
        auth: {
            username: 'c4e5b890-9dae-4d52-8e6c-5f0ed48f96d8',
            password: 'ZDby7IJlZJnWqaWg7xZs1'
        }
    }

    let res = await axios(config)

    let data = res.data;
    console.log(data);
}

makeGetRequest();