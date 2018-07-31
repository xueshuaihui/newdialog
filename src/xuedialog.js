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
    var Xuedialog = function (){
        // 定义默认参数
        this.defaultOptions = {
            cssClass: '',
            title: null,
            message: null,
            header: true,
            closable: true,
            max: true,
            min: true,
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
            ajax: null,
            iframe: null,
            template: null
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
            var that = this;
            $container.on('click', function(){
                that.minModal();
            })
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
            var that = this;
            $container.on('click', function(){
                that.maxModal();
            })
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
            var that = this;
            $container.on('click', function(){
                that.removeModal();
            })
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
        createModalDialog: function () {
            return $('<div class="modal-dialog"></div>');
        },
        getModalDialog: function () {
            return this.$modalDialog;
        },
        setModalDialog: function ($modalDialog) {
            this.$modalDialog = $modalDialog;

            return this;
        },


        // 是否显示
        isHeader: function(){
            return this.defaultOptions.header;
        },
        isClosable: function(){
            return this.defaultOptions.closable;
        },
        isMax: function(){
            return this.defaultOptions.max;
        },
        isMin: function(){
            return this.defaultOptions.min;
        },
        // message
        ajax: function(){
            var options = this.defaultOptions.ajax; 
            if( !options.url  )return;
            var that = this;
            $.ajax({
                url: options.url,
                type: options.type || 'get',
                data: options.data || {},
                success: function( data ){
                    that.setMessage( data );
                    that.updataMessage();
                    options.success && options.success() 
                }
            })
            return this;
        },
        iframe: function(){
            var options = this.defaultOptions.iframe; 
            // 默认处理iframe的行内参数
            var src = options.src || options.url || '';
            if( !options.url  )return;
            var width = options.width || '100%';
            var height = options.height || '100%';
            var name = options.name || src;
            var message = '<iframe src="http://www.runoob.com" width="'+ width +'" height="'+ height +'" name="'+ name +'"></iframe>';
            this.setMessage( message );
            this.updataMessage();
            return this;
        },
        template: function(){
            var options = this.defaultOptions.template; 
            if( !( options.url && options.data )  )return;
            var that = this;
            var templateStr = null;
            var templateData = null;
            $.get( options.url, function( content ){
                templateStr = content;
                templateData && getHtml( templateStr, templateData );
            })
            $.get( options.data, function( content ){
                templateData = content;
                templateStr && getHtml( templateStr, templateData );
            })
            var getHtml = function( templateStr, templateData ){
                var htmlTemplate = template.render( templateStr, templateData );
                that.setMessage( htmlTemplate );
                that.updataMessage();
            }
            return this;
        },
        // 同步更新message内容
        updataMessage: function(){
            this.getModalMessage().html( this.$message );
            return this;
        },
        // 异步更新message
        updataAsynMessage: function(){
            this.defaultOptions.ajax && this.ajax();
            this.defaultOptions.iframe && this.iframe();
            this.defaultOptions.template && this.template();
        },
        // 追加class
        updataClass: function(){
            this.defaultOptions.cssClass && this.getModal().addClass(this.defaultOptions.cssClass);
            this.defaultOptions.size && this.getModal().addClass('default-size');
            this.defaultOptions.backdrop && this.getModal().addClass('default-backdrop');
            this.defaultOptions.position && this.getModal().addClass('default-position');

            // 显隐
            this.isHeader() || this.getModalHeader().addClass('hide');
            this.isClosable() || this.getModalButtonClose().addClass('hide');
            this.isMin() || this.getModalButtonMin().addClass('hide');
            this.isMax() || this.getModalButtonMax().addClass('hide');

            return this;
        },
        // 更新内容
        updata: function(){
            this.updataClass()
            .updataHeaderTitleText()
            .updataMessage();
            return this;
        },
        ModalModular: function(){
            this.setModal( this.createModal() )
            this.setModalHeader( this.createModalHeader() )
            .setModalHeaderTitle( this.createModalHeaderTitle() )
            .setModalHeaderTitleText( this.createModalHeaderTitleText() )
            .setModalButton( this.createModalButton() )
            .setModalButtonMin( this.createModalButtonMin() )
            .setModalButtonClose( this.createModalButtonClose() )
            .setModalButtonMax( this.createModalButtonMax() )

            .setModalBody( this.createModalBody() )
            .setModalMessage( this.createModalMessage() )

            .setMessage( this.createMessage() )

            .setModalDialog( this.createModalDialog() )
            return this;
        },
        // 初始化modal
        initModalHead: function(){
            this.getModalHeader().append( this.getModalButton()
                .append( this.getModalButtonMin() )
                .append( this.getModalButtonMax() ) 
                .append( this.getModalButtonClose() )
            )
            var head  = this.defaultOptions.draggable ? this.getModalDialog().appendTo( this.getModalHeader() )  : this.getModalHeader();
            head.append( this.getModalHeaderTitle()
            .append( this.getModalHeaderTitleText() )
                 );
            return this;
        },
        initModalBody: function(){
            this.getModalBody().append( this.getModalMessage() );
            return this;
        },
        initModal: function(){
            this.initModalHead();
            this.initModalBody();

            $('body').append( this.getModal()
                .append( this.getModalHeader() )
                .append( this.getModalBody() ) 
            );

            // 追加功能
            this.makeModalDraggable();
            return this;
        },
        show: function( options ){
            // 优先处理参数
            options && this.updataOptions(options);
            this.ModalModular()
            .initModal()
            .updata()
            .updataAsynMessage();
            return this;
        },
        // 功能处理
        makeModalDraggable: function () {
            /*获取DOM*/
            var that = this;
            var $modal = that.getModal();
            var $dialog =  that.getModalDialog();
            if( !this.defaultOptions.draggable )return;
            $dialog.on('mousedown', {dialog: this}, function (event) {
                event.stopPropagation();
                $dialog.data = {
                    isMouseDown: true,
                    mouseOffset: {
                        top: event.offsetY,
                        left: event.offsetX
                    }
                };
            });
            $(window).on('mouseup', {dialog: this}, function (event) {
                event.stopPropagation();
                $dialog.data = {
                    isMouseDown: false,
                    mouseOffset: {
                        top: null,
                        left: null
                    }
                };
            });
            $('body').on('mousemove', {dialog: this}, function (event) {
                event.stopPropagation();
                if( !$dialog.data.isMouseDown )return;
                $modal.offset({
                    top: event.clientY - $dialog.data.mouseOffset.top,
                    left: event.clientX - $dialog.data.mouseOffset.left
                });
                $modal.addClass('xshmodal-dialog');
            });

            return this;
        },
        // 处理函数
        removeModal: function(){
            this.closeBefore && this.closeBefore();
            this.$modal.remove();
            this.closeAfter && this.closeAfter();
            return this;
        },
        minModal: function(){
            this.minBefore && this.minBefore();
            var $modal = this.getModal();
            $modal.removeClass( 'maxmodal' );
            $modal.toggleClass( 'minmodal' );
            this.minAfter && this.minAfter();
            return this;
        },
        maxModal: function(){
            this.maxBefore && this.maxBefore();
            var $modal = this.getModal();
            $modal.removeClass( 'minmodal' );
            $modal.toggleClass( 'maxmodal' );
            this.maxAfter && this.maxAfter();
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
            this.closeBefore = cb ? cb : false;
            return this;
        },
        closeAfter: function( cb ){
            this.closeAfter = cb ? cb : false;
            return this;
        },
        close: function( cb ){
            cb && cb();
            this.removeModal();
            return this;
        },
        minBefore: function( cb ){
            this.minBefore = cb;
            return this;
        },
        minAfter: function( cb ){
            this.minAfter = cb;
            return this;
        },
        min: function( cb ){
            cb && cb();
            this.minModal();
            return this;
        },
        maxBefore: function( cb ){
            this.maxBefore = cb;
            return this;
        },
        max: function( cb ){
            cb && cb();
            this.maxModal();
            return this;
        },
        maxAfter: function( cb ){
            this.maxAfter = cb;
            return this;
        }
    };
    return  Xuedialog;
});