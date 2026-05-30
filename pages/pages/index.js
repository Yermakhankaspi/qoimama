import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const OSTATOK_DATA = [
  {img:'рџ“¦',name:'РћСЃРЅРѕРІ РџСѓР»СЊС‚',code:'373154061',art:'',stock:1578,min:2,reserve:0,wait:0,avail:1576,unit:'',days:72.68,cost:183.90,totalCost:290187.00,sell:0,totalSell:0},
  {img:'рџЋ§',name:'CS-РЎРµСЂРґРёС‡РєР° AirPods 4 СЂРѕР·РѕРІС‹Р№',code:'092353390',art:'',stock:976,min:0,reserve:0,wait:0,avail:976,unit:'',days:124.89,cost:249.02,totalCost:243044.00,sell:990,totalSell:966240.00},
  {img:'рџ’»',name:'РћСЃРЅРѕРІРЅРѕР№ РќР°РєР»Р°РґРєР° CS-US 13.6',code:'866717647',art:'',stock:655,min:2,reserve:0,wait:0,avail:653,unit:'',days:144.75,cost:395.00,totalCost:258725.00,sell:1490,totalSell:975950.00},
  {img:'рџ“·',name:'РџСЂРѕСЃС‚РѕР№ С€С‚Р°С‚РёРІ CS-PH1111 С‡РµСЂРЅС‹Р№',code:'241235696',art:'',stock:594,min:5,reserve:0,wait:0,avail:589,unit:'',days:50.8,cost:1117.17,totalCost:663600.00,sell:0,totalSell:0},
  {img:'рџ’Ў',name:'Р›Р°РјРїР° MJ-26',code:'999524178',art:'',stock:527,min:0,reserve:0,wait:0,avail:527,unit:'С€С‚',days:76.04,cost:1274.97,totalCost:671908.00,sell:0,totalSell:0},
  {img:'вљЅ',name:'РЁР°СЂРёРє 180РіСЂР°РґСѓСЃ',code:'999524190',art:'',stock:513,min:1,reserve:0,wait:0,avail:512,unit:'С€С‚',days:46.44,cost:147.63,totalCost:75734.00,sell:0,totalSell:0},
  {img:'рџ’Ў',name:'Р›Р°РјРїР° MJ-33',code:'999524179',art:'',stock:486,min:0,reserve:0,wait:0,avail:486,unit:'С€С‚',days:74.3,cost:1762.62,totalCost:856632.00,sell:0,totalSell:0},
  {img:'рџЋ§',name:'CS-РЎРµСЂРґРёС‡РєР° AirPods Pro 2 СЂРѕР·РѕРІС‹Р№',code:'955860932',art:'',stock:477,min:0,reserve:0,wait:0,avail:477,unit:'',days:127.43,cost:249.65,totalCost:119081.00,sell:0,totalSell:0},
  {img:'рџ”§',name:'Р”РµСЂР¶Р°С‚РµР»СЊ CLASSNO CS-Der01 С‡РµСЂРЅС‹Р№',code:'775926997',art:'',stock:475,min:1,reserve:0,wait:0,avail:474,unit:'',days:45.14,cost:117.39,totalCost:55762.00,sell:0,totalSell:0},
  {img:'рџ’Ў',name:'Р›Р°РјРїР° PL-26',code:'999524187',art:'',stock:416,min:2,reserve:0,wait:0,avail:414,unit:'С€С‚',days:62.48,cost:1468.95,totalCost:611083.00,sell:0,totalSell:0},
  {img:'рџ“·',name:'РћСЃРЅРѕРІ РќР°РїРѕР»СЊРЅС‹Р№ С€С‚Р°С‚РёРІ CS-HT2100 С‡РµСЂРЅС‹Р№',code:'058275010',art:'',stock:413,min:1,reserve:0,wait:0,avail:412,unit:'',days:44.93,cost:1741.83,totalCost:719376.00,sell:0,totalSell:0},
  {img:'рџЋ§',name:'CS-РЎРµСЂРґРёС‡РєР° AirPods 3 СЂРѕР·РѕРІС‹Р№',code:'582353308',art:'',stock:405,min:0,reserve:0,wait:0,avail:405,unit:'',days:141.02,cost:252.51,totalCost:102265.00,sell:0,totalSell:0},
  {img:'рџЋ§',name:'CS-РЎРµСЂРґРёС‡РєР° AirPods 2 СЂРѕР·РѕРІС‹Р№',code:'990244442',art:'',stock:362,min:1,reserve:0,wait:0,avail:361,unit:'',days:144.78,cost:253.00,totalCost:91586.00,sell:0,totalSell:0},
  {img:'рџ’Ў',name:'РћСЃРЅРѕРІРЅРѕР№ РЎРѕС„С‚Р±РѕРєСЃ 4Р»Р°РјРїС‹',code:'999524191',art:'',stock:316,min:1,reserve:0,wait:0,avail:315,unit:'С€С‚',days:97.64,cost:3326.22,totalCost:1051084.00,sell:0,totalSell:0},
  {img:'рџ’Ў',name:'Р›Р°РјРїР° Рњ-26',code:'999524182',art:'',stock:311,min:1,reserve:0,wait:0,avail:310,unit:'С€С‚',days:46.96,cost:868.09,totalCost:269976.00,sell:0,totalSell:0},
  {img:'рџ’Ў',name:'РћСЃРЅРѕРІРЅРѕР№ РЎРѕС„С‚Р±РѕРєСЃ 1Р»Р°РјРїР°',code:'999524188',art:'',stock:303,min:1,reserve:0,wait:0,avail:302,unit:'С€С‚',days:97.44,cost:1991.27,totalCost:603356.00,sell:0,totalSell:0},
  {img:'рџЋ§',name:'SIL-PN AirPods 4 СЂРѕР·РѕРІС‹Р№',code:'746726184',art:'',stock:289,min:0,reserve:0,wait:0,avail:289,unit:'',days:124.61,cost:106.78,totalCost:30860.00,sell:0,totalSell:0},
  {img:'рџ“±',name:'РћСЃРЅРѕРІ RM-SGR iPad A16 СЃРµСЂС‹Р№',code:'825437522',art:'',stock:289,min:0,reserve:0,wait:0,avail:289,unit:'',days:102.78,cost:1110.62,totalCost:320970.00,sell:4990,totalSell:1442110.00},
  {img:'рџ“±',name:'РћСЃРЅРѕРІРЅРѕР№ Р§РµС…РѕР» ZP-PN A16 СЂРѕР·РѕРІС‹Р№',code:'683051645',art:'',stock:269,min:0,reserve:0,wait:0,avail:269,unit:'',days:102.15,cost:823.49,totalCost:221520.00,sell:4990,totalSell:1342310.00},
  {img:'вЊљ',name:'Apple Watch 40mm С‡РµСЂРЅС‹Р№',code:'505974677',art:'',stock:265,min:0,reserve:0,wait:0,avail:265,unit:'',days:136.78,cost:194.34,totalCost:51500.00,sell:0,totalSell:0},
  {img:'рџ“±',name:'Р§РµС…РѕР» РїР»Р°РЅС€РµС‚ RM A16 СЃРµСЂС‹Р№',code:'825437522',art:'',stock:428,min:0,reserve:0,wait:0,avail:428,unit:'',days:0,cost:1533,totalCost:656124.00,sell:2400,totalSell:1027200.00},
  {img:'рџ“±',name:'Р§РµС…РѕР» РїР»Р°РЅС€РµС‚ RM A16 СЂРѕР·РѕРІС‹Р№',code:'964634472',art:'',stock:294,min:0,reserve:0,wait:0,avail:294,unit:'',days:0,cost:1533,totalCost:450702.00,sell:2400,totalSell:705600.00},
  {img:'рџ“±',name:'Р§РµС…РѕР» KB-PN iPad A16 СЂРѕР·РѕРІС‹Р№',code:'925013454',art:'',stock:330,min:0,reserve:0,wait:0,avail:330,unit:'',days:0,cost:3227,totalCost:1064910.00,sell:5000,totalSell:1650000.00},
  {img:'рџ“±',name:'Р§РµС…РѕР» iPad KB-LC A16 СЃРёСЂРµРЅРµРІС‹Р№',code:'323079735',art:'',stock:214,min:0,reserve:0,wait:0,avail:214,unit:'',days:0,cost:3227,totalCost:690578.00,sell:5000,totalSell:1070000.00},
  {img:'рџ“±',name:'Р§РµС…РѕР» KB-BLK A16 С‡РµСЂРЅС‹Р№',code:'605751597',art:'',stock:188,min:0,reserve:0,wait:0,avail:188,unit:'',days:0,cost:3227,totalCost:606676.00,sell:5000,totalSell:940000.00},
  {img:'рџ“±',name:'Р§РµС…РѕР» iPad KB-LBL A16 РіРѕР»СѓР±РѕР№',code:'100237006',art:'',stock:152,min:0,reserve:0,wait:0,avail:152,unit:'',days:0,cost:3227,totalCost:490504.00,sell:5000,totalSell:760000.00},
  {img:'рџ”Њ',name:'Р—Рќ Р—Р°СЂСЏРґРєР° Type-C 65Р’С‚ С‡РµСЂРЅС‹Р№',code:'944890555',art:'',stock:800,min:0,reserve:0,wait:0,avail:800,unit:'',days:0,cost:1962,totalCost:1569600.00,sell:3000,totalSell:2400000.00},
  {img:'рџ“¦',name:'CLASSNO CS-BT01',code:'373154061',art:'',stock:1790,min:0,reserve:0,wait:0,avail:1790,unit:'',days:0,cost:159,totalCost:284610.00,sell:300,totalSell:537000.00},
  {img:'рџ”Њ',name:'Р—Рќ HP CS-H462 19.5V 4.62A',code:'412197805',art:'',stock:235,min:0,reserve:0,wait:0,avail:235,unit:'',days:0,cost:1625,totalCost:381875.00,sell:2500,totalSell:587500.00},
  {img:'рџ”Њ',name:'Р—Рќ Lenovo 90W 20V 4.5A 5.5x2.5',code:'360562448',art:'',stock:91,min:0,reserve:0,wait:0,avail:91,unit:'',days:0,cost:1625,totalCost:147875.00,sell:2500,totalSell:227500.00},
  {img:'рџ’Ў',name:'Р›Р°РјРїРѕС‡РєР° 15РІР°С‚',code:'115932179',art:'',stock:892,min:0,reserve:0,wait:0,avail:892,unit:'',days:0,cost:230,totalCost:205160.00,sell:380,totalSell:338960.00},
  {img:'рџ’Ў',name:'Р›Р°РјРїРѕС‡РєР° 50РІР°С‚',code:'133227473',art:'',stock:303,min:0,reserve:0,wait:0,avail:303,unit:'',days:0,cost:900,totalCost:272700.00,sell:1400,totalSell:424200.00},
  {img:'рџ“·',name:'CLASSNO RGB CS-P225',code:'852664139',art:'',stock:36,min:0,reserve:0,wait:0,avail:36,unit:'',days:0,cost:7000,totalCost:252000.00,sell:11000,totalSell:396000.00},
  {img:'рџ’Ў',name:'Р›Р°РјРїР° RL-14',code:'999524184',art:'',stock:122,min:0,reserve:0,wait:0,avail:122,unit:'С€С‚',days:0,cost:6300,totalCost:768600.00,sell:9500,totalSell:1159000.00},
  {img:'рџ’Ў',name:'Р›Р°РјРїР° RL-18',code:'999524185',art:'',stock:69,min:0,reserve:0,wait:0,avail:69,unit:'С€С‚',days:0,cost:10100,totalCost:696900.00,sell:15000,totalSell:1035000.00},
  {img:'рџ’Ў',name:'Р›Р°РјРїР° RL-21',code:'999524186',art:'',stock:70,min:0,reserve:0,wait:0,avail:70,unit:'С€С‚',days:0,cost:11500,totalCost:805000.00,sell:17000,totalSell:1190000.00},
  {img:'рџ”Њ',name:'Р—Рќ TYPE-C 5-20V 3.25A 65W',code:'579327925',art:'',stock:34,min:0,reserve:0,wait:0,avail:34,unit:'',days:0,cost:2037,totalCost:69258.00,sell:3200,totalSell:108800.00},
  {img:'рџ”Њ',name:'Р—Рќ Acer CS-A11 19V 3.42A 5.5x1.7РјРј',code:'616239656',art:'',stock:107,min:0,reserve:0,wait:0,avail:107,unit:'',days:0,cost:1559,totalCost:166813.00,sell:2400,totalSell:256800.00},
  {img:'рџ”Њ',name:'Р—Рќ Acer CS-Ac342T 19V 3.42A 3.0x1.1РјРј',code:'218235477',art:'',stock:98,min:0,reserve:0,wait:0,avail:98,unit:'',days:0,cost:1559,totalCost:152782.00,sell:2400,totalSell:235200.00},
  {img:'рџ”Њ',name:'Р—Рќ Acer CS-Ac007 LP514 19V 4.74A',code:'970316907',art:'',stock:38,min:0,reserve:0,wait:0,avail:38,unit:'',days:0,cost:1634,totalCost:62092.00,sell:2600,totalSell:98800.00},
  {img:'рџ“±',name:'РЎС‚РµРєР»Рѕ 6/7mini',code:'283359932',art:'',stock:61,min:0,reserve:0,wait:0,avail:61,unit:'',days:0,cost:300,totalCost:18300.00,sell:500,totalSell:30500.00},
  {img:'рџ“±',name:'РЎС‚РµРєР»Рѕ РѕСЃРЅРѕРІРЅРѕР№ Air 11',code:'697614677',art:'',stock:46,min:0,reserve:0,wait:0,avail:46,unit:'',days:0,cost:300,totalCost:13800.00,sell:500,totalSell:23000.00},
  {img:'рџ“±',name:'РЎС‚РµРєР»Рѕ Рђ16',code:'592196764',art:'',stock:418,min:0,reserve:0,wait:0,avail:418,unit:'',days:0,cost:300,totalCost:125400.00,sell:500,totalSell:209000.00},
  {img:'рџ“±',name:'РЎС‚РµРєР»Рѕ SG iPad A16',code:'251595247',art:'',stock:27,min:0,reserve:0,wait:0,avail:27,unit:'',days:0,cost:1161,totalCost:31347.00,sell:1800,totalSell:48600.00},
  {img:'вњЏпёЏ',name:'РЎС‚РёР»СѓСЃ CLASSNO CS-ST01 Universal Pen Р±РµР»С‹Р№',code:'097304164',art:'',stock:25,min:0,reserve:0,wait:0,avail:25,unit:'',days:0,cost:1500,totalCost:37500.00,sell:2400,totalSell:60000.00},
  {img:'рџ”Њ',name:'Р—Рќ Asus 45W 19V 2.37A 4.0x1.35',code:'830949556',art:'',stock:78,min:0,reserve:0,wait:0,avail:78,unit:'',days:0,cost:1963,totalCost:153114.00,sell:3000,totalSell:234000.00},
  {img:'вЊљ',name:'Apple Watch 44РјРј С‡РµСЂРЅС‹Р№',code:'670375403',art:'',stock:306,min:0,reserve:0,wait:0,avail:306,unit:'',days:0,cost:185,totalCost:56610.00,sell:350,totalSell:107100.00},
  {img:'рџ“¦',name:'CLASSNO CS-KIT СЂРѕР·РѕРІС‹Р№',code:'088487960',art:'',stock:47,min:0,reserve:0,wait:0,avail:47,unit:'',days:0,cost:1678,totalCost:78866.00,sell:2600,totalSell:122200.00},
  {img:'рџЋ§',name:'AirPods Pro 3 РїСЂРѕР·СЂР°С‡РЅС‹Р№',code:'855166409',art:'',stock:101,min:0,reserve:0,wait:0,avail:101,unit:'',days:0,cost:150,totalCost:15150.00,sell:280,totalSell:28280.00},
  {img:'рџЋ§',name:'SIL-ORA AirPods Pro 3 РѕСЂР°РЅР¶РµРІС‹Р№',code:'125677517',art:'',stock:51,min:0,reserve:0,wait:0,avail:51,unit:'',days:0,cost:112,totalCost:5712.00,sell:200,totalSell:10200.00},
];

const TOTAL_STOCK = 27404;
const TOTAL_RESERVE = 109;
const TOTAL_AVAIL = 27295;
const TOTAL_COST = 32364880.14;
const TOTAL_SELL = 43166205.00;

export default function Dashboard() {
  const [tab, setTab] = useState('РїРѕРєР°Р·Р°С‚РµР»Рё');
  const [kaspi, setKaspi] = useState(null);
  const [kaspiLoading, setKaspiLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 50;
  const chartRef = useRef(null);
  const moneyRef = useRef(null);

  useEffect(() => { loadKaspi(); }, []);
  useEffect(() => { if (tab === 'РїРѕРєР°Р·Р°С‚РµР»Рё') setTimeout(drawCharts, 400); }, [tab]);

  async function loadKaspi() {
    setKaspiLoading(true);
    try {
      const r = await fetch('/api/kaspi/today');
      const data = await r.json();
      setKaspi(data);
    } catch(e) { console.error(e); }
    setKaspiLoading(false);
  }

  function drawCharts() {
    if (!window.Chart) return;
    const sc = chartRef.current, mc = moneyRef.current;
    if (!sc || !mc) return;
    const grid = {color:'rgba(255,255,255,0.05)'};
    const ticks = {color:'rgba(255,255,255,0.25)',font:{size:10,family:'Space Grotesk'}};
    const labels = ['РџРЅ','Р’С‚','РЎСЂ','Р§С‚','РџС‚','РЎР±','Р’СЃ'];
    if (sc._chart) sc._chart.destroy();
    sc._chart = new window.Chart(sc, {type:'line',data:{labels,datasets:[
      {label:'Р‘Р°СЂР»С‹Т›',data:[320,480,290,720,610,950,580],borderColor:'rgba(167,139,250,0.9)',backgroundColor:'rgba(167,139,250,0.06)',borderWidth:2,tension:0.4,pointRadius:2,fill:true},
      {label:'Kaspi',data:[140,220,120,380,280,490,260],borderColor:'rgba(224,82,82,0.85)',borderWidth:2,borderDash:[4,3],tension:0.4,pointRadius:2,fill:false}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:true,grid,ticks,border:{display:false}}}}});
    if (mc._chart) mc._chart.destroy();
    mc._chart = new window.Chart(mc, {type:'bar',data:{labels,datasets:[
      {label:'РљС–СЂС–СЃ',data:[280,420,260,680,560,870,500],backgroundColor:'rgba(52,211,153,0.45)',borderRadius:3,order:2},
      {label:'РЁС‹Т“С‹СЃ',data:[120,180,110,290,240,380,210],backgroundColor:'rgba(224,82,82,0.35)',borderRadius:3,order:2},
      {label:'Р‘Р°Р»Р°РЅСЃ',data:[160,240,150,390,320,490,290],type:'line',borderColor:'rgba(167,139,250,0.9)',borderWidth:2,tension:0.4,pointRadius:0,fill:false,order:1}
    ]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:true,grid,ticks,border:{display:false}}}}});
  }

  const newOrders = kaspi?.NEW?.data || [];
  const procOrders = kaspi?.PROCESSING?.data || [];
  const compOrders = kaspi?.COMPLETED?.data || [];
  const cancelOrders = kaspi?.CANCELLED?.data || [];
  const allActive = [...newOrders, ...procOrders];
  const todayRev = compOrders.reduce((s,o) => s+(o.attributes?.totalPrice||0), 0);

  const filtered = OSTATOK_DATA.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.code.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const fmt = (n, d=2) => n?.toLocaleString('ru',{minimumFractionDigits:d,maximumFractionDigits:d}) ?? 'вЂ”';
  const fmtN = n => n?.toLocaleString('ru') ?? 'вЂ”';

  const statusPill = s => {
    const map={NEW:'b',PROCESSING:'a',COMPLETED:'g',CANCELLED:'r'};
    const name={NEW:'Р–Р°ТЈР°',PROCESSING:'УЁТЈРґРµР»СѓРґРµ',COMPLETED:'РђСЏТ›С‚Р°Р»РґС‹',CANCELLED:'Р‘Р°СЃ С‚Р°СЂС‚С‹Р»РґС‹'};
    return <span className={`pill ${map[s]||'b'}`}>{name[s]||s}</span>;
  };

  return (
    <>
      <Head>
        <title>QOIMAM</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js" async/>
      </Head>
      <style>{css}</style>

      <div style={{display:'flex',height:'100vh',overflow:'hidden'}}>
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-logo">QOIM<span>AM</span></div>
          <div className="sb-sec">РњРµРЅСЋ</div>
          {[
            ['РїРѕРєР°Р·Р°С‚РµР»Рё','рџ“Љ РџРѕРєР°Р·Р°С‚РµР»Рё'],
            ['Р·Р°РєСѓРїРєРё','рџ›Ќ Р—Р°РєСѓРїРєРё'],
            ['РїСЂРѕРґР°Р¶Р°','рџ›’ РџСЂРѕРґР°Р¶Р°'],
            ['С‚РѕРІР°СЂС‹','рџ“¦ РўРѕРІР°СЂС‹'],
            ['СЃРєР»Р°Рґ','рџЏ­ РЎРєР»Р°Рґ'],
            ['РёРё','рџ¤– РР'],
            ['РЅР°СЃС‚СЂРѕР№РєРё','вљ™пёЏ РќР°СЃС‚СЂРѕР№РєРё'],
          ].map(([key,label]) => (
            <div key={key} className={`sb-link${tab===key?' on':''}`} onClick={()=>{setTab(key);setPage(1);}}>
              {label}
              {key==='РїСЂРѕРґР°Р¶Р°' && allActive.length>0 && <span className="sb-badge b">{allActive.length}</span>}
            </div>
          ))}
          <div className="sb-user">
            <div className="sb-av">РђРЎ</div>
            <div><div className="sb-un">РђСЃРµР»СЊ РЎ.</div><div className="sb-up">Р‘РёР·РЅРµСЃ</div></div>
          </div>
        </aside>

        <main className="d-main">

          {/* в•ђв•ђ РџРћРљРђР—РђРўР•Р›Р в•ђв•ђ */}
          {tab==='РїРѕРєР°Р·Р°С‚РµР»Рё' && (
            <div>
              <div className="d-header">
                <div><div className="d-title">РџРѕРєР°Р·Р°С‚РµР»Рё</div><div className="d-sub">Kaspi РЅР°Т›С‚С‹ РґРµСЂРµРєС‚РµСЂС–</div></div>
                <button className="d-btn" onClick={loadKaspi}>в†є Р–Р°ТЈР°СЂС‚Сѓ</button>
              </div>
              <div className="kpi-row" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
                <div className="kpi"><div className="kpi-l">Kaspi Р¶Р°ТЈР°</div><div className="kpi-v" style={{color:'var(--accent)'}}>{kaspiLoading?'вЂ¦':newOrders.length}</div><div className="kpi-ch up">в†‘ РЅР°Т›С‚С‹</div></div>
                <div className="kpi"><div className="kpi-l">УЁТЈРґРµР»СѓРґРµ</div><div className="kpi-v">{kaspiLoading?'вЂ¦':procOrders.length}</div><div className="kpi-ch up">Р±РµР»СЃРµРЅРґС–</div></div>
                <div className="kpi"><div className="kpi-l">РђСЏТ›С‚Р°Р»РґС‹</div><div className="kpi-v" style={{color:'var(--green)'}}>{kaspiLoading?'вЂ¦':compOrders.length}</div><div className="kpi-ch up">{todayRev>0?`в‚ё ${fmtN(todayRev)}`:'вЂ”'}</div></div>
                <div className="kpi"><div className="kpi-l">Р‘Р°СЃ С‚Р°СЂС‚С‹Р»РґС‹</div><div className="kpi-v" style={{color:cancelOrders.length>0?'var(--kaspi)':'inherit'}}>{kaspiLoading?'вЂ¦':cancelOrders.length}</div><div className="kpi-ch dn">РѕС‚РјРµРЅР°</div></div>
              </div>
              <div className="d-grid">
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <div className="d-card">
                    <div className="d-card-h"><div className="d-card-t">РЎР°С‚С‹Р»С‹Рј РґРёРЅР°РјРёРєР°СЃС‹</div><span className="pill g">в†‘ +24%</span></div>
                    <div style={{padding:'18px',height:150}}><canvas ref={chartRef}/></div>
                  </div>
                  <div className="d-card">
                    <div className="d-card-h"><div className="d-card-t">Kaspi Р±РµР»СЃРµРЅРґС– Р·Р°РєР°Р·РґР°СЂ</div><span className="pill r">{allActive.length} Р±РµР»СЃРµРЅРґС–</span></div>
                    <div style={{maxHeight:220,overflowY:'auto'}}>
                      {kaspiLoading?<div style={{padding:20,textAlign:'center',color:'var(--text3)'}}>Р–ТЇРєС‚РµР»СѓРґРµ...</div>:
                      allActive.length===0?<div style={{padding:20,textAlign:'center',color:'var(--text3)'}}>Р‘РµР»СЃРµРЅРґС– Р·Р°РєР°Р· Р¶РѕТ›</div>:
                      allActive.slice(0,10).map((o,i)=>{
                        const st=o.attributes?.state||'NEW';
                        const price=o.attributes?.totalPrice;
                        const code=o.attributes?.code||o.id||i;
                        const name=(o.attributes?.entries||[])[0]?.name||'РўР°СѓР°СЂ';
                        return(<div key={i} className="ko">
                          <div className="ko-top"><span className="ko-id">#{code}</span><span className="ko-price">{price?`в‚ё ${fmtN(price)}`:'вЂ”'}</span></div>
                          <div className="ko-name">{name}</div>
                          <div className="ko-st"><div className="kdot" style={{background:st==='NEW'?'var(--accent)':st==='PROCESSING'?'var(--amber)':'var(--green)'}}/>  {statusPill(st)}</div>
                        </div>);
                      })}
                    </div>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <div className="d-card">
                    <div className="d-card-h"><div className="d-card-t">РљС–СЂС–СЃ / РЁС‹Т“С‹СЃ</div></div>
                    <div style={{padding:'12px 18px',height:140}}><canvas ref={moneyRef}/></div>
                  </div>
                  <div className="d-card">
                    <div className="d-card-h"><div className="d-card-t">Р‘Р°СЃ С‚Р°СЂС‚С‹Р»Т“Р°РЅ</div><span className="pill r">{cancelOrders.length}</span></div>
                    {cancelOrders.length===0?<div style={{padding:20,textAlign:'center',color:'var(--green)',fontSize:13}}>вњ“ Р‘Р°СЃ С‚Р°СЂС‚С‹Р»Т“Р°РЅ Р¶РѕТ›</div>:
                    cancelOrders.slice(0,5).map((o,i)=>{
                      const code=o.attributes?.code||i;
                      const price=o.attributes?.totalPrice;
                      const name=(o.attributes?.entries||[])[0]?.name||'вЂ”';
                      return(<div key={i} className="ko">
                        <div className="ko-top"><span className="ko-id">#{code}</span><span className="ko-price">{price?`в‚ё ${fmtN(price)}`:'вЂ”'}</span></div>
                        <div className="ko-name">{name}</div>
                        <div className="ko-st"><div className="kdot" style={{background:'var(--kaspi)'}}/><span className="pill r" style={{fontSize:10}}>Р‘Р°СЃ С‚Р°СЂС‚С‹Р»РґС‹</span></div>
                      </div>);
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* в•ђв•ђ РџР РћР”РђР–Рђ в•ђв•ђ */}
          {tab==='РїСЂРѕРґР°Р¶Р°' && (
            <div>
              <div className="d-header">
                <div><div className="d-title">РџСЂРѕРґР°Р¶Р°</div><div className="d-sub">Kaspi РЅР°Т›С‚С‹ Р·Р°РєР°Р·РґР°СЂ</div></div>
                <button className="d-btn p" onClick={loadKaspi}>в†є Р–Р°ТЈР°СЂС‚Сѓ</button>
              </div>
              <div className="kpi-row" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
                <div className="kpi"><div className="kpi-l">Р–Р°ТЈР°</div><div className="kpi-v" style={{color:'var(--accent)'}}>{newOrders.length}</div></div>
                <div className="kpi"><div className="kpi-l">УЁТЈРґРµР»СѓРґРµ</div><div className="kpi-v">{procOrders.length}</div></div>
                <div className="kpi"><div className="kpi-l">РђСЏТ›С‚Р°Р»РґС‹</div><div className="kpi-v" style={{color:'var(--green)'}}>{compOrders.length}</div></div>
                <div className="kpi"><div className="kpi-l">Р‘Р°СЃ С‚Р°СЂС‚С‹Р»РґС‹</div><div className="kpi-v" style={{color:cancelOrders.length>0?'var(--kaspi)':'inherit'}}>{cancelOrders.length}</div></div>
              </div>
              <div style={{padding:'0 26px 26px'}}>
                <div className="d-card">
                  <div style={{overflowX:'auto',maxHeight:520,overflowY:'auto'}}>
                    <table className="d-table" style={{minWidth:700}}>
                      <thead style={{position:'sticky',top:0,background:'var(--bg2)',zIndex:1}}>
                        <tr><th>РљРѕРґ</th><th>РўР°СѓР°СЂ</th><th style={{textAlign:'right'}}>РЎСѓРјРјР° в‚ё</th><th>РЎС‚Р°С‚СѓСЃ</th><th>РљТЇРЅС–</th></tr>
                      </thead>
                      <tbody>
                        {[...newOrders,...procOrders,...compOrders,...cancelOrders].slice(0,100).map((o,i)=>{
                          const st=o.attributes?.state||'NEW';
                          const code=o.attributes?.code||i;
                          const price=o.attributes?.totalPrice;
                          const name=(o.attributes?.entries||[])[0]?.name||'вЂ”';
                          const date=o.attributes?.creationDate?new Date(o.attributes.creationDate).toLocaleDateString('ru'):'вЂ”';
                          return(<tr key={i}>
                            <td className="m" style={{fontSize:12}}>#{code}</td>
                            <td style={{fontSize:13}}>{name}</td>
                            <td style={{textAlign:'right',fontWeight:600}}>{price?fmtN(price):'вЂ”'}</td>
                            <td>{statusPill(st)}</td>
                            <td className="m" style={{fontSize:12}}>{date}</td>
                          </tr>);
                        })}
                      </tbody>
                    </table>
                    {kaspiLoading&&<div style={{padding:20,textAlign:'center',color:'var(--text3)'}}>Р–ТЇРєС‚РµР»СѓРґРµ...</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* в•ђв•ђ РЎРљР›РђР” РћРЎРўРђРўРљР в•ђв•ђ */}
          {tab==='СЃРєР»Р°Рґ' && (
            <div>
              {/* Header */}
              <div style={{padding:'0 0 0',borderBottom:'1px solid var(--border)',background:'var(--bg2)'}}>
                <div style={{padding:'14px 24px 0',display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:18,fontWeight:700}}>РћСЃС‚Р°С‚РєРё</span>
                  <span style={{fontSize:18,color:'var(--text3)',cursor:'pointer'}}>в†є</span>
                  <div style={{marginLeft:'auto',display:'flex',gap:6}}>
                    <button className="ms-btn active">РџРѕ С‚РѕРІР°СЂР°Рј</button>
                    <button className="ms-btn">РџРѕ СЃРєР»Р°РґР°Рј</button>
                    <button className="ms-btn">Р¤РёР»СЊС‚СЂ</button>
                    <button className="ms-btn">рџ–Ё РџРµС‡Р°С‚СЊ</button>
                    <button className="ms-btn">РџРѕРїРѕР»РЅРёС‚СЊ СЂРµР·РµСЂРІС‹</button>
                    <button className="ms-btn">рџ›’ РўРµР»РµР¶РєР°</button>
                  </div>
                </div>

                {/* Filter row */}
                <div style={{padding:'10px 24px',display:'flex',gap:12,alignItems:'center',flexWrap:'wrap',background:'var(--bg3)',borderTop:'1px solid var(--border)'}}>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <span style={{fontSize:12,color:'var(--text3)'}}>РќР° РґР°С‚Сѓ:</span>
                    <span style={{fontSize:12,background:'var(--bg2)',border:'1px solid var(--border2)',borderRadius:6,padding:'4px 10px'}}>рџ“… 29.05.2026 22:32</span>
                  </div>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <span style={{fontSize:12,color:'var(--text3)'}}>РћСЃС‚Р°С‚РѕРє:</span>
                    <span style={{fontSize:12,background:'var(--bg2)',border:'1px solid var(--border2)',borderRadius:6,padding:'4px 10px'}}>РќРµРЅРµРЅСѓР»РµРІРѕРµ в–ѕ</span>
                  </div>
                  <div style={{display:'flex',gap:6,alignItems:'center'}}>
                    <span style={{fontSize:12,color:'var(--text3)'}}>Р”РѕСЃС‚СѓРїРЅРѕ:</span>
                    <span style={{fontSize:12,background:'var(--bg2)',border:'1px solid var(--border2)',borderRadius:6,padding:'4px 10px'}}>РќРµРЅСѓР»РµРІРѕРµ в–ѕ</span>
                  </div>
                  <input
                    style={{background:'var(--bg2)',border:'1px solid var(--border2)',borderRadius:6,padding:'5px 12px',color:'var(--text)',fontSize:12,outline:'none',width:220}}
                    placeholder="рџ”Ќ РўР°СѓР°СЂ РЅРµРјРµСЃРµ РєРѕРґ..."
                    value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
                  />
                </div>
              </div>

              {/* Table */}
              <div style={{overflowX:'auto',height:'calc(100vh - 280px)',overflowY:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse',minWidth:1200,fontSize:13}}>
                  <thead style={{position:'sticky',top:0,zIndex:2,background:'var(--bg2)'}}>
                    <tr style={{borderBottom:'2px solid var(--border)'}}>
                      <th style={{...TH,width:32}}><input type="checkbox"/></th>
                      <th style={{...TH,width:36}}></th>
                      <th style={{...TH,color:'#4B8EF5',cursor:'pointer',minWidth:180}}>РќР°РёРјРµРЅРѕРІР°РЅРёРµ в–ѕ</th>
                      <th style={{...TH,color:'#4B8EF5',cursor:'pointer',textAlign:'right'}}>РљРѕРґ</th>
                      <th style={{...TH,textAlign:'right'}}>РђСЂС‚РёРєСѓР»</th>
                      <th style={{...TH,color:'#4B8EF5',cursor:'pointer',textAlign:'right'}}>РћСЃС‚Р°С‚РѕРє</th>
                      <th style={{...TH,textAlign:'right',fontSize:11}}>РќРµСЃРЅРёР¶Р°РµРјС‹Р№</th>
                      <th style={{...TH,textAlign:'right'}}>Р РµР·РµСЂРІ</th>
                      <th style={{...TH,textAlign:'right'}}>РћР¶РёРґР°РЅРёРµ</th>
                      <th style={{...TH,color:'#4B8EF5',cursor:'pointer',textAlign:'right'}}>Р”РѕСЃС‚СѓРїРЅРѕ</th>
                      <th style={{...TH,textAlign:'right'}}>Р•Рґ. РёР·Рј.</th>
                      <th style={{...TH,color:'#4B8EF5',cursor:'pointer',textAlign:'right'}}>Р”РЅРµР№ РЅР° СЃРєР».</th>
                      <th style={{...TH,color:'#4B8EF5',cursor:'pointer',textAlign:'right'}}>РЎРµР±РµСЃС‚РѕРёРјРѕСЃС‚СЊ</th>
                      <th style={{...TH,color:'#4B8EF5',cursor:'pointer',textAlign:'right'}}>РЎСѓРјРјР° СЃРµР±РµСЃС‚.</th>
                      <th style={{...TH,color:'#4B8EF5',cursor:'pointer',textAlign:'right'}}>Р¦РµРЅР° РїСЂРѕРґР°Р¶Рё</th>
                      <th style={{...TH,color:'#4B8EF5',cursor:'pointer',textAlign:'right'}}>РЎСѓРјРјР° РїСЂРѕРґР°Р¶Рё</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paged.map((p,i)=>(
                      <tr key={i} className="ms-row">
                        <td style={TD}><input type="checkbox"/></td>
                        <td style={TD}><span style={{fontSize:16}}>{p.img}</span></td>
                        <td style={{...TD,color:'#4B8EF5',cursor:'pointer',fontWeight:500}}>{p.name}</td>
                        <td style={{...TD,textAlign:'right',color:'var(--text2)'}}>{p.code}</td>
                        <td style={{...TD,textAlign:'right',color:'var(--text3)'}}>{p.art||''}</td>
                        <td style={{...TD,textAlign:'right',fontWeight:600,color:p.stock===0?'var(--kaspi)':p.stock<10?'var(--amber)':'var(--text)'}}>{fmtN(p.stock)}</td>
                        <td style={{...TD,textAlign:'right',color:'var(--text2)'}}>{p.min||''}</td>
                        <td style={{...TD,textAlign:'right',color:'var(--text2)'}}>{p.reserve||0}</td>
                        <td style={{...TD,textAlign:'right',color:'var(--text2)'}}>{p.wait||0}</td>
                        <td style={{...TD,textAlign:'right',color:'var(--green)',fontWeight:600}}>{fmtN(p.avail)}</td>
                        <td style={{...TD,textAlign:'right',color:'var(--text3)'}}>{p.unit&&<><span style={{marginRight:4}}>рџ›’</span>{p.unit}</>}</td>
                        <td style={{...TD,textAlign:'right',color:'var(--text2)'}}>{p.days>0?p.days.toFixed(2):''}</td>
                        <td style={{...TD,textAlign:'right'}}>{fmt(p.cost)}</td>
                        <td style={{...TD,textAlign:'right',fontWeight:500}}>{fmt(p.totalCost)}</td>
                        <td style={{...TD,textAlign:'right',color:'var(--accent)'}}>{p.sell>0?fmt(p.sell,2):'0,00'}</td>
                        <td style={{...TD,textAlign:'right',fontWeight:500,color:p.totalSell>0?'var(--green)':'var(--text2)'}}>{fmt(p.totalSell)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot style={{position:'sticky',bottom:0,background:'var(--bg3)',borderTop:'2px solid var(--border2)'}}>
                    <tr>
                      <td colSpan={5} style={{...TD,fontWeight:700,fontSize:13}}>
                        {(page-1)*PER_PAGE+1}вЂ“{Math.min(page*PER_PAGE,filtered.length)} РёР· {filtered.length} ({TOTAL_STOCK.toLocaleString('ru')} Р¶Р°Р»РїС‹)
                      </td>
                      <td style={{...TD,textAlign:'right',fontWeight:700}}>{TOTAL_STOCK.toLocaleString('ru')}</td>
                      <td style={TD}/>
                      <td style={{...TD,textAlign:'right',fontWeight:700}}>{TOTAL_RESERVE}</td>
                      <td style={{...TD,textAlign:'right',fontWeight:700}}>0</td>
                      <td style={{...TD,textAlign:'right',fontWeight:700,color:'var(--green)'}}>{TOTAL_AVAIL.toLocaleString('ru')}</td>
                      <td colSpan={3} style={TD}/>
                      <td style={{...TD,textAlign:'right',fontWeight:700}}>{fmt(TOTAL_COST)}</td>
                      <td style={TD}/>
                      <td style={{...TD,textAlign:'right',fontWeight:700,color:'var(--green)'}}>{fmt(TOTAL_SELL)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Pagination */}
              <div style={{padding:'10px 24px',borderTop:'1px solid var(--border)',display:'flex',alignItems:'center',gap:8,background:'var(--bg2)'}}>
                <button className="ms-btn" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>в—Ђ</button>
                <span style={{fontSize:13,color:'var(--text2)'}}>{(page-1)*PER_PAGE+1}вЂ“{Math.min(page*PER_PAGE,filtered.length)} РёР· {filtered.length}</span>
                <button className="ms-btn" disabled={page>=totalPages} onClick={()=>setPage(p=>p+1)}>в–¶</button>
              </div>
            </div>
          )}

          {/* в•ђв•ђ РўРћР’РђР Р« в•ђв•ђ */}
          {tab==='С‚РѕРІР°СЂС‹' && (
            <div>
              <div className="d-header"><div><div className="d-title">РўРѕРІР°СЂС‹</div><div className="d-sub">{OSTATOK_DATA.length} РїРѕР·РёС†РёСЏ</div></div></div>
              <div style={{padding:'0 26px 26px'}}>
                <div className="d-card">
                  <div style={{overflowX:'auto',maxHeight:580,overflowY:'auto'}}>
                    <table className="d-table" style={{minWidth:600}}>
                      <thead style={{position:'sticky',top:0,background:'var(--bg2)',zIndex:1}}>
                        <tr><th>РўР°СѓР°СЂ</th><th style={{textAlign:'right'}}>РљРѕРґ</th><th style={{textAlign:'right'}}>РћСЃС‚Р°С‚РѕРє</th><th style={{textAlign:'right'}}>РЎРµР±РµСЃС‚. в‚ё</th><th style={{textAlign:'right'}}>Р‘Р°Т“Р° в‚ё</th></tr>
                      </thead>
                      <tbody>
                        {OSTATOK_DATA.map((p,i)=>(
                          <tr key={i}>
                            <td><div style={{fontSize:13,fontWeight:500}}>{p.name}</div></td>
                            <td style={{textAlign:'right',fontSize:12,color:'var(--text2)'}}>{p.code}</td>
                            <td style={{textAlign:'right',fontWeight:700,color:p.stock===0?'var(--kaspi)':p.stock<10?'var(--amber)':'inherit'}}>{fmtN(p.stock)}</td>
                            <td style={{textAlign:'right'}}>{fmt(p.cost)}</td>
                            <td style={{textAlign:'right',color:'var(--accent)'}}>{p.sell>0?fmtN(p.sell):'вЂ”'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* в•ђв•ђ Р—РђРљРЈРџРљР в•ђв•ђ */}
          {tab==='Р·Р°РєСѓРїРєРё' && (
            <div>
              <div className="d-header"><div><div className="d-title">Р—Р°РєСѓРїРєРё</div></div></div>
              <div style={{padding:'60px',textAlign:'center',color:'var(--text3)'}}><div style={{fontSize:32,marginBottom:12}}>рџ›Ќ</div><div>РњРѕР№РЎРєР»Р°РґС‚Р°РЅ РґРµСЂРµРєС‚РµСЂ Т›РѕСЃС‹Р»Р°РґС‹</div></div>
            </div>
          )}

          {/* в•ђв•ђ РР в•ђв•ђ */}
          {tab==='РёРё' && (
            <div>
              <div className="d-header"><div><div className="d-title">РР РђСЃСЃРёСЃС‚РµРЅС‚</div></div></div>
              <div style={{padding:'0 26px 26px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="d-card">
                  <div className="d-card-h"><div className="d-card-t">рџ’Ў РРЅСЃР°Р№С‚С‚Р°СЂ</div></div>
                  <div style={{padding:16,display:'flex',flexDirection:'column',gap:10}}>
                    {[
                      ['рџ“€ Kaspi ТЇР»РµСЃС– Р¶РѕТ“Р°СЂС‹','РЎР°С‚С‹Р»С‹РјРЅС‹ТЈ 49% Kaspi Р°СЂТ›С‹Р»С‹ РєРµР»РµРґС–.'],
                      ['вљ пёЏ Р‘Р°СЃ С‚Р°СЂС‚С‹Р»Т“Р°РЅ Р·Р°РєР°Р·РґР°СЂ',`${cancelOrders.length>0?cancelOrders.length+' Р·Р°РєР°Р· Р±Р°СЃ С‚Р°СЂС‚С‹Р»РґС‹':'Р‘Р°СЃ С‚Р°СЂС‚С‹Р»Т“Р°РЅ Р·Р°РєР°Р· Р¶РѕТ› вњ“'}`],
                      ['рџЏ­ РЎРєР»Р°Рґ Р¶Р°Р»РїС‹','27 404 РґР°РЅР° С‚Р°СѓР°СЂ вЂ” 32.3 РјР»РЅ в‚ё Т›Т±РЅС‹'],
                    ].map(([t,d],i)=>(
                      <div key={i} style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:9,padding:14}}>
                        <div style={{fontSize:13,fontWeight:600,marginBottom:5}}>{t}</div>
                        <div style={{fontSize:12,color:'var(--text2)'}}>{d}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-card">
                  <div className="d-card-h"><div className="d-card-t">рџ¤– РР С‡Р°С‚</div><span className="pill g">РћРЅР»Р°Р№РЅ</span></div>
                  <div style={{padding:16,display:'flex',flexDirection:'column',gap:10,minHeight:200}}>
                    <div style={{background:'var(--bg3)',borderRadius:9,padding:'12px 14px',maxWidth:'85%'}}>
                      <div style={{fontSize:12,color:'var(--text3)',marginBottom:4}}>РР</div>
                      <div style={{fontSize:13,color:'var(--text2)'}}>Kaspi РґРµСЂРµРєС‚РµСЂС–ТЈС–Р·РґС– С‚Р°Р»РґР°Рї С‚Т±СЂРјС‹РЅ. Р–Р°ТЈР° Р·Р°РєР°Р·: {newOrders.length}, УЁТЈРґРµР»СѓРґРµ: {procOrders.length}.</div>
                    </div>
                  </div>
                  <div style={{padding:'12px 16px',borderTop:'1px solid var(--border)',display:'flex',gap:8}}>
                    <input style={{flex:1,background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:8,padding:'9px 12px',color:'var(--text)',fontFamily:"'Space Grotesk',sans-serif",fontSize:13,outline:'none'}} placeholder="РЎТ±СЂР°Т› Т›РѕР№С‹ТЈС‹Р·..."/>
                    <button className="d-btn p" style={{padding:'9px 14px'}}>в†‘</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* в•ђв•ђ РќРђРЎРўР РћР™РљР в•ђв•ђ */}
          {tab==='РЅР°СЃС‚СЂРѕР№РєРё' && (
            <div>
              <div className="d-header"><div><div className="d-title">РќР°СЃС‚СЂРѕР№РєРё</div></div><button className="d-btn p">РЎР°Т›С‚Р°Сѓ</button></div>
              <div style={{padding:'0 26px 26px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="d-card">
                  <div className="d-card-h"><div className="d-card-t">РљРѕРјРїР°РЅРёСЏ РїСЂРѕС„РёР»С–</div></div>
                  <div style={{padding:18,display:'flex',flexDirection:'column',gap:14}}>
                    {[['РљРѕРјРїР°РЅРёСЏ Р°С‚Р°СѓС‹','Classno РРџ'],['Email','admin@classno.kz'],['ТљР°Р»Р°','РђР»РјР°С‚С‹']].map(([l,v])=>(
                      <div key={l}><div style={{fontSize:12,color:'var(--text3)',marginBottom:5}}>{l}</div>
                      <input defaultValue={v} style={{width:'100%',background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:8,padding:'9px 12px',color:'var(--text)',fontFamily:"'Space Grotesk',sans-serif",fontSize:13,outline:'none'}}/></div>
                    ))}
                  </div>
                </div>
                <div className="d-card">
                  <div className="d-card-h"><div className="d-card-t">РРЅС‚РµРіСЂР°С†РёСЏР»Р°СЂ</div></div>
                  {[['рџ”ґ Kaspi РњР°РіР°Р·РёРЅ',true],['рџ’і Kaspi Pay',true],['рџ“¦ РњРѕР№РЎРєР»Р°Рґ',true],['рџ›’ Wildberries',false]].map(([n,c])=>(
                    <div key={n} style={{padding:'14px 18px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div><div style={{fontSize:13,fontWeight:600}}>{n}</div><div style={{fontSize:11,color:c?'var(--green)':'var(--text3)',marginTop:2}}>{c?'в—Џ ТљРѕСЃС‹Р»Т“Р°РЅ':'в—‹ ТљРѕСЃС‹Р»РјР°Т“Р°РЅ'}</div></div>
                      <button className={`d-btn${c?'':' p'}`} style={{fontSize:12,padding:'6px 12px'}}>{c?'Р‘Р°РїС‚Р°Сѓ':'ТљРѕСЃСѓ'}</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

const TH = {padding:'9px 12px',fontSize:12,fontWeight:600,textAlign:'left',whiteSpace:'nowrap',color:'rgba(255,255,255,0.4)',userSelect:'none'};
const TD = {padding:'9px 12px',borderBottom:'1px solid rgba(255,255,255,0.04)',fontSize:13,verticalAlign:'middle'};

const css = `
*{margin:0;padding:0;box-sizing:border-box;}
html,body{height:100%;background:#0C0C0C;color:#F2F2F2;font-family:'Space Grotesk',sans-serif;-webkit-font-smoothing:antialiased;}
:root{
  --bg:#0C0C0C;--bg2:#111;--bg3:#171717;--bg4:#1C1C1C;
  --border:rgba(255,255,255,0.06);--border2:rgba(255,255,255,0.1);
  --text:#F2F2F2;--text2:rgba(255,255,255,0.45);--text3:rgba(255,255,255,0.22);
  --accent:#A78BFA;--accent2:#8B5CF6;--accent-bg:rgba(167,139,250,0.08);--accent-border:rgba(167,139,250,0.2);
  --kaspi:#E05252;--kaspi-bg:rgba(224,82,82,0.07);
  --green:#34D399;--green-bg:rgba(52,211,153,0.07);--amber:#FBBF24;
}
.sidebar{width:210px;flex-shrink:0;background:var(--bg2);border-right:1px solid var(--border);height:100vh;padding:16px 10px;display:flex;flex-direction:column;gap:1px;overflow-y:auto;}
.sb-logo{font-size:16px;font-weight:700;padding:4px 10px 14px;border-bottom:1px solid var(--border);margin-bottom:8px;}
.sb-logo span{color:var(--accent);}
.sb-sec{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;color:var(--text3);padding:10px 10px 4px;}
.sb-link{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:8px;font-size:13px;font-weight:500;color:var(--text2);cursor:pointer;transition:all 0.15s;}
.sb-link:hover{background:var(--bg3);color:var(--text);}
.sb-link.on{background:var(--accent-bg);color:var(--accent);}
.sb-badge{margin-left:auto;font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;background:var(--accent-bg);color:var(--accent);border:1px solid var(--accent-border);}
.sb-user{margin-top:auto;border-top:1px solid var(--border);padding:14px 10px 2px;display:flex;align-items:center;gap:9px;}
.sb-av{width:32px;height:32px;border-radius:8px;background:var(--accent2);color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;}
.sb-un{font-size:13px;font-weight:600;}.sb-up{font-size:11px;color:var(--text3);}
.d-main{flex:1;height:100vh;overflow-y:auto;}
.d-header{padding:20px 26px 0;display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;}
.d-title{font-size:22px;font-weight:700;letter-spacing:-0.5px;}
.d-sub{font-size:13px;color:var(--text3);margin-top:2px;}
.d-btn{padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;font-family:'Space Grotesk',sans-serif;border:1px solid var(--border2);background:var(--bg3);color:var(--text2);transition:all 0.18s;}
.d-btn:hover{color:var(--text);}
.d-btn.p{background:var(--text);color:var(--bg);border-color:var(--text);}
.kpi-row{display:grid;gap:10px;padding:0 26px 16px;}
.kpi{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:16px 18px;}
.kpi-l{font-size:12px;color:var(--text3);margin-bottom:7px;}
.kpi-v{font-size:24px;font-weight:700;letter-spacing:-0.8px;margin-bottom:4px;}
.kpi-ch{font-size:12px;font-weight:500;}.kpi-ch.up{color:var(--green);}.kpi-ch.dn{color:var(--kaspi);}
.d-grid{display:grid;grid-template-columns:1.55fr 1fr;gap:10px;padding:0 26px 26px;}
.d-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;overflow:hidden;}
.d-card-h{padding:14px 18px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
.d-card-t{font-size:14px;font-weight:600;}
.pill{font-size:11px;font-weight:600;padding:3px 10px;border-radius:100px;}
.pill.g{background:var(--green-bg);color:var(--green);}
.pill.r{background:var(--kaspi-bg);color:var(--kaspi);}
.pill.b{background:var(--accent-bg);color:var(--accent);}
.pill.a{background:rgba(251,191,36,0.07);color:#FBBF24;}
.d-table{width:100%;border-collapse:collapse;}
.d-table th{font-size:11px;color:var(--text3);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:9px 16px;border-bottom:1px solid var(--border);text-align:left;}
.d-table td{padding:10px 16px;font-size:13px;border-bottom:1px solid var(--border);}
.d-table tr:last-child td{border-bottom:none;}
.d-table td.m{color:var(--text2);}
.ko{padding:12px 16px;border-bottom:1px solid var(--border);}
.ko:last-child{border-bottom:none;}
.ko-top{display:flex;justify-content:space-between;margin-bottom:3px;}
.ko-id{font-size:11px;color:var(--text3);}
.ko-price{font-size:13px;font-weight:700;}
.ko-name{font-size:13px;font-weight:500;margin-bottom:4px;}
.ko-st{font-size:11px;color:var(--text2);display:flex;align-items:center;gap:5px;}
.kdot{width:5px;height:5px;border-radius:50%;}
.ms-btn{padding:6px 12px;border-radius:6px;border:1px solid var(--border2);background:var(--bg3);color:var(--text2);font-size:12px;font-family:'Space Grotesk',sans-serif;cursor:pointer;transition:all 0.15s;white-space:nowrap;}
.ms-btn:hover,.ms-btn.active{background:var(--bg4);color:var(--text);}
.ms-btn:disabled{opacity:0.4;cursor:default;}
.ms-row:hover td{background:rgba(255,255,255,0.02);}
`;
