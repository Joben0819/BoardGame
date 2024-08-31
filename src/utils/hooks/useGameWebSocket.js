import { useState, useEffect } from "react";
import { getImToken } from "src/api/game/gamelist";

const useGameWebSocket = (lotteryId, onMessage) => {
  const [isConnected, setIsConnected] = useState();
  let disconnect;
  useEffect(() => {
    let ws;

    const connectToHost = async (host, token) => {
      return new Promise((resolve, reject) => {
        ws = new WebSocket(host, token);

        ws.onopen = () => {
          console.log("Websocket connection established!");
          resolve(ws); // Resolve the promise with the WebSocket instance
        };

        ws.onerror = (err) => {
          reject(err); // Reject the promise with the error
        };
      });
    };

    getImToken().then((res) => {
      const hostList = res.data?.data?.imHostlist;
      const token = res.data?.data?.token;

      let isConnected = false;

      const tryConnect = async () => {
        for (const host of hostList) {
          if (!isConnected) {
            try {
              const ws = await connectToHost(host, token);
              ws.onmessage = (msg) => {
                let data = JSON.parse(msg.data);
                onMessage(data);
              };
              var stringMsg = `{"msgType" : "joinGroup","groupId" : "${lotteryId}"}`;
              ws.send(stringMsg);
              isConnected = true;
            } catch (error) {
              console.error("Failed to connect:", error);
            }
          }
        }
      };

      tryConnect();
    });
    // getImToken().then((res) => {
    //   const hostList = res.data?.data?.imHostlist;
    //   const token = res.data?.data?.token;

    //   let isConnected = false; // Flag to track successful connection

    //   hostList.map((host, idx) => {
    //     console.log('@@@isConnected', isConnected)
    //     if (!isConnected) {
    //       ws = new WebSocket(host, token);

    //       ws.onopen = (event) => {
    //         var data = JSON.stringify(event);
    //         console.log("Websocket connection established!", event);
    //         isConnected = true;
    //         setIsConnected(true);
    //         var stringMsg = `{"msgType" : "joinGroup","groupId" : "${lotteryId}"}`;
    //         ws.send(stringMsg);
    //       };

    //       ws.onmessage = (msg) => {
    //         let data = JSON.parse(msg.data);
    //         onMessage(data);
    //       };

    //       ws.onerror = (err) => {};
    //     }

    //   });
    // });

    disconnect = () => {
      ws && ws.close();
      setIsConnected(false);
    };

    return () => {
      ws && ws.close();
      setIsConnected(false);
    };
  }, []);

  return [isConnected, disconnect];
};

export default useGameWebSocket;
