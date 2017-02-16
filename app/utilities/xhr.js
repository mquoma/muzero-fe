// NOTE: for the most part you should use fetch, which is a spec to ultimately
// replace xhr (https://github.com/github/fetch)
// but for a few of our api calls, it doesn't work quite right.
// Namely, the initial call to login. it needs to send params
// in a very specific way. Instead of mucking around with it, I just wrapped
// XMLHttpRequest here for convenience. Not the final answer.
//

export function postFormUrlEncoded (url, params, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(params);

  xhr.onreadystatechange = function () {

    let data;
    if (xhr.responseText && xhr.readyState === 4) {
      try {
        data = JSON.parse(xhr.responseText);
      } catch (err) {
        return cb(err);
      }

      if (xhr.status === 400) {
        cb('Invalid username or password');
      }

      return cb(null, data);
    };
  };
}
