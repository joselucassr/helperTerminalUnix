const renderPage = async (commandId) => {
  let res = await fetch('/helperTerminalUnix/commands.json');
  jsonData = await res.json();

  let thisCommandGroup = jsonData.find((c) => c.id === commandId).group;
  // console.log(thisCommandGroup);

  res = await fetch(
    `/helperTerminalUnix/commands/${thisCommandGroup}/${commandId}.txt`,
  );
  txtData = await res.text();

  let txtArr = txtData.split(/\n/g);

  let fullHtmlString = '';

  for (let i = 0; i < txtArr.length; i++) {
    //console.log('Line Number [' + i + ']: ' + arr[i]);
    let partialHtmlString = await getPartialHtmlString(txtArr[i], commandId);

    if (partialHtmlString) fullHtmlString += partialHtmlString;
  }
  let containerElement = document.getElementById('commandPageBackground');

  //console.log(fullHtmlString);

  // Add code areas
  if (fullHtmlString.match(/@CodeArea(.*?)@EndCodeArea/)) {
    let regex = /@CodeArea(.*?)@EndCodeArea/;
    let match = regex.exec(fullHtmlString);

    do {
      let codeAreaDiv = '<div class="codeArea"></div>';
      codeAreaDiv = codeAreaDiv.replace(/(?<=>)[^<]*/, match[1]);

      fullHtmlString = fullHtmlString.replace(match[0], codeAreaDiv);

      match = regex.exec(fullHtmlString);
    } while (match !== null && match.length > 0);
  }

  containerElement.innerHTML = fullHtmlString.trim();
};

const getPartialHtmlString = async (line, thisCommandId) => {
  if (line.startsWith('@title')) return buildTitleHtml(line);

  if (line.startsWith('#')) return buildSubtitleHtml(line);

  if (line.match(/(?<=@group\().*?(?=\))/))
    return await buildGroupHtml(line, thisCommandId);

  if (line.match(/(?<=@groupExtLinks\().*?(?=\))/))
    return await buildGroupExtLinksHtml(line, thisCommandId);

  if (line.match(/@CodeArea/g) || line.match(/@End/g)) return line;

  if (line.length > 0) {
    let text = '<p></p>';
    text = text.replace(/(?<=>)[^<]*/, line);

    if (line.match(/@link/g)) text = buildLinkHtml(line, text);

    if (line.match(/@ref/g)) text = buildRefHtml(line, text);

    if (line.match(/(?<!https:)(?=\/\/).*/))
      text = buildCommentHtml(line, text);

    if (line.match(/@mark/g)) text = buildHighlightHtml(line, text);

    return text;
  }

  if (line.length == 0) return buildBreakHtml();
};

const buildTitleHtml = (line) => {
  let titleDiv = '<div class="commandPageTitle"></div>';
  return titleDiv.replace(/(?<=>)[^<]*/, line.match(/(?<=@title ).*/));
};

const buildSubtitleHtml = (line) => {
  let subTitleDiv = '<div class="commandSubTitle"></div>';
  return subTitleDiv.replace(/(?<=>)[^<]*/, line);
};

const buildGroupHtml = async (line, thisCommandId) => {
  let commandId = line.match(/(?<=@group\().*?(?=\))/);

  let res = await fetch('/helperTerminalUnix/commands.json');
  jsonData = await res.json();

  let group = jsonData.filter((c) => c.group === commandId[0]);

  let divHtml = '<div></div>';

  group.forEach((c) => {
    if (c.id === thisCommandId) return;
    // console.log(c.name);

    divHtml += `<span>• <a href="/helperTerminalUnix/commandPage.html?command=${c.id}" class="blueHightlight">${c.name}</a></span><br />`;
  });

  return divHtml;
};

const buildGroupExtLinksHtml = async (line) => {
  let commandId = line.match(/(?<=@groupExtLinks\().*?(?=\))/);

  let res = await fetch('/helperTerminalUnix/groupExternalLinks.json');
  jsonData = await res.json();

  let groupExtLinks = jsonData.find((c) => c.id === commandId[0]);
  // console.log(groupExtLinks);

  let divHtml = '<div></div>';

  groupExtLinks.links.forEach((l) => {
    divHtml += `<span>• <a href="${l.url}" target="_blank" class="orangeHightlight">${l.displayText}</a></span><br />`;
  });

  return divHtml;
};

const buildLinkHtml = (line, text) => {
  let regex = /(?<=@link(.*\)")).*?(?=")/;
  let match = regex.exec(line);

  let linkUrl = line.match(/(?<=@link\().*?(?=\)")/);

  do {
    let linkText = `<a href="${linkUrl}" target="_blank" class="orangeHightlight"></a>`;

    linkText = linkText.replace(/(?<=>)[^<]*/, match[0]);

    text = text.replace(text.match(/(?=@link\().*?(?<=\)").*?"/), linkText);
    match = regex.exec(text);
  } while (match !== null && match.length > 0);

  return text;
};

const buildRefHtml = (line, text) => {
  let regex = /(?<=@ref(.*\)")).*?(?=")/;
  let match = regex.exec(line);

  let commandId = line.match(/(?<=@ref\().*?(?=\))/);

  do {
    let linkText = `<a href="/helperTerminalUnix/commandPage.html?command=${commandId}" class="blueHightlight"></a>`;

    linkText = linkText.replace(/(?<=>)[^<]*/, match[0]);

    text = text.replace(text.match(/(?=@ref\().*?(?<=\)").*?"/), linkText);
    match = regex.exec(text);
  } while (match !== null && match.length > 0);

  return text;
};

const buildCommentHtml = (line, text) => {
  let commentedText = '<span class="commentHightlight"></span>';
  commentedText = commentedText.replace(
    /(?<=>)[^<]*/,
    line.match(/(?<!https:)(?=\/\/).*/),
  );

  text = text.replace(/(?<!https:)(?=\/\/).*(?=<\/p>)/, commentedText);

  return text;
};

const buildHighlightHtml = (line, text) => {
  let regex = /(?=@mark\(").*?(?<="\))/;
  let match = regex.exec(line);

  do {
    let textToHighlight = text.match(/(?<=@mark\(").*?(?="\))/);

    let highlightedText = '<span class="purpleHighlight"></span>';

    highlightedText = highlightedText.replace(/(?<=>)[^<]*/, textToHighlight);

    text = text.replace(match[0], highlightedText);
    match = regex.exec(text);
  } while (match !== null && match.length > 0);

  return text;
};

const buildBreakHtml = () => {
  return '<br />';
};
