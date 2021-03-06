class Gift
{
	constructor()
	{
		this.canvas = new fabric.Canvas("canvas",{backgroundColor:"#efefef",width:600,height:400});
		this.note = [0,1,2,3,4];
		this.noteCount = 0;
		this.fontCount = 0;
		this.cards =(a)=>{return `https://oroafrica.github.io/giftCard/images/card_${a}.png`};
		this.myFont = (a)=>{return ["BrushSignature","SoftSignature","Hero","Lovely","Poppins","Bronwilla"][a]};
		this.themeNo = 1;
		this.fontColCount = 0;
		this.fontColours = (a)=>{return ["#000","#838383","#5d5d5d"][a]};
		

		return this.render.bind(this)();
	}

	msg(a){console.log("msg: ".concat(a))} 

	getCards()
	{ 
		$(document).on("click","button",(e)=>{
			if($(e.target).parent().parent().prop("id") !== "cards") return;
			this.canvas.setBackgroundImage(this.cards(this.themeNo),this.canvas.renderAll.bind(this.canvas),{crossOrigin:"anonymous"});
			this.themeNo = (this.themeNo > 12) ? 1 : (this.themeNo += 1);
		});
	}

	addText()
	{
		$(document).on("click","button",(e)=>{
			if($(e.target).parent().parent().prop("id") !== "texts") return;
			
			if(this.noteCount < 5)
			{
				
				let updatedTxt = " ";
				let props = {
					fill:"#000"
					,originX:"center"
					,originY:"center"
					,left:this.canvas.width/2
					,objectCaching:false
					,textAlign:"center"
					,top:100
				};
				var s = new fabric.IText("Text",props);
				this.canvas.add(s);
				s.animate("top",this.canvas.height/2,
				{
					start:0
					,duration:1000
					,onChange:this.canvas.renderAll.bind(this.canvas)
				});
				
				this.canvas.setActiveObject(s);
				s.enterEditing();
				this.noteCount +=1;
				
			}
		});
	}
	
	clearText()
	{
		$(document).on("click","button",(e)=>{
			if($(e.target).parent().parent().prop("id") !== "deletes") return;
			$(this.note).each((i)=>
			{
				this.canvas.remove(this.canvas.getActiveObject());
				this.noteCount = (this.noteCount <0) ? 1 : this.noteCount-1;
			});
		});
	}
	
	
	
	getFont()
	{
		$(document).on("click","button",(e)=>{
			if($(e.target).parent().parent().prop("id") !== "fonts" || this.noteCount < 1 || typeof this.canvas.getActiveObject() === "undefined" ) return;

			this.fontCount = (this.fontCount > 5) ? 0 : this.fontCount;
			let obj = this.canvas.getActiveObject();
			obj.set({fontFamily:this.myFont(this.fontCount)});
			this.canvas.renderAll();
			this.fontCount++;
		});
	}
	
	serializeCanvas()
	{
		$(document).on("click","button",(e)=>{
			if($(e.target).parent().parent().prop("id") !== "downloads") return;
			 // window.open(this.canvas.toDataURL('png'));
			let anc = document.createElement("a");
			anc.download=`card_${this.themeNo}.png`;
			anc.id="dummy";
			anc.crossOrigin = "anonymous";
			anc.href= this.canvas.toDataURL("image/png");
			$("body").append(anc);
			anc.click();
			$("#dummy").remove();
		});
	}
	
	changeColour()
	{
		$(document).on("click","button",(e)=>{
			if($(e.target).parent().parent().prop("id") !== "colours" || typeof this.canvas.getActiveObject() === "undefined" ) return;
			let s = this.canvas.getActiveObject();
			this.fontColCount = (this.fontColCount > 2) ? 0 :this.fontColCount;
			 s.set({fill:this.fontColours(this.fontColCount)});
			 this.fontColCount +=1;
			 this.canvas.discardActiveObject().renderAll();
			 this.canvas.setActiveObject(s);
		});
	}
	init()
	{
		this.canvas.setBackgroundImage(this.cards(1),this.canvas.renderAll.bind(this.canvas),{crossOrigin:"anonymous"});
	}

	debug(isDebug)
	{
		$(document).on("click",".btn",(e)=>{
		let report = {init:"Starting Gift Card!",fonts:this.myFont(this.fontCount),cards:this.cards(this.themeNo),textObject:this.noteCount,fontColour:this.fontColCount-1};
		this.msg(JSON.stringify(report));
		});
	}
	deleteObject()
	{
		fabric.Canvas.prototype.customiseControls({
			tl: {
				action: 'rotate',
				cursor: 'hover',
			},
			tr: {
				action: 'scale',
			},
			bl: {
				action: 'remove',
				cursor: 'pointer',
			},
			br: {
				action: 'moveUp',
				cursor: 'pointer',
			},
			mb: {
				action: 'moveDown',
				cursor: 'pointer',
			},
			mr: {
				action: function(e, target) {
					target.set({
						left: 200,
					});
					this.canvas.renderAll();
				},
				cursor: 'pointer',
			},
			mt: {
				action: {
					'rotateByDegrees': 30,
				},
				cursor: 'pointer',
			}
		});
	}
	render()
	{
		
		this.deleteObject();
		this.init();
		this.addText();
		this.clearText();
		this.getCards();
		this.getFont();
		this.serializeCanvas();
		this.changeColour();
		this.debug();
		
	}
	
}

/*  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 24
  });

  */