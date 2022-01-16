import {createServer, RequestListener, Server} from 'http';
import {IServerResponseMessage} from './socket-server-interface';
import {connection, IUtf8Message,} from 'websocket';
import {EventsType} from '../common/socket-events-types';
import {connectionList} from './connectlist'
import {thingList, ThingsList} from './thing';

const requestHandler: RequestListener = (request, response) => {
  response.end('Hello  Node.js Server!');
};
const httpWSServer = createServer(requestHandler);
const wssPort = '3000';

httpWSServer.listen(wssPort, () => {
  console.log(`WSocket is listening on ${wssPort}`);
});

//const websocket = require('websocket');
import * as websocket from 'websocket';

const sendResponse = (client: connection, type: string, obj: any) => {
  const responseMessage: IServerResponseMessage = {
    type: type,
    content: obj,
  };
  client.sendUTF(JSON.stringify(responseMessage));
};

class SocketService {
  private wss:websocket.server;
  private connections: connection[];
  public usersName: string[];

  constructor(srv: Server) {
    this.wss = new websocket.server({httpServer: srv});
    this.wss.on('request', (request:websocket.request)=>this.onConnect(request));
    this.connections = []
    this.usersName=[]
  }

  onConnect(request:websocket.request) {
    const connection = request.accept(undefined, request.origin);
    // console.log('$$')
    // const name='Player'
    console.log("Wow connect")
    connection.on('message', (_message) => {
      console.log('MESS')
      // const sendAll = (type, content) => {
      //   let arr = Array.from(playersList.list().keys());
      //   for (let i in arr) {
      //     let p = playersList.list().get(arr[i]);
      //     try {
      //       sendResponse(p.connection, type, content);
      //     } catch (e) {
      //       //console.log(e);
      //     }
      //   }
      // };
      // const sendAllList = () => {
      //   sendList(EventsType.USER_LIST, playersList)
      //   sendList(EventsType.THING_LIST, thingList)
      //  this.connections.forEach(connection => {
      //     sendResponse(connection,'activePlayers',{users:this.usersName})
      //     //connection.sendUTF(JSON.stringify('Request' + this.usersName))
      //   })
      // }
      // const sendList = (type: EventsType, thisList: PlayersList | ThingsList) => {
      //   let arr = Array.from(thisList.list().keys());
      //   let list = [];
      //   for (let i in arr) {
      //     let p = playersList.list().get(arr[i]);
      //     list.push(p);
      //   }
      //   sendAll(type, {list: list});
      // };

      if (_message.type === 'utf8') {
        const message = _message as IUtf8Message;
        let data = JSON.parse(message.utf8Data);
        // if (data.type === 'message') {
        //   sendAllList();
        // }
        // if (data.type === 'addPlayer') {
        //   this.connections.push(connection)
        //   console.log('push')
        //   this.usersName.push(data.user)
        //   sendAllList();
        // }

        if (data.type == EventsType.USER_CONNECT) {
        //   playersList.add(data.content.player, connection);
        //   for (let k in data.content.player.thingsList) {
        //     const thing = data.content.player.thingsList[k]
        //     thingList.add(thing)
        //   }
        //   sendAllList();
        // }
        // else if (data.type == EventsType.USER_CHANGE) {
        //   playersList.list().get(data.content.id).change(data.content);
        //   sendAllList();
        // }
        // else if (data.type == EventsType.THING_CHANGE) {
        //   sendAll(EventsType.THING_CHANGE, data.content);
        }
      }else{
        throw new Error('Not utf8');
      }
     });

  }
}

const wsc = new SocketService(httpWSServer);
export {wsc};
