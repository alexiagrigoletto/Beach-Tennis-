const express=require("express"),http=require("http");
const {Server}=require("socket.io");
const app=express(),server=http.createServer(app),io=new Server(server);
const initial={
  teams:[
    {players:[{name:"ALEXIA GRIGOLETTO",country:"BR"},{name:"PARCEIRA",country:"BR"}],sets:[0,0],ties:[0,0],superTie:0,point:0},
    {players:[{name:"ADVERSÁRIA 1",country:"BR"},{name:"ADVERSÁRIA 2",country:"BR"}],sets:[0,0],ties:[0,0],superTie:0,point:0}
  ],
  currentSet:0,
  matchFormat:"standard6",
  mode:"normal",
  matchOver:false,
  winner:null,
  serverTeam:0,
  event:{org:"ITF",category:"BT200",division:"FEMININO",round:"SEMIFINAL",city:"",temp:"",wind:""},
  sponsors:[{name:"PATROCINADOR 1",logo:""},{name:"PATROCINADOR 2",logo:""}],
  rotationSeconds:9
};
let state=JSON.parse(JSON.stringify(initial));
app.use(express.json({limit:"10mb"}));
app.use(express.static(__dirname));
app.get("/api/state",(q,r)=>r.json(state));
app.post("/api/state",(q,r)=>{state=q.body;io.emit("state",state);r.json({ok:true})});
app.post("/api/reset",(q,r)=>{state=JSON.parse(JSON.stringify(initial));io.emit("state",state);r.json({ok:true})});
io.on("connection",s=>{s.emit("state",state);s.on("state",x=>{state=x;s.broadcast.emit("state",state)})});
server.listen(process.env.PORT||3000);
