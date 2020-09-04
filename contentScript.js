// 當使用者選取到字串，將字串傳到storage，存成arguments，裡面的selected!
//這樣其他地方才能取用
window.addEventListener('DOMContentLoaded',()=>{
  document.addEventListener('click', async (e) => {
    const selected = window.getSelection().toString()
        chrome.storage.local.set({
          arguments:{
            selected: selected
          }})
  })
})
