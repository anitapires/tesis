app.factory('Drawing', ['Section', function (Section){

  function Drawing(sections) {
    this.sections_attributes = sections || []
    this._states = ['notStarted', 'inProgress', 'paused', 'finished']
    this._state  = 0
  }

  Drawing.prototype.sections = function(){
    return this.sections_attributes
  }

  Drawing.prototype.addSection = function(section){
    this.sections_attributes.push(section)
  }

  Drawing.prototype.hasSections = function(){
    return this.sections_attributes.length > 0
  }

  Drawing.prototype.currentSection = function(){
    return this.sections_attributes[this.sections_attributes.length-1]
  }

  Drawing.prototype.changeColor = function(color){
    if(this.isPaused()){
      this.currentSection().changeColor(color)
    }
    else{
      last_point = this.currentSection().lastPoint()
  
      if(!this.currentSection().isPath()){
        this.sections_attributes.pop()
      }
  
      this.addSection(new Section({ color: color }, [last_point])) 
    }
  }


  Drawing.prototype.start = function(stroke){
    this.addSection(new Section(stroke));

    this._state = this._states.indexOf('inProgress')
  }

  Drawing.prototype.pause = function(){
    currentStroke = this.currentSection().stroke()

    if(!this.currentSection().isPath()){
      this.sections_attributes.pop()
    }
    
    this.addSection(new Section(currentStroke))

    this._state = this._states.indexOf('paused')
  }

  Drawing.prototype.resume = function(){
    this._state = this._states.indexOf('inProgress')
  }

  Drawing.prototype.finish = function(){
    this._state = this._states.indexOf('finished')
  }

  Drawing.prototype.isNotStarted = function(){
    return this._state == this._states.indexOf('notStarted') 
  }

  Drawing.prototype.isStarted = function(){
    return this._state == this._states.indexOf('inProgress') 
        || this._state == this._states.indexOf('paused')
  }

  Drawing.prototype.isInProgress = function(){
    return this._state == this._states.indexOf('inProgress')
  }

  Drawing.prototype.isPaused = function(){
    return this._state == this._states.indexOf('paused')
  }

  Drawing.prototype.isFinished = function(){
    return this._state == this._states.indexOf('finished')
  }


  Drawing.build = function (data) {
    return new Drawing(data.sections.map(function(s){ 
      return Section.build(s) 
    }))
  }
 
  return Drawing
}])