Template.postEdit.onCreated(function(){
	Session.set('postEditErrors', {});
});

Template.postEdit.helpers({
	errorMessage: function(field){
		return Session.get('postEditErrors')[field];
	},
	errorClass: function(field){
		return !!Session.get('postEditErrors')[field] ? 'has-error' : '';
	}
})

Template.postEdit.events({
	'submit form': function(e){
		e.preventDefault();

		var currentPostId = this._id;

		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			titile: $(e.target).find('[name=title]').val()
		}

		var errors = validatePost(postProperties);
		if(errors.title || errors.url){
			return Session.set('postEditErrors', errors);
		}

		var postWithSameLink = Posts.findOne({url: postProperties.url});
		if(postWithSameLink){
			return throwError("Post with same link already exists")
		}

		Posts.update(currentPostId, {$set: postProperties}, function(error){
			if(error){
				//Display the error to the user
				return throwError(error.reason)
			} else {
				Router.go('postPage', {_id: currentPostId});
			}

		});
	},
	'click .delete': function(e){
		e.preventDefault();

		if(confirm("Delete this post?")){
			var currentPostId = this._id;
			Posts.remove(currentPostId);
			Router.go('postsList');
		}
	}
});