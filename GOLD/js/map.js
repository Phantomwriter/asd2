function (doc) {
  if (doc._id.substr(0, 7) === "favCard") {
    emit(doc._id.substr(7), {
    	"name": doc.name,
    	"type": doc.type,
    	"attribute": doc.attribute,
    	"text": doc.text
    
    });
  }
};