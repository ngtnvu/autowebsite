(function(e){var t=e.mapster,n=t.utils,r=t.MapArea.prototype;t.utils.getScaleInfo=function(e,t){var n;if(!t){n=1;t=e}else{n=e.width/t.width||e.height/t.height;if(n>.98&&n<1.02)n=1}return{scale:n!==1,scalePct:n,realWidth:t.width,realHeight:t.height,width:e.width,height:e.height,ratio:e.width/e.height}};t.utils.scaleMap=function(e,t,r){var i=n.size(e),s=n.size(t,true);if(!s.complete())throw"Another script, such as an extension, appears to be interfering with image loading. Please let us know about this."; if(!i.complete())i=s;return this.getScaleInfo(i,r?s:null)};t.MapData.prototype.resize=function(r,i,s,o){function v(n,r,i){if(t.hasCanvas()){n.width=r;n.height=i}else{e(n).width(r);e(n).height(i)}}function g(){d.currentAction="";if(e.isFunction(o))o();d.processCommandQueue()}function y(){v(d.overlay_canvas,r,i);if(h>=0){var e=d.data[h];e.tempOptions={fade:false};d.getDataForKey(e.key).highlight();e.tempOptions=null}v(d.base_canvas,r,i);d.redrawSelections();g()}function b(){e(d.image).css(l);d.scaleInfo= n.getScaleInfo({width:r,height:i},{width:d.scaleInfo.realWidth,height:d.scaleInfo.realHeight});e.each(d.data,function(t,n){e.each(n.areas(),function(e,t){t.resize()})})}var a,f,l,c,h,p,d=this;o=o||s;if(d.scaleInfo.width===r&&d.scaleInfo.height===i)return;h=d.highlightId;if(!r){p=i/d.scaleInfo.realHeight;r=Math.round(d.scaleInfo.realWidth*p)}if(!i){p=r/d.scaleInfo.realWidth;i=Math.round(d.scaleInfo.realHeight*p)}l={width:String(r)+"px",height:String(i)+"px"};if(!t.hasCanvas())e(d.base_canvas).children().remove(); c=e(d.wrapper).find(".mapster_el").add(d.wrapper);if(s){f=[];d.currentAction="resizing";c.each(function(t,r){a=n.defer();f.push(a);e(r).animate(l,{duration:s,complete:a.resolve,easing:"linear"})});a=n.defer();f.push(a);n.when.all(f).then(y);b();a.resolve()}else{c.css(l);b();y()}};t.MapArea=n.subclass(t.MapArea,function(){this.base.init();if(this.owner.scaleInfo.scale)this.resize()});r.coords=function(e,t){var n,r=[],i=e||this.owner.scaleInfo.scalePct,s=t||0;if(i===1&&t===0)return this.originalCoords; for(n=0;n<this.length;n++)r.push(Math.round(this.originalCoords[n]*i)+s);return r};r.resize=function(){this.area.coords=this.coords().join(",")};r.reset=function(){this.area.coords=this.coords(1).join(",")};t.impl.resize=function(e,n,r,i){if(!e&&!n)return false;var s=(new t.Method(this,function(){this.resize(e,n,r,i)},null,{name:"resize",args:arguments})).go();return s}})(jQuery);