const userService = (() => {
  function isAuth() {
    return sessionStorage.getItem('authtoken') !== null;
  }

  function saveSession(res) {
    sessionStorage.setItem('username', res['username']);
    sessionStorage.setItem('authtoken', res['user-token']);
    sessionStorage.setItem('creator', res['ownerId']);
  }

  function register(username, password) {
    return backendless.post('users', 'register', 'basic', {
      username,
      password
    })
  }

  function login(username, password) {
    return backendless.post('users', 'login', 'basic', {
      login : username,
      password
    });
  }

  function logout() {
    return backendless.get('users', 'logout', 'backendless');
  }

  return {
    register,
    login,
    logout,
    saveSession,
    isAuth,
  }
})()