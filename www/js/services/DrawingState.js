function DrawingState() {
  this.states = ['notStarted', 'inProgress', 'paused', 'finished']

  this.currentState = 0

  this.changeToStarted = function(){
    this.currentState = this.states.indexOf('inProgress')
  }

  this.changeToPaused = function(){
    this.currentState = this.states.indexOf('paused')
  }

  this.changeToResumed = function(){
    this.changeToStarted();
  }

  this.changeToFinished = function(){
    this.currentState = this.states.indexOf('finished')
  }

  this.isNotStarted = function(){
    return this.currentState == this.states.indexOf('notStarted') 
  }

  this.isStarted = function(){
    return this.currentState == this.states.indexOf('inProgress') 
        || this.currentState == this.states.indexOf('paused')
  }

  this.isInProgress = function(){
    return this.currentState == this.states.indexOf('inProgress')
  }

  this.isPaused = function(){
    return this.currentState == this.states.indexOf('paused')
  }

  this.isFinished = function(){
    return this.currentState == this.states.indexOf('finished')
  }

  this.logCurrentState = function(){
    console.log("[STATE] ", this.states[this.currentState])
  }
}

app.service('DrawingState', DrawingState);