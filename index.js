const axios = require('axios');

async function makeGetRequest(uri, index) {

    const config = {
        method: 'get',
        url: 'https://preferredsuccess-ias.accounts.ondemand.com/service/scim/' + uri,
        headers: { 'Content-Type': 'application/scim+json' },
        auth: {
            username: 'c4e5b890-9dae-4d52-8e6c-5f0ed48f96d8',
            password: 'ZDby7IJlZJnWqaWg7xZs1'
        },
        params: {
            startIndex: index
        }
    };

    let res = await axios(config);

    let data = res.data;
    //console.log(data);
    return data;
}

(async () => {

    let uri = 'Users';
    let res = await makeGetRequest(uri, 0);
    let total = res.totalResults;
    let page = res.itemsPerPage;
    let count = 100;
    let users = res.Resources;

    console.log("Starting loop\nTotal users: " + total + "\nItems per page: " + page + "\n");

    for (count; count < total; count += page) {
        res = await makeGetRequest(uri, count + 1);
        users = users.concat(res.Resources);
        console. log("Users retrieved: " + count + "/" + total);
    }
    console.log('Done. Last user: ' + users[length(users)-1].id);
})();