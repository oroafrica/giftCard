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
		this.themeNo = 2;
		this.fontColCount = 0;
		this.fontColours = (a)=>{return ["#ff6961","#82d1f1","#838383","#5d5d5d","#000"][a]};
		this.textAlign = (a)=>{return ["left","center","right"][a]};
		this.alignCount = 0;
		
		this.config();

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
					,top:100,
					fontSize:40,padding:20
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
		let report = {init:"Starting Gift Card!",fonts:this.myFont(this.fontCount),cards:this.cards(this.themeNo),textObject:this.noteCount,fontColour:this.fontColCount-1,alignIdex:this.alignCount-1};
		this.msg(JSON.stringify(report));
		});
	}

	config()
	{
		//basic settings
		
		fabric.Object.prototype.customiseCornerIcons({
			settings: {
				borderColor: '#000',
				cornerSize: 25,
				cornerShape: 'circle',
				cornerBackgroundColor: 'teal',
				cornerPadding:7,
			}
			,tl:{icon: 'icons/ico/delete.svg',cornerColor:"red"}
			,tr:{icon: 'icons/ico/scale.svg'}
			,ml:{}
			,mr:{}
			,mt:{}
			,mb:{icon: 'icons/ico/align.svg'}
			,bl:{icon: "icons/ico/palette.svg"}
			,br:{icon:"icons/ico/font.svg"}
			,mtr:{icon: 'icons/rotate.svg'}
		});

		fabric.Canvas.prototype.customiseControls({
			tl: {
				cursor:"pointer"
				,action: 'remove'
			},
			tr: {
				action: 'scale'
			},
			bl: {
				cursor: 'pointer'
				,action: ()=>{
						let s = this.canvas.getActiveObject();
						this.fontColCount = (this.fontColCount > 4) ? 0 :this.fontColCount;
						s.set({fill:this.fontColours(this.fontColCount)});
						this.fontColCount +=1;
						this.canvas.discardActiveObject().renderAll();
						this.canvas.setActiveObject(s);}
			},
			br: {
				cursor: 'pointer'
				,action: ()=>{
					this.fontCount = (this.fontCount > 5) ? 0 : this.fontCount;
					let obj = this.canvas.getActiveObject();
					obj.set({fontFamily:this.myFont(this.fontCount)});
					this.canvas.renderAll();
					this.fontCount++;
				}
				
			},
			mb: {
				cursor: 'pointer'
				,action: ()=>{
					let s = this.canvas.getActiveObject();
					this.alignCount = (this.alignCount > 2) ? 0 : this.alignCount;
					s.set({textAlign:this.textAlign(this.alignCount)});
					this.alignCount++;
					this.canvas.discardActiveObject().renderAll();
				    this.canvas.setActiveObject(s);
				}
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
				action: 'moveUp',
				cursor: 'pointer',
			},
			// only if hasRotatingPoint is not set to false
			mtr: {
				action: 'rotate',
				cursor: 'default',
			}
		}
		,()=>{this.canvas.renderAll();});
	}
	render()
	{
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
