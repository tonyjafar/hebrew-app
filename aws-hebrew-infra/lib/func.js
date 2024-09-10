function handler(event) {
    var request = event.request;
    var uri = request.uri;


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