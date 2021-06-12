const { match } = require('assert');
const fs = require('fs');


function readDataJson(path){

    var data = fs.readFileSync(path)
    var parsedData = JSON.parse(data);

    return parsedData

}

function aggreagateArrayById(dataObject){

    var grouped = dataObject.array.reduce(function(results, key) {(

            results[key.roomArea] = results[key.roomArea] || []
        )
            .push(key);

        return results;
    },{})

    return grouped
}

function sensorData (data){

    var returnData = {
        roomArea1 : {
            temperature : [],
            humidity :[]
        },
        roomArea2 : {
            temperature : [],
            humidity :[]
        },
        roomArea3 : {
            temperature : [],
            humidity :[]
        }
    };


    Object.values(data.roomArea1).forEach(value => {
        returnData.roomArea1.temperature.push(value.temperature);
        returnData.roomArea1.humidity.push(value.humidity);
    });
    Object.values(data.roomArea2).forEach(value => {
        returnData.roomArea2.temperature.push(value.temperature);
        returnData.roomArea2.humidity.push(value.humidity);
    });
    Object.values(data.roomArea3).forEach(value => {
        returnData.roomArea3.temperature.push(value.temperature);
        returnData.roomArea3.humidity.push(value.humidity);
    });

    return returnData
}

function calculate(data) {
    
    const median = (arr) => {
        const mid = Math.floor(arr.length / 2);
        const nums = [...arr].sort((a, b) => a - b);

        return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    const average = (arr) =>{

        return arr.reduce((a,b) => a + b) / arr.length
    }

    var returnData = {
        roomArea1 : {
            temperature : {},
            humidity :{}
        },
        roomArea2 : {
            temperature : {},
            humidity :{}
        },
        roomArea3 : {
            temperature : {},
            humidity :{}
        }
    };

    returnData.roomArea1.temperature.min  = Math.min(...data.roomArea1.temperature);
    returnData.roomArea1.humidity.min= Math.min(...data.roomArea1.humidity);
    returnData.roomArea1.temperature.max = Math.max(...data.roomArea1.temperature);
    returnData.roomArea1.humidity.max= Math.max(...data.roomArea1.humidity);
    returnData.roomArea1.temperature.median = median(data.roomArea1.temperature);
    returnData.roomArea1.humidity.median = median(data.roomArea1.humidity);
    returnData.roomArea1.temperature.average = average(data.roomArea1.temperature);
    returnData.roomArea1.humidity.average = average(data.roomArea1.humidity);

    returnData.roomArea2.temperature.min  = Math.min(...data.roomArea2.temperature);
    returnData.roomArea2.humidity.min= Math.min(...data.roomArea2.humidity);
    returnData.roomArea2.temperature.max = Math.max(...data.roomArea2.temperature);
    returnData.roomArea2.humidity.max= Math.max(...data.roomArea2.humidity);
    returnData.roomArea2.temperature.median = median(data.roomArea2.temperature);
    returnData.roomArea2.humidity.median = median(data.roomArea2.humidity);
    returnData.roomArea2.temperature.average = average(data.roomArea2.temperature);
    returnData.roomArea2.humidity.average = average(data.roomArea2.humidity);

    returnData.roomArea3.temperature.min  = Math.min(...data.roomArea3.temperature);
    returnData.roomArea3.humidity.min= Math.min(...data.roomArea3.humidity);
    returnData.roomArea3.temperature.max = Math.max(...data.roomArea3.temperature);
    returnData.roomArea3.humidity.max= Math.max(...data.roomArea3.humidity);
    returnData.roomArea3.temperature.median = median(data.roomArea3.temperature);
    returnData.roomArea3.humidity.median = median(data.roomArea3.humidity);
    returnData.roomArea3.temperature.average = average(data.roomArea3.temperature);
    returnData.roomArea3.humidity.average = average(data.roomArea3.humidity);

    return returnData
}


var data = aggreagateArrayById(readDataJson('../JSON Files/sensor_data.json'));
var dataList = sensorData(data);
var main = calculate(dataList);
// console.log(main);

module.exports = {
    readDataJson,
    aggreagateArrayById,
    sensorData,
    calculate
}