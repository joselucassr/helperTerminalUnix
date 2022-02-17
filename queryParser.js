let jsonData;

const queryFunction = async (checker, data) => {
  let completeQueryResult = [];
  data = data.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  // console.log(data);

  if (checker == '') return writeHtml(data);

  let filteredByName = data
    .filter((c) => c.name.startsWith(checker))
    .sort((a, b) => a.name.indexOf(checker) - b.name.indexOf(checker));

  // console.log('filteredByName', filteredByName);

  let tagsArray = checker.toLowerCase().split(' ');
  let regexChecker = '';
  tagsArray.forEach((tag) => {
    regexChecker += `(?=.*${tag})`;
  });

  regexChecker = new RegExp(regexChecker);

  // console.log('regexChecker', regexChecker);

  let res = await fetch('/helperTerminalUnix/groupTags.json');
  jsonGroupData = await res.json();

  let filteredByTags = data.filter((c) => {
    let groupTags = jsonGroupData.find((g) => g.id === c.group);

    if (!c.removeGroupTags) {
      if (groupTags) {
        if (c.tags != undefined) c.tags += `, ${groupTags.tags}`;
        else c.tags = groupTags.tags;
      }
    }
    if (!c.tags) return false;

    return c.tags.match(regexChecker) !== null;
  });

  // console.log('filteredByTags', filteredByTags);

  let prepFilteredByTags = [];

  filteredByTags.forEach((ftb) => {
    if (!filteredByName.some((fbn) => fbn.id === ftb.id)) {
      prepFilteredByTags.push(ftb);
    }
  });

  // console.log('prepFilteredByTags', prepFilteredByTags);

  filteredByName.forEach((f) => completeQueryResult.push(f));
  prepFilteredByTags.forEach((p) => completeQueryResult.push(p));

  // console.log(completeQueryResult);
  writeHtml(completeQueryResult);
};

const writeLoadingHtml = () => {
  let loadingHtml = `
    <div class="greenHighlight bold">loading...</div>
  `;

  let containerElement = document.getElementById('commandCards');
  containerElement.innerHTML = loadingHtml.trim();
};

const writeHtml = (queryResults) => {
  // console.log(queryResults);
  let fullHtmlString = '';

  if (queryResults.length == 0)
    fullHtmlString = `
      <div class="redHighlight bold">sem resultados :(</div>
    `;

  queryResults.forEach((qr) => {
    fullHtmlString += `
    <div id="${qr.id}" class="card">
      <div class="cardFirstLine">
        <div class="purpleHighlight">~$ ${qr.name}</div>
        <div onclick="writeToClipboard(\`${qr.name.replaceAll(
          '"',
          '&#92;&quot;',
        )}\`, '${
      qr.id
    }')" style="width: 25px" class="pointer"><img src="copySvg.svg" alt="" /></div>
      </div>
      <div>
        <div class="commentHightlight"># Basicamente</div>
        <div>${qr.shortDescription}</div>
      </div>
      <div onclick="openCommandPage('${
        qr.id
      }')" class="commentHightlight cardThirdLine">
        <div>/*</div>
        <div>Clique para ver mais</div>
        <div>*/</div>
      </div>
    </div>
    `;
  });

  let containerElement = document.getElementById('commandCards');
  containerElement.innerHTML = fullHtmlString.trim();
};

const jsonParser = async () => {
  let res = await fetch('/helperTerminalUnix/commands.json');
  jsonData = await res.json();
  let checker = '';

  queryFunction(checker, jsonData);
};

let startTime = new Date().getTime();
let timeoutId;
let prevInputValue = '';
const runQuery = () => {
  let checker = document.getElementById('inputText').value;

  if (checker !== prevInputValue) {
    writeLoadingHtml();
    prevInputValue = checker;
  }

  if (timeoutId) clearTimeout(timeoutId);
  // console.log(now - startTime);
  timeoutId = setTimeout(() => {
    // console.log(checker);
    queryFunction(checker, jsonData);
  }, 1000);
};

document.getElementById('inputText').addEventListener('keyup', runQuery);

const openCommandPage = (commandId) => {
  window.location.href =
    '/helperTerminalUnix/commandPage.html?command=' + commandId;
};

const writeToClipboard = (command, commandId) => {
  navigator.clipboard.writeText(command);
  let card = document.getElementById(commandId);
  if (card.classList.contains('copyConfirmation'))
    card.classList.remove('copyConfirmation');
  card.classList.add('copyConfirmation');

  if (timeoutId) clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    card.classList.remove('copyConfirmation');
  }, 100);
};

jsonParser();
