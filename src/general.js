export function handleScroll() {
      let eles = $('.category-info .text-title')
      let invisibleCategories = []

      let windowHeight = $(window).height()
      let scrollTop = $(window).scrollTop()

      eles.each( category => {
        let item = $(eles[category])
        let eleTop = item.offset().top
        let eleHeight = item.height()
        let inVisible = ((windowHeight+scrollTop)<(eleTop+eleHeight) || (scrollTop>eleTop))

        if(inVisible === true){
          invisibleCategories.push(item.text())
        }
      })   

      return invisibleCategories
 }