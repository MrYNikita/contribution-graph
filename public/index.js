function changeDivInfo(div, block, date) {

    if (div) document.body.removeChild(div);

    const { x, y } = block.getBoundingClientRect();

    div = document.createElement('div');

    const labelCommits = document.createElement('label');

    labelCommits.className = 'first';
    labelCommits.textContent = `${date[1]} Contributions`;

    const labelDate = document.createElement('label');

    labelDate.className = 'two';
    labelDate.textContent = new Intl.DateTimeFormat('ru-RU', { month: 'short', day: 'numeric', year: 'numeric', weekday: 'long', }).format(date[0]);

    document.body.append(div);

    div.append(labelCommits, labelDate);

    const [w, h] = [180, 48];

    div.className = 'info';

    div.style.width = `${w}px`;
    div.style.height = `${h}px`;
    div.style.left = `${x + (block.clientWidth / 2) - w / 2}px`;
    div.style.top = `${y - 5 - h}px`;

    return div;

};

async function getData() {

    let result = await fetch('https://dpg.gg/test/calendar.json');

    result = await result.json();

    return result;

};

// добавление месячных меток
(async function () {

    const currentDate = new Date();

    const monthNames = [

        "Янв.",
        "Февр.",
        "Март",
        "Апр.",
        "Май",
        "Июнь",
        "Июль",
        "Авг.",
        "Сент.",
        "Окт.",
        "Нояб.",
        "Дек.",

    ];

    const currentMonth = currentDate.getMonth();

    /** @type {HTMLDivElement} */
    const divMainUp = document.querySelector('#div-main-up');

    for (var i = 1; i <= 12; i++) {

        const month = monthNames[(currentMonth - i + 12) % 12];

        const label = document.createElement('label');

        label.textContent = month;

        divMainUp.appendChild(label);

    };


})();

// добавление блоков
(async function () {

    /** @type {HTMLDivElement} */
    let blockInfo = null;
    /** @type {HTMLDivElement} */
    let blockSelect = null;

    /** @type {HTMLDivElement} */
    const divMainCeR = document.querySelector('#div-main-ce-r');

    const data = Object.entries(await getData()).sort((p, c) => p[0] - c[0]).map(e => [new Date(e[0]), e[1]]);

    const dates = new Array(357).fill(0).map((day, index) => {

        const result = [];

        const date = new Date(new Date().setDate(new Date().getDate() - (358 - index)));

        result.push(date);

        const i = data.findIndex(e => e[0].getDate() === date.getDate());

        result.push(i !== -1 ? data.splice(i, 1)[0][1] : 0);

        return result;

    });

    for (const date of dates) {

        const block = document.createElement('div');

        const commits = date[1];

        block.className += 'block block_selectable';

        let color = '--color-1';

        if (commits > 0) {

            if (commits < 10) color = '--color-2';
            else if (commits < 20) color = '--color-3';
            else if (commits < 40) color = '--color-4';
            else color = '--color-5';

        };

        block.style.backgroundColor = `var(${color})`;

        block.onclick = (e) => {

            if (blockSelect) {

                blockSelect.className = 'block block_selectable';

            };

            block.className += ' block_select';

            blockInfo = changeDivInfo(blockInfo, block, date);

            blockSelect = block;

        };

        divMainCeR.appendChild(block);

    };

})();