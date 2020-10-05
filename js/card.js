class Gift
{
	constructor()
	{
		this.canvas = new fabric.Canvas("canvas",{backgroundColor:"#efefef",width:600,height:400});
		this.note = [0,1,2,3,4];
		this.noteCount = 0;
		this.fontCount = 0;
		this.schema = {love:"",birthday:"",valentine:"",anniversary:""};
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
		})[a];};
		this.myFont = ["BrushSignature","SoftSignature"];
		this.themeNo = 0;
	}

	addText()
	{
		var inputs = $("input").toArray();
		$(inputs[0]).click(()=> 
		{
			
			if(this.noteCount < 5)
			{
				let updatedTxt = $(inputs[0]).val().replace(/[0-9]/gi,"").concat(4-this.noteCount);
				$(inputs[0]).val(updatedTxt);
				
				this.note[this.noteCount] = new fabric.IText("Text",
				{
					fill:"#000"
					,originX:"center"
					,originY:"center"
					,left:this.canvas.width/2
					,fontFamily:"BrushSignature"
					,objectCaching:false
					,textAlign:"center"
				});
				this.canvas.add(this.note[this.noteCount]);
				
				this.note[this.noteCount].animate("top",this.canvas.height/2,
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
	
	getTheme()
	{
		$($("input").toArray()[1]).click((e)=> 
		{
			console.log(this.themeNo);
			this.canvas.setBackgroundImage(this.themes(this.themeNo),this.canvas.renderAll.bind(this.canvas),{crossOrigin:"anonymous"});
			this.themeNo = (this.themeNo > 7) ? 0 : (this.themeNo += 1);
			
		});
	}
	
	getFont()
	{
		$($("input").toArray()[2]).click((e)=> 
		{
			let obj = this.canvas.getActiveObject();
			this.fontCount = (this.fontCount === 0) ? 0 : 1;
			obj.set({fontFamily:this.myFont[this.fontCount]});
			 
			this.canvas.renderAll();
			this.fontCount = (this.fontCount === 1) ? 0 : 1;
		});
	}
	
	serializeCanvas()
	{
		$($("input").toArray()[4]).click((e)=> 
		{
			 // window.open(this.canvas.toDataURL('png'));
			let anc = document.createElement("a");
			anc.download="mickey.png";
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
		this.clearText();
		this.getTheme();
		this.getFont();
		this.serializeCanvas();
	}
}
