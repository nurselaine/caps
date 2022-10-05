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

#### User Stories

    As a vendor, I want to alert the system when I have a package to be picked up.
    As a driver, I want to be notified when there is a package to be delivered.
    As a driver, I want to alert the system when I have picked up a package and it is in transit.
    As a driver, I want to alert the system when a package has been delivered.
    As a vendor, I want to be notified when my package has been delivered.


latest PR: https://github.com/nurselaine/caps
UML: https://www.figma.com/file/MwgtqvhGUv38aeQcWk3vW7/Untitled?node-id=0%3A1
