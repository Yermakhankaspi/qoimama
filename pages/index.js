import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

const PRODUCTS = [
  {code:'373154061',art:'',name:'Основ Пульт',stock:1578,min:2,reserve:0,avail:1576,unit:'',days:72.68,cost:183.90,totalCost:290187,sell:0,totalSell:0},
  {code:'092353390',art:'',name:'CS-Сердичка AirPods 4 розовый',stock:976,min:0,reserve:0,avail:976,unit:'',days:124.89,cost:249.02,totalCost:243044,sell:990,totalSell:966240},
  {code:'866717647',art:'',name:'Основной Накладка CS-US 13.6',stock:655,min:2,reserve:0,avail:653,unit:'',days:144.75,cost:395,totalCost:258725,sell:1490,totalSell:975950},
  {code:'241235696',art:'',name:'Простой штатив CS-PH1111 черный',stock:594,min:5,reserve:0,avail:589,unit:'',days:50.8,cost:1117.17,totalCost:663600,sell:0,totalSell:0},
  {code:'999524178',art:'',name:'Лампа MJ-26',stock:527,min:0,reserve:0,avail:527,unit:'шт',days:76.04,cost:1274.97,totalCost:671908,sell:0,totalSell:0},
  {code:'999524190',art:'',name:'Шарик 180градус',stock:513,min:1,reserve:0,avail:512,unit:'шт',days:46.44,cost:147.63,totalCost:75734,sell:0,totalSell:0},
  {code:'999524179',art:'',name:'Лампа MJ-33',stock:486,min:0,reserve:0,avail:486,unit:'шт',days:74.3,cost:1854,totalCost:901044,sell:0,totalSell:0},
  {code:'955860932',art:'',name:'CS-Сердичка AirPods Pro 2 розовый',stock:477,min:0,reserve:0,avail:477,unit:'',days:127.43,cost:249,totalCost:118773,sell:990,totalSell:472230},
  {code:'775926997',art:'',name:'Держатель CLASSNO CS-Der01 черный',stock:475,min:0,reserve:1,avail:474,unit:'',days:45.14,cost:97,totalCost:46075,sell:180,totalSell:85500},
  {code:'999524187',art:'',name:'Лампа PL-26',stock:416,min:2,reserve:0,avail:414,unit:'шт',days:62.48,cost:1629,totalCost:677664,sell:0,totalSell:0},
  {code:'746726184',art:'',name:'SIL-PN AirPods 4 розовый',stock:316,min:0,reserve:0,avail:316,unit:'',days:0,cost:112,totalCost:35392,sell:200,totalSell:63200},
  {code:'746726184b',art:'',name:'SIL AirPods 4 прозрачный',stock:316,min:0,reserve:0,avail:316,unit:'',days:0,cost:112,totalCost:35392,sell:200,totalSell:63200},
  {code:'825437522',art:'',name:'Чехол планшет RM A16 серый',stock:428,min:0,reserve:0,avail:428,unit:'',days:0,cost:1533,totalCost:656124,sell:2400,totalSell:1027200},
  {code:'964634472',art:'',name:'Чехол планшет RM A16 розовый',stock:294,min:0,reserve:0,avail:294,unit:'',days:0,cost:1533,totalCost:450702,sell:2400,totalSell:705600},
  {code:'925013454',art:'',name:'Чехол KB-PN iPad A16 розовый',stock:330,min:0,reserve:0,avail:330,unit:'',days:0,cost:3227,totalCost:1064910,sell:5000,totalSell:1650000},
  {code:'323079735',art:'',name:'Чехол iPad KB-LC A16 сиреневый',stock:214,min:0,reserve:0,avail:214,unit:'',days:0,cost:3227,totalCost:690578,sell:5000,totalSell:1070000},
  {code:'605751597',art:'',name:'Чехол KB-BLK A16 черный',stock:188,min:0,reserve:0,avail:188,unit:'',days:0,cost:3227,totalCost:606676,sell:5000,totalSell:940000},
  {code:'100237006',art:'',name:'Чехол iPad KB-LBL A16 голубой',stock:152,min:0,reserve:0,avail:152,unit:'',days:0,cost:3227,totalCost:490504,sell:5000,totalSell:760000},
  {code:'944890555',art:'',name:'ЗН Зарядка Type-C 65Вт черный',stock:800,min:0,reserve:0,avail:800,unit:'',days:0,cost:1962,totalCost:1569600,sell:3000,totalSell:2400000},
  {code:'373154061b',art:'',name:'CLASSNO CS-BT01',stock:1790,min:0,reserve:0,avail:1790,unit:'',days:0,cost:159,totalCost:284610,sell:300,totalSell:537000},
  {code:'999524190b',art:'',name:'Шарик 180градус (2)',stock:801,min:0,reserve:0,avail:801,unit:'шт',days:0,cost:130,totalCost:104130,sell:250,totalSell:200250},
  {code:'775926997b',art:'',name:'Держатель CLASSNO CS-Der01 черный (2)',stock:745,min:0,reserve:0,avail:745,unit:'',days:0,cost:97,totalCost:72265,sell:180,totalSell:134100},
  {code:'092353390b',art:'',name:'CS-Сердичка AirPods 4 розовый (2)',stock:483,min:0,reserve:0,avail:483,unit:'',days:0,cost:249,totalCost:120267,sell:450,totalSell:217350},
  {code:'412197805',art:'',name:'ЗН HP CS-H462 19.5V 4.62A',stock:235,min:0,reserve:0,avail:235,unit:'',days:0,cost:1625,totalCost:381875,sell:2500,totalSell:587500},
  {code:'360562448',art:'',name:'ЗН Lenovo 90W 20V 4.5A 5.5x2.5',stock:91,min:0,reserve:0,avail:91,unit:'',days:0,cost:1625,totalCost:147875,sell:2500,totalSell:227500},
  {code:'115932179',art:'',name:'Лампочка 15ват',stock:892,min:0,reserve:0,avail:892,unit:'',days:0,cost:230,totalCost:205160,sell:380,totalSell:338960},
  {code:'133227473',art:'',name:'Лампочка 50ват',stock:303,min:0,reserve:0,avail:303,unit:'',days:0,cost:900,totalCost:272700,sell:1400,totalSell:424200},
  {code:'999524182',art:'',name:'Лампа М-26',stock:165,min:0,reserve:0,avail:165,unit:'шт',days:0,cost:1000,totalCost:165000,sell:1600,totalSell:264000},
  {code:'852664139',art:'',name:'CLASSNO RGB CS-P225',stock:36,min:0,reserve:0,avail:36,unit:'',days:0,cost:7000,totalCost:252000,sell:11000,totalSell:396000},
  {code:'999524184',art:'',name:'Лампа RL-14',stock:122,min:0,reserve:0,avail:122,unit:'шт',days:0,cost:6300,totalCost:768600,sell:9500,totalSell:1159000},
  {code:'999524185',art:'',name:'Лампа RL-18',stock:69,min:0,reserve:0,avail:69,unit:'шт',days:0,cost:10100,totalCost:696900,sell:15000,totalSell:1035000},
  {code:'999524186',art:'',name:'Лампа RL-21',stock:70,min:0,reserve:0,avail:70,unit:'шт',days:0,cost:11500,totalCost:805000,sell:17000,totalSell:1190000},
  {code:'579327925',art:'',name:'ЗН TYPE-C 5-20V 3.25A 65W',stock:34,min:0,reserve:0,avail:34,unit:'',days:0,cost:2037,totalCost:69258,sell:3200,totalSell:108800},
  {code:'616239656',art:'',name:'ЗН Acer CS-A11 19V 3.42A 5.5x1.7мм',stock:107,min:0,reserve:0,avail:107,unit:'',days:0,cost:1559,totalCost:166813,sell:2400,totalSell:256800},
  {code:'218235477',art:'',name:'ЗН Acer CS-Ac342T 19V 3.42A 3.0x1.1мм',stock:98,min:0,reserve:0,avail:98,unit:'',days:0,cost:1559,totalCost:152782,sell:2400,totalSell:235200},
  {code:'970316907',art:'',name:'ЗН Acer CS-Ac007 LP514 19V 4.74A',stock:38,min:0,reserve:0,avail:38,unit:'',days:0,cost:1634,totalCost:62092,sell:2600,totalSell:98800},
  {code:'283359932',art:'',name:'Стекло 6/7mini',stock:61,min:0,reserve:0,avail:61,unit:'',days:0,cost:300,totalCost:18300,sell:500,totalSell:30500},
  {code:'697614677',art:'',name:'Стекло основной Air 11',stock:46,min:0,reserve:0,avail:46,unit:'',days:0,cost:300,totalCost:13800,sell:500,totalSell:23000},
  {code:'592196764',art:'',name:'Стекло А16',stock:418,min:0,reserve:0,avail:418,unit:'',days:0,cost:300,totalCost:125400,sell:500,totalSell:209000},
  {code:'251595247',art:'',name:'Стекло SG iPad A16',stock:27,min:0,reserve:0,avail:27,unit:'',days:0,cost:1161,totalCost:31347,sell:1800,totalSell:48600},
  {code:'097304164',art:'',name:'Стилус CLASSNO CS-ST01 Universal Pen белый',stock:25,min:0,reserve:0,avail:25,unit:'',days:0,cost:1500,totalCost:37500,sell:2400,totalSell:60000},
  {code:'830949556',art:'',name:'ЗН Asus 45W 19V 2.37A 4.0x1.35',stock:78,min:0,reserve:0,avail:78,unit:'',days:0,cost:1963,totalCost:153114,sell:3000,totalSell:234000},
  {code:'857253948',art:'',name:'ЗН CS-Lenovo 45W 2.25A 4.0x1.7',stock:6,min:0,reserve:0,avail:6,unit:'',days:0,cost:1962,totalCost:11772,sell:3000,totalSell:18000},
  {code:'505974677',art:'',name:'Apple Watch 40mm черный',stock:306,min:0,reserve:0,avail:306,unit:'',days:0,cost:185,totalCost:56610,sell:350,totalSell:107100},
  {code:'670375403',art:'',name:'Apple Watch 44мм черный',stock:306,min:0,reserve:0,avail:306,unit:'',days:0,cost:185,totalCost:56610,sell:350,totalSell:107100},
  {code:'088487960',art:'',name:'CLASSNO CS-KIT розовый',stock:47,min:0,reserve:0,avail:47,unit:'',days:0,cost:1678,totalCost:78866,sell:2600,totalSell:122200},
  {code:'058275010',art:'',name:'Напольный штатив CS-HT2100 черный',stock:443,min:0,reserve:0,avail:443,unit:'',days:0,cost:2350,totalCost:1041050,sell:3600,totalSell:1594800},
  {code:'855166409',art:'',name:'AirPods Pro 3 прозрачный',stock:101,min:0,reserve:0,avail:101,unit:'',days:0,cost:150,totalCost:15150,sell:280,totalSell:28280},
  {code:'125677517',art:'',name:'SIL-ORA AirPods Pro 3 оранжевый',stock:51,min:0,reserve:0,avail:51,unit:'',days:0,cost:112,totalCost:5712,sell:200,totalSell:10200},
  {code:'391634656',art:'',name:'Sil-BLU AirPods Pro 3 синий',stock:53,min:0,reserve:0,avail:53,unit:'',days:0,cost:112,totalCost:5936,sell:200,totalSell:10600},
];

const th = {padding:'10px 14px',fontSize:11,color:'var(--text3)',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.5px',textAlign:'left',whiteSpace:'nowrap'};
export default function Dashboard() {
  const [tab, setTab] = useState('показатели');
  const [skTab, setSkTab] = useState('opri');
  const [kaspi, setKaspi] = useState(null);
  const [kaspiLoading, setKaspiLoading] = useState(false);
  const [prodSearch, setProdSearch] = useState('');
  const [prodFilter, setProdFilter] = useState('all');
  const [period, setPeriod] = useState('week');
  const chartRef = useRef(null);
  const moneyRef = useRef(null);
  const chartsLoaded = useRef(false);

  useEffect(() => {
    loadKaspi();
  }, []);

  useEffect(() => {
    if (tab === 'показатели') {
      setTimeout(drawCharts, 300);
    }
  }, [tab, period]);

  async function loadKaspi() {
    setKaspiLoading(true);
    try {
      const r = await fetch('/api/kaspi/today');
      const data = await r.json();
      setKaspi(data);
    } catch (e) {
      console.error(e);
    }
    setKaspiLoading(false);
  }

  function drawCharts() {
    if (typeof window === 'undefined') return;
    if (!window.Chart) return;
    const sc = chartRef.current;
    const mc = moneyRef.current;
    if (!sc || !mc) return;

    const pData = {
      week: { labels:['Пн','Вт','Ср','Чт','Пт','Сб','Вс'], all:[320,480,290,720,610,950,580], kaspi:[140,220,120,380,280,490,260], inc:[280,420,260,680,560,870,500], exp:[120,180,110,290,240,380,210], bal:[160,240,150,390,320,490,290] },
      month: { labels:Array.from({length:30},(_,i)=>i+1+''), all:Array.from({length:30},(_,i)=>Math.round(200+Math.random()*400)), kaspi:Array.from({length:30},(_,i)=>Math.round(100+Math.random()*200)), inc:Array.from({length:30},(_,i)=>Math.round(150+Math.random()*350)), exp:Array.from({length:30},(_,i)=>Math.round(60+Math.random()*150)), bal:Array.from({length:30},(_,i)=>Math.round(90+Math.random()*200)) },
      year: { labels:['Қаң','Ақп','Нау','Сәу','Мам','Мау','Шіл','Там','Қыр','Қаз','Қар','Жел'], all:[42,48,38,55,62,58,72,68,75,80,88,95], kaspi:[18,22,16,26,30,28,36,33,37,39,43,47], inc:[38,43,34,50,57,52,66,62,68,73,81,88], exp:[18,21,16,24,28,25,32,30,33,36,40,43], bal:[20,22,18,26,29,27,34,32,35,37,41,45] }
    };
    const d = pData[period];
    const grid = { color:'rgba(255,255,255,0.05)' };
    const ticks = { color:'rgba(255,255,255,0.25)', font:{size:10,family:'Space Grotesk'} };

    if (sc._chart) sc._chart.destroy();
    sc._chart = new window.Chart(sc, { type:'line', data:{ labels:d.labels, datasets:[
      {label:'Барлық',data:d.all,borderColor:'rgba(167,139,250,0.9)',backgroundColor:'rgba(167,139,250,0.06)',borderWidth:2,tension:0.4,pointRadius:2,fill:true},
      {label:'Kaspi',data:d.kaspi,borderColor:'rgba(224,82,82,0.85)',backgroundColor:'transparent',borderWidth:2,borderDash:[4,3],tension:0.4,pointRadius:2,fill:false}
    ]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:true,grid:grid,ticks:ticks,border:{display:false}}}}});

    if (mc._chart) mc._chart.destroy();
    mc._chart = new window.Chart(mc, { type:'bar', data:{ labels:d.labels, datasets:[
      {label:'Кіріс',data:d.inc,backgroundColor:'rgba(52,211,153,0.45)',borderRadius:3,order:2},
      {label:'Шығыс',data:d.exp,backgroundColor:'rgba(224,82,82,0.35)',borderRadius:3,order:2},
      {label:'Баланс',data:d.bal,type:'line',borderColor:'rgba(167,139,250,0.9)',borderWidth:2,tension:0.4,pointRadius:0,fill:false,order:1}
    ]}, options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{display:false},y:{display:true,grid:grid,ticks:ticks,border:{display:false}}}}});
  }

  const newOrders = kaspi?.NEW?.data || [];
  const procOrders = kaspi?.PROCESSING?.data || [];
  const compOrders = kaspi?.COMPLETED?.data || [];
  const cancelOrders = kaspi?.CANCELLED?.data || [];
  const allActive = [...newOrders, ...procOrders];
  const todayRev = compOrders.reduce((s,o) => s + (o.attributes?.totalPrice || 0), 0);

  const filteredProds = PRODUCTS.filter(p => {
    if (prodFilter === 'nz' && p.stock === 0) return false;
    if (prodFilter === 'zero' && p.stock !== 0) return false;
    if (prodSearch && !p.name.toLowerCase().includes(prodSearch.toLowerCase()) && !p.code.includes(prodSearch)) return false;
    return true;
  });

  const statusPill = (s) => {
    const map = {NEW:'b',PROCESSING:'a',COMPLETED:'g',CANCELLED:'r'};
    const name = {NEW:'Жаңа',PROCESSING:'Өңделуде',COMPLETED:'Аяқталды',CANCELLED:'Бас тартылды'};
    return <span className={`pill ${map[s]||'b'}`}>{name[s]||s}</span>;
  };

  return (
    <>
      <Head>
        <title>QOIMAM — Дашборд</title>
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js" async onLoad={drawCharts}/>
      </Head>
      <style>{css}</style>

      <div style={{display:'flex',height:'100vh',overflow:'hidden'}}>
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-logo">QOIM<span>AM</span></div>
          <div className="sb-sec">Меню</div>
          {[
            ['показатели','📊 Показатели',null],
            ['закупки','🛍 Закупки',null],
            ['продажа','🛒 Продажа', allActive.length > 0 ? allActive.length : null],
            ['товары','📦 Товары',null],
            ['склад','🏭 Склад',null],
            ['ии','🤖 ИИ',null],
            ['настройки','⚙️ Настройки',null],
          ].map(([key,label,badge]) => (
            <div key={key} className={`sb-link ${tab===key?'on':''}`} onClick={()=>setTab(key)}>
              {label}
              {badge && <span className="sb-badge b">{badge}</span>}
            </div>
          ))}
          <div className="sb-user">
            <div className="sb-av">АС</div>
            <div><div className="sb-un">Асель С.</div><div className="sb-up">Бизнес</div></div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="d-main">

          {/* ── ПОКАЗАТЕЛИ ── */}
          {tab === 'показатели' && (
            <div>
              <div className="d-header">
                <div><div className="d-title">Показатели</div><div className="d-sub">Бейсенбі, 21 мамыр 2026</div></div>
                <div className="d-btns">
                  <div style={{display:'flex',gap:4,background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:8,padding:3}}>
                    {['week','month','year'].map(p => (
                      <button key={p} className={`per-btn ${period===p?'on':''}`} onClick={()=>setPeriod(p)}>
                        {p==='week'?'Апта':p==='month'?'Ай':'Жыл'}
                      </button>
                    ))}
                  </div>
                  <button className="d-btn" onClick={loadKaspi}>↺ Жаңарту</button>
                </div>
              </div>

              {/* Kaspi live stats */}
              <div className="kpi-row" style={{gridTemplateColumns:'repeat(4,1fr)'}}>
                <div className="kpi">
                  <div className="kpi-l">Kaspi жаңа заказ</div>
                  <div className="kpi-v" style={{color:'var(--accent)'}}>{kaspiLoading ? '...' : newOrders.length}</div>
                  <div className="kpi-ch up">↑ нақты уақыт</div>
                </div>
                <div className="kpi">
                  <div className="kpi-l">Өңделуде</div>
                  <div className="kpi-v">{kaspiLoading ? '...' : procOrders.length}</div>
                  <div className="kpi-ch up">↑ белсенді</div>
                </div>
                <div className="kpi">
                  <div className="kpi-l">Аяқталды бүгін</div>
                  <div className="kpi-v">{kaspiLoading ? '...' : compOrders.length}</div>
                  <div className="kpi-ch up" style={{color:'var(--green)'}}>{todayRev > 0 ? `₸ ${todayRev.toLocaleString('ru')}` : '—'}</div>
                </div>
                <div className="kpi">
                  <div className="kpi-l">Бас тартылды</div>
                  <div className="kpi-v" style={{color: cancelOrders.length > 0 ? 'var(--kaspi)' : 'inherit'}}>{kaspiLoading ? '...' : cancelOrders.length}</div>
                  <div className="kpi-ch dn">{cancelOrders.length > 0 ? '↓ тексеру керек' : '✓ норма'}</div>
                </div>
              </div>

              <div className="d-grid">
                {/* Charts */}
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <div className="d-card">
                    <div className="d-card-h"><div className="d-card-t">Сатылым динамикасы</div><span className="pill g">↑ +24%</span></div>
                    <div style={{padding:'18px 18px 12px',height:150}}>
                      <canvas ref={chartRef}/>
                    </div>
                    <div style={{padding:'0 18px 12px',display:'flex',gap:16}}>
                      <div style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--text3)'}}><div style={{width:20,height:2,background:'rgba(167,139,250,0.9)',borderRadius:1}}/> Барлық</div>
                      <div style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--text3)'}}><div style={{width:20,height:2,background:'rgba(224,82,82,0.85)',borderRadius:1,borderTop:'2px dashed rgba(224,82,82,0.85)'}}/> Kaspi</div>
                    </div>
                  </div>

                  {/* Active Kaspi orders */}
                  <div className="d-card">
                    <div className="d-card-h">
                      <div className="d-card-t">Kaspi белсенді заказдар</div>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span className="pill r">{kaspiLoading ? '...' : `${allActive.length} белсенді`}</span>
                        <button className="d-btn" style={{fontSize:11,padding:'4px 10px'}} onClick={loadKaspi}>↺</button>
                      </div>
                    </div>
                    <div style={{maxHeight:240,overflowY:'auto'}}>
                      {kaspiLoading ? (
                        <div style={{padding:20,textAlign:'center',color:'var(--text3)',fontSize:13}}>Жүктелуде...</div>
                      ) : allActive.length === 0 ? (
                        <div style={{padding:20,textAlign:'center',color:'var(--text3)',fontSize:13}}>Белсенді заказ жоқ</div>
                      ) : allActive.slice(0,15).map((o, i) => {
                        const st = o.attributes?.state || 'NEW';
                        const price = o.attributes?.totalPrice;
                        const code = o.attributes?.code || o.id || `#${i}`;
                        const entries = o.attributes?.entries || [];
                        const name = entries[0]?.name || 'Тауар';
                        return (
                          <div key={i} className="ko">
                            <div className="ko-top">
                              <span className="ko-id">#{code}</span>
                              <span className="ko-price">{price ? `₸ ${price.toLocaleString('ru')}` : '—'}</span>
                            </div>
                            <div className="ko-name">{name}{entries.length > 1 ? ` +${entries.length-1}` : ''}</div>
                            <div className="ko-st">
                              <div className="kdot" style={{background: st==='NEW'?'var(--accent)':st==='PROCESSING'?'var(--amber)':'var(--green)'}}/>
                              {statusPill(st)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Money chart */}
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <div className="d-card">
                    <div className="d-card-h"><div className="d-card-t">Кіріс / Шығыс</div></div>
                    <div style={{padding:'12px 18px',height:140}}>
                      <canvas ref={moneyRef}/>
                    </div>
                    <div style={{padding:'0 18px 12px',display:'flex',gap:12}}>
                      <div style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--text3)'}}><div style={{width:12,height:12,background:'rgba(52,211,153,0.5)',borderRadius:2}}/> Кіріс</div>
                      <div style={{display:'flex',alignItems:'center',gap:5,fontSize:11,color:'var(--text3)'}}><div style={{width:12,height:12,background:'rgba(224,82,82,0.4)',borderRadius:2}}/> Шығыс</div>
                    </div>
                  </div>

                  {/* Cancel orders */}
                  <div className="d-card">
                    <div className="d-card-h"><div className="d-card-t">Бас тартылған заказдар</div><span className="pill r">{cancelOrders.length}</span></div>
                    <div style={{maxHeight:200,overflowY:'auto'}}>
                      {cancelOrders.length === 0 ? (
                        <div style={{padding:20,textAlign:'center',color:'var(--green)',fontSize:13}}>✓ Бас тартылған заказ жоқ</div>
                      ) : cancelOrders.slice(0,8).map((o, i) => {
                        const code = o.attributes?.code || o.id || `#${i}`;
                        const price = o.attributes?.totalPrice;
                        const entries = o.attributes?.entries || [];
                        const name = entries[0]?.name || 'Тауар';
                        return (
                          <div key={i} className="ko">
                            <div className="ko-top"><span className="ko-id">#{code}</span><span className="ko-price">{price ? `₸ ${price.toLocaleString('ru')}` : '—'}</span></div>
                            <div className="ko-name">{name}</div>
                            <div className="ko-st"><div className="kdot" style={{background:'var(--kaspi)'}}/><span className="pill r" style={{fontSize:10,padding:'2px 7px'}}>Бас тартылды</span></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ПРОДАЖА ── */}
          {tab === 'продажа' && (
            <div>
              <div className="d-header">
                <div><div className="d-title">Продажа — Kaspi заказдар</div><div className="d-sub">Нақты уақыт деректері</div></div>
                <div className="d-btns"><button className="d-btn p" onClick={loadKaspi}>↺ Жаңарту</button></div>
              </div>
              <div className="kpi-row">
                <div className="kpi"><div className="kpi-l">Жаңа</div><div className="kpi-v" style={{color:'var(--accent)'}}>{newOrders.length}</div><div className="kpi-ch up">↑ жаңа</div></div>
                <div className="kpi"><div className="kpi-l">Өңделуде</div><div className="kpi-v">{procOrders.length}</div><div className="kpi-ch up">белсенді</div></div>
                <div className="kpi"><div className="kpi-l">Аяқталды</div><div className="kpi-v" style={{color:'var(--green)'}}>{compOrders.length}</div><div className="kpi-ch up">↑ орындалды</div></div>
                <div className="kpi"><div className="kpi-l">Бас тартылды</div><div className="kpi-v" style={{color:cancelOrders.length>0?'var(--kaspi)':'inherit'}}>{cancelOrders.length}</div><div className="kpi-ch dn">отмена</div></div>
              </div>
              <div style={{padding:'0 26px 26px'}}>
                <div className="d-card">
                  <div className="d-card-h"><div className="d-card-t">Барлық Kaspi заказдар</div></div>
                  <div style={{overflowX:'auto',maxHeight:500,overflowY:'auto'}}>
                    <table className="d-table" style={{minWidth:700}}>
                      <thead style={{position:'sticky',top:0,background:'var(--bg2)',zIndex:1}}>
                        <tr><th>Код</th><th>Тауар</th><th style={{textAlign:'right'}}>Сумма ₸</th><th>Статус</th><th>Күні</th></tr>
                      </thead>
                      <tbody>
                        {[...newOrders,...procOrders,...compOrders,...cancelOrders].slice(0,100).map((o,i) => {
                          const st = o.attributes?.state || 'NEW';
                          const code = o.attributes?.code || o.id || i;
                          const price = o.attributes?.totalPrice;
                          const entries = o.attributes?.entries || [];
                          const name = entries[0]?.name || '—';
                          const date = o.attributes?.creationDate ? new Date(o.attributes.creationDate).toLocaleDateString('ru') : '—';
                          return (
                            <tr key={i}>
                              <td className="m" style={{fontSize:12}}>#{code}</td>
                              <td style={{fontSize:13}}>{name}{entries.length>1?` +${entries.length-1}`:''}</td>
                              <td style={{textAlign:'right',fontWeight:600}}>{price ? price.toLocaleString('ru') : '—'}</td>
                              <td>{statusPill(st)}</td>
                              <td className="m" style={{fontSize:12}}>{date}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    {kaspiLoading && <div style={{padding:20,textAlign:'center',color:'var(--text3)'}}>Жүктелуде...</div>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── СКЛАД ОСТАТКИ ── */}
          {tab === 'склад' && (
            <div>
              <div className="d-header">
                <div><div className="d-title">Склад — Остатки</div><div className="d-sub">29.05.2026 22:32 · Негізгі қойма · {PRODUCTS.length} позиция</div></div>
                <div className="d-btns">
                  <button className="d-btn">По товарам</button>
                  <button className="d-btn">По складам</button>
                  <button className="d-btn">🖨 Печать</button>
                </div>
              </div>

              {/* KPI */}
              <div className="kpi-row" style={{gridTemplateColumns:'repeat(5,1fr)'}}>
                <div className="kpi"><div className="kpi-l">Позиция</div><div className="kpi-v">{PRODUCTS.length}</div><div className="kpi-ch up">↑ Негізгі қойма</div></div>
                <div className="kpi"><div className="kpi-l">Жалпы қалдық</div><div className="kpi-v">{PRODUCTS.reduce((s,p)=>s+p.stock,0).toLocaleString('ru')}</div><div className="kpi-ch up">↑ дана</div></div>
                <div className="kpi"><div className="kpi-l">Қол жетімді</div><div className="kpi-v">{PRODUCTS.reduce((s,p)=>s+p.avail,0).toLocaleString('ru')}</div><div className="kpi-ch up">↑ норма</div></div>
                <div className="kpi"><div className="kpi-l">Өзіндік құн сомасы</div><div className="kpi-v" style={{fontSize:16}}>{PRODUCTS.reduce((s,p)=>s+p.totalCost,0).toLocaleString('ru',{maximumFractionDigits:0})} ₸</div><div className="kpi-ch up">↑ норма</div></div>
                <div className="kpi"><div className="kpi-l">Сату сомасы</div><div className="kpi-v" style={{fontSize:16}}>{PRODUCTS.reduce((s,p)=>s+p.totalSell,0).toLocaleString('ru',{maximumFractionDigits:0})} ₸</div><div className="kpi-ch up">↑ норма</div></div>
              </div>

              {/* Search */}
              <div style={{padding:'0 26px 12px',display:'flex',gap:8,alignItems:'center'}}>
                <input style={{flex:1,maxWidth:320,background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:8,padding:'8px 14px',color:'var(--text)',fontFamily:"'Space Grotesk',sans-serif",fontSize:13,outline:'none'}} placeholder="🔍 Тауар атауы немесе код..." value={prodSearch} onChange={e=>setProdSearch(e.target.value)}/>
                <select style={{background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:8,padding:'8px 12px',color:'var(--text)',fontFamily:"'Space Grotesk',sans-serif",fontSize:13,outline:'none'}} value={prodFilter} onChange={e=>setProdFilter(e.target.value)}>
                  <option value="all">Барлық қалдық</option>
                  <option value="nz">Нөлдік емес</option>
                  <option value="zero">Нөл қалдық</option>
                </select>
                <span style={{fontSize:12,color:'var(--text3)',whiteSpace:'nowrap'}}>{filteredProds.length} позиция</span>
              </div>

              {/* Main Table */}
              <div style={{padding:'0 26px 26px'}}>
                <div className="d-card">
                  <div style={{overflowX:'auto',maxHeight:580,overflowY:'auto'}}>
                    <table style={{width:'100%',borderCollapse:'collapse',minWidth:1100}}>
                      <thead style={{position:'sticky',top:0,background:'var(--bg2)',zIndex:2}}>
                        <tr style={{borderBottom:'2px solid var(--border)'}}>
                          <th style={th}>Наименование</th>
                          <th style={{...th,textAlign:'right'}}>Код</th>
                          <th style={{...th,textAlign:'right'}}>Артикул</th>
                          <th style={{...th,textAlign:'right',color:'var(--accent)'}}>Остаток</th>
                          <th style={{...th,textAlign:'right'}}>Резерв</th>
                          <th style={{...th,textAlign:'right'}}>Ожидание</th>
                          <th style={{...th,textAlign:'right',color:'var(--green)'}}>Доступно</th>
                          <th style={{...th,textAlign:'right'}}>Ед.</th>
                          <th style={{...th,textAlign:'right'}}>Дней на скл.</th>
                          <th style={{...th,textAlign:'right'}}>Себест. ₸</th>
                          <th style={{...th,textAlign:'right'}}>Сумма себест. ₸</th>
                          <th style={{...th,textAlign:'right',color:'var(--accent)'}}>Цена прод. ₸</th>
                          <th style={{...th,textAlign:'right',color:'var(--green)'}}>Сумма прод. ₸</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProds.map((p,i) => (
                          <tr key={i} style={{borderBottom:'1px solid var(--border)',cursor:'pointer'}}
                            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.02)'}
                            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                            <td style={{padding:'10px 14px',fontSize:13,fontWeight:500,color:'var(--text)'}}>{p.name}</td>
                            <td style={{padding:'10px 14px',fontSize:12,textAlign:'right',color:'var(--text2)'}}>{p.code}</td>
                            <td style={{padding:'10px 14px',fontSize:12,textAlign:'right',color:'var(--text3)'}}>{p.art||'—'}</td>
                            <td style={{padding:'10px 14px',fontSize:13,textAlign:'right',fontWeight:700,color:p.stock===0?'var(--kaspi)':p.stock<10?'var(--amber)':'var(--text)'}}>{p.stock.toLocaleString('ru')}</td>
                            <td style={{padding:'10px 14px',fontSize:12,textAlign:'right',color:'var(--text2)'}}>{p.reserve}</td>
                            <td style={{padding:'10px 14px',fontSize:12,textAlign:'right',color:'var(--text2)'}}>0</td>
                            <td style={{padding:'10px 14px',fontSize:13,textAlign:'right',fontWeight:600,color:'var(--green)'}}>{p.avail.toLocaleString('ru')}</td>
                            <td style={{padding:'10px 14px',fontSize:12,textAlign:'right',color:'var(--text3)'}}>{p.unit||'—'}</td>
                            <td style={{padding:'10px 14px',fontSize:12,textAlign:'right',color:'var(--text2)'}}>{p.days>0?p.days.toFixed(2):'—'}</td>
                            <td style={{padding:'10px 14px',fontSize:12,textAlign:'right',color:'var(--text2)'}}>{p.cost.toLocaleString('ru',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                            <td style={{padding:'10px 14px',fontSize:12,textAlign:'right',fontWeight:500}}>{p.totalCost.toLocaleString('ru',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                            <td style={{padding:'10px 14px',fontSize:13,textAlign:'right',color:'var(--accent)',fontWeight:600}}>{p.sell>0?p.sell.toLocaleString('ru'):'0,00'}</td>
                            <td style={{padding:'10px 14px',fontSize:13,textAlign:'right',fontWeight:600,color:'var(--green)'}}>{p.totalSell>0?p.totalSell.toLocaleString('ru'):'0,00'}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot style={{position:'sticky',bottom:0,background:'var(--bg3)',borderTop:'2px solid var(--border2)'}}>
                        <tr>
                          <td style={{padding:'12px 14px',fontSize:13,fontWeight:700}}>Барлығы: {filteredProds.length} позиция</td>
                          <td colSpan={2}/>
                          <td style={{padding:'12px 14px',textAlign:'right',fontWeight:700,fontSize:13}}>{filteredProds.reduce((s,p)=>s+p.stock,0).toLocaleString('ru')}</td>
                          <td style={{padding:'12px 14px',textAlign:'right',fontSize:12}}>{filteredProds.reduce((s,p)=>s+p.reserve,0)}</td>
                          <td style={{padding:'12px 14px',textAlign:'right',fontSize:12}}>0</td>
                          <td style={{padding:'12px 14px',textAlign:'right',fontWeight:700,color:'var(--green)',fontSize:13}}>{filteredProds.reduce((s,p)=>s+p.avail,0).toLocaleString('ru')}</td>
                          <td colSpan={3}/>
                          <td style={{padding:'12px 14px',textAlign:'right',fontWeight:700,fontSize:13}}>{filteredProds.reduce((s,p)=>s+p.totalCost,0).toLocaleString('ru',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                          <td colSpan={1}/>
                          <td style={{padding:'12px 14px',textAlign:'right',fontWeight:700,color:'var(--green)',fontSize:13}}>{filteredProds.reduce((s,p)=>s+p.totalSell,0).toLocaleString('ru',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ЗАКУПКИ ── */}
          {tab === 'закупки' && (
            <div>
              <div className="d-header">
                <div><div className="d-title">Закупки</div><div className="d-sub">Поставкаларды басқару</div></div>
                <div className="d-btns"><button className="d-btn p">+ Жаңа закупка</button></div>
              </div>
              <div style={{padding:'80px 26px',textAlign:'center',color:'var(--text3)'}}>
                <div style={{fontSize:32,marginBottom:12}}>🛍</div>
                <div style={{fontSize:15,marginBottom:8}}>Закупки бөлімі</div>
                <div style={{fontSize:13}}>МойСкладтан деректер қосылады</div>
              </div>
            </div>
          )}

          {/* ── ТОВАРЫ ── */}
          {tab === 'товары' && (
            <div>
              <div className="d-header">
                <div><div className="d-title">Товары</div><div className="d-sub">Каталог — {PRODUCTS.length} позиция</div></div>
                <div className="d-btns"><button className="d-btn p">+ Тауар қосу</button></div>
              </div>
              <div style={{padding:'0 26px 26px'}}>
                <div className="d-card">
                  <div style={{overflowX:'auto',maxHeight:600,overflowY:'auto'}}>
                    <table className="d-table" style={{minWidth:600}}>
                      <thead style={{position:'sticky',top:0,background:'var(--bg2)',zIndex:1}}>
                        <tr><th>Тауар</th><th style={{textAlign:'right'}}>Қалдық</th><th style={{textAlign:'right'}}>Закуп ₸</th><th style={{textAlign:'right'}}>Сату ₸</th></tr>
                      </thead>
                      <tbody>
                        {PRODUCTS.map((p,i) => (
                          <tr key={p.id}>
                            <td><div style={{fontSize:13,fontWeight:500}}>{p.name}</div><div style={{fontSize:11,color:'var(--text3)'}}>{p.id}</div></td>
                            <td style={{textAlign:'right',fontWeight:700,color:p.stock===0?'var(--kaspi)':p.stock<=10?'var(--amber)':'inherit'}}>{p.stock.toLocaleString('ru')}</td>
                            <td style={{textAlign:'right'}}>{p.buy.toLocaleString('ru')}</td>
                            <td style={{textAlign:'right',color:'var(--accent)'}}>{p.sell.toLocaleString('ru')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ИИ ── */}
          {tab === 'ии' && (
            <div>
              <div className="d-header">
                <div><div className="d-title">ИИ Ассистент</div><div className="d-sub">Kaspi деректері негізінде кеңес</div></div>
              </div>
              <div style={{padding:'0 26px 26px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="d-card">
                  <div className="d-card-h"><div className="d-card-t">💡 Инсайттар</div><span className="pill b">3 жаңа</span></div>
                  <div style={{padding:16,display:'flex',flexDirection:'column',gap:10}}>
                    {[
                      ['📈 Kaspi үлесі жоғары','Сатылымның 49% Kaspi арқылы келеді. Ассортиментті кеңейтіңіз.'],
                      ['⚠️ Нөлдік қалдық','4 тауар қалдығы нөл. Жедел тапсырыс беру керек.'],
                      ['🔴 Бас тартылған заказдар',`${cancelOrders.length > 0 ? cancelOrders.length + ' заказ бас тартылды — себептерін тексеріңіз.' : 'Бас тартылған заказ жоқ — жақсы!'}`],
                    ].map(([title, desc], i) => (
                      <div key={i} style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:9,padding:14}}>
                        <div style={{fontSize:13,fontWeight:600,marginBottom:5}}>{title}</div>
                        <div style={{fontSize:12,color:'var(--text2)'}}>{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-card" style={{display:'flex',flexDirection:'column'}}>
                  <div className="d-card-h"><div className="d-card-t">🤖 ИИ чат</div><span className="pill g">Онлайн</span></div>
                  <div style={{flex:1,padding:16,display:'flex',flexDirection:'column',gap:10,minHeight:280}}>
                    <div style={{background:'var(--bg3)',borderRadius:9,padding:'12px 14px',maxWidth:'85%'}}>
                      <div style={{fontSize:12,color:'var(--text3)',marginBottom:4}}>ИИ</div>
                      <div style={{fontSize:13,color:'var(--text2)'}}>Сәлем! Kaspi деректеріңізді талдап тұрмын. Сұрағыңызды қойыңыз.</div>
                    </div>
                    <div style={{background:'var(--accent-bg)',border:'1px solid var(--accent-border)',borderRadius:9,padding:'12px 14px',maxWidth:'85%',alignSelf:'flex-end'}}>
                      <div style={{fontSize:13}}>Қанша заказ бар бүгін?</div>
                    </div>
                    <div style={{background:'var(--bg3)',borderRadius:9,padding:'12px 14px',maxWidth:'90%'}}>
                      <div style={{fontSize:12,color:'var(--text3)',marginBottom:4}}>ИИ</div>
                      <div style={{fontSize:13,color:'var(--text2)'}}>Бүгін Kaspi-да: {newOrders.length} жаңа + {procOrders.length} өңделуде = {newOrders.length+procOrders.length} белсенді заказ. Аяқталды: {compOrders.length}.</div>
                    </div>
                  </div>
                  <div style={{padding:'12px 16px',borderTop:'1px solid var(--border)',display:'flex',gap:8}}>
                    <input style={{flex:1,background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:8,padding:'9px 12px',color:'var(--text)',fontFamily:'Space Grotesk,sans-serif',fontSize:13,outline:'none'}} placeholder="Сұрақ қойыңыз..."/>
                    <button className="d-btn p" style={{padding:'9px 14px'}}>↑</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── НАСТРОЙКИ ── */}
          {tab === 'настройки' && (
            <div>
              <div className="d-header">
                <div><div className="d-title">Настройки</div><div className="d-sub">Аккаунт және интеграциялар</div></div>
                <div className="d-btns"><button className="d-btn p">Сақтау</button></div>
              </div>
              <div style={{padding:'0 26px 26px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                <div className="d-card">
                  <div className="d-card-h"><div className="d-card-t">Компания профилі</div></div>
                  <div style={{padding:18,display:'flex',flexDirection:'column',gap:14}}>
                    {[['Компания атауы','Classno ИП'],['Email','admin@classno.kz'],['Қала','Алматы']].map(([label,val])=>(
                      <div key={label}>
                        <div style={{fontSize:12,color:'var(--text3)',marginBottom:5}}>{label}</div>
                        <input defaultValue={val} style={{width:'100%',background:'var(--bg3)',border:'1px solid var(--border2)',borderRadius:8,padding:'9px 12px',color:'var(--text)',fontFamily:'Space Grotesk,sans-serif',fontSize:13,outline:'none'}}/>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="d-card">
                  <div className="d-card-h"><div className="d-card-t">Интеграциялар</div></div>
                  <div>
                    {[['🔴 Kaspi Магазин',true],['💳 Kaspi Pay',true],['📦 МойСклад',true],['🛒 Wildberries',false]].map(([name,conn])=>(
                      <div key={name} style={{padding:'14px 18px',borderBottom:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <div>
                          <div style={{fontSize:13,fontWeight:600}}>{name}</div>
                          <div style={{fontSize:11,color:conn?'var(--green)':'var(--text3)',marginTop:2}}>{conn?'● Қосылған':'○ Қосылмаған'}</div>
                        </div>
                        <button className={`d-btn ${conn?'':'p'}`} style={{fontSize:12,padding:'6px 12px'}}>{conn?'Баптау':'Қосу'}</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

const css = `
*{margin:0;padding:0;box-sizing:border-box;}
html,body{height:100%;background:#0C0C0C;color:#F2F2F2;font-family:'Space Grotesk',sans-serif;-webkit-font-smoothing:antialiased;}
:root{
  --bg:#0C0C0C;--bg2:#111111;--bg3:#171717;--bg4:#1C1C1C;
  --border:rgba(255,255,255,0.06);--border2:rgba(255,255,255,0.1);--border3:rgba(255,255,255,0.16);
  --text:#F2F2F2;--text2:rgba(255,255,255,0.45);--text3:rgba(255,255,255,0.22);
  --accent:#A78BFA;--accent2:#8B5CF6;--accent-bg:rgba(167,139,250,0.08);--accent-border:rgba(167,139,250,0.2);
  --kaspi:#E05252;--kaspi-bg:rgba(224,82,82,0.07);--kaspi-border:rgba(224,82,82,0.18);
  --green:#34D399;--green-bg:rgba(52,211,153,0.07);--amber:#FBBF24;--amber-bg:rgba(251,191,36,0.07);
  --sh:0 1px 3px rgba(0,0,0,0.4),0 4px 20px rgba(0,0,0,0.3);
  --sh-sm:0 1px 2px rgba(0,0,0,0.3);
}
.sidebar{width:216px;flex-shrink:0;background:var(--bg2);border-right:1px solid var(--border);height:100vh;padding:18px 10px;display:flex;flex-direction:column;gap:1px;overflow-y:auto;}
.sb-logo{font-size:16px;font-weight:700;letter-spacing:-0.2px;padding:4px 10px 16px;border-bottom:1px solid var(--border);margin-bottom:10px;}
.sb-logo span{color:var(--accent);}
.sb-sec{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:1.2px;color:var(--text3);padding:12px 10px 5px;}
.sb-link{display:flex;align-items:center;gap:9px;padding:8px 10px;border-radius:8px;font-size:13px;font-weight:500;color:var(--text2);cursor:pointer;transition:all 0.15s;}
.sb-link:hover{background:var(--bg3);color:var(--text);}
.sb-link.on{background:var(--accent-bg);color:var(--accent);}
.sb-badge{margin-left:auto;font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;}
.sb-badge.b{background:var(--accent-bg);color:var(--accent);border:1px solid var(--accent-border);}
.sb-user{margin-top:auto;border-top:1px solid var(--border);padding:14px 10px 2px;display:flex;align-items:center;gap:9px;}
.sb-av{width:32px;height:32px;border-radius:8px;background:var(--accent2);color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.sb-un{font-size:13px;font-weight:600;}.sb-up{font-size:11px;color:var(--text3);}
.d-main{flex:1;height:100vh;overflow-y:auto;}
.d-header{padding:22px 26px 0;display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px;}
.d-title{font-size:22px;font-weight:700;letter-spacing:-0.5px;}
.d-sub{font-size:13px;color:var(--text3);margin-top:2px;}
.d-btns{display:flex;gap:8px;align-items:center;}
.d-btn{padding:8px 16px;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;font-family:'Space Grotesk',sans-serif;border:1px solid var(--border2);background:var(--bg3);color:var(--text2);transition:all 0.18s;}
.d-btn:hover{color:var(--text);}
.d-btn.p{background:var(--text);color:var(--bg);border-color:var(--text);}
.d-btn.p:hover{background:rgba(242,242,242,0.9);}
.kpi-row{display:grid;gap:10px;padding:0 26px 18px;}
.kpi{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:18px 20px;box-shadow:var(--sh-sm);}
.kpi-l{font-size:12px;color:var(--text3);margin-bottom:8px;}
.kpi-v{font-size:24px;font-weight:700;letter-spacing:-0.8px;margin-bottom:5px;}
.kpi-ch{font-size:12px;font-weight:500;}
.kpi-ch.up{color:var(--green);}.kpi-ch.dn{color:var(--kaspi);}
.d-grid{display:grid;grid-template-columns:1.55fr 1fr;gap:10px;padding:0 26px 26px;}
.d-card{background:var(--bg2);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:var(--sh-sm);}
.d-card-h{padding:15px 18px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;}
.d-card-t{font-size:14px;font-weight:600;}
.pill{font-size:11px;font-weight:600;padding:3px 10px;border-radius:100px;}
.pill.g{background:var(--green-bg);color:var(--green);}
.pill.r{background:var(--kaspi-bg);color:var(--kaspi);}
.pill.b{background:var(--accent-bg);color:var(--accent);}
.pill.a{background:var(--amber-bg);color:var(--amber);}
.d-table{width:100%;border-collapse:collapse;}
.d-table th{font-size:11px;color:var(--text3);font-weight:600;text-transform:uppercase;letter-spacing:0.5px;padding:10px 18px;border-bottom:1px solid var(--border);text-align:left;}
.d-table td{padding:11px 18px;font-size:13px;border-bottom:1px solid var(--border);}
.d-table tr:last-child td{border-bottom:none;}
.d-table td.m{color:var(--text2);}
.ko{padding:13px 16px;border-bottom:1px solid var(--border);}
.ko:last-child{border-bottom:none;}
.ko-top{display:flex;justify-content:space-between;margin-bottom:4px;}
.ko-id{font-size:11px;color:var(--text3);}
.ko-price{font-size:13px;font-weight:700;}
.ko-name{font-size:13px;font-weight:500;margin-bottom:5px;}
.ko-st{font-size:11px;color:var(--text2);display:flex;align-items:center;gap:5px;}
.kdot{width:5px;height:5px;border-radius:50%;}
.per-btn{padding:6px 14px;border-radius:6px;border:none;background:transparent;color:var(--text2);font-size:13px;font-weight:500;cursor:pointer;font-family:'Space Grotesk',sans-serif;transition:all 0.18s;}
.per-btn:hover{color:var(--text);}
.per-btn.on{background:var(--bg4);color:var(--text);border:1px solid var(--border2);}
`;
