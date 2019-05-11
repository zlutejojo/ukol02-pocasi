import UnixTimeStampFormat from './unix-time-stamp-format';

export default class ForecastMaxTemperature {

    constructor() {

    }

    // získám pole, které obsahuje pole s dvěma indexy, které mi udávají první a poslední záznam pro jeden den
    getListFirstLastIndexOfDays(timeStampFirstItem, daysToShow){
        let unixTimeStampFormat = new UnixTimeStampFormat();
        let firstItemHour = unixTimeStampFormat.getHourFromTimeStamp(timeStampFirstItem);

        console.log("time forecast hour" + unixTimeStampFormat.getHourFromTimeStamp(1557522000));
        console.log("time forecast date " + unixTimeStampFormat.getDateFromTimeStamp(1557522000));
 
        /* získám index posledního záznamu dnešního dne 
        vím, že v mém časovém pásmu mám tyto záznamy 0:02, 5:00, 8:00, 11:00, 14:00, 17:00, 20:00 a 23:00
        proto odečítám hodiny první zobrazení položky od 23 hodin (nejvyšší možný počet hodin)
        záznamy jsou po 3 hodinách, proto když podělím získaný počet hodin třema, dostanu index posledního záznamu (tj. toho ve 23 hod) dnešního dne
        */
        console.log("prvni item " + firstItemHour + "hour");
        let actualDayLastIndexItem = (23 - firstItemHour)/3;
    
        console.log("index " +  actualDayLastIndexItem);
        //index, od kterého budu získávat záznamy, tj. předpoveď začíná zítřejším dnem
        let startIndex = actualDayLastIndexItem + 1;
        
        // záznamy získávám pro zadaný počet dnů, proto cyklus, který mi do pole daysFirstLastIndex uloží další pole s prvním a posledním indexem jednoho dne
        let daysFirstLastIndex = [];
        let i;
        for (i = 0; i < daysToShow; i++) { 
            let dayFirstLastIndex = [];
            
            dayFirstLastIndex[0] = startIndex + (8 * i); 
            dayFirstLastIndex[1] = startIndex + 7 + (8 * i);
            daysFirstLastIndex.push(dayFirstLastIndex);  
        }
        return daysFirstLastIndex;
    }

    // ze zadaného rozsahu získám nejvyšší teplotu
    getMaxTemperature(dataFromAPI, firstIndex, lastIndex){
        let maxTemperature = -100;
        let i;
        for(i = firstIndex; i <= lastIndex; i++) {
            //console.log("hledam nejvyssi teplotu " + dataFromAPI.list[i].main.temp_max);
            let temperature = dataFromAPI.list[i].main.temp_max;
            if(temperature > maxTemperature) {
                maxTemperature = temperature;
            }
        }
        return maxTemperature;
    }
}