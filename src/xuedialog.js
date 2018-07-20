(function(root, factory){
    "use strict";
    // CommonJS module is defined
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'));
    }
    // AMD module is defined
    else if (typeof define === "function" && define.amd) {
        define("Xuedialog", ["jquery"], function ($) {
            return factory($);
        });
    } else {
        // planted over the root!
        root.Xuedialog = factory(root.jQuery);
    }
})(this,function($){
    var Xuedialog = function(){
        // 定义默认参数
        this.defaultOptions = {
            cssClass: '',
            title: null,
            message: null,
            header: true,
            headerContent: '',
            closable: false,
            max: false,
            min: false,
            closeIcon: '&#215;',
            maxIcon: '&#164;',
            minIcon: '&#8722;',
            draggable: false,
            animate: false,
            description: true,
            backdrop: true,
            position: true,
            size: true,
            ajax: {},
            iframe: {
                width: '100%',
                height: '100%'
            },
            template: {}
        };
    };
    Xuedialog.prototype = {
        // 创建各个部位
        createModal: function(){
            return $('<div class="xshmodal"></div>'); 
        },
        getModal: function(){
            return this.$modal; 
        },
        setModal: function($modal){
            this.$modal = $modal;
            return this;
        },
        createModalHeader: function(){
            return $('<div class="xshmodal-header clear-float"></div>')
        },
        getModalHeader: function(){
            return this.$modalHeader; 
        },
        setModalHeader: function($modalHeader){
            this.$modalHeader = $modalHeader;
            return this;
        },
        createModalHeaderTitle: function(){
            return $('<div class="xshmodal-headER-title"></div>')
        },
        getModalHeaderTitle: function(){
            return this.$modalHeaderTitle; 
        },
        setModalHeaderTitle: function($modalHeaderTitle){
            this.$modalHeaderTitle = $modalHeaderTitle;
            return this;
        },
        // 追加class
        updataClass: function(){
            this.defaultOptions.cssClass && this.getModal().addClass(this.defaultOptions.cssClass);
            this.defaultOptions.size && this.getModal().addClass('default-size');
            this.defaultOptions.backdrop && this.getModal().addClass('default-backdrop');
            this.defaultOptions.position && this.getModal().addClass('default-position');
            return this;
        },
        updataOptions: function(options){
            var that = this;
            $.each(options, function(key, value){
                that.defaultOptions[key] = value;
            })
            return this;
        },
        // 初始化modal
        initModal: function(){
            // 最外层
            this.setModal(this.createModal()).updataClass();
            // header
            this.defaultOptions.header && this.setModalHeader( this.createModalHeader() );

            $('body').append( this.$modal[0].outerHTML );
            return this;
        },
        // 打开显示
        openBefore: function(){},
        open: function(options){
            options && this.updataOptions(options);
            this.initModal();
            return this;
        },
        openAfter: function(){},
        closeBefore: function(){},
        close: function(){},
        closeAfter: function(){},
        minBefore: function(){},
        min: function(){},
        minAfter: function(){},
        maxBefore: function(){},
        max: function(){},
        maxAfter: function(){}
    }
    return new Xuedialog();
});