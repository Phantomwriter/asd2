function(doc) {
  if (doc.id.substr(0, 6)==="FavCard:") {
    	emit(doc._id);
  }
};