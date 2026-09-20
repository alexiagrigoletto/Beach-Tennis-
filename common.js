function flag(cc){if(!cc||cc.length!==2)return "🏳️"; return [...cc.toUpperCase()].map(c=>String.fromCodePoint(127397+c.charCodeAt())).join("")}
const pointNames=["0","15","30","40"];
function points(t,s){ if(s.inMTB) return String(t.mtb); return pointNames[t.point] ?? "AD"; }
function gamePoint(s,team){
  if(s.inMTB){s.teams[team].mtb++; return}
  const a=s.teams[team], b=s.teams[1-team];
  if(a.point<=2){a.point++; return}
  if(a.point===3 && b.point<3){ winGame(s,team); return}
  if(a.point===3 && b.point===3){a.point=4; return}
  if(a.point===4){winGame(s,team); return}
  if(b.point===4){b.point=3; return}
}
function winGame(s,team){s.teams[team].sets[s.currentSet]++;s.teams[0].point=s.teams[1].point=0}
