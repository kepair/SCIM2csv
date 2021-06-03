const axios = require('axios');
const ObjectsToCsv = require('objects-to-csv');
const isoCountries = require('./countries');
const secrets = require('./secrets');

async function makeGetRequest(uri, index) {

    const config = {
        method: 'get',
        url: secrets.URL + uri,
        headers: { 'Content-Type': 'application/scim+json' },
        auth: {
            username: secrets.username,
            password: secrets.password
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
        console. log("Users retrieved: " + count + "/" + total + "\tLast user id: " + users[users.length -1].id);
    }

    // filtering the attributes that I want in the csv. Change it to your convenience.
    var data = users.map( function(user) {
        return {
            userUuid: user.userUuid,
            id: user.id,
            userName: user.userName,
            active: user.active,
            firstname: user.name.givenName,
            lastname: user.name.familyName,
            displayName: user.displayName,
            email: user.emails[0].value,
            country: (user.addresses) ? getCountryName(user.addresses[0].country) : '',
            countryCode: (user.addresses) ? user.addresses[0].country : '',
            userType: user.userType,
            company: user.company,
            customAttribute1: (user['urn:sap:cloud:scim:schemas:extension:custom:2.0:User']) ? user['urn:sap:cloud:scim:schemas:extension:custom:2.0:User'].attributes[0].value : ''
        };
    });

    const csv = new ObjectsToCsv(data);
 
    // Save to file:
    await csv.toDisk('./export.csv');
})();



function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}