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
        updataOptions: function(options){
            var that = this;
            $.each(options, function(key, value){
                that.defaultOptions[key] = value;
            })
            return this;
        },
        // 创建各个部位
        createModal: function(){
            return $('<div class="xshmodal">'); 
        },
        getModal: function(){
            return this.$modal; 
        },
        setModal: function($modal){
            this.$modal = $modal;
            return this;
        },
        createModalHeader: function(){
            return $('<div class="xshmodal-header clear-float">');
        },
        getModalHeader: function(){
            return this.$modalHeader; 
        },
        setModalHeader: function($modalHeader){
            this.$modalHeader = $modalHeader;
            return this;
        },
        createModalHeaderTitle: function(){
            return $('<div class="xshmodal-header-title">');
        },
        getModalHeaderTitle: function(){
            return this.$modalHeaderTitle; 
        },
        setModalHeaderTitle: function($modalHeaderTitle){
            this.$modalHeaderTitle = $modalHeaderTitle;
            return this;
        },
        createModalHeaderTitleText: function(){
            return $('<h3></h3>');
        },
        getModalHeaderTitleText: function(){
            return this.$modalHeaderTitleText; 
        },
        setModalHeaderTitleText: function($modalHeaderTitleText){
            this.$modalHeaderTitleText = $modalHeaderTitleText;
            return this;
        },
        updataHeaderTitleText: function(){
            this.getModalHeaderTitleText().text( this.defaultOptions.title );
            return this;
        },
        createModalButton: function(){
            return $('<div class="xshmodal-button">');
        },
        getModalButton: function(){
            return this.$ModalButton;
        },
        setModalButton: function( $ModalButton ){
            this.$ModalButton = $ModalButton;
            return this;
        },
        createModalButtonContainer: function( name ){
            return $('<div class="xshmodal-button-box xshmodal-button-'+ name +'">');
        },
        createModalButtonMin: function(){
            var $container = this.createModalButtonContainer( 'min' );
            $( '<span>' ).appendTo( $container ).html( this.defaultOptions.closeIcon );
            return $container;
        },
        getModalButtonMin: function(){
            return this.$ModalButtonMin;
        },
        setModalButtonMin: function( $ModalButtonMin ){
            this.$ModalButtonMin = $ModalButtonMin;
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
        // 更新内容
        updata: function(){
            this.updataClass();
            this.updataHeaderTitleText();
            return this;
        },
        ModalModular: function(){
            this.setModal( this.createModal() );
            this.defaultOptions.header && this.setModalHeader( this.createModalHeader() );
            this.setModalHeaderTitle( this.createModalHeaderTitle() );
            this.setModalHeaderTitleText( this.createModalHeaderTitleText() );
            this.setModalButton( this.createModalButton() );
            this.setModalButtonMin( this.createModalButtonMin() );
        },
        // 初始化modal
        initModal: function(){

            this.getModalButton().append( this.getModalButtonMin() );


            this.getModalHeaderTitle().append( this.getModalHeaderTitleText() );

            
            this.getModalHeader().append( this.getModalHeaderTitle() );
            this.getModalHeader().append( this.getModalButton() );


            this.getModal().append( this.getModalHeader() );
            $('body').append( this.getModal() );
            return this;
        },
        show: function( options ){
            // 优先处理参数
            options && this.updataOptions(options);
            this.ModalModular();
            this.initModal();
            this.updata();
            return this;
        },
        // 打开显示
        openBefore: function(){},
        open: function(options){
            this.show( options );
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