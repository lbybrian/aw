	let toolTip = function(tp,txt,time=3) {
		let div = document.createElement("div")
		let box = document.createElement("div")
		let p = document.createElement("p")
		let h3 = document.createElement("h3")
		let btn = document.createElement("button")
		let onclickSign=true
		window.document.body.style.position='relitive'
		window.document.body.style.height='100%'
		box.style.zIndex='9999'
		box.style.width='330px'
		box.style.height='80px'
		box.style.paddingLeft='20px'
		box.style.textAlign="center"
		box.style.position='absolute'
		box.style.top='10px'
		box.style.right='20px'
		box.style.backgroundColor='white'
		box.style.borderRadius='4px'
		box.style.border='1px solid #ebeef5'
		box.style.fontFamily='Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif'
		box.style.fontWeight='400'
		if(tp===1){
			h3.textContent='操作成功！'
			h3.style.color='greenyellow'
		}else if(tp===2){
			h3.textContent='操作异常!'
			h3.style.color='darkred'
		}else{
			h3.textContent='提示'
		}
		h3.style.position='absolute'
		h3.style.left='10px'
		h3.style.marginTop='10px'
		h3.style.fontWeight='700';
		p.textContent=txt
		p.style.marginBottom='5px'
//		p.style.marginLeft='15px'
		p.style.position='absolute'
		p.style.bottom='5px'
//		p.style.top='20px'
		p.style.left='10px'
		p.style.fontSize='14px';
    p.style.lineHeight='21px';
//  p.style.margin='6px 0 0';
//  p.style.color: #606266;
    p.style.textAlign='justify';
		
		btn.textContent='X'
		btn.style.cursor='pointer';
//		btn.style='none'
		btn.style.position='absolute'
		btn.style.right='8px'
		btn.style.top='8px'
		btn.style.border='none';
		btn.style.backgroundColor='transparent';
		btn.style.outline='none'; 
		div.appendChild(box)
		box.appendChild(h3)
		box.appendChild(p)
		box.appendChild(btn)
		document.body.appendChild(div)
//		document.body.appendChild(box)
		btn.onmouseenter=function(){
			btn.style.color='red'
		}
		btn.onmouseleave=function(){
			btn.style.color=''
		}
		btn.onclick=function(){
			document.body.removeChild(div)
			onclickSign=false
		}
		setTimeout(()=>{
			if(onclickSign){
				document.body.removeChild(div)
				onclickSign=!onclickSign
			}
		},time*1000)
//		console.log(onclickSign)
		return div;
	}