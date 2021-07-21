$(function() {
  main()
});

const main = async() => {

  let tableData = {
    "title":"FANTOM Network",
    "heading":["Pool Provider","LP", "Reward Tokens", "INFO"],
    "rows": [
      [
        "Popsicle",
        `<a href='popsicle'>Various</a>`,
        "ICE",
        "https://popsicle.finance"
      ],
      [
        "Spooky",
        `<a href='spooky'>Various</a>`,
        "boo",
        "https://spookyswap.finance"
      ],
      [
        "Spirit",
        `<a href='spirit'>Various</a>`,
        "SPIRIT",
        "https://app.spiritswap.finance"
      ],
      [
        "Borg",
        `<a href='borg'>Various</a>`,
        "SON",
        "https://ftm.borgswap.exchange"
      ],
      [
        "Hyperjump",
        `<a href='hyperjump'>Various</a>`,
        "ORI",
        "https://hyperjump.fi"
      ],
      [
        "Ester",
        `<a href='ester'>Various</a>`,
        "EST",
        "https://ester.finance"
      ],
      [
        "Froyo",
        `<a href='froyo'>Various</a>`,
        "FROYO",
        "https://frozenyogurt.finance"
      ],
      [
        "Ghost",
        `<a href='ghost'>Various</a>`,
        "GHOST",
        "https://www.theghost.finance"
      ],
      [
        "Beefy",
        `<a href='beefy'>Various</a>`,
        "Various",
        "https://fantom.beefy.finance"
      ],
      [
        "Liquid Driver",
        `<a href='liquid'>Various</a>`,
        "LQDR",
        "https://www.liquiddriver.finance"
      ],
      [
        "Mushrooms",
        `<a href='mushrooms'>Various</a>`,
        "MM",
        "https://mushrooms.finance/farms"
      ],
      [
        "Greenhouse",
        `<a href='greenhouse'>Various</a>`,
        "SEED",
        "https://thegreenhouse.finance"
      ],
      [
        "Stake Steak",
        `<a href='steak'>Various</a>`,
        "STEAK",
        "https://stakesteak.com"
      ],
      [
        "Frankenstein",
        `<a href='frankenstein'>Various</a>`,
        "FRANK",
        "https://frankenstein.finance"
      ],
      [
        "Waka",
        `<a href='waka'>Various</a>`,
        "WAKA",
        "https://waka.finance"
      ],
      [
        "Elk",
        `<a href='elk'>Various</a>`,
        "ELK",
        "https://app.elk.finance"
      ],
      [
        "Paintswap",
        `<a href='paintswap'>Various</a>`,
        "BRUSH",
        "https://paintswap.finance"
      ],
      [
        "Tomb",
        `<a href='tomb'>Various</a>`,
        "Various",
        "https://tomb.finance"
      ],
      [
        "Shadow",
        `<a href='shadow'>Various</a>`,
        "Various",
        "https://shadowswap.app"
      ],
      [
        "Borgswap",
        `<a href='borgswap'>Various</a>`,
        "KLING",
        "https://klingftm.borgswap.exchange"
      ],
      [
        "Opera",
        `<a href='opera'>Various</a>`,
        "OPERA",
        "https://www.operaswap.finance"
      ],
      [
        "Chad",
        `<a href='chad'>Various</a>`,
        "CHAD",
        "https://www.chadfinance.io"
      ],
      [
        "Guru",
        `<a href='guru'>Various</a>`,
        "ELITE",
        "https://ftm.guru"
      ],
      [
        "Rediant",
        `<a href="rediant">Various</a>`,
        "RDT",
        "https://rediant.finance"
      ],
      [
        "Mlnl",
        `<a href="mlnl">Various</a>`,
        "Various",
        "https://milfinance.xyz"
      ],
      [
        "Yorocoon",
        `<a href="yorocoon">Various</a>`,
        "CATNIP",
        "https://yorocoon.com"
      ],
      [
        "Balloon Farms",
        `<a href='balloonfarms'>Various</a>`,
        "BALLOON",
        "https://www.fantomballoons.com"
      ],
      [
        "Spoon",
        `<a href='spoon'>Various</a>`,
        "SPOON",
        "https://app.spoon.finance"
      ],
      [
        "Bullrun",
        `<a href='bullrun'>Various</a>`,
        "BULL",
        "https://fantom.bullrun.finance"
      ],
      [
        "Strangebrew",
        `<a href='strangebrew'>Various</a>`,
        "BEERMONEY",
        "https://www.strangebrew.finance"
      ],
      [
        "Uniron",
        `<a href='uniron'>Various</a>`,
        "UNIRON",
        "https://www.uniron.finance"
      ],
      [
        "Shade",
        `<a href='shade'>Various</a>`,
        "SHADE",
        "https://shade.cash"
      ],
      [
        "Butt",
        `<a href='butt'>Various</a>`,
        "BUTT",
        "https://www.buttcoincrypto.com"
      ],
      [
        "Grim",
        `<a href='grim'>Various</a>`,
        "Various",
        "https://app.grim.finance"
      ],
      [
        "Ryu Inu",
        `<a href='ryuinu'>Various</a>`,
        "RYUINU",
        "https://ftm.ryuinu.finance"
      ],
      [
        "Knight",
        `<a href='knight'>Various</a>`,
        "KF",
        "https://www.knight-finance.xyz"
      ],
      [
        "beHODL",
        `<a href='behodl'>Various</a>`,
        "beHODL",
        "N/A"
      ],
      [
        "AURA",
        `<a href='aura'>Various</a>`,
        "AURA",
        "https://dapp.aurafi.org/"
      ],
    ]
  }

  let table = new AsciiTable().fromJSON(tableData);
  document.getElementById('log').innerHTML += table + '<br />';
  hideLoading();
}
