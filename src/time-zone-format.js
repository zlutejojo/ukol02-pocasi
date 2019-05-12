import UnixTimeStampFormat from './unix-time-stamp-format';

export default class TimeZoneFormat {
    constructor() {

    }

    //TODO načítat myTimeZone ze systému, takto tam mám napevno časové pásmo pro ČR a to ještě pro letní čas, tj. +2 hodiny (zimní čas je +1)
    timeZoneFormat(city) {
        let myTimeZone = this.convertHourToSecond(2);
        let time;
        switch (city) {
            case "brno,cz":
                time = this.convertHourToSecond(2) - myTimeZone;
                break;
            case "bedford,us":
                time = this.convertHourToSecond(-4) - myTimeZone;
                break;
            case "sydney,au":
                time = this.convertHourToSecond(10) - myTimeZone;
                break;
            default:
                time = 0;
        }
        return time;
    }

    // timeStamp je v sekundách, proto potřebuju hodiny v sekundách, tj. 60 sekund * 60 minut = 3 600
    convertHourToSecond(hour){
        let hourInSecond = hour * 3600;
        return hourInSecond;
    }

}