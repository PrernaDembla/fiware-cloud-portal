var CreateRouterView = Backbone.View.extend({

    _template: _.itemplate($('#createRouterFormTemplate').html()),

    events: {
      'click #cancelBtn-router': 'close',
      'click .close': 'close',
      'click .modal-backdrop': 'close',
      'click #create_router_button': 'create'
    },

    initialize: function() {
    },

    render: function () {
        if ($('#create_router').html() != null) {
            return;
        }
        $(this.el).append(this._template({model:this.model, tenant_id: this.options.tenant_id}));
        $('#create_router').modal();
        return this;
    },

    onClose: function() {
        this.undelegateEvents();
        this.unbind();
    },

    close: function(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        $('#create_router').remove();
        $('.modal-backdrop:last').remove();
        this.onClose();
        this.model.unbind("sync", this.render, this);
    },

    create: function(e) {
        var self = this;
        var router = new Router();
        var name = $('input[name=router]').val();
        
        router.set({'name': name});

        router.save(undefined, UTILS.Messages.getCallbacks("Router "+router.get("name") + " created.", "Error creating router "+router.get("name")), {context: this}); 
        this.close();

        
    }
});