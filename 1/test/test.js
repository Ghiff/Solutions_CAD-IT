const chai = require('chai');
const problem = require('../problem1');

var should = chai.should();

describe('Unit Testing of Problem1.js',()=>{

    describe('User fetch testing',()=>{
        it('Should return user fetched object data',(done)=>{

            var data = problem.fetchData('http://jsonplaceholder.typicode.com/users');
            data.then((result)=>{
                
                result.should.be.a('array');
                result.length.should.be.eql(10);
                result[0].should.have.property('id');
                result[0].should.have.property('name');
                result[0].should.have.property('username');
                result[0].should.have.property('email');
                result[0].should.have.property('address');
                result[0].should.have.property('phone');
                result[0].should.have.property('website');
                result[0].should.have.property('company');
                result[0].should.have.property('company');
                console.log(result);
                done();
            })
            .catch((err)=>{
                done(err);
            })
        });
    });

    
    describe('Read salary testing',()=>{

        it('Should return salaries data',()=>{

            var data = problem.readSalaryJson('../JSON Files/salary_data.json');
            data.should.be.a('object');
            should.exist(data.array);
            data.array.length.should.be.eql(10);
            data.array[0].should.have.property('id');
            data.array[0].should.have.property('salaryInIDR');
            data.array[0].should.have.property('salaryInUSD');
        });
    });

    describe('Convert salary testing',()=>{

        it('Should return converted salary data',()=>{

            let mockData ={
                array :[
                    {
                        salaryInIDR: 4001111.510555328,
                        id: 1
                    }
                ]
            } 
            var data = problem.convertIDRToUSD(mockData);
            // console.log(data[0]);
            data[0].should.be.a('object');
            data[0].should.have.property('id');
            data[0].should.have.property('salaryInIDR');
            data[0].should.have.property('salaryInUSD');
        });
    });

    describe('Merging user and salary function testing',()=>{

        it('Should return merged userObject and salaryObject',()=>{
            
            let userObject = [{
                id: 10,
                name: 'Clementina DuBuque',
                username: 'Moriah.Stanton',
                email: 'Rey.Padberg@karina.biz',
                address: {
                    street: 'Kattie Turnpike',
                    suite: 'Suite 198',
                    city: 'Lebsackbury',
                    zipcode: '31428-2261',
                    geo: [Object]
                },
                phone: '024-648-3804',
                website: 'ambrose.net',
                company: {
                    name: 'Hoeger LLC',
                    catchPhrase: 'Centralized empowering task-force',
                    bs: 'target end-to-end models'
                }            
            }];

            let salaryObject = {
                array :[
                    {                
                        salaryInIDR: 5964808.282007527,
                        id : 10,
                        salaryInUSD: 420.41397708247473
                    }
                ]
            }

            var data = problem.joinObject(userObject, salaryObject)
            
            // console.log(data);
            data.should.be.a('array');
            data[0].should.have.property('id');
            data[0].should.have.property('name');
            data[0].should.have.property('username');
            data[0].should.have.property('email');
            data[0].should.have.property('address');
            data[0].should.have.property('phone');
            data[0].should.have.property('website');
            data[0].should.have.property('company');
            data[0].should.have.property('company');
            data[0].should.have.property('salaryInIDR');
            data[0].should.have.property('salaryInUSD');
        });
    });

});

