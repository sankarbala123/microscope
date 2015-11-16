// check that the user id specified owns the document
ownDocument = function(userId, doc){
	return doc && doc.userId == userId;
}