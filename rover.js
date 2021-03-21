class Rover {
 
   constructor(position){
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110
    ;
   }
    
   receiveMessage(message){
     let response = {
       message: message.name,
       results: [],
     }
    for (var i = 0 ; i < 2; i++) {
       response.results.push(message.commands);
     }
    return response  
   }

   modeChange(command){
     this.mode = command.value
   }

   moveChange(command){
     if (this.mode == "LOW POWER"){
       return {
         completed: false
       }
     }
     this.position = command.value
     return {
       completed: true
     }
   }


}


module.exports = Rover;

