const axios = require('axios');

const bltelecomsAPI = (url, method, data = {}) => {
    return axios({
        url: url,
        method: method,
        baseURL: "https://api.qa.bltelecoms.net/v2",
        data: data,
        auth: {
            username: 'bld',
            password: 'ornuk3i9vseei125s8qea71kub',
        },
        headers: {
            'apikey': '5a4df9b9-f749-4bae-8ecb-8f8e872101f6',
        }
    })
}

module.exports = {
    bltelecomsAPI
};