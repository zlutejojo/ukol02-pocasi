export default class UnixTimeStampFormat {
    constructor() {

    }

    timeZoneFormat(city) {
        let time;
        switch (city) {
            case "brno,cz":
                time = 2;
                break;
            case "bedford,us":
                time = -4;
                break;
            case "sydney,au":
                time = 10;
                break;
            default:
                time = 0;
        }
        return time;
    }

}