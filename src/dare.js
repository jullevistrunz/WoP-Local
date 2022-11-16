const dare = (player0 = 'Spieler 1', player1 = 'Spieler 2') => {
  return {
    normal: [`${player0} mache irgendwas mit ${player1}`],
    partner: [],
    crush: [],
    differentSex: [],
    sameSex: [],
    probabilityNormal: 0.5,
  }
}
