$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"XDAI Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
        ["BAO",         `<a href="bao         ">Various</a>`,   "BAO",      "https://farms.baoswap.xyz"],
        ["LEVIN",       `<a href="levin       ">Various</a>`,   "LEVIN",    "https://farm.levinswap.org"],
        ["Honeycomb",   `<a href="honeycomb   ">Various</a>`,   "xCOMB",    "https://1hive.io"]
      ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
