export function totallerAllTime(ob) {
  let _t = 0;
  for (let _toi = 0; _toi < ob.length; _toi++) {
    _t += ob[_toi][1];
  }
  return _t;
}

export function totallerOng(ob) {
  let _t = 0;
  let _dow = new Date().getDay();
  _dow--; // defillama doesnt have today's data
  let _thu = _dow > 3 ? _dow - 4 : _dow + 3;
  for (let _toi = 0; _toi <= _thu; _toi++) {
    _t += ob[ob.length - 1 - _toi][1];
  }
  return _t;
}

export function totallerPrev(ob) {
  let _t = 0;
  let _dow = new Date().getDay();
  _dow--; // defillama doesnt have today's data
  let _skip = _dow > 3 ? _dow - 3 : _dow + 4;
  for (let _toi = _skip; _toi <= _skip + 6; _toi++) {
    _t += ob[ob.length - 1 - _toi][1];
  }
  return _t;
}

export function totallerYearAdj(ob) {
  let _t = 0;
  let _skip = ob.length >= 365 ? ob.length - 365 : 0;
  for (let _toi = _skip; _toi < ob.length; _toi++) {
    _t += ob[_toi][1];
  }
  if (_skip == 0) {
    _t = (_t / ob.length) * 365;
  }
  return _t;
}
