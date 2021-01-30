import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
let ejs = require('ejs');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
let Clients = new Map()
const adapter = new FileSync('db.json')
const db = low(adapter);
function jsonConcat(o1:any, o2:any) {
    for (var key in o2) {
     o1[key] = o2[key];
    }
    return o1;
   }

const app = express();
const port = 3000
app.set('view engine', 'ejs');
app.get("/",(rq,rs)=>{
    rs.render('index.ejs', {wss:wss,Clients:Clients,db:db});
});
app.get('/kill/:ClientID', (req, res) => {
    wss.clients.forEach((client) =>{
        if(Clients.get(client) == req.params.ClientID){
            client.send("close");
        };
      });
      res.redirect('/');
})
app.get('/refuel/:ClientID', (req, res) => {
    wss.clients.forEach((client) =>{
        if(Clients.get(client) == req.params.ClientID){
            client.send("refuel");
        };
      });
      res.redirect('/');
})
app.get('/moveup/:ClientID', (req, res) => {
    wss.clients.forEach((client) =>{
        if(Clients.get(client) == req.params.ClientID){
            move("up",db.get('computers').value()[Clients.get(client)].name,client)
        };
      });
      res.redirect('/');
})
app.get('/movedown/:ClientID', (req, res) => {
    wss.clients.forEach((client) =>{
        if(Clients.get(client) == req.params.ClientID){
            move("down",db.get('computers').value()[Clients.get(client)].name,client)
        };
      });
      res.redirect('/');
})
app.get('/moveback/:ClientID', (req, res) => {
    wss.clients.forEach((client) =>{
        if(Clients.get(client) == req.params.ClientID){
            move("back",db.get('computers').value()[Clients.get(client)].name,client)
        };
      });
      res.redirect('/');
})
app.get('/moveforward/:ClientID', (req, res) => {
    wss.clients.forEach((client) =>{
        if(Clients.get(client) == req.params.ClientID){
            move("forward",db.get('computers').value()[Clients.get(client)].name,client)
        };
      });
      res.redirect('/');
})
app.get('/moveleft/:ClientID', (req, res) => {
    wss.clients.forEach((client) =>{
        if(Clients.get(client) == req.params.ClientID){
            move("left",db.get('computers').value()[Clients.get(client)].name,client)
        };
      });
      res.redirect('/');
})
app.get('/moveright/:ClientID', (req, res) => {
    wss.clients.forEach((client) =>{
        if(Clients.get(client) == req.params.ClientID){
            move("right",db.get('computers').value()[Clients.get(client)].name,client)
        };
      });
      res.redirect('/');
})
app.listen(port, () => {
  console.log(`StartedWebserver${port}`)
})
var newrobotdiirection = 0;
var newrobotx = 0;
var newroboty = 0;
var newrobotz = 0;

const server = http.createServer(app);
//initialize the WebSocket server instance
//rot is 0 north 1 east 2 south 3 west
const wss = new WebSocket.Server({ server });

function move(derection:string,clientname:string,ws:any){
    let movefuel = db.get('computers').find({name:clientname}).value().fuel-1;
    var x = 0;
    var y = 0;
    var z = 0;
    var rot = 0;

    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{fuel:movefuel})).write(); 
    switch(derection) { 
        case "up": { 
            rot = db.get('computers').find({name:clientname}).value().rot;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{rot:rot})).write();

             x = db.get('computers').find({name:clientname}).value().x;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();

             y = db.get('computers').find({name:clientname}).value().y-1;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();

             z = db.get('computers').find({name:clientname}).value().z;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();

            ws.send("moveup");
            break;
        } 
        case "down": { 
            rot = db.get('computers').find({name:clientname}).value().rot;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{rot:rot})).write();

             x = db.get('computers').find({name:clientname}).value().x;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();

             y = db.get('computers').find({name:clientname}).value().y-1;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();

             z = db.get('computers').find({name:clientname}).value().z;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();

            ws.send("movedown");
            break;

        } 
        case "back": { 
            switch(db.get('computers').find({name:clientname}).value().rot){
                case 0:{
                     x = db.get('computers').find({name:clientname}).value().x;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();
      
                     y = db.get('computers').find({name:clientname}).value().y;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();
      
                     z = db.get('computers').find({name:clientname}).value().z+1;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
                    break;

                }
                case 1:{
                     x = db.get('computers').find({name:clientname}).value().x-1;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();
      
                     y = db.get('computers').find({name:clientname}).value().y;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();
      
                     z = db.get('computers').find({name:clientname}).value().z;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
                    break;

                }
                case 2:{
                     x = db.get('computers').find({name:clientname}).value().x;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();
      
                     y = db.get('computers').find({name:clientname}).value().y;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();
      
                     z = db.get('computers').find({name:clientname}).value().z-1;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
                    break;

                }
                case 3:{
                     x = db.get('computers').find({name:clientname}).value().x+1;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();
      
                     y = db.get('computers').find({name:clientname}).value().y;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();
      
                     z = db.get('computers').find({name:clientname}).value().z;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
                    break;

                }
            }
            ws.send("moveback");
            break;

        } 
        case "forward": { 
            switch(db.get('computers').find({name:clientname}).value().rot){
                case 0:{
                     x = db.get('computers').find({name:clientname}).value().x;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();
      
                     y = db.get('computers').find({name:clientname}).value().y;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();
      
                     z = db.get('computers').find({name:clientname}).value().z-1;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
                    break;

                }
                case 1:{
                     x = db.get('computers').find({name:clientname}).value().x+1;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();
      
                     y = db.get('computers').find({name:clientname}).value().y;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();
      
                     z = db.get('computers').find({name:clientname}).value().z;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
                    break;

                }
                case 2:{
                     x = db.get('computers').find({name:clientname}).value().x;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();
      
                     y = db.get('computers').find({name:clientname}).value().y;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();
      
                    let z = db.get('computers').find({name:clientname}).value().z+1;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
                    break;

                }
                case 3:{
                     x = db.get('computers').find({name:clientname}).value().x-1;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();
      
                     y = db.get('computers').find({name:clientname}).value().y;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();
      
                     z = db.get('computers').find({name:clientname}).value().z;
                    db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
                    break;

                }
            }
            ws.send("moveforward");
            break;

        } 
        case "left": { 
             rot = (db.get('computers').find({name:clientname}).value().rot == 0)? 3:db.get('computers').find({name:clientname}).value().rot-1;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{rot:rot})).write();

             x = db.get('computers').find({name:clientname}).value().x;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();

             y = db.get('computers').find({name:clientname}).value().y;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();

             z = db.get('computers').find({name:clientname}).value().z;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
      
            ws.send("moveleft");
            break;

        } 
        case "right": { 
             rot = (db.get('computers').find({name:clientname}).value().rot == 3)? 0:db.get('computers').find({name:clientname}).value().rot+1;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{rot:rot})).write();

             x = db.get('computers').find({name:clientname}).value().x;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();

             y = db.get('computers').find({name:clientname}).value().y;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();

             z = db.get('computers').find({name:clientname}).value().z;
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
      
            ws.send("moveright");
            break;

        } 
     } 
}
wss.on('connection', (ws: WebSocket) => {
    var isConected = true;
    var clientname = "";
    var clientId = 0;
    ws.on('message', (message: string) => {
        console.log(message);
        if(message.includes("Computer")){
            clientname = message.replace("Computer ","");
            if(db.get('computers').value().indexOf(db.get('computers').find({name:message.replace("Computer ","")}).value())<=-1){
                db.get('computers').push({name:message.replace("Computer ",""),x:newrobotx,y:newroboty,z:newrobotz,rot:newrobotdiirection}).write();
            }
            clientId = db.get('computers').value().indexOf(db.get('computers').find({name:message.replace("Computer ","")}).value());
            console.log("Conection: "+clientId+"  "+ clientname)
            Clients.set(ws,clientId);
        }
        if(message.includes("WhoAmI")){
            ws.send(clientname);
        }
        if(message.includes("fuel")){
            var fuel = Number(message.replace("fuel",""));
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{fuel:fuel})).write();
        }
        if(message.includes("x")){
            var x = Number(message.replace("x",""));
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{x:x})).write();
        }
        if(message.includes("y")){
            var y = Number(message.replace("y",""));
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{y:y})).write();
        }
        if(message.includes("z")){
            var z = Number(message.replace("z",""));
            db.get('computers').find({name:clientname}).assign(jsonConcat(db.get('computers').find({name:clientname}).value(),{z:z})).write();
        }
    });  
    ws.send('Conected');
    ws.send('Trainss');
    ws.on('close',function(){
        isConected = false;
     });
});


//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${process.env.PORT || 8999} :)`);
});
