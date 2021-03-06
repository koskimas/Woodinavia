export default function parseTextFromHtml(html) {
  if (!html) {
    return null;
  }

  html = html.replace(/<img[^>]+>/g, '');
  let wrapperDiv = document.createElement('div');
  wrapperDiv.innerHTML = html;
  return wrapperDiv.innerText.trim();
}
