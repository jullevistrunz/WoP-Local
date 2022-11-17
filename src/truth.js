const truth = (player0 = 'Spieler 1', player1 = 'Spieler 2') => {
  player0 = `<i>${player0}</i>`
  player1 = `<i>${player1}</i>`
  return {
    normal: [[`${player0} normal ${player1}`, 1]],
    partner: [[`${player0} partner ${player1}`, 1]],
    crush: [[`${player0} crush ${player1}`, 1]],
    differentSex: [[`${player0} differentSex ${player1}`, 1]],
    sameSex: [[`${player0} sameSex ${player1}`, 1]],
    probabilityNormal: 0.5,
  }
}
