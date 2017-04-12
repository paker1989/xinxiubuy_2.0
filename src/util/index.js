module.exports = {
	uuid() {
		let uuid = '4xxx-yxxx'.replace(/[xy]/g, (c) => {
		    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		    return v.toString(16);
		});

		return uuid+new Number(new Date())
  },

  formatDate(rawDate) {
  	/*
   	let array = rawDate.split('-')
  	return array[0]+'年'+array[1]+'月'+array[2].split('T')[0]+'日'
  	*/
     return rawDate.getFullYear()+'年'
           +(rawDate.getMonth()+1)+'月'
           +rawDate.getDate()+'日'

  },

  debounce(callback,timer,delay) {
    console.log('util debounce')
    if(timer) clearTimeout(timer)
     timer = setTimeout(callback,delay)
  }
}