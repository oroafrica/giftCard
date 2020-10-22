class Gift
{
	constructor()
	{
		this.canvas = new fabric.Canvas("canvas",{backgroundColor:"#efefef",width:600,height:400});
		this.note = [0,1,2,3,4];
		this.noteCount = 0;
		this.fontCount = 0;
		// this.schema = {love:"",birthday:"",valentine:"",anniversary:""};
		this.themes = (a)=> {return Object.values(
		{
			card1: "https://oroafrica.github.io/alto/C1/card_1.png"
			,card2:"https://oroafrica.github.io/alto/C1/card_2.png"
			,card3:"https://oroafrica.github.io/alto/C1/card_3.png"
			,card4:"https://oroafrica.github.io/alto/C1/card_4.png"
			,card5:"https://oroafrica.github.io/alto/C1/card_5.png"
			,card6:"https://oroafrica.github.io/alto/C1/card_6.png"
			,card7:"https://oroafrica.github.io/alto/C1/card_7.png"
			,card8:"https://oroafrica.github.io/alto/C1/card_8.png"
			,card9:"https://oroafrica.github.io/alto/C1/card_9.png"
			,card10:"https://oroafrica.github.io/alto/C1/card_10.png"
			,card11:"https://oroafrica.github.io/alto/C1/card_11.png"
			,card12:"https://oroafrica.github.io/alto/C1/card_12.png"
			,card13:"https://oroafrica.github.io/alto/C1/card_13.png"
			//http://memiupg.uat.cslweb.uk/design/themes/GiddyStore/oajs/nameStyle.js
		})[a];};
		this.cards =(a)=>{return `https://oroafrica.github.io/giftCard/images/card_${a}.png`};
		this.myFont = (a)=>{return ["BrushSignature","SoftSignature","Hero","Lovely","Poppins","Bronwilla"][a]};
		this.themeNo = 1;
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
				let updatedTxt = "Text";
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
				
				this.noteCount +=1;
			}
			
		});

		
	}
	
	clearText()
	{
		$($("input").toArray()[3]).click((e)=> 
		{
			$(this.note).each((i)=>
			{
				this.canvas.remove(this.note[i])
				this.noteCount = 0;
			});
		});
	}
	
	
	
	getFont()
	{
		$(document).on("click","button",(e)=>{
			if($(e.target).parent().parent().prop("id") !== "fonts" || this.noteCount <1) return;
			this.msg(this.noteCount);
			this.fontCount = (this.fontCount > 5) ? 0 : this.fontCount;
			this.msg(this.myFont(this.fontCount));
			let obj = this.canvas.getActiveObject();
			obj.set({fontFamily:this.myFont(this.fontCount)});
			this.canvas.renderAll();
			this.fontCount++;
		});
		// $($("input").toArray()[2]).click((e)=> 
		// {
		// 	let obj = this.canvas.getActiveObject();
		// 	this.fontCount = (this.fontCount === 0) ? 0 : 1;
		// 	obj.set({fontFamily:this.myFont[this.fontCount]});
			 
		// 	this.canvas.renderAll();
		// 	this.fontCount = (this.fontCount === 1) ? 0 : 1;
		// });
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
	
	render()
	{
		console.log("opening gift");
		this.addText();
		// this.clearText();
		this.getCards();
		this.getFont();
		this.serializeCanvas();
	}
}
