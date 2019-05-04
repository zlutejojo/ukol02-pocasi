
export default class UnixTimeStampFormat {
    constructor() {

    }

    createDate(unixTimeStamp) {
        return new Date(unixTimeStamp * 1000);
    }

    getHourFromTimeStamp(unixTimeStamp) {
        let myDate = this.createDate(unixTimeStamp);
        return myDate.getHours();
    }

    getMinuteFromTimeStamp(unixTimeStamp) {
        let myDate = this.createDate(unixTimeStamp);
        return myDate.getMinutes();

    }

    getDateFromTimeStamp(unixTimeStamp) {
        let myDate = this.createDate(unixTimeStamp);
        //console.log("date " + myDate.getDate());
        return myDate.getDate();
    }


    getDayFromTimeStamp(unixTimeStamp) {
        let day = this.createDate(unixTimeStamp).getDay();
        switch (day) {
            case 0:
                day = "Neděle";
                break;
            case 1:
                day = "Pondělí";
                break;
            case 2:
                day = "Úterý";
                break;
            case 3:
                day = "Středa";
                break;
            case 4:
                day = "Čtvrtek";
                break;
            case 5:
                day = "Pátek";
                break;
            case 6:
                day = "Sobota";
                break;
            default:
                day = "Unknown Day";
        }
        return day;
    }


    getMonthFromTimeStamp(unixTimeStamp) {
        let myDate = this.createDate(unixTimeStamp);
        // měsíce jsou číslovány od nula, takže + 1
        return myDate.getMonth() + 1;
    }

}