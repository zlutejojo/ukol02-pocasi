import UnixTimeStampFormat from './unix-time-stamp-format';

export default class ForecastMaxTemperature {

    constructor() {

    }

    // získám pole, které obsahuje pole s dvěma indexy, které mi udávají první a poslední záznam pro jeden den
    getListFirstLastIndexOfDays(dataFromAPI, daysToShow){
        let unixTimeStampFormat = new UnixTimeStampFormat();
        let firstItemDate = unixTimeStampFormat.getDateFromTimeStamp(dataFromAPI.list[0].dt);
 
        // hledám první záznam, který má odlišný den v datu než první záznam API, a to je první záznam následující dne (a ten hledám)
        let date = firstItemDate;
        let counter = 0;      
        while (date === firstItemDate) {
            // tady přičítám 1, protože chci srovnávat až s druhým indexem v seznamu a zároveň mi to sníží counter o 1, čímž získám přímo index záznamu (indexy jsou od nula)
            date = unixTimeStampFormat.getDateFromTimeStamp(dataFromAPI.list[counter+1].dt);
            counter += 1; 
        }
    
        //index, od kterého budu získávat záznamy, tj. předpoveď začíná zítřejším dnem
        let startIndex = counter;
        
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
            //console.log("hledam nejvyssi teplotu " + dataFromAPI.list[i].main.temp_max + " cas je " + unixTimeStampFormat.getDateFromTimeStamp(dataFromAPI.list[i].dt) + " " + unixTimeStampFormat.getHourFromTimeStamp(dataFromAPI.list[i].dt));
            let temperature = dataFromAPI.list[i].main.temp;
            if(temperature > maxTemperature) {
                maxTemperature = temperature;
            }
        }
        return maxTemperature;
    }
}