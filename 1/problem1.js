const fetch = require('node-fetch');
const fs = require('fs');

function fetchData(url){

    return fetch(url)
    .then((response)=>{
        return response.json()
        .then((results)=>{ 
            return results 
        })
    })
    .catch((err)=>{
        console.log('Error Ocurred : ' + err);
    })
    
};

function readSalaryJson(path){

    const salaryData = fs.readFileSync(path)
    const parsedData = JSON.parse(salaryData);

    convertIDRToUSD(parsedData)

    return parsedData
}

function convertIDRToUSD(data){

    const newObject = [];

    for(var arrayIndex = 0; arrayIndex<data.array.length; arrayIndex++){
        
        var usd = data.array[arrayIndex].salaryInIDR / 14187.94;
        data.array[arrayIndex].salaryInUSD = usd;
        
        newObject.push(data.array[arrayIndex]);
    }
    
    return newObject
    
}

function joinObject(arrayUserObject, arraySalaryObject){
    
    let joinData = arrayUserObject.map(element1 => 
        Object.assign(
            element1, arraySalaryObject.array.find(element2 => 
                    element2.id == element1.id
                )
            )
        );

    return joinData
}

function main(){

    let getJsonUserData = fetchData('http://jsonplaceholder.typicode.com/users');
    let getJsonSalaryData = readSalaryJson('../JSON Files/salary_data.json');

    getJsonUserData.then((result)=>{
        var data = joinObject(result, getJsonSalaryData);
        // console.log(data);
    })
}

main();

module.exports = {
    main,
    fetchData,
    readSalaryJson,
    convertIDRToUSD,
    joinObject
};