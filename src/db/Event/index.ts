import { DbClient } from '../index';

class Event {

    public static fetch() {
        try {
            return new DbClient().getData("events", 10);
        } catch (error) {
            console.log("Unable to connect to db");
        }
    }
}

export default Event;