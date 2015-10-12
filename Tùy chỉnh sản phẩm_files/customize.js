//DEFAULT
var car_model= 'CTV_1_8G';
var car_color= 'C4U3';
var car_interior_color= 'black';

var car_accessory= [];
var spritespin_360;
var item_accessory= [];		
var item_accessory_name= [];
var car_colors= [];
var cars= {};

function Customize(){
	var self= this;
	
	this.init= function(){
		self.jquery();
		evt('altis', 'click', 'altis+customization+click+dong+xe');
		self.pageview('dong-xe');	
	}
	
	this.jquery= function(){
		self.loading();
		self.event_step_1();
		self.event_step_2();
		self.event_step_3();
		self.car_360();
		
		$('.customize-scroll-pane').jScrollPane({
			autoReinitialise  : true,
			autoReinitialiseDelay : 10
		});
		
		$(document).on('click', '.btnBack', function(){
			var $this= $(this);
			var step= $this.attr('data-step');
			self.step(step);
		});
		
		
		$('.fancybox-customize').fancybox({
			padding: 0,
			mouseWheel: false,
			closeBtn : false
		});				
	}
		
	this.loading= function(){
		// $.html5Loader({
			// filesToLoad: root+'customize/files',
			// onComplete: function () {
				// Customize.hide_loading();
			// },
			// onUpdate: function(perc){
				// console.log(perc);
				// Customize.show_loading(perc);
			// }
		// });	 	
		
		$.ajax({
			url:  root+'customize/files',
			dataType: "json",
			success : function(data){
				preloadFile = data.files;
				var queue = new createjs.LoadQueue(false);
				queue.on("progress", function(result){
					var percent = Math.round(result.loaded * 100);
					var percent_loading = Math.round(result.loaded * 65);
					$('.circle line').eq(percent_loading).attr("class", "highlight");					
					Customize.show_loading(percent+'%');
				});
				queue.on("complete", function(result){
					Customize.hide_loading();
				});

				queue.loadManifest(preloadFile);
			}
		});			
	}
	
	this.step= function(step){
		var step= parseInt(step);
		
		$('.wrap-customize .step').hide();
		$('.wrap-customize .step-'+step).fadeIn();
		
		$('.wrap-customize .wrap-button .pointer').hide();
		$('.customize-block').removeClass('block-3');
		switch(step){
			case(1):
				$('.btnSelectAccessory').show();
				window.location.hash = 'dong-xe';
				evt('altis', 'click', 'altis+customization+click+dong+xe');
				self.pageview('dong-xe');
				break;
			case(2):
				$('.btnBack').show();
				$('.btnBack').attr({'data-step' : 1});
				$('.btnFinsh').show();
				window.location.hash = 'phu-kien';
				evt('altis', 'click', 'altis+customization+click+phu+kien');
				self.pageview('phu-kien');
				break;
			case(3):	
				$('.customize-block').addClass('block-3');
				$('.btnBack').show();
				$('.btnBack').attr({'data-step' : 2});			
				window.location.hash = 'altis-cua-ban';
				evt('altis', 'click+view', 'altis+customization+click+altis+cua+ban');
				self.pageview('altis-cua-ban');
				break;
		}
	}
	
	this.step_2= function(){

		item_accessory_name.forEach(function(value, index){
			row_item_accessory= item_accessory[value];
			arr_cars_item_accessory= explode(',', row_item_accessory.cars);
			if(in_array(car_model, arr_cars_item_accessory) || in_array('A', arr_cars_item_accessory))
			{
				$('.item-accessory[data-accessory="'+value+'"]').slideDown(100);
				$('.item-accessory[data-accessory="'+value+'"]').find('.fancybox-customize').attr({rel : car_model});
			}
			else
			{
				$('.item-accessory[data-accessory="'+value+'"]').slideUp();
				$('.item-accessory[data-accessory="'+value+'"]').find('.fancybox-customize').removeAttr('rel');
			}
			
			if($('.step-2 .item-accessory[data-accessory="'+value+'"]').hasClass('colors'))
			{
				var data_color= $('.step-2 .item-accessory[data-accessory="'+value+'"]').attr('data-color');
				$('.step-2 .item-accessory[data-accessory="'+value+'"]').attr({'data-color': car_color})
				$('.step-2 .item-accessory[data-accessory="'+value+'"]').find('img').each(function(index){
					var src = $(this).attr("src").replace(data_color, car_color);
					$(this).attr("src", src);				
				});
			}
		});
	
		self.step(2);
		$('.btnSelectAccessory').hide();
		$('.btnFinsh').show();
		$('.btnBack').show();
	}
	
	this.step_3= function(){
		self.step(3);
		self.refesh_link();
		var list_accessory= '';
		var sum_price_accessory= 0;
		var	sum_price_car_total= 0;
		var src_img_color= root+'static/images/customize/item_car_color/'+car_color+'.png';
		var src_img_interior_color= root+'static/images/customize/color_interior/'+car_interior_color+'.png';
		
		$('.car-accessories-360').fadeIn();
		$('.car-model').html(cars[car_model].name.toUpperCase());
		$('.car-color').html(car_colors[car_color] + ' ' + car_color.substr(1, car_color.lenght));
		$('.car-color-img img').attr({src : src_img_color});
		
		//INTERIOR COLOR
		$('.car-interior-color').html((car_interior_color == 'black') ? 'Đen' : 'Ngà');
		$('.car-interior-color-img img').attr({src : src_img_interior_color});		
		
		//ACCESSORY
			car_accessory.forEach(function(value, index) { 
				row_accessory= item_accessory[value];

				list_accessory+= '<div class="item-accessory">';
					list_accessory+= '<div class="accessory-name">';
						list_accessory+= '<div class="acn-left">';
							list_accessory+= row_accessory.name;
						list_accessory+= '</div>';
						list_accessory+= '<div class="acn-right">';
							list_accessory+= '<div data-accessory="'+value+'" class="btn-remove pointer btnRemoveAccessory" data-remove="true">Xóa</div>';
						list_accessory+= '</div>';
						list_accessory+= '<div class="clear"></div>';
					list_accessory+= '</div>';
					list_accessory+= '<div class="accessory-price">'+Customize.number_money(row_accessory.price)+' VNĐ</div>';
				list_accessory+= '</div>';
			
				sum_price_accessory+= parseInt(row_accessory.price);
			});		
		//END ACCESSORY

		sum_price_car_total= cars[car_model].price + sum_price_accessory;

		$('.car-total-price span').html(Customize.number_money(sum_price_car_total));
		$('.content-list-accessory').html(list_accessory);		
	}
	
	this.car_360= function(){
		var frames = SpriteSpin.sourceArray(root+'static/images/customize/cars/model/'+car_model+'/'+car_color+'/{frame}.png', { 
			frame: [0, 35], 
			digits: 2 
		});		
		
		spritespin_360 = $('.spritespin-360');
		spritespin_360.spritespin({
			source: frames,
			width: 900,
			sense: -1,
			height: 400,
			animate: false,
			frame   : 0
		});
		
		//get the api object. This is used to trigger animation to play up to a specific frame
		spritespin_360_api = spritespin_360.spritespin("api");

		spritespin_360.bind("onLoad", function(){
			var data = spritespin_360_api.data;
			data.stage.prepend($(".details .detail")); // add current details
			data.stage.find(".detail").hide();         // hide current details
		}).bind("onFrame", function(){
			var data = spritespin_360_api.data;
			$('.accessory-frame').hide();
			$(".accessory-frame-" + data.frame).show();
		});				
	}
	
	this.event_step_1= function(){
		$('.btnSelectCarModel').click(function(){
			var $this= $(this);
			var $parent= $this.closest('.item-car-model');
			
			//RESET
				$('.item-car-model.M-CTV_1_8G').addClass('inactive');
				$('.item-car-model').removeClass('active');
				
			$this.closest('.item-car-model').addClass('active');
			car_model= $this.attr('data-car-model');
			car_color= cars[car_model].default_color;
			car_interior_color= cars[car_model].default_interior_color;
			
			//ACTIVE COLOR
				$('.btnSelectCarColor').removeClass('active');
				$('.btnSelectCarColor[data-car-color="'+car_color+'"]').addClass('active');
			
			//ACTIVE INTERIOR COLOR
				$('.item-color-interior').removeClass('active');
				if(car_model == 'CTV_1_8G')
				{
					$('.item-car-model.M-CTV_1_8G').removeClass('inactive');
					$('.btnSelectInteriorColor[data-interior-color="'+car_interior_color+'"]').closest('.item-color-interior').addClass('active');						
				}
				else
				{
					$('.btnSelectInteriorColor[data-interior-color="black"]').closest('.item-color-interior').addClass('active');	
				}

			self.reset_accessory();
			self.refesh_360();
		});
		
		$('.btnSelectCarColor').click(function(){
			var $this= $(this);
			car_color= $this.attr('data-car-color');
			$('.btnSelectCarColor').removeClass('active');
			$this.addClass('active');
			self.refesh_360();
		});		
		
		$('.btnSelectInteriorColor').click(function(){
			var $this= $(this);
			var $parent= $this.closest('.item-color-interior');
			var interior_color= $this.attr('data-interior-color');
	
			if(!$this.closest('.item-car-model').hasClass('inactive'))
			{
				$('.item-color-interior').removeClass('active');
				$parent.addClass('active');
				car_interior_color= interior_color;					
			}
		});
	}
	
	this.event_step_2= function(){
		$(document).on('click', '.item-accessory .fancybox-inherit', function(){
			var $this= $(this);
			var $parent= $this.closest('.item-accessory');
			$parent.find('.fancybox-customize').click();
		});
	
		$(document).on('click', '.btnCollapse', function(){
			var $this= $(this);
			var $parent= $this.closest('.wrap-item-accessory');

			if($parent.find('.block-body').is(":visible"))
			{
				$this.removeClass('active');
				$parent.find('.block-body').hide();
			}
			else
			{
				$this.addClass('active');
				$parent.find('.block-body').show();
			}
		});
		
		$(document).on('click', '.btnAddAccessory', function(){
			var $this= $(this);
			var data_accessory= $this.attr('data-accessory');
			row_item_accessory= item_accessory[data_accessory];
			arr_cars_item_accessory= explode(',', row_item_accessory.cars);
			if(in_array(car_model, arr_cars_item_accessory) || in_array('A', arr_cars_item_accessory))
			{
				car_accessory.push(data_accessory);
				
				$('div.'+data_accessory).show();
				$this.removeClass('btnAddAccessory').addClass('btnRemoveAccessory');

				//$.fancybox.close();
				$('.item-accessory[data-accessory="'+data_accessory+'"]').find('.active-accessory').addClass('active');
				$('.item-accessory[data-accessory="'+data_accessory+'"]').find('.active-accessory').removeClass('btnAddAccessory').addClass('btnRemoveAccessory');
				$('#fancybox_accessory_'+data_accessory).find('.btn-customize').removeClass('btnAddAccessory').addClass('btnRemoveAccessory');
				$('#fancybox_accessory_'+data_accessory).find('.btn-customize').text('Bỏ chọn');
			}
		});				
		
		$(document).on('click', '.btnRemoveAccessory', function(){
			var $this= $(this);
			var data_accessory= $this.attr('data-accessory');
			var data_remove= $this.attr('data-remove');
			var index = car_accessory.indexOf(data_accessory); // 1
			car_accessory.splice(index, 1);
			if(data_remove)
			{
				$this.closest('.item-accessory').remove(); 
			}
			
			$('div.'+data_accessory).hide();
			
			$('.item-accessory[data-accessory="'+data_accessory+'"]').find('.active-accessory').removeClass('active btnRemoveAccessory').addClass('btnAddAccessory');
			$('#fancybox_accessory_'+data_accessory).find('.btn-customize').removeClass('btnRemoveAccessory').addClass('btnAddAccessory');
			
			$('#fancybox_accessory_'+data_accessory).find('.btn-customize').text('Thêm vào lựa chọn');
			self.updateCarTotalPrice();
		});				
	}
	
	this.event_step_3= function(){
		$(document).on('click', '.btnSaveCustomize', function(){
			var $this= $(this);
			var data_post= {};
			
			data_post['car_model']= car_model;
			data_post['car_color']= car_color;
			data_post['car_accessory']= car_accessory;
			data_post['car_interior_color']= car_interior_color;
			param= $.param(data_post);
			evt('altis', 'click+save', 'altis+customization+click+luu+lua+chon');
			self.pageview('luu-lua-chon');
			window.open(root+ 'customize/pdf?'+param, '_blank');		
		});
	}
	
	this.refesh_link= function(){
		var link_slug= '';
		switch(car_model)
		{
			case('CTV_2_0V'):
				link_slug= 'corolla-altis-20v-cvt-i';
				break;
			case('CTV_1_8G'):
				link_slug= 'corolla-altis-18g-cvt';
				break;
			case('MT_1_8G'):
				link_slug= 'corolla-altis-18g-mt';
				break;
		}
		$('.wrap-customize .link-dtcpk').attr({href:'http://www.toyota.com.vn/cong-cu-ho-tro/du-toan-chi-phi#corolla-altis/'+link_slug});
		$('.wrap-customize .link-httc').attr({href:'http://www.toyota.com.vn/dich-vu-tai-chinh/cach-tinh#corolla-altis/'+link_slug});
	}
	
	this.refesh_360= function(){
		var frames = SpriteSpin.sourceArray(root+'static/images/customize/cars/model/'+car_model+'/'+car_color+'/{frame}.png', { 
			frame: [0, 35], 
			digits: 2 
		});		
		
		spritespin_360 = $('.spritespin-360');
		spritespin_360.spritespin({
			source: frames
		});		
	}
	
	this.reset_accessory= function(){
		car_accessory.forEach(function(value, index){
			row_item_accessory= item_accessory[value];
			arr_cars_item_accessory= explode(',', row_item_accessory.cars);
			if(in_array(car_model, arr_cars_item_accessory) || in_array('A', arr_cars_item_accessory))
			{	

			}
			else
			{
				var $item_accessory= $('.item-accessory[data-accessory="'+value+'"]');
				$item_accessory.find('.active-accessory').hide();
				$('.item-360-accessory.'+value).hide();
				$item_accessory.find('.fancy-btn-customize.btnRemoveAccessory').addClass('btnAddAccessory');
				$item_accessory.find('.fancy-btn-customize.btnRemoveAccessory').removeClass('btnRemoveAccessory');
				$item_accessory.find('.fancy-btn-customize').text('Thêm vào lựa chọn');				
				var index = car_accessory.indexOf(value); // 1
				car_accessory.splice(index, 1);
				// delete car_accessory[value];	
				// delete car_accessory[index];
			}
		});
		console.log(car_accessory);
	}
	
	this.updateCarTotalPrice= function(){
		var sum_price_accessory= 0;
		var	sum_price_car_total= 0;
		
		
		car_accessory.forEach(function(value, index) { 
			row_accessory= item_accessory[value];
			sum_price_accessory+= parseInt(row_accessory.price);
		});		

		sum_price_car_total= cars[car_model].price + sum_price_accessory;
	
		$('.car-total-price span').html(Customize.number_money(sum_price_car_total));
	}	
	
	this.number_money= function(value){
		value= value.toString();
		value = value.replace(/[^0-9\.]/g,'');
		return self.money_format.call(value.split(',').join(''),'.','.');
	}	
	
	this.money_format= function(comma, period) {
		comma = comma || ',';
		period = period || '.';
		var split = this.toString().split('.');
		var numeric = split[0];
		var decimal = split.length > 1 ? period + split[1] : '';
		var reg = /(\d+)(\d{3})/;
		while (reg.test(numeric)) {
			numeric = numeric.replace(reg, '$1' + comma + '$2');
		}
		return numeric + decimal;
	}		
	
	this.loading_pdf= function(action){
		if(action == 'show')
		{
			$('#wrap-loader-pdf').show();
		}
		else
		{
			$('#wrap-loader-pdf').hide();
		}
	}
	
	this.show_loading= function(percent){
		$('#wrap-loader').fadeIn();
		
		if(percent)
		{
			$('#wrap-loader .loader-percent').fadeIn();
			$('#wrap-loader .loader-percent').text(percent);		
		}
		else
		{
			$('#wrap-loader .loader-percent').hide();
		}
	}

	this.hide_loading= function(){
		window.location.hash = 'dong-xe';
		$('#wrap-loader').fadeOut();
		TweenLite.to($('#header'), 0.5, {top: 0, ease:Power1.easeIn , onComplete:function(){}});
		TweenLite.to($('.btn_dangky'), 0.5, {bottom: 0, ease:Power1.easeIn , onComplete:function(){}});
		TweenLite.to($('#footer'), 0.5, {bottom: '1.296296296296296%', ease:Power1.easeIn , onComplete:function(){}});
		$('html').addClass('auto');
	}	
	
	this.pageview= function(url){
		if(typeof ga != 'undefined')
		{		
			ga('send', 'pageview', '/corolla-altis/tuy-chinh-san-pham#'+url);
		}
	}
}
var Customize= new Customize();
$(function(){
	Customize.init();
});