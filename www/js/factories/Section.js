app.factory('Section', function (){

  function Section(stroke, points) {
    this.stroke_attributes = stroke
    this.points_attributes = points || []
  }

  Section.prototype.points = function(){
    return this.points_attributes
  }

  Section.prototype.stroke = function(){
    return this.stroke_attributes
  }

  Section.prototype.changeColor = function(newColor){
    this.stroke_attributes.color = newColor

    return this
  }

  Section.prototype.addPoint = function(point){
    this.points_attributes.push({latitude: point.latitude, longitude: point.longitude})

    return this
  }

  Section.prototype.reset = function(keepLastPoint){
    this.points_attributes = (keepLastPoint) ? [this.lastPoint()] : []

    return this
  }

  Section.prototype.isPath = function(){
    return this.points_attributes.length > 1
  }

  Section.prototype.lastPoint = function(){
    return this.points_attributes[this.points_attributes.length-1]
  }
 
  Section.build = function (data) {
    return new Section(data.stroke, data.points)
  }
 
  return Section
})