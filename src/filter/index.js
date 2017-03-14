export function breakDesc(text,nblimited){
	return text.length>nblimited?
	       text.substring(0,nblimited)+'..':text
}

export function price(val){
  return isNaN(val)?"价格错误":'¥ '+ new Number(val).toFixed(2)
}