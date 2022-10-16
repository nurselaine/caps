# caps - The Code Academy Parcel Service

### Problem Domain

  A real-time service that allows for vendors, such as flower shops or restaurants, to alert a system of a package needing to be delivered, for drivers to instantly see what’s in their pickup queue, and then to alert the vendors as to the state of the deliveries (in transit, and then delivered).

### Phase 1
  - Create event emitters and listeners to notify   
    - Event Handlers: 
      - PICKUP
        - will emit from vendor
        - will listen from server
        - will emit to driver
      - IN-TRANSIT
        - will emit from driver
        - will ALSO emit DELIVERED from driver
        - will listen from server
      - DELIVERED
        - will listen from server
        - will emit to vendor

### Phase 2
  - Refactor networkign implementation of CAPS system to Socket.io
  - Clients will now communicate over a network 
    - Socket.io will broadcast events between clients
    - Utilize a namesapce called caps that will recieve all caps events
    - Clients will be connected to this namesspace and the server will emit specific events to each socket that is listening for their events from the server
    - Keep the same Events
      - PICKUP
      - IN-TRANSIT
      - DELIVERED
    - There will be multiple vendors that are only listening to for specific events based on the vendor ID, create a room for each client to emit specific events to

### START 
  - Navigate three terminals
    1. src/server then run - node server.js
      - this represents the HUB/Main Event Pool
    2. src/server/client/vendor then run - node index.js
      - this is the vendor client server
    3. src/server/client/driver then run - node index.js
      - this is the driver client server

#### User Stories

    As a vendor, I want to “subscribe” to “delivered” notifications so that I know when my packages are delivered.
    As a vendor, I want to “catch up” on any “delivered” notifications that I might have missed so that I can see a complete log.
    As a driver, I want to “subscribe” to “pickup” notifications so that I know what packages to deliver.
    As a driver, I want to “catch up” on any “pickup” notifications I may have missed so that I can deliver everything.
    As a driver, I want a way to “scan” a delivery so that the vendors know when a package has been delivered.


latest PR: https://github.com/nurselaine/caps
UML: https://www.figma.com/file/MwgtqvhGUv38aeQcWk3vW7/Untitled?node-id=0%3A1
