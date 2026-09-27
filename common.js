function flag(cc){if(!cc||cc.length!==2)return "🏳️";return [...cc.toUpperCase()].map(c=>String.fromCodePoint(127397+c.charCodeAt())).join("")}
const pointNames=["0","15","30","40"];
function ensureScoreState(s){
 if(!s.mode)s.mode=s.inMTB?"superTie":"normal";
 if(!s.matchFormat)s.matchFormat="standard6";
 if(typeof s.matchOver!=="boolean")s.matchOver=false;
 if(typeof s.winner!=="number")s.winner=null;
 s.teams.forEach(t=>{if(!Array.isArray(t.ties))t.ties=[0,0];if(typeof t.superTie!=="number")t.superTie=typeof t.mtb==="number"?t.mtb:0;if(!Array.isArray(t.sets))t.sets=[0,0];if(typeof t.point!=="number")t.point=0})
}
function gamesTarget(s){ensureScoreState(s);return s.matchFormat==="short4"?4:6}
function points(t,s){ensureScoreState(s);if(s.matchOver)return "FIM";if(s.mode==="tie")return String(t.ties[s.currentSet]);if(s.mode==="superTie")return String(t.superTie);return pointNames[t.point]??"0"}
function setWinner(s,setIndex){
 const a=s.teams[0].sets[setIndex],b=s.teams[1].sets[setIndex],g=gamesTarget(s);
 if(a===g+1&&b===g)return 0;if(b===g+1&&a===g)return 1;
 if(a>=g&&a-b>=2)return 0;if(b>=g&&b-a>=2)return 1;return null
}
function finishSet(s,team){
 s.teams[0].point=s.teams[1].point=0;
 if(s.currentSet===0){s.currentSet=1;s.mode="normal";return}
 const w1=setWinner(s,0),w2=setWinner(s,1);
 if(w1!==null&&w1===w2){s.matchOver=true;s.winner=w2;s.mode="normal";return}
 s.mode="superTie";s.teams[0].superTie=s.teams[1].superTie=0;
}
function winGame(s,team){
 const other=1-team,g=gamesTarget(s);
 s.teams[team].sets[s.currentSet]++;s.teams[0].point=s.teams[1].point=0;
 const a=s.teams[team].sets[s.currentSet],b=s.teams[other].sets[s.currentSet];
 if(a>=g&&a-b>=2){finishSet(s,team);return}
 if(s.teams[0].sets[s.currentSet]===g&&s.teams[1].sets[s.currentSet]===g){
   s.mode="tie";s.teams[0].ties[s.currentSet]=s.teams[1].ties[s.currentSet]=0
 }
}
function gamePoint(s,team){
 ensureScoreState(s);if(s.matchOver)return;const other=1-team;
 if(s.mode==="tie"){
  s.teams[team].ties[s.currentSet]++;
  const a=s.teams[team].ties[s.currentSet],b=s.teams[other].ties[s.currentSet],g=gamesTarget(s);
  if(a>=7&&a-b>=2){s.teams[team].sets[s.currentSet]=g+1;s.teams[other].sets[s.currentSet]=g;finishSet(s,team)}
  return
 }
 if(s.mode==="superTie"){
  s.teams[team].superTie++;
  const a=s.teams[team].superTie,b=s.teams[other].superTie;
  if(a>=10&&a-b>=2){s.matchOver=true;s.winner=team}
  return
 }
 const a=s.teams[team];
 if(a.point<3){a.point++;return}
 winGame(s,team)
}
function specialScore(t,s){ensureScoreState(s);if(s.mode==="tie")return String(t.ties[s.currentSet]);if(s.mode==="superTie"||s.matchOver&&s.teams.some(x=>x.superTie>0))return String(t.superTie);return "-"}
function specialLabel(s){ensureScoreState(s);if(s.mode==="tie")return `TIE S${s.currentSet+1}`;if(s.mode==="superTie"||s.matchOver&&s.teams.some(x=>x.superTie>0))return "SUPER TIE";return "TIE/STB"}
