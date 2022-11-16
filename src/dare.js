const dare = (player0 = 'Spieler 1', player1 = 'Spieler 2') => {
  player0 = `<i>${player0}</i>`
  player1 = `<i>${player1}</i>`
  return {
    normal: [[`${player0} mache irgendwas mit ${player1}`, 1]],
    partner: [],
    crush: [],
    differentSex: [],
    sameSex: [],
    probabilityNormal: 0.5,
  }
}
