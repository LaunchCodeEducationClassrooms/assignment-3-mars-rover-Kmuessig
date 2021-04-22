class Rover {
 
   constructor(position, mode, generatorWatts){
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }


   receiveMessage(message){

    let name =  message.name
    let commands = message.commands

    //Build response
    let response = {
      message: message.name,
      results: [],
    }

    //Execute each command
    if (commands){
      for (let i = 0; i < commands.length; i++){ 
        let command = commands[i];
        let commandType = command.commandType;
        let value = command.value;
        let result;
        if(commandType == 'MOVE'){
          result = this.moveChange(command)
        } else if (commandType == 'STATUS_CHECK') {
          result = this.statusCheck()
        } else if (commandType == 'MODE_CHANGE') {
          result = this.modeChange(command)
        }
        response.results.push(result);
      }
    }

    return response
  }

  modeChange(command){
    this.mode = command.value
    return {
      completed: true
    }
  }

  moveChange(command){
    if (this.mode == "LOW_POWER"){
      return {
        completed: false
      }
    }
    this.position = command.value
    return {
      completed: true
    }
  }

  statusCheck() {
    return { 
      roverStatus: {
        position: this.position,
        mode: this.mode,
        generatorWatts: this.generatorWatts,
      } 
    }
  }

}

module.exports = Rover;

