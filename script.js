Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}

if (localStorage.getItem('openContainer')) {
  goToContainer(0, localStorage.getItem('openContainer'))
  updateListMenu()
} else if (localStorage.getItem('players')) {
  goToContainer(0, 1)
  updateListMenu()
}

document
  .getElementById('listBtn')
  .addEventListener('click', () =>
    document.getElementById('listMenu').classList.toggle('hide')
  )

document.querySelector('#listMenu #resetBtn').addEventListener('click', () => {
  localStorage.clear()
  location.reload()
})

document
  .querySelector('#listMenu #restartBtn')
  .addEventListener('click', () => {
    restartGame()
  })

document
  .querySelector('#newGameContainer #addPlayer')
  .addEventListener('click', newGameAddPlayerInput)

document
  .querySelector('#newGameContainer #removePlayer')
  .addEventListener('click', newGameRemovePlayerInp)

document
  .querySelector('#newGameContainer #forward')
  .addEventListener('click', () => {
    let players = new Array()
    for (
      let i = 0;
      i <
      document.querySelectorAll('#newGameContainer #playerInpWrapper .inp')
        .length;
      i++
    ) {
      players.push([
        document.querySelector(
          `#newGameContainer #playerInpWrapper #player${i}`
        ).value,
        document
          .querySelector(
            `#newGameContainer #playerInpWrapper #player${i} + .sex`
          )
          .src.endsWith('/male_25px.svg')
          ? 'm'
          : 'f',
      ])
    }
    localStorage.setItem('players', JSON.stringify(players))
    updateListMenu()
    goToContainer(0, 1)
  })

document
  .querySelector('#moreOptionsContainer #forward')
  .addEventListener('click', () => {
    const tempArr = new Array()
    const options = document.querySelectorAll(
      '#moreOptionsContainer .inpContainer .checkboxInp'
    )
    for (let i = 0; i < options.length; i++) {
      tempArr.push(options[i].checked)
    }
    localStorage.setItem('options', JSON.stringify(tempArr))
    if (options[3]) {
      let partner = new Array()
      const pairs = document.querySelectorAll(
        '#moreOptionsContainer #partnerWrapper .pair'
      )
      for (let i = 0; i < pairs.length; i++) {
        partner.push([
          document.querySelectorAll(
            `#moreOptionsContainer #partnerWrapper #pair${i} .inp`
          )[0].value,
          document.querySelectorAll(
            `#moreOptionsContainer #partnerWrapper #pair${i} .inp`
          )[1].value,
        ])
      }
      localStorage.setItem('partner', JSON.stringify(partner))
    }
    if (options[4]) {
      let crush = new Array()
      const pairs = document.querySelectorAll(
        '#moreOptionsContainer #crushWrapper .pair'
      )
      for (let i = 0; i < pairs.length; i++) {
        crush.push([
          document.querySelectorAll(
            `#moreOptionsContainer #crushWrapper #pair${i} .inp`
          )[0].value,
          document.querySelectorAll(
            `#moreOptionsContainer #crushWrapper #pair${i} .inp`
          )[1].value,
        ])
      }
      localStorage.setItem('crush', JSON.stringify(crush))
    }
    updateListMenu()
    goToContainer(1, 2)
  })

document
  .querySelector('#moreOptionsContainer #backward')
  .addEventListener('click', () => {
    goToContainer(1, 0)
  })

for (
  let i = 0;
  i <
  document.querySelectorAll(`#newGameContainer #playerInpWrapper .inp`).length;
  i++
) {
  const el = document.querySelector(
    `#newGameContainer #playerInpWrapper #player${i}`
  )
  el.addEventListener('input', () => {
    for (
      let j = 0;
      j <
      document.querySelectorAll(`#newGameContainer #playerInpWrapper .inp`)
        .length;
      j++
    ) {
      const el = document.querySelector(
        `#newGameContainer #playerInpWrapper #player${j}`
      )
      if (!el.value) {
        return (document.querySelector(
          '#newGameContainer #forward'
        ).disabled = true)
      }
    }
    document.querySelector('#newGameContainer #forward').disabled = false
  })
  const sexImg = document.querySelector(`#newGameContainer #player${i} + .sex`)
  sexImg.addEventListener('click', function () {
    this.src = this.src.endsWith('/male_25px.svg')
      ? 'src/female_25px.svg'
      : 'src/male_25px.svg'
  })
}

document
  .querySelector('#moreOptionsContainer #option3')
  .addEventListener('change', function () {
    if (this.checked) {
      document
        .querySelector('#moreOptionsContainer #partnerWrapper')
        .classList.remove('hidden')
      if (
        !document.querySelector('#moreOptionsContainer #partnerWrapper .pair')
      ) {
        moreOptionsAddPair()
      }
    } else {
      document
        .querySelector('#moreOptionsContainer #partnerWrapper')
        .classList.add('hidden')
    }
  })

document
  .querySelector('#moreOptionsContainer #addPair')
  .addEventListener('click', moreOptionsAddPair)

document
  .querySelector('#moreOptionsContainer #removePair')
  .addEventListener('click', moreOptionsRemovePair)

document
  .querySelector('#moreOptionsContainer #option4')
  .addEventListener('change', function () {
    if (this.checked) {
      document
        .querySelector('#moreOptionsContainer #crushWrapper')
        .classList.remove('hidden')
      if (
        !document.querySelector('#moreOptionsContainer #crushWrapper .pair')
      ) {
        moreOptionsAddCrush()
      }
    } else {
      document
        .querySelector('#moreOptionsContainer #crushWrapper')
        .classList.add('hidden')
    }
  })

document
  .querySelector('#moreOptionsContainer #addCrush')
  .addEventListener('click', moreOptionsAddCrush)

document
  .querySelector('#moreOptionsContainer #removeCrush')
  .addEventListener('click', moreOptionsRemoveCrush)

document
  .querySelector('#gameContainer #gameStage0 #voteTruth')
  .addEventListener('click', () => gameStage1('t'))
document
  .querySelector('#gameContainer #gameStage0 #voteDare')
  .addEventListener('click', () => gameStage1('d'))

function goToContainer(oldIndex, index) {
  if (document.querySelectorAll('.itemContainer')[index]) {
    document
      .querySelectorAll('.itemContainer')
      [oldIndex].classList.add('hidden')
    document
      .querySelectorAll('.itemContainer')
      [index].classList.remove('hidden')
    localStorage.setItem('openContainer', index)
    return
  }
  document.querySelectorAll('.itemContainer')[oldIndex].classList.add('hidden')
  document.getElementById('gameContainer').classList.remove('hidden')
  localStorage.setItem('openContainer', index)
  //container specific
  if (index == 1) {
    if (!localStorage.getItem('players')) {
      goToContainer(1, 0)
    }
  } else if (index == 2) {
    if (!localStorage.getItem('options')) {
      goToContainer(2, 1)
    }
  }
  startGame()
}

function newGameAddPlayerInput() {
  const el = document.createElement('input')
  el.type = 'text'
  el.classList.add('inp')
  el.id = `player${
    document.querySelectorAll('#newGameContainer #playerInpWrapper .inp').length
  }`
  el.placeholder = `Spieler ${
    document.querySelectorAll('#newGameContainer #playerInpWrapper .inp')
      .length + 1
  }`
  el.addEventListener('input', () => {
    for (
      let j = 0;
      j <
      document.querySelectorAll(`#newGameContainer #playerInpWrapper .inp`)
        .length;
      j++
    ) {
      const el = document.querySelector(
        `#newGameContainer #playerInpWrapper #player${j}`
      )
      if (!el.value) {
        return (document.querySelector(
          '#newGameContainer #forward'
        ).disabled = true)
      }
    }
    document.querySelector('#newGameContainer #forward').disabled = false
  })
  const image = document.createElement('img')
  image.src = 'src/male_25px.svg'
  image.alt = 'Sex'
  image.classList.add('sex')
  image.addEventListener('click', function () {
    this.src = this.src.endsWith('/male_25px.svg')
      ? 'src/female_25px.svg'
      : 'src/male_25px.svg'
  })
  const spacer = document.createElement('div')
  spacer.classList.add('spacer-small')
  document.querySelector('#newGameContainer #playerInpWrapper').appendChild(el)
  document
    .querySelector('#newGameContainer #playerInpWrapper')
    .appendChild(image)
  document
    .querySelector('#newGameContainer #playerInpWrapper')
    .appendChild(spacer)
  el.focus()
  document.querySelector('#newGameContainer #removePlayer').disabled = false
  document.querySelector('#newGameContainer #forward').disabled = true
}

function newGameRemovePlayerInp() {
  document
    .querySelector(
      `#newGameContainer #player${
        document.querySelectorAll('#newGameContainer #playerInpWrapper .inp')
          .length - 1
      }`
    )
    .remove()
  document
    .querySelectorAll('#newGameContainer #playerInpWrapper .spacer-small')
    [
      document.querySelectorAll('#newGameContainer #playerInpWrapper .inp')
        .length - 1
    ].remove()
  document
    .querySelectorAll('#newGameContainer #playerInpWrapper .sex')
    [
      document.querySelectorAll('#newGameContainer #playerInpWrapper .inp')
        .length - 1
    ].remove()
  if (
    document.querySelectorAll('#newGameContainer #playerInpWrapper .inp')
      .length < 4
  ) {
    document.querySelector('#newGameContainer #removePlayer').disabled = true
  }
}

function moreOptionsAddPair() {
  const el0 = document.createElement('input'),
    el1 = document.createElement('input'),
    pair = document.createElement('div'),
    spacer0 = document.createElement('div'),
    spacer1 = document.createElement('div'),
    spacer2 = document.createElement('div'),
    pairText = document.createElement('div')
  const existingPairs = document.querySelectorAll(
    '#moreOptionsContainer #partnerInpWrapper .pair'
  ).length
  pair.classList.add('pair')
  pair.id = `pair${existingPairs}`
  pairText.innerHTML = `Paar ${existingPairs + 1}`
  spacer0.classList.add('spacer-verySmall')
  spacer1.classList.add('spacer-small')
  spacer2.classList.add('spacer-small')
  el0.type = 'text'
  el1.type = 'text'
  el0.classList.add('inp')
  el1.classList.add('inp')
  el0.id = 'partner0'
  el1.id = 'partner1'
  el0.placeholder = 'Partner 1'
  el1.placeholder = 'Partner 2'
  pair.appendChild(pairText)
  pair.appendChild(spacer0)
  pair.appendChild(el0)
  pair.appendChild(spacer1)
  pair.appendChild(el1)
  pair.appendChild(spacer2)
  document
    .querySelector('#moreOptionsContainer #partnerInpWrapper')
    .appendChild(pair)
  if (existingPairs > 0) {
    document.querySelector('#moreOptionsContainer #removePair').disabled = false
  }
  el0.focus()
}

function moreOptionsRemovePair() {
  const existingPairs = document.querySelectorAll(
    '#moreOptionsContainer #partnerInpWrapper .pair'
  ).length
  document
    .querySelector(
      `#moreOptionsContainer #partnerInpWrapper #pair${existingPairs - 1}`
    )
    .remove()
  if (existingPairs < 3) {
    document.querySelector('#moreOptionsContainer #removePair').disabled = true
  }
}

function moreOptionsAddCrush() {
  const el0 = document.createElement('input'),
    el1 = document.createElement('input'),
    pair = document.createElement('div'),
    spacer0 = document.createElement('div'),
    spacer1 = document.createElement('div'),
    spacer2 = document.createElement('div'),
    pairText = document.createElement('div')
  const existingPairs = document.querySelectorAll(
    '#moreOptionsContainer #crushInpWrapper .pair'
  ).length
  pair.classList.add('pair')
  pair.id = `pair${existingPairs}`
  pairText.innerHTML = `Crush ${existingPairs + 1}`
  spacer0.classList.add('spacer-verySmall')
  spacer1.classList.add('spacer-small')
  spacer2.classList.add('spacer-small')
  el0.type = 'text'
  el1.type = 'text'
  el0.classList.add('inp')
  el1.classList.add('inp')
  el0.id = 'partner0'
  el1.id = 'partner1'
  el0.placeholder = 'Spieler 1'
  el1.placeholder = 'Spieler 2'
  pair.appendChild(pairText)
  pair.appendChild(spacer0)
  pair.appendChild(el0)
  pair.appendChild(spacer1)
  pair.appendChild(el1)
  pair.appendChild(spacer2)
  document
    .querySelector('#moreOptionsContainer #crushInpWrapper')
    .appendChild(pair)
  if (existingPairs > 0) {
    document.querySelector(
      '#moreOptionsContainer #removeCrush'
    ).disabled = false
  }
  el0.focus()
}

function moreOptionsRemoveCrush() {
  const existingPairs = document.querySelectorAll(
    '#moreOptionsContainer #crushInpWrapper .pair'
  ).length
  document
    .querySelector(
      `#moreOptionsContainer #crushInpWrapper #pair${existingPairs - 1}`
    )
    .remove()
  if (existingPairs < 3) {
    document.querySelector('#moreOptionsContainer #removeCrush').disabled = true
  }
}

function updateListMenu() {
  if (!localStorage.getItem('players')) return
  const players = JSON.parse(localStorage.getItem('players'))
  const tempArr = new Array()
  for (let i = 0; i < players.length; i++) {
    tempArr.push(
      `• ${players[i][0]}  (<img style="transform: translateY(2px);" src="${
        players[i][1] == 'm'
          ? 'src/male_20px_light.svg'
          : 'src/female_20px_light.svg'
      }" alt="Sex"></img>)<br/>`
    )
  }
  document.querySelector('#listMenu #registeredPlayers').innerHTML =
    tempArr.join('')
  if (localStorage.getItem('options')) {
    document
      .querySelector('#listMenu #optionsHeader')
      .classList.remove('hidden')
    const options = JSON.parse(localStorage.getItem('options'))
    for (let i = 0; i < options.length; i++) {
      if (options[i]) {
        document
          .querySelectorAll('#listMenu #optionsList div:not(.playerList)')
          [i].classList.remove('hidden')
      }
      if (options[3]) {
        let partnerArr = new Array()
        for (
          let i = 0;
          i < JSON.parse(localStorage.getItem('partner')).length;
          i++
        ) {
          partnerArr.push(
            `${JSON.parse(localStorage.getItem('partner'))[i][0]} + ${
              JSON.parse(localStorage.getItem('partner'))[i][1]
            }<br/>`
          )
        }
        document.querySelectorAll(
          '#listMenu #optionsList .playerList'
        )[0].innerHTML = partnerArr.join('')
      }
      if (options[4]) {
        let partnerArr = new Array()
        for (
          let i = 0;
          i < JSON.parse(localStorage.getItem('crush')).length;
          i++
        ) {
          partnerArr.push(
            `${JSON.parse(localStorage.getItem('crush'))[i][0]} + ${
              JSON.parse(localStorage.getItem('crush'))[i][1]
            }<br/>`
          )
        }
        document.querySelectorAll(
          '#listMenu #optionsList .playerList'
        )[1].innerHTML = partnerArr.join('')
      }
    }
  }
  if (localStorage.getItem('level')) {
    document.querySelector('#listMenu #level').classList.remove('hidden')
    document.querySelector('#listMenu #level').innerHTML = `Level: ${Math.floor(
      localStorage.getItem('level')
    )}`
  }
}

function startGame() {
  console.info('Game started')
  document.querySelector('#listMenu #restartBtn').classList.remove('hidden')
  if (!localStorage.getItem('level')) localStorage.setItem('level', 1)
  const players = JSON.parse(localStorage.getItem('players'))
  const options = JSON.parse(localStorage.getItem('options'))
  let partner = null
  let crush = null
  if (options[3]) {
    partner = JSON.parse(localStorage.getItem('partner'))
  }
  if (options[4]) {
    crush = JSON.parse(localStorage.getItem('crush'))
  }
  let player0 = localStorage.getItem('player0')
  let player1 = localStorage.getItem('player1')
  if (!player0) {
    player0 = players.sample()[0]
    localStorage.setItem('player0', player0)
  }
  if (!player1) {
    generatePlayer1()
    function generatePlayer1() {
      player1 = players.sample()[0]
      if (player1 == player0) generatePlayer1()
    }
    localStorage.setItem('player1', player1)
  }
  document.querySelector(
    '#gameContainer #gameStage0 > .header'
  ).innerHTML = `<i>${player0}</i>, wähle Wahrheit oder Pflicht!`
  updateListMenu()
}

function restartGame() {
  localStorage.removeItem('player0')
  localStorage.removeItem('player1')
  localStorage.removeItem('level')
  document.getElementById('listBtn').click()
  startGame()
}

function gameStage1(choice) {
  document.querySelector('#gameContainer #gameStage0').classList.add('hidden')
  document
    .querySelector('#gameContainer #gameStage1')
    .classList.remove('hidden')

  let player0 = localStorage.getItem('player0')
  let player1 = localStorage.getItem('player1')
  const level = Math.floor(localStorage.getItem('level'))
  const options = localStorage.getItem('options')
  const levelIncrease = options[2]
  if (!player0 || !player1) {
    document
      .querySelector('#gameContainer #gameStage0')
      .classList.remove('hidden')
    document.querySelector('#gameContainer #gameStage1').classList.add('hidden')
    startGame()
  }
  if (levelIncrease) {
    localStorage.setItem('level', localStorage.getItem('level') - 0 + 0.5)
  }
  document.querySelector('#gameContainer #gameStage1 #restartBtn').onclick =
    () => {
      generatePlayer0()
      function generatePlayer0() {
        let oldPlayer0 = player0
        player0 = JSON.parse(localStorage.getItem('players')).sample()[0]
        if (player0 == oldPlayer0) generatePlayer0()
      }
      localStorage.setItem('player0', player0)
      localStorage.removeItem('player1')
      document
        .querySelector('#gameContainer #gameStage0')
        .classList.remove('hidden')
      document
        .querySelector('#gameContainer #gameStage1')
        .classList.add('hidden')
      startGame()
    }

  let content = ''
  if (choice == 't') {
    const probabilityElse =
      (1 - truth().probabilityNormal) / (Object.keys(truth()).length - 2)

    console.log(probabilityElse)
    let sumArr = [truth().probabilityNormal]
    for (let i = 0; i < Object.keys(truth()).length - 2; i++) {
      sumArr.push(sumArr[i] + probabilityElse)
    }
    console.log(sumArr)

    content = truth(player0, player1).normal.sample()[0]
  } else {
    const probabilityElse =
      (1 - truth().probabilityNormal) / (Object.keys(truth()).length - 2)
    content = dare(player0, player1).normal.sample()[0]
  }
  document.querySelector(
    '#gameContainer #gameStage1 > .header'
  ).innerHTML = `${content}`
}
