// s => (hh:)(mm:)ss
export const timeFormat = d => {
  const sec_num = parseInt(d, 10);
  const h = Math.floor(sec_num / 3600);
  const m = Math.floor((sec_num - (h * 3600)) / 60);
  const s = sec_num - (h * 3600) - (m * 60);

  let hs = h ? `${h}:` : '';
  let ms = h || m ? `${(m < 10 && h > 0) ? '0'+m : m}:` : '';
  let ss = h || m || s ? `${(s < 10 && (m > 0 || h > 0) ) ? '0'+s : s}` : '';

  return `${hs}${ms}${ss}`;
}

// (12, 1:45) => 0:12
export const timeCorrectMask = (c, d) => {
  const m = "00:00:00";
  const dl = d.length;
  const cl = c.length;
  return m.substr(-1*dl, dl).substr(0, dl - cl) + c;
}

export const humanNumbers = value => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const shortNumbers = value => {
  value = parseInt(value);
  return value > 999 ? (value/1000).toFixed(1) + 'K' : value;
}

export const getLvlbyExp = exp => {
  const p1 = exp / 25000;
  const p2 = Math.floor( Math.sqrt( p1 - Math.floor(Math.sqrt(p1)) ) );
  const p3 = Math.floor( (exp-((p2)*(p2+1)*25000)) / (5000*(p2+1)) );
  return p3 + ( (p2) * 10 );
}

export const getExpForNextLvl = currnetLvl => {
  const lvl = currnetLvl + 1;
  const p1 = 25 * Math.floor(lvl/10);
  const p2 = 25 * Math.pow( Math.floor( lvl/10 ), 2 );
  const p3 = 5 * Math.floor(lvl/10 + 1) * (lvl % 10);
  return (p1 + p2 + p3) * 1000;
}

export const getLvlData = exp => {
  const currnetLvl = getLvlbyExp(exp);
  const nextExpPoint = getExpForNextLvl(currnetLvl);
  const prevExpPoint = getExpForNextLvl(currnetLvl - 1);
  const currnetLvlExp = nextExpPoint - prevExpPoint;
  const currentExp = exp - prevExpPoint;
  const lvlProgress = Math.floor(currentExp * 100 / currnetLvlExp);
  return {
    exp,
    currnetLvl,
    lvlProgress,
    prevExpPoint,
    nextExpPoint,
    currentExp,
    currnetLvlExp
  }
}

export const getClientStartTime = (serverTime, serverStart) => {
  const nowUnix = Math.floor(Date.now() / 1000);
  const serverUnix = Math.floor(serverTime / 1000);
  const diff = nowUnix - serverUnix;
  const serverStartUnix = Math.floor(serverStart / 1000);
  const clientStartUnix = serverStartUnix + diff;
  return clientStartUnix;
}

export const arrayMove = (arr, previousIndex, newIndex) => {
  const array = arr.slice(0);
  if (newIndex >= array.length) {
    let k = newIndex - array.length;
    while (k-- + 1) {
      array.push(undefined);
    }
  }
  array.splice(newIndex, 0, array.splice(previousIndex, 1)[0]);
  return array;
}

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};