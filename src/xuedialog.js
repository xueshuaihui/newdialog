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
            message: '',
            ajax: {},
            iframe: {
                width: '100%',
                height: '100%'
            },
            template: {}
        }
        this.eventOptions = {
            callBack: new Function(),
            closeEventBefore: this.callBack,
            closeEventAfter: this.callBack,
        }
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
            $( '<span>' ).appendTo( $container ).html( this.defaultOptions.minIcon );
            return $container;
        },
        getModalButtonMin: function(){
            return this.$ModalButtonMin;
        },
        setModalButtonMin: function( $ModalButtonMin ){
            this.$ModalButtonMin = $ModalButtonMin;
            return this;
        },
        createModalButtonMax: function(){
            var $container = this.createModalButtonContainer( 'max' );
            $( '<span>' ).appendTo( $container ).html( this.defaultOptions.maxIcon );
            return $container;
        },
        getModalButtonMax: function(){
            return this.$ModalButtonMax;
        },
        setModalButtonMax: function( $ModalButtonMax ){
            this.$ModalButtonMax = $ModalButtonMax;
            return this;
        },
        createModalButtonClose: function(){
            var $container = this.createModalButtonContainer( 'close' );
            $( '<span>' ).appendTo( $container ).html( this.defaultOptions.closeIcon );
            return $container;
        },
        getModalButtonClose: function(){
            return this.$ModalButtonClose;
        },
        setModalButtonClose: function( $ModalButtonClose ){
            this.$ModalButtonClose = $ModalButtonClose;
            return this;
        },
        createModalBody: function(){
            return $('<div class="xshmodal-body">');
        },
        getModalBody: function(){
            return this.$ModalBody;
        },
        setModalBody: function( $ModalBody ){
            this.$ModalBody = $ModalBody;
            return this;
        },
        createModalMessage: function(){
            return $('<div class="xshmodal-message">');
        },
        getModalMessage: function(){
            return this.$ModalMessage;
        },
        setModalMessage: function($ModalMessage){
            this.$ModalMessage = $ModalMessage;
            return this;
        },
        createMessage: function(){
            return this.defaultOptions.message;
        },
        setMessage: function( $message ){
            this.$message = $message;
            return this;
        },
        getMessage: function(){
            return this.$message;
        },
        // 更新内容
        updataMessage: function(){
            console.log( this.defaultOptions.message );
            this.getModalMessage().html( this.$message );
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
            this.updataMessage();
            return this;
        },
        ModalModular: function(){
            this.setModal( this.createModal() );
            this.defaultOptions.header && this.setModalHeader( this.createModalHeader() );
            this.setModalHeaderTitle( this.createModalHeaderTitle() );
            this.setModalHeaderTitleText( this.createModalHeaderTitleText() );
            this.setModalButton( this.createModalButton() );
            this.setModalButtonMin( this.createModalButtonMin() );
            this.setModalButtonClose( this.createModalButtonClose() );
            this.setModalButtonMax( this.createModalButtonMax() );

            this.setModalBody( this.createModalBody() );
            this.setModalMessage( this.createModalMessage() );

            this.setMessage( this.createMessage() );
        },
        // 初始化modal
        initModal: function(){

            this.getModalButton().append( this.getModalButtonMin() );
            this.getModalButton().append( this.getModalButtonMax() );
            this.getModalButton().append( this.getModalButtonClose() );


            this.getModalHeaderTitle().append( this.getModalHeaderTitleText() );

            
            this.getModalHeader().append( this.getModalHeaderTitle() );
            this.getModalHeader().append( this.getModalButton() );



            this.getModal().append( this.getModalHeader() );











            this.getModalBody().append( this.getModalMessage() );

            this.getModal().append( this.getModalBody() );
            


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
        // 处理函数
        removeModal: function(){
            this.getModal().remove();
            return this;
        },
        // 事件
        openBefore: function(){},
        open: function(options){
            this.show( options );
            return this;
        },
        openAfter: function(){},
        
        closeBefore: function( cb ){
            this.closeBefore = cb;
            return this;
        },
        close: function( ){
            this.closeBefore();
            this.removeModal();
            this.closeAfter();
            return this;
        },
        closeAfter: function( cb ){
            this.closeAfter = cb;
            return this;
        },

        minBefore: function(){},
        min: function(){},
        minAfter: function(){},
        maxBefore: function(){},
        max: function(){},
        maxAfter: function(){}
    }
    return new Xuedialog();
});