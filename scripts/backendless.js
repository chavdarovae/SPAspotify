const backendless = (() => {
  const applicationId = '78DE0410-AD96-29FB-FF6E-194CA0252E00';
  const RESTApiKey = '6BF3E431-3FCF-4C13-B308-9333EA65B895';

  function makeAuth(auth) {
    if (auth == 'basic') {
      return {
        'Content-Type': 'application/json'
      }
    } else {
      return {
        'Content-Type': 'application/json',
        'user-token': `${sessionStorage.getItem('authtoken')}`
      }
    }
  }

  function makeRequest(method, collection, endpoint, auth) {
    return {
      url: `https://api.backendless.com/${applicationId}/${RESTApiKey}/${collection}/${endpoint}`,
      method,
      headers: makeAuth(auth)
    }
  }

  function post(collection, endpoint, auth, data) {
    let req = makeRequest('POST', collection, endpoint, auth);
    req.data = JSON.stringify(data);
    return $.ajax(req);
  }

  function get(collection, endpoint, auth) {
    let req = makeRequest('GET', collection, endpoint, auth);
    return $.ajax(req);
  }

  function update(collection, endpoint, auth, data) {
    let req = makeRequest('PUT', collection, endpoint, auth);
    req.data = JSON.stringify(data);
    return $.ajax(req);
  }

  function remove(collection, endpoint, auth) {
    let req = makeRequest('DELETE', collection, endpoint, auth);
    return $.ajax(req);
  }

  return {
    get,
    post,
    update,
    remove
  }
})()