import cf from 'cloudfront';
const kvsHandle = cf.kvs();


function handler(event) {

    var request = event.request;
    var headers = request.headers;
    let authUser = "";
    let authPass = "";
  
    // basic auth
    authUser = await kvsHandle.get("authUser");
    authPass = await kvsHandle.get("authPass");
    var authString = 'Basic ' + (authUser + ':' + authPass).toString('base64');
    var uri = request.uri;
    if (typeof headers.authorization == 'undefined' || headers.authorization.value != authString) {
        var response = {
            statusCode: 401,
            statusDescription: 'Unauthorized',
            headers: {
                'www-authenticate': {
                    'value' : 'Basic realm="Enter credentials."'
                }
            }
        };
        return response;
    }


    if (uri == '/') {
        request.uri += 'home/index.html';
    }

    else if (uri.endsWith('/')) {
        request.uri += 'index.html';
    }
    else if (!uri.includes('.')) {
        request.uri += '/index.html';
    }
    return request;
}