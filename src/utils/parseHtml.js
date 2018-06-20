export default function parseTextFromHtml(html) {
  if (!html) {
    return null;
  }

  let wrapperDiv = document.createElement('div');
  wrapperDiv.innerHTML = html;
  return wrapperDiv.innerText.trim();
}
