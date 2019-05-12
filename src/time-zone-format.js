import UnixTimeStampFormat from './unix-time-stamp-format';

export default class TimeZoneFormat {
    constructor() {

    }

    //POZOR: offset - nejsem si jistá, zda se to bude správně chovat i pro letní čas, kdy je rozdíl 1 hodina místo 2
    timeZoneFormat(city) {
        
        //1. vrací můj časový posun v minutách
        //2. pokud jsem s časem dopředu tak mi to vrátí záporné číslo
        let offset = new Date().getTimezoneOffset();
        offset = offset / -60;
        let myTimeZone = this.convertHourToSecond(offset);
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