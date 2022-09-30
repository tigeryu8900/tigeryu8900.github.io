let AES = (() => {
  const Sbox = [99,124,119,123,242,107,111,197,48,1,103,43,254,215,171,
    118,202,130,201,125,250,89,71,240,173,212,162,175,156,164,114,192,183,253,
    147,38,54,63,247,204,52,165,229,241,113,216,49,21,4,199,35,195,24,150,5,154,
    7,18,128,226,235,39,178,117,9,131,44,26,27,110,90,160,82,59,214,179,41,227,
    47,132,83,209,0,237,32,252,177,91,106,203,190,57,74,76,88,207,208,239,170,
    251,67,77,51,133,69,249,2,127,80,60,159,168,81,163,64,143,146,157,56,245,
    188,182,218,33,16,255,243,210,205,12,19,236,95,151,68,23,196,167,126,61,
    100,93,25,115,96,129,79,220,34,42,144,136,70,238,184,20,222,94,11,219,224,
    50,58,10,73,6,36,92,194,211,172,98,145,149,228,121,231,200,55,109,141,213,
    78,169,108,86,244,234,101,122,174,8,186,120,37,46,28,166,180,198,232,221,
    116,31,75,189,139,138,112,62,181,102,72,3,246,14,97,53,87,185,134,193,29,
    158,225,248,152,17,105,217,142,148,155,30,135,233,206,85,40,223,140,161,
    137,13,191,230,66,104,65,153,45,15,176,84,187,22];

  const ShiftRowTab = [0,5,10,15,4,9,14,3,8,13,2,7,12,1,6,11];

  let Sbox_Inv = new Array(256);
  for (let i = 0; i < 256; i++) {
    Sbox_Inv[Sbox[i]] = i;
  }

  let ShiftRowTab_Inv = new Array(16);
  for (let i = 0; i < 16; i++) {
    ShiftRowTab_Inv[ShiftRowTab[i]] = i;
  }

  let xtime = new Array(256);
  for (let i = 0; i < 128; i++) {
    xtime[i] = i << 1;
    xtime[128 + i] = (i << 1) ^ 0x1b;
  }

  function SubBytes(state, sbox) {
    for (let i = 0; i < 16; i++) {
      state[i] = sbox[state[i]];
    }
  }

  function AddRoundKey(state, rkey) {
    for (let i = 0; i < 16; i++) {
      state[i] ^= rkey[i];
    }
  }

  function ShiftRows(state, shifttab) {
    let h = [].concat(state);
    for (let i = 0; i < 16; i++) {
      state[i] = h[shifttab[i]];
    }
  }

  function MixColumns(state) {
    for (let i = 0; i < 16; i += 4) {
      let s0 = state[i + 0], s1 = state[i + 1];
      let s2 = state[i + 2], s3 = state[i + 3];
      let h = s0 ^ s1 ^ s2 ^ s3;
      state[i + 0] ^= h ^ xtime[s0 ^ s1];
      state[i + 1] ^= h ^ xtime[s1 ^ s2];
      state[i + 2] ^= h ^ xtime[s2 ^ s3];
      state[i + 3] ^= h ^ xtime[s3 ^ s0];
    }
  }

  function MixColumns_Inv(state) {
    for (let i = 0; i < 16; i += 4) {
      let s0 = state[i + 0], s1 = state[i + 1];
      let s2 = state[i + 2], s3 = state[i + 3];
      let h = s0 ^ s1 ^ s2 ^ s3;
      let xh = xtime[h];
      let h1 = xtime[xtime[xh ^ s0 ^ s2]] ^ h;
      let h2 = xtime[xtime[xh ^ s1 ^ s3]] ^ h;
      state[i + 0] ^= h1 ^ xtime[s0 ^ s1];
      state[i + 1] ^= h2 ^ xtime[s1 ^ s2];
      state[i + 2] ^= h1 ^ xtime[s2 ^ s3];
      state[i + 3] ^= h2 ^ xtime[s3 ^ s0];
    }
  }

  return {
    expandKey(key) {
      let keyArr = new Array(key.length);
      for (let i = 0; i < key.length; i++) {
        keyArr[i] = key.charCodeAt(i);
      }
      let kl = keyArr.length, ks, Rcon = 1;
      switch (kl) {
        case 16: ks = 16 * (10 + 1); break;
        case 24: ks = 16 * (12 + 1); break;
        case 32: ks = 16 * (14 + 1); break;
        default:
          throw {
            message: 'ExpandKey: Only key lengths of 16, 24 or 32 bytes allowed! ' +
              '"Current key length: ' + kl + '"'
          };
      }
      for (let i = kl; i < ks; i += 4) {
        let temp = keyArr.slice(i - 4, i);
        if (i % kl === 0) {
          temp = [Sbox[temp[1]] ^ Rcon, Sbox[temp[2]],
            Sbox[temp[3]], Sbox[temp[0]]];
        }
        if ((Rcon <<= 1) >= 256) {
          Rcon ^= 0x11b;
        } else if ((kl > 24) && (i % kl === 16)) {
          temp = [Sbox[temp[0]], Sbox[temp[1]],
            Sbox[temp[2]], Sbox[temp[3]]];
        }
        for (let j = 0; j < 4; j++) {
          keyArr[i + j] = keyArr[i + j - kl] ^ temp[j];
        }
      }
      return String.fromCharCode(...keyArr);
    },

    encrypt(input, key) {
      let block = new Array(input.length);
      for (let i = 0; i < input.length; i++) {
        block[i] = input.charCodeAt(i);
      }
      let keyArr = new Array(key.length);
      for (let i = 0; i < key.length; i++) {
        keyArr[i] = key.charCodeAt(i);
      }
      let l = keyArr.length;
      AddRoundKey(block, keyArr.slice(0, 16));
      let i = 16;
      for (; i < l - 16; i += 16) {
        SubBytes(block, Sbox);
        ShiftRows(block, ShiftRowTab);
        MixColumns(block);
        AddRoundKey(block, keyArr.slice(i, i + 16));
      }
      SubBytes(block, Sbox);
      ShiftRows(block, ShiftRowTab);
      AddRoundKey(block, keyArr.slice(i, l));
      let output = String.fromCharCode(...block);
      if (output.length > 16) {
        return output.substring(0, 16) + this.encrypt(output.substring(16), key);
      }
      return output;
    },

    decrypt(input, key) {
      let block = new Array(input.length);
      for (let i = 0; i < input.length; i++) {
        block[i] = input.charCodeAt(i);
      }
      let keyArr = new Array(key.length);
      for (let i = 0; i < key.length; i++) {
        keyArr[i] = key.charCodeAt(i);
      }
      let l = keyArr.length;
      AddRoundKey(block, keyArr.slice(l - 16, l));
      ShiftRows(block, ShiftRowTab_Inv);
      SubBytes(block, Sbox_Inv);
      for (let i = l - 32; i >= 16; i -= 16) {
        AddRoundKey(block, keyArr.slice(i, i + 16));
        MixColumns_Inv(block);
        ShiftRows(block, ShiftRowTab_Inv);
        SubBytes(block, Sbox_Inv);
      }
      AddRoundKey(block, keyArr.slice(0, 16));
      let output = String.fromCharCode(...block);
      if (output.length > 16) {
        return output.substring(0, 16) + this.decrypt(output.substring(16), key);
      }
      return output;
    }
  };
})();

function randomIntBits(bits) {
  return crypto.getRandomValues(new Uint32Array(Math.ceil(Number(bits) / 32)))
    .reduce((previousValue, currentValue, currentIndex) =>
      previousValue + (currentValue << (32 * currentIndex))
    ) & ((1 << Number(bits)) - 1)
}

function randomInt(min, max) {
  if (max === undefined) {
    max = Number(min);
    min = 0;
  } else {
    min = Number(min);
    max = Number(max);
  } if (max < min) {
    let temp = min;
    min = max;
    max = temp;
  }
  let diff = max - min;
  let bits = diff.toString(2).length;
  while (true) {
    let result = randomIntBits(bits);
    if (result < diff) return result + min;
  }
}

function randomBigIntBits(bits) {
  return crypto.getRandomValues(new BigUint64Array(Math.ceil(Number(bits) / 64)))
    .reduce((previousValue, currentValue, currentIndex) =>
      previousValue + (currentValue << BigInt(32 * currentIndex))
    ) & ((1n << BigInt(bits)) - 1n)
}

function randomBigInt(min, max) {
  if (max === undefined) {
    max = BigInt(min);
    min = 0n;
  } else {
    min = BigInt(min);
    max = BigInt(max);
  }
  if (max < min) {
    let temp = min;
    min = max;
    max = temp;
  }
  let diff = max - min;
  let bits = diff.toString(2).length;
  while (true) {
    let result = randomBigIntBits(bits);
    if (result < diff) return result + min;
  }
}

function modMult(a, b, mod) {
  a %= mod;
  let result = 0n;

  while (b) {
    if (b & 1n) result = (result + a) % mod;
    a = (a << 1n) % mod;
    b >>= 1n;
  }

  return result;
}

function modExp(a, b, m) {
  if (m === 1n) return 0n;
  let result = 1n;
  a %= m;
  while (b) {
    if (b & 1n) result = modMult(result, a, m);
    b >>= 1n;
    a = modMult(a, a, m);
  }
  return result;
}

function millerRabin(x) {
  if (x <= 1n) return false;
  if (x <= 3n) return true;
  if (!(x & 1n)) return false;

  let d = x - 1n;
  let r = 0;
  while (!(x & 1n)) {
    d >>= 1n;
    ++r;
  }
  // x = (2 ^ r) * d + 1
  for (let i = 0; i < 5; ++i) {
    let a = randomBigInt(2n, x - 1n);
    let k = modExp(a, d, x);
    if (k === 1n || k === x - 1n) continue;
    let isComposite = true;
    for (let j = 0; j < r - 1; ++j) {
      k = modMult(k, k, x);
      if (k === 1n) return false;
      if (k === x - 1n) {
        isComposite = false;
        break;
      }
    }
    if (isComposite) return false;
  }
  return true;
}

function randomPrime(min, max) {
  if (max === undefined) {
    max = 1n << (BigInt(min) - 1n);
    min = max >> 1n;
  } else {
    min = BigInt(min);
    max = BigInt(max);
  }
  if (max < min) {
    let temp = min;
    min = max;
    max = temp;
  }
  // find prime with that number of bits
  if (max < 2) { return null; } // nah, no primes
  let result = randomBigInt(min, max);
  for (let i = 0, limit = 5 * max.toString(2).length + 5; i < limit; ++i) {
    result = randomBigInt(min, max);
    if (millerRabin(result)) return result;
  }
  return null;
}

function stringify(input, charSize = 16) {
  let CharSize = BigInt(charSize);
  let charLim = 1n << CharSize;
  let result = '';
  for (; input > 0; input >>= CharSize) result += String.fromCharCode(Number(input % charLim));
  return result;
}

function codify(input, charSize = 16) {
  let result = 0n;
  for (let i = 0; i < input.length; i++) {
    result += BigInt(input.charCodeAt(i)) << BigInt(i * charSize);
  }
  return result;
}

const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function bigIntToBase64(n) {
  let result = '';
  while (n) {
    result += base64chars[n % 64n];
    n >>= 6n;
  }
  switch (result.length % 3) {
    case 0:
      return result;
    case 1:
      return result + "==";
    case 2:
      return result + "=";
  }
}

function base64ToBigInt(n) {
  n = n.replace(/=*$/, "");
  let result = 0n;
  for (let i = 0; i < n.length; ++i) {
    result += BigInt(base64chars.indexOf(n[i])) << BigInt(6 * i);
  }
  return result;
}

let RSA = (() => {
  function eea(a, b) {
    if (b === 0n) {
      return [1n, 0n];
    }
    let q = a / b;
    let r = a % b;
    let tempArr = eea(b, r);
    let s = tempArr[0];
    let t = tempArr[1];
    return [t, s - (q * t)];
  }

  function find_inverse(x, y) {
    x = BigInt(x);
    y = BigInt(y);
    let inv = eea(x, y)[0];
    if (inv < 1n) {
      inv += y;
    }
    return inv;
  }

  return {
    generateKeys(bits, charSize = 16) {
      bits = BigInt(bits);
      let p = randomPrime(bits);
      let q = randomPrime(bits);
      let e = randomPrime(bits);
      let t = (p - 1n) * (q - 1n);
      return {
        mod: bigIntToBase64(p * q, charSize),
        public: bigIntToBase64(e, charSize),
        private: bigIntToBase64(find_inverse(e, t), charSize),
        toString() {
          return "mod: " + this.mod + " public key: " + this.public + " private key: " + this.private;
        }
      };
    },

    encrypt(input, key, mod, charSize = 16) {
      key = base64ToBigInt(key);
      mod = base64ToBigInt(mod);
      let skA = new Array(16);
      for (let i = 0; i < skA.length; i++)
        skA[i] = randomBigInt(0n, 256n).toString();
      let sk = String.fromCharCode(...crypto.getRandomValues(new Uint8Array(16)));
      let skX = AES.expandKey(sk);
      let skI = codify(sk, charSize);
      if (skI >= mod) {
        throw {
          message: '"mod" is too small. Try using bigger primes when generating keys' +
            'or use a smaller character size. "Current mod: ' + mod + '" "Minimum mod: ' +
            (skI + 1n) + '"'
        };
      }
      let skE = modExp(skI, key, mod);
      let offset = BigInt(skE.toString(2).length) + 64n;
      // return bigIntToBase64(codify(String.fromCharCode(skE.length) + skE + AES.encrypt(input, skX)));
      console.log("sk", sk, "sk.length", sk.length, "skX", skX, "skI", skI, "skE", skE, "offset", offset, "encrypted", AES.encrypt(input, skX), charSize);
      return bigIntToBase64(offset + (BigInt(input.length) << 32n) + (skE << 64n) + (codify(AES.encrypt(input, skX), charSize) << offset));
    },

    decrypt(input, key, mod, charSize = 16) {
      input = base64ToBigInt(input);
      key = base64ToBigInt(key);
      mod = base64ToBigInt(mod);
      let offset = input & ((1n << 32n) - 1n);
      let length = (input >> 32n) & ((1n << 32n) - 1n);
      let skE = (input >> 64n) & ((1n << (offset - 64n)) - 1n);
      let skI = modExp(skE, key, mod);
      let sk = stringify(skI, charSize);
      console.log("sk", sk, "sk.length", sk.length, "skI", skI, "skE", skE, "offset", offset);
      return AES.decrypt(stringify(input >> offset, charSize), AES.expandKey(sk)).substring(0, Number(length));
    }
  }
})();
