function flag(cc){if(!cc||cc.length!==2)return "🏳️";return [...cc.toUpperCase()].map(c=>String.fromCodePoint(127397+c.charCodeAt())).join("")}
const pointNames=["0","15","30","40"];
function ensureScoreState(s){if(!s.mode)s.mode=s.inMTB?"superTie":"normal";s.teams.forEach(t=>{if(!Array.isArray(t.ties))t.ties=[0,0];if(typeof t.superTie!=="number")t.superTie=typeof t.mtb==="number"?t.mtb:0})}
function points(t,s){ensureScoreState(s);if(s.mode==="tie")return String(t.ties[s.currentSet]);if(s.mode==="superTie")return String(t.superTie);return pointNames[t.point]??"AD"}
function gamePoint(s,team){ensureScoreState(s);if(s.mode==="tie"){s.teams[team].ties[s.currentSet]++;return}if(s.mode==="superTie"){s.teams[team].superTie++;return}const a=s.teams[team],b=s.teams[1-team];if(a.point<=2){a.point++;return}if(a.point===3&&b.point<3){winGame(s,team);return}if(a.point===3&&b.point===3){a.point=4;return}if(a.point===4){winGame(s,team);return}if(b.point===4)b.point=3}
function winGame(s,team){s.teams[team].sets[s.currentSet]++;s.teams[0].point=s.teams[1].point=0}
function specialScore(t,s){ensureScoreState(s);if(s.mode==="tie")return String(t.ties[s.currentSet]);if(s.mode==="superTie")return String(t.superTie);return "-"}
function specialLabel(s){ensureScoreState(s);return s.mode==="tie"?`TIE S${s.currentSet+1}`:s.mode==="superTie"?"SUPER TIE":"TIE/STB"}