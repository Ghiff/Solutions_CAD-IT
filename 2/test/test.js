const chai = require('chai');
const problem = require('../problem2');

var should = chai.should();

describe('Unit Testing Of Problem2.js', ()=>{

    describe('Read json Data',()=>{
        it('Should return json data',()=>{

            var data = problem.readDataJson('D:/Personal/JobHunting/CAD-IT/Program/JSON Files/sensor_data.json');
            
            data.should.be.a('object');
            should.exist(data.array);
            data.array.length.should.be.eql(1440);
            data.array[0].should.have.property('temperature');
            data.array[0].should.have.property('humidity');
            data.array[0].should.have.property('roomArea');
            data.array[0].should.have.property('id');
            data.array[0].should.have.property('timestamp');
        });
    });

    describe('Aggregate Array Object By Id Testing', ()=>{

        it('Should aggregate object by its id',()=>{

            var data = problem.aggreagateArrayById(problem.readDataJson('D:/Personal/JobHunting/CAD-IT/Program/JSON Files/sensor_data.json'));

            data.should.be.a('object');
            should.exist(data.roomArea1);
            should.exist(data.roomArea2);
            should.exist(data.roomArea3);
            data.roomArea1.should.have.lengthOf.above(1);
            data.roomArea2.should.have.lengthOf.above(1);
            data.roomArea2.should.have.lengthOf.above(1);
        });
    });

    describe('Take sensor data testing',()=>{

        it('Should return object consist of sensor data',()=>{

            var data = problem.sensorData(problem.aggreagateArrayById(problem.readDataJson('D:/Personal/JobHunting/CAD-IT/Program/JSON Files/sensor_data.json')));

            data.should.be.a('object');
            should.exist(data.roomArea1);
            should.exist(data.roomArea2);
            should.exist(data.roomArea3);
            should.exist(data.roomArea1.temperature);
            should.exist(data.roomArea1.humidity);
            should.exist(data.roomArea2.temperature);
            should.exist(data.roomArea2.humidity);
            should.exist(data.roomArea3.temperature);
            should.exist(data.roomArea3.humidity);
            data.roomArea1.temperature.should.have.lengthOf.above(1);
            data.roomArea1.humidity.should.have.lengthOf.above(1);
            data.roomArea2.temperature.should.have.lengthOf.above(1);
            data.roomArea2.humidity.should.have.lengthOf.above(1);
            data.roomArea3.temperature.should.have.lengthOf.above(1);
            data.roomArea3.humidity.should.have.lengthOf.above(1);
        });
    });

    describe('Calculate data testing',()=>{
        it('Should return min, max, median, and average from the sensors data of each room', ()=>{

            var data = problem.calculate(problem.sensorData(problem.aggreagateArrayById(problem.readDataJson('D:/Personal/JobHunting/CAD-IT/Program/JSON Files/sensor_data.json'))));

            data.should.be.a('object');
            should.exist(data.roomArea1);
            should.exist(data.roomArea2);
            should.exist(data.roomArea3);
            should.exist(data.roomArea1.temperature);
            should.exist(data.roomArea1.humidity);
            should.exist(data.roomArea2.temperature);
            should.exist(data.roomArea2.humidity);
            should.exist(data.roomArea3.temperature);
            should.exist(data.roomArea3.humidity);
            should.exist(data.roomArea1.temperature.min);
            should.exist(data.roomArea1.humidity.min);
            should.exist(data.roomArea2.temperature.min);
            should.exist(data.roomArea2.humidity.min);
            should.exist(data.roomArea3.temperature.min);
            should.exist(data.roomArea3.humidity.min);
            should.exist(data.roomArea1.temperature.max);
            should.exist(data.roomArea1.humidity.max);
            should.exist(data.roomArea2.temperature.max);
            should.exist(data.roomArea2.humidity.max);
            should.exist(data.roomArea3.temperature.max);
            should.exist(data.roomArea3.humidity.max);
            should.exist(data.roomArea1.temperature.median);
            should.exist(data.roomArea1.humidity.median);
            should.exist(data.roomArea2.temperature.median);
            should.exist(data.roomArea2.humidity.median);
            should.exist(data.roomArea3.temperature.median);
            should.exist(data.roomArea3.humidity.median);
            should.exist(data.roomArea1.temperature.average);
            should.exist(data.roomArea1.humidity.average);
            should.exist(data.roomArea2.temperature.average);
            should.exist(data.roomArea2.humidity.average);
            should.exist(data.roomArea3.temperature.average);
            should.exist(data.roomArea3.humidity.average);
            data.roomArea1.temperature.min.should.not.be.null;
            data.roomArea1.humidity.min.should.not.be.null;
            data.roomArea2.temperature.min.should.not.be.null;
            data.roomArea2.humidity.min.should.not.be.null;
            data.roomArea3.temperature.min.should.not.be.null;
            data.roomArea3.humidity.min.should.not.be.null;
            data.roomArea1.temperature.max.should.not.be.null;
            data.roomArea1.humidity.max.should.not.be.null;
            data.roomArea2.temperature.max.should.not.be.null;
            data.roomArea2.humidity.max.should.not.be.null;
            data.roomArea3.temperature.max.should.not.be.null;
            data.roomArea3.humidity.max.should.not.be.null;
            data.roomArea1.temperature.median.should.not.be.null;
            data.roomArea1.humidity.median.should.not.be.null;
            data.roomArea2.temperature.median.should.not.be.null;
            data.roomArea2.humidity.median.should.not.be.null;
            data.roomArea3.temperature.median.should.not.be.null;
            data.roomArea3.humidity.median.should.not.be.null;
            data.roomArea1.temperature.average.should.not.be.null;
            data.roomArea1.humidity.average.should.not.be.null;
            data.roomArea2.temperature.average.should.not.be.null;
            data.roomArea2.humidity.average.should.not.be.null;
            data.roomArea3.temperature.average.should.not.be.null;
            data.roomArea3.humidity.average.should.not.be.null;
        });
    });
});