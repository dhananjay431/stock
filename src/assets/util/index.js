//www.nseindia.com/api/equity-master
//https://www.nseindia.com/api/allIndices
function f(url) {
  return fetch(url).then((r) => {
    return r.json();
  });
}
f("https://www.nseindia.com/api/equity-master").then((r) => {
  let all = {};
  for (let i in r) {
    all[i] = r[i].map((d) => {
      return f("https://www.nseindia.com/api/equity-stockIndices?index=" + d);
    });
    Promise.all(all[i]).then((resp) => {
      all[i] = resp;
    });
  }
  console.log(all);
});
