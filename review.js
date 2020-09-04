const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <div class='card'>
    <button class='button button-delete'>X</button>
    <div class="desc"></div>
    <span class="type"></span>
    <div  class="code"></div>
  </div>
`;
function render(result, codesKey) {
  const codes = Object.keys(result.codes || {})
  let codesCount = codes.length;
  document.getElementById('codes-count').textContent = codesCount;
  // ========================
  // render
 
  codesKey.forEach(pair => {
    //[date.now , {type....}],[date.now , {type....}],[date.now , {type....}]
    const cardDOM = document.importNode(cardTemplate.content, true);
    cardDOM.querySelector('.type').textContent = pair[1].type
    cardDOM.querySelector('.desc').textContent = pair[1].desc
    //cardDOM.querySelector('.code').textContent = pair[1].code
    let codeDiv = cardDOM.querySelector('.code')
    //cardDOM.querySelector('.code').textContent = pair[1].code
    let editorConfig = {
      mode: pair[1].type,
      lineNumbers: true,
      theme: 'rubyblue',
      lineWrapping: true,
      value: pair[1].code,
    }

    const cardDiv = cardDOM.querySelector('.card')

    cardDOM.querySelector('.button-delete').addEventListener('click', () => {
      delete result.codes[pair[0]];
      chrome.storage.local.set({ codes: result.codes });
      cardDiv.remove();
      codesCount = codesCount - 1
      document.getElementById('codes-count').textContent = codesCount
    })
    document.getElementById('notes').appendChild(cardDOM)
    
    myCodeMirror = CodeMirror(codeDiv, editorConfig);
    setTimeout(function() {
      myCodeMirror.refresh()
    },1);
    
  });
}
// ============================================================================
window.addEventListener('DOMContentLoaded', () => {

  chrome.storage.local.get(['codes'],
    result => {
      const codesKey = Object.entries(result.codes || {})
      // [date.now , {type....}]
      render(result, codesKey)
    }
  );

  document.querySelector('#searchBtn').addEventListener('click', () => {
    let type = document.querySelector('[name="type"]').value
    let desc = document.querySelector('[name="desc"]').value
    document.querySelector('#notes').innerHTML = ""
    chrome.storage.local.get(['codes'],
      result => {
        const codesKey = Object.entries(result.codes || {})
          .filter(pair => (!type || (type === pair[1].type)))
          .filter(pair => (!desc || (pair[1].desc.match(desc))))
        render(result, codesKey)
      }
    );
  })

  document.querySelectorAll('.CodeMirror').forEach(card => card.click())

  document.getElementById('clear').addEventListener('click', () => {
    chrome.storage.local.set({ codes: {} });
    codesCount = 0;
    document.getElementById('codes-count').textContent = codesCount;
    document.getElementById('notes').innerHTML = ''
  })

  setTimeout(function() {

  },1);
})
