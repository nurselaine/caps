'use strict';

class Queue {
  constructor(){
    this.data = {};
  }

  store(key, value){
    this.data[key] = value;
    return key;
  }

  read(key){
    return this.data[key];
  }

  remove(key){
    console.log('something got removed');
    let value = this.data[key];
    delete this.data[key];
    return value;
  }
}

module.exports = Queue;

/*


- We want a feature to keep a log of payloads that reach our system, organized by vendor and event type.
Payloads are “published” to the appropriate Clients for the appropriate events.
Client Vendor Applications used by retailers, should subscribe to appropriate Vendor Queues so that they can be alerted when a delivery was made.
The Client can ask for all undelivered messages from a particalur Server Queue.
When a Client receives a message, it will need to let the hub server know that it was received.
Global Event Pool (HUB)
Use the socket.io npm package to configure an event Server that can be started at a designated port using node.
We still need the Server to configure socket connections to the caps namespace on a specified PORT.
Create a Message Queue that can store payloads for specific Clients.
Each payload that is read by the pickup event should be added to a Queue for Driver clients.
Each payload that is read by the delivered event should be added to a Queue for Vendor clients.
This could be as simple as an Object or Array, or as complex as a Module that connects to and performs operations against a database.
Add a received event to the Global Event Pool.
When this event is heard on the server, assume it’s a Client Module telling you a payload was sucessfully read.
The payload should include the client id, event name, and message id, so that you can delete it from the Queue.
Add a getAll event to the Global Event Pool.
The payload should include the client id and event name.
When this event is heard on the server, find each of the messages in the queue for the client, for the event specified.
Go through each of the entries for the client/event in the queue (if any) and broadcast them to the client.
Refactor the delivered, pickup, and in-transit events in the Global Event Pool.
We need to be able to add payloads to the appropriate Queue for specific Clients.
When these events are triggered, add the payload immediately to the appropriate Queue.
Broadcast the same event, with the following payload to all subscribers.
 {
   "messageID": "Unique-Message-ID",
   "payload": "<ORIGINAL_PAYLOAD>"
 }
Vendor Client Application(s)
Create 2 separate “stores” that use the Vendor Client module.
Create one store called acme-widgets and 1-800-flowers.
Connect to the CAPS Application Server using the caps namespace.
Both stores should “subscribe” to different Queues, since they are separate stores.
On startup, your client applications should trigger a getAll event that fetches all messages from the server that are in that Vendor’s Queue (events/messages they’ve not yet received).
Trigger the received event with the correct payload to the server.
Subscribe to the delivered Queue.
Each client should be able to receive payloads “published” to the delivered Queue.
We still want to log a confirmation with the “order-id” and payload.
Driver Client Application
Refactor event logic to use Queues.
Make sure your Driver Client is subscribing to the appropriate Vendor Queues.
Upon connection, Driver Client can fetch any messages added to their subscribed Queues.

*/