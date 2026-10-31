/* ===== BADGE COLLECTION & ACHIEVEMENTS (derived from saved prayer records; offline) ===== */
const FP=['fajr','dhuhr','asr','maghrib','isha'],PL={fajr:'Fajr',dhuhr:'Dhuhr',asr:'Asr',maghrib:'Maghrib',isha:'Isha'};
const TN=['Common','Uncommon','Rare','Epic','Legendary'],TC=['#8fd3b6','#8cc4f2','#b9a0f0','#ff9cc4','#ffd25e'];
const PAL=[['#e4f8ee','#8fd3b6','#3f9c7c'],['#e0f0ff','#8cc4f2','#4a8fcf'],['#f0e6ff','#b9a0f0','#7a5bd0'],['#ffe4f0','#ff9cc4','#e0568f'],['#fff6cf','#ffd25e','#e09a1f']];
const POOL=[['medal','star'],['shield','bolt'],['gem','flame'],['key','lantern'],['crown','trophy']];
const tier=(i,N)=>i==N-1?5:1+Math.floor(i*4/Math.max(1,N-1));
const EMB={fajr:'<path d="M20 68A30 30 0 0 1 80 68Z"/><path d="M8 78H92" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="50" cy="50" r="40" fill="none" stroke="#fff" stroke-width="6" stroke-dasharray="4 28" transform="rotate(-125 50 50)"/>',
dhuhr:'<circle cx="50" cy="50" r="17"/><circle cx="50" cy="50" r="32" fill="none" stroke="#fff" stroke-width="7" stroke-dasharray="5 20.1"/>',
asr:'<circle cx="50" cy="40" r="20"/><path d="M16 70H84M28 84H72" stroke="#fff" stroke-width="7" stroke-linecap="round"/>',
maghrib:'<path d="M22 62A28 28 0 0 1 78 62Z"/><path d="M10 72H90M24 85H76" stroke="#fff" stroke-width="7" stroke-linecap="round"/>',
isha:'<path d="M62 12A40 40 0 1 0 88 64A32 32 0 1 1 62 12Z"/><path d="M74 24l3 8 8 3-8 3-3 8-3-8-8-3 8-3z"/>',
nafl:'<path d="M50 6L59 41L94 50L59 59L50 94L41 59L6 50L41 41Z"/>',
tj:'<path d="M58 14A38 38 0 1 0 84 62A30 30 0 1 1 58 14Z"/><circle cx="76" cy="26" r="5"/><circle cx="86" cy="46" r="3.5"/><circle cx="64" cy="10" r="3"/>',
all:'<circle cx="50" cy="18" r="10"/><circle cx="82" cy="42" r="10"/><circle cx="70" cy="80" r="10"/><circle cx="30" cy="80" r="10"/><circle cx="18" cy="42" r="10"/>'};
const SHP={medal:'<path d="M30 4h15l5 24H35zM55 4h15L65 28H50z" fill="@2" opacity=".75"/><circle cx="50" cy="62" r="30" @F/><circle cx="50" cy="62" r="23" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="2.5"/>',
star:'<path d="M50 5L63 36L96 38L70 59L79 91L50 73L21 91L30 59L4 38L37 36Z" @F/>',
shield:'<path d="M50 5L89 17V49C89 74 68 88 50 96C32 88 11 74 11 49V17Z" @F/><path d="M50 12L82 22V49C82 69 66 81 50 88Z" fill="#fff" opacity=".18"/>',
bolt:'<path d="M62 3L18 57H45L34 97L84 38H56Z" @F/>',
gem:'<path d="M28 16H72L95 40L50 95L5 40Z" @F/><path d="M5 40H95M28 16L38 40L50 95M72 16L62 40L50 95M38 40H62" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="2"/>',
flame:'<path d="M50 3C56 24 81 34 81 62C81 83 67 97 50 97C33 97 19 83 19 62C19 48 28 41 34 29C38 38 42 42 46 44C48 30 45 16 50 3Z" @F/>',
key:'<path fill-rule="evenodd" d="M34 10a24 24 0 1 1 0 48a24 24 0 0 1 0-48zm0 14a10 10 0 1 0 0 20a10 10 0 0 0 0-20z" @F/><path d="M50 50L60 40L95 75L88 83L82 77L75 84L68 77L62 83L46 67Z" @F/>',
lantern:'<path d="M50 3V12M38 12H62L68 28C84 40 84 64 68 78L62 92H38L32 78C16 64 16 40 32 28Z" @F/><path d="M38 12H62M36 92H64" stroke="@2" stroke-width="5" stroke-linecap="round"/>',
crown:'<path d="M10 78L5 28L31 49L50 14L69 49L95 28L90 78Z" @F/><path d="M10 78H90V92H10Z" fill="@2" stroke="@2" stroke-width="3" stroke-linejoin="round"/><circle cx="5" cy="28" r="5" fill="#fff"/><circle cx="50" cy="14" r="5" fill="#fff"/><circle cx="95" cy="28" r="5" fill="#fff"/>',
trophy:'<path d="M26 6H74V38C74 56 62 67 50 67C38 67 26 56 26 38Z" @F/><path d="M26 16H9C9 34 17 43 28 45M74 16H91C91 34 83 43 72 45" fill="none" stroke="@2" stroke-width="6" stroke-linecap="round"/><path d="M44 67H56V80H44Z" fill="@2"/><path d="M28 80H72V94H28Z" @F/>'};
const CEN={medal:[50,62],star:[50,55],shield:[50,50],bolt:[50,52],gem:[50,46],flame:[50,68],key:[34,34],lantern:[50,52],crown:[50,58],trophy:[50,36]};
const art=(b,sz)=>{const P=PAL[b.tier-1],g='g'+b.id.replace(/\W/g,''),F=`fill="url(#${g})" stroke="${P[2]}" stroke-width="3" stroke-linejoin="round"`,[cx,cy]=CEN[b.shape],T=b.tier;
let fr='';if(T>=2)fr+=`<circle cx="50" cy="50" r="48" fill="none" stroke="${P[1]}" stroke-opacity=".4" stroke-width="2"/>`;
if(T>=3)fr+=[[8,10],[92,14],[94,84],[6,88]].map(([x,y])=>`<path d="M${x} ${y-6}L${x+1.8} ${y-1.8}L${x+6} ${y}L${x+1.8} ${y+1.8}L${x} ${y+6}L${x-1.8} ${y+1.8}L${x-6} ${y}L${x-1.8} ${y-1.8}Z" fill="${P[1]}"/>`).join('');
if(T>=4)fr+=`<path d="M12 84C-1 62 -1 36 12 16M88 84C101 62 101 36 88 16" fill="none" stroke="${P[1]}" stroke-width="4" stroke-linecap="round"/>`;
if(T==5)fr=`<circle cx="50" cy="50" r="49" fill="none" stroke="url(#${g}h)" stroke-width="3"/>`+Array.from({length:12},(_,i)=>`<path d="M50 50L${50+60*Math.cos(i*.5236)} ${50+60*Math.sin(i*.5236)}" stroke="${P[1]}" stroke-opacity=".28" stroke-width="2"/>`).join('')+fr;
const em=`<g transform="translate(${cx} ${cy}) scale(.4) translate(-50 -50)" fill="#fff" fill-opacity=".95" stroke="${P[2]}" stroke-opacity=".5" stroke-width="2">${b.sn?'<circle cx="50" cy="50" r="47" fill="none" stroke="#fff" stroke-width="5" stroke-opacity=".6"/>':''}${EMB[b.emb]}</g>`;
return `<svg viewBox="-4 -4 108 108" width="${sz}" height="${sz}" class="bga t${T}" aria-hidden="true"><defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P[0]}"/><stop offset=".55" stop-color="${P[1]}"/><stop offset="1" stop-color="${P[2]}"/></linearGradient><linearGradient id="${g}h" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9cc4"/><stop offset=".33" stop-color="#ffe27a"/><stop offset=".66" stop-color="#8fd3b6"/><stop offset="1" stop-color="#8cc4f2"/></linearGradient></defs>${fr}${SHP[b.shape].replace(/@F/g,F).replace(/@2/g,P[2])}${em}</svg>`};
/* ---- catalogue ---- */
const COLS=[['fard','Fard','sun-horizon'],['sunnah','Sunnah','book-open'],['nafl','Nafl','star'],['tj','Tahajjud','moon-stars']];
const BG=[];let bgi=0;
const add=(col,sec,mk,list,emb,sn,desc,lore)=>list.forEach(([name,t],i)=>{const T=tier(i,list.length);BG.push({id:mk+'.'+t,col,sec,mk,name,t,tier:T,shape:POOL[T-1][(bgi++)%2],emb,sn,desc:desc(t),lore})});
const NM=(a,ts)=>a.map((n,i)=>[n,ts[i]]);
const FN={fajr:['First Light','Early Riser','Al-Mashhud','Dawn Guardian','Perfect Light'],dhuhr:['High Noon','Noon Run','Gates at Noon','Zenith Keeper','Midday Master'],asr:['Al-Wusta','Afternoon Streak','Middle Guardian','Asr Sentinel','Keeper of the Middle'],maghrib:['Sunset Seal','Dusk Run','Golden Dusk','Twilight Keeper','Sunset Sovereign'],isha:['First Star','Night Shift','Half the Night','Moon Keeper','Night Sovereign']};
const FL={fajr:'Quran 17:78 calls the Fajr recitation “witnessed”.',dhuhr:'The Prophet ﷺ said the gates of heaven open as the sun passes its zenith (Tirmidhi 478).',asr:'Quran 2:238 urges guarding the “middle prayer”, understood as Asr (Sahih Muslim 627).',maghrib:'Prayed as soon as the sun sets, the first prayer of the Muslim night.',isha:'Reported: praying Isha in congregation is like half the night in prayer (Sahih Muslim 656).'};
FP.forEach(p=>add('fard',PL[p],'f.'+p,NM(FN[p],[1,7,30,100,365]),p,0,t=>`Pray ${PL[p]} (Fard) for ${t} different day${t>1?'s':''}`,FL[p]));
add('fard','All Five','f.all',NM(['Full House','Five Alive','Daily Complete','The Full Set','The Long Game'],[1,10,30,100,365]),'all',0,t=>`Pray all five Fard prayers for ${t} day${t>1?'s':''}`,'');
add('fard','All Five','f.str',NM(['Hat Trick','Seven-Day Run','Fortnight Flame','Istiqamah','Unbroken'],[3,7,14,30,100]),'all',0,t=>`Pray all five Fard prayers for ${t} days in a row`,'Istiqamah means steadfastness (Quran 41:30).');
const SUN_N={fajr:['Two Before Dawn','Dawn Pair','Better Than the World','Most Regular','Fajr Fixture'],dhuhr:['Noon Prelude','Midday Rhythm','Open Gates','Zawal Regular','Noon Fixture'],asr:['Four Before Asr','Afternoon Rhythm','Mercy Unlocked','Asr Regular','Golden Fixture'],maghrib:['Dusk Duo','Sunset Rhythm','After the Adhan','Dusk Regular','Sunset Fixture'],isha:['Night Opener','Evening Rhythm','Starlit Habit','Night Regular','Isha Fixture']};
const SUN_R={fajr:['Pre-Dawn Spark','Early Bird Engine','Daybreak Century','Eternal Dawn'],dhuhr:['Noon Spark','Sun Climber','Zenith Hundreds','Solar Thousand'],asr:['Gold Dust','Afternoon Engine','Amber Hundreds','Golden Thousand'],maghrib:['Ember Spark','Twilight Engine','Dusk Hundreds','Sunset Thousand'],isha:['Star Spark','Moonrise Engine','Starlit Hundreds','Midnight Thousand']};
const SUN_L={fajr:'The two rak‘ahs of Fajr are better than this world and all in it (Sahih Muslim 725).',dhuhr:'Reported: four rak‘ahs before Dhuhr, as the sun declines, are a time when the gates of heaven open (Tirmidhi 478).',asr:'May Allah have mercy on one who prays four before Asr (Abu Dawud 1271, Tirmidhi 430).',maghrib:'Two rak‘ahs after Maghrib are part of the regular Sunnah.',isha:'Two rak‘ahs after Isha are part of the regular Sunnah.'};
FP.forEach(p=>{add('sunnah',PL[p]+' Sunnah','s.'+p+'.n',NM(SUN_N[p],[1,10,30,100,365]),p,1,t=>`Complete ${PL[p]} Sunnah ${t} time${t>1?'s':''}`,SUN_L[p]);add('sunnah',PL[p]+' Sunnah','s.'+p+'.r',NM(SUN_R[p],[50,200,500,1000]),p,1,t=>`Pray ${t} Sunnah rak‘ahs of ${PL[p]}`,'')});
add('sunnah','Full Routine','s.all',NM(['Perfect Day','Routine Run','Full Circuit','Sunnah Sovereign'],[1,7,30,100]),'all',1,t=>`Pray the Sunnah of all five prayers for ${t} day${t>1?'s':''}`,'');
add('nafl','Rak‘ahs','n.r',NM(['Double Digits','Quarter Mark','Half Century','Century Club','Two-Fifty Strong','Five Hundred Club','The Thousand'],[10,25,50,100,250,500,1000]),'nafl',0,t=>`Pray ${t} Nafl rak‘ahs in total`,'');
add('nafl','Sessions','n.n',NM(['First Nafl','Extra Mile','Going Beyond','No Small Feat','Bonus Round','Closer Still','Qurb'],[1,5,15,30,75,150,365]),'nafl',0,t=>`Complete ${t} Nafl session${t>1?'s':''}`,'Qurb means closeness; voluntary prayers draw a servant near (Sahih Bukhari 6502).');
add('tj','Sessions','t.n',NM(['Midnight Mission','Third Night Rising','Seven Nights','Last Third','Moonlit Month','Century of Nights','Qiyam al-Layl'],[1,3,7,15,30,100,365]),'tj',0,t=>`Complete ${t} Tahajjud session${t>1?'s':''}`,'Allah descends to the lowest heaven in the last third of the night (Sahih Bukhari 1145).');
add('tj','Rak‘ahs','t.r',NM(['Night Spark','Moonlit Fifty','Century of the Night','Stars Aligned','Nightfall Engine','Thousand-Night Light'],[20,50,100,250,500,1000]),'tj',0,t=>`Pray ${t} Tahajjud rak‘ahs in total`,'Quran 17:79: “and from the night, pray Tahajjud as extra for you”.');
add('tj','Nights in a Row','t.str',NM(['Night Owl Streak','Weeklong Vigil','Fortnight Vigil','Al-Muzzammil'],[3,7,14,30]),'tj',0,t=>`Pray Tahajjud for ${t} nights in a row`,'Surah Al-Muzzammil (73) speaks of standing in prayer at night.');
/* ---- progress from real records ---- */
const bgCls=x=>{const L=(x.prayer||'').toLowerCase();if(x.cat=='Fard')return FP.includes(L)?['fard',L]:null;if(x.cat=='Witr'||L=='witr')return null;if(x.pid=='b_tahajjud'||/tahajjud/.test(L))return['tj',''];
if(x.cat=='Sunnah'){const p=/fajr/.test(L)?'fajr':/dhuhr|zuhr/.test(L)?'dhuhr':/asr/.test(L)?'asr':/maghrib/.test(L)?'maghrib':/isha/.test(L)?'isha':null;return p?['sn',p]:null}return['nf','']};
const bgSeq=a=>({v:a.length,at:t=>a[t-1]}),bgStr=ds=>{let run=0,best=0,pv=null;const ev=[];ds.forEach(d=>{run=pv&&addD(pv,1)==d?run+1:1;if(run>best){best=run;ev.push(d)}pv=d});return bgSeq(ev)};
const bgCalc=()=>{const S=D.filter(x=>x.type=='sess'&&x.st=='completed').sort((a,b)=>a.start-b.start),m={},U=a=>[...new Set(a)].sort(),fd_={},sn={},rk=(l)=>l.flatMap(x=>Array(Math.max(1,Math.min(40,x.n||1))).fill(x.date));
FP.forEach(p=>{fd_[p]=new Set();sn[p]=[]});const nf=[],tj=[];
S.forEach(x=>{const c=bgCls(x);if(!c)return;if(c[0]=='fard')fd_[c[1]].add(x.date);else if(c[0]=='sn')sn[c[1]].push(x);else if(c[0]=='nf')nf.push(x);else tj.push(x)});
const all5=U([...fd_.fajr]).filter(d=>FP.every(p=>fd_[p].has(d)));m['f.all']=bgSeq(all5);m['f.str']=bgStr(all5);
FP.forEach(p=>{m['f.'+p]=bgSeq(U([...fd_[p]]));m['s.'+p+'.n']=bgSeq(sn[p].map(x=>x.date));m['s.'+p+'.r']=bgSeq(rk(sn[p]))});
m['s.all']=bgSeq(U(sn.fajr.map(x=>x.date)).filter(d=>FP.every(p=>sn[p].some(x=>x.date==d))));
m['n.n']=bgSeq(nf.map(x=>x.date));m['n.r']=bgSeq(rk(nf));m['t.n']=bgSeq(tj.map(x=>x.date));m['t.r']=bgSeq(rk(tj));m['t.str']=bgStr(U(tj.map(x=>x.date)));return m};
/* ---- sync: unlock / revoke, persisted in IndexedDB as type 'bdg' ---- */
let bgBusy=0,bgAgain=0,bgQ=[],bgM={};
const bgHave=()=>new Map(D.filter(x=>x.type=='bdg'&&x.key[0]!='_').map(x=>[x.key,x]));
window.bgSync=()=>{if(bgBusy){bgAgain=1;return}bgBusy=1;(async()=>{try{do{bgAgain=0;await bgRun()}while(bgAgain)}finally{bgBusy=0}})().catch(e=>console.error('badges',e))};
const bgRun=async()=>{const m=bgM=bgCalc(),have=bgHave(),init=D.some(x=>x.id=='bdg__init'),fresh=[];
for(const b of BG){const ok=m[b.mk].v>=b.t,h=have.get(b.id);if(ok&&!h){const now=Date.now(),d=init?ld(now):(m[b.mk].at(b.t)||ld(now));await sv({id:'bdg_'+b.id,type:'bdg',key:b.id,date:d,at:init?now:new Date(d+'T12:00').getTime()});if(init)fresh.push(b)}else if(!ok&&h)await rm(h.id)}
if(!init)await sv({id:'bdg__init',type:'bdg',key:'_init',date:ld(Date.now()),at:Date.now()});
if(fresh.length)bgAnnounce(fresh);if(view=='badges'&&!document.querySelector('#m .modal'))render()};
/* ---- collection UI ---- */
let bgTab='fard';
const bgStat=col=>{const l=BG.filter(b=>b.col==col),h=bgHave();return{n:l.filter(b=>h.has(b.id)).length,t:l.length}};
const bgCard=(b,h)=>{const u=h.get(b.id),v=Math.min(b.t,(bgM[b.mk]||{v:0}).v);return `<button class="bgc${u?' ok':' lk'} t${b.tier}" onclick="bgOpen('${b.id}')" aria-label="${esc(b.name)}"><span class="bgw">${art(b,76)}</span><b>${esc(b.name)}</b><small>${u?'Unlocked '+u.date:esc(b.desc)}</small>${u?`<i class="bgr" style="color:${TC[b.tier-1]}">${TN[b.tier-1]}</i>`:`<span class="bar"><b style="width:${v/b.t*100}%"></b></span><small>${v}/${b.t}</small>`}</button>`};
V.badges=()=>{if(!Object.keys(bgM).length)bgM=bgCalc();const h=bgHave(),tot=BG.length,got=BG.filter(b=>h.has(b.id)).length,pc=Math.round(got/tot*100),secs=[...new Set(BG.filter(b=>b.col==bgTab).map(b=>b.sec))];
return W('Badge Collection',`<div class="in bgh"><div class="bgp"><b>${got}</b><small>/ ${tot} unlocked</small></div><div style="flex:1"><b>${pc}% complete</b><div class="bar"><b style="width:${pc}%"></b></div><small class="mut">Badges are earned from your saved records and update when records change. Witr and unmapped custom prayers are not counted.</small></div></div>
<div class="bgt">${COLS.map(([k,n,i])=>{const s=bgStat(k);return `<button class="${k==bgTab?'y':''}" onclick="bgTab='${k}';render()">${ic(i)} ${n}<small>${s.n}/${s.t}</small></button>`}).join('')}</div>
${secs.map(s=>{const l=BG.filter(b=>b.col==bgTab&&b.sec==s),n=l.filter(b=>h.has(b.id)).length;return `<div class="in"><b>${esc(s)}</b> <small class="mut">${n}/${l.length}</small><div class="bar"><b style="width:${n/l.length*100}%"></b></div><div class="bgg">${l.map(b=>bgCard(b,h)).join('')}</div></div>`}).join('')}`)};
const bgOpen=id=>{const b=BG.find(x=>x.id==id),u=bgHave().get(id),v=Math.min(b.t,(bgM[b.mk]||{v:0}).v);
M(b.name,`<div class="bgd t${b.tier}"><div class="bgbig${u?'':' lk'}">${art(b,170)}</div><i class="bgr" style="color:${TC[b.tier-1]}">${TN[b.tier-1]} · ${esc(COLS.find(c=>c[0]==b.col)[1])} · ${esc(b.sec)}</i><p><b>${esc(b.desc)}</b></p>${u?`<p class="st-ok">${ic('check-circle')} Unlocked on ${u.date}</p>`:`<div class="bar" style="width:100%"><b style="width:${v/b.t*100}%"></b></div><p>Progress <b>${v}/${b.t}</b></p>`}${b.lore?`<p class="mut"><small>${esc(b.lore)}</small></p>`:''}</div>`)};
/* ---- unlock animation + sound ---- */
const bgSnd=t=>{if(GS.silent||!GS.vol)return;try{const b=new Float32Array(SR*3),n=t>=5?[523,659,784,1047,1319]:t>=3?[523,659,784,1047]:[659,880];n.forEach((f,i)=>{tone(b,.05+i*.11,f,.9,.32*GS.vol,5);tone(b,.05+i*.11,f*2,.5,.08*GS.vol,9)});if(t>=4)tone(b,.7,1568,1.6,.12*GS.vol,3);new Audio(URL.createObjectURL(wavBlob(b,SR))).play().catch(()=>{})}catch(e){}};
const bgBusyUI=()=>{const z=$('#pz');return(z&&z.style.display=='flex')||(typeof PR2!='undefined'&&PR2&&!PR2.done)};
let bgTimer=0;
const bgAnnounce=l=>{const by=[...l].sort((a,b)=>b.tier-a.tier);bgQ.push(...(by.length>3?[by[0],{sum:by.length-1}]:by));if(!bgTimer)bgTimer=setInterval(bgPump,900);bgPump()};
const bgPump=()=>{if(document.getElementById('bgo'))return;if(!bgQ.length){clearInterval(bgTimer);bgTimer=0;return}if(bgBusyUI()){if(!bgPump.t){bgPump.t=1;toast('Badge unlocked! See it after your prayer.')}return}bgPump.t=0;const b=bgQ.shift();if(b.sum){toast('+'+b.sum+' more badges unlocked');return bgPump()}bgShow(b)};
const bgShow=b=>{const o=document.createElement('div'),T=b.tier,n=T>=4?26:T>=3?18:12;o.id='bgo';o.className='bgo t'+T;o.setAttribute('role','dialog');o.setAttribute('aria-label','Badge unlocked');
o.innerHTML=`<div class="rays"></div><div class="bgcard"><small class="bgk">ACHIEVEMENT UNLOCKED</small><div class="bgbx"><span class="bgring"></span>${Array.from({length:n},(_,i)=>`<i class="spk" style="--a:${Math.round(i*360/n)}deg;--d:${70+(i*37)%60}px;--s:${6+(i*5)%8}px;animation-delay:${.35+(i%6)*.07}s;background:${TC[(i+T)%5]}"></i>`).join('')}<div class="bgbig2">${art(b,176)}</div></div><i class="bgr" style="color:${TC[T-1]}">${TN[T-1].toUpperCase()}</i><h2>${esc(b.name)}</h2><p>${esc(b.desc)}</p><div class="chips" style="justify-content:center"><button class="y" onclick="bgClose()">Continue</button><button onclick="bgClose(1,'${b.id}')">${ic('star')} View badge</button></div></div>`;
document.body.appendChild(o);navigator.vibrate&&navigator.vibrate(T>=4?[30,50,60]:[25]);bgSnd(T)};
const bgClose=(v,id)=>{const o=document.getElementById('bgo');if(!o)return;o.classList.add('out');setTimeout(()=>{o.remove();if(v){const b=BG.find(x=>x.id==id);bgTab=b.col;show('badges');bgOpen(id)}else bgPump()},220)};
