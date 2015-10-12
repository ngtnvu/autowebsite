function evt(category, action,label){	 
	if(typeof dataLayer != 'undefined')
	{	
		dataLayer.push({
			'event': 'GAEvent',
			'eventCategory': category,
			'eventAction': action,
			'eventLabel': label
		});
	}
	
	if(typeof ga != 'undefined')
	{
		ga('send', 'event', category, action, label);
	}	
}

$(function(){
	$(document).on('click', '.tracking-event', function(){
		var $this= $(this);
		var event_label= $this.attr('data-label');
		var event_action= $this.attr('data-action');;
		evt('altis', event_action, event_label);
	});
});