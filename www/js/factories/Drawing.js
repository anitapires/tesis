app.factory('Drawing', ['Section', function (Section){

  function Drawing(sections) {
    this.sections_attributes = sections || []
  }

  Drawing.prototype.sections = function(){
    return this.sections_attributes
  }

  Drawing.prototype.addSection = function(section){
    this.sections_attributes.push(section)

    return this
  }

  Drawing.prototype.hasSections = function(){
    return this.sections_attributes.length > 0
  }

  Drawing.build = function (data) {
    return new Drawing(data.sections.map(function(s){ 
      return Section.build(s) 
    }))
  }
 
  return Drawing
}])