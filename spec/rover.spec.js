const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
//7
it("constructor sets position and default values for mode and generatorWatts", function() {
  let rover = new Rover('position', 'NORMAL', 110)
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

//8
it("response returned by receiveMessage contains name of message", function() {
  let rover = new Rover();
  let message = new Message('Test123')
  let response = rover.receiveMessage(message);
    expect(response.message).toEqual('Test123');
  });

  //9
it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
  let rover = new Rover();
  let message = new Message('Test123',[new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])
  let response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(message.commands.length);
  });

  //10
it("responds correctly to status check command", function() {
  let rover = new Rover (4321);
  let roverStatus = new Command('STATUS_CHECK', rover)
// console.log(roverStatus)
    expect(roverStatus.value).toEqual(rover);
  });
 


  //11
it("responds correctly to mode change command", function() {
  let rover = new Rover (4321);
  let command = new Command('MODE_CHANGE', 'LOW_POWER')
  rover.modeChange(command)
    expect(rover.mode).toEqual(command.value);
  });

  //12
it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
  let rover = new Rover (4321);
  rover.mode = 'LOW_POWER'
  let command = new Command('MOVE', 98212)
  let result = rover.moveChange(command)
    expect(result.completed).toEqual(false);
  });

  //13
it("responds with position for move command", function() {
   let rover = new Rover (4321);
  let command = new Command('MOVE', 98212)
  let result = rover.moveChange(command)
    expect(rover.position).toEqual(command.value);
  });

});
