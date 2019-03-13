const nj = require('numjs');

const base = ['a','b','c','d','e','f',
'g','h','i','j','k','l',
'm','n','o','p','q','r',
's','t','u','v','x','w',
'y','z',' '];

const baseLength = base.length;

const data = {
    'home': nj.zeros(baseLength).tolist(),
    'atualizar dados cadastrais': nj.zeros(baseLength).tolist(),
    'ativar cartao': nj.zeros(baseLength).tolist(),
    'texto de teste': nj.zeros(baseLength).tolist()
}

const dataKeys = Object.keys(data);

for(let k of dataKeys) {
    for(let c of k) {
        let index = base.indexOf(c);
        data[k][index] += 1;
    }
}

const similarity = (v1, v2) => {
    let sumxx = 0 , sumxy = 0, sumyy = 0;

    for(let i = 0; i < v1.length; i++) {
        let x = v1[i];
        let y = v2[i];

        sumxx += x*x;
        sumxy += x*y;
        sumyy += y*y;
    }

    return sumxy / Math.sqrt(sumxx*sumyy);
}

const textToArray = (text) => {
    let textAsArray = nj.zeros(baseLength).tolist();
    for(c of text) {
        let index = base.indexOf(c);
        textAsArray[index] += 1
    }

    return textAsArray;
}

const find = (text) => {
    let result = [];

    let textAsArray = textToArray(text);

    for(let k of dataKeys) {
        let obj = { feature: k, value: similarity(data[k], textAsArray) };
        result.push(obj);
    }

    return result.sort((a, b) => {
        return a.value < b.value;
    });
}

console.log(find('cadastro'));
console.log("\n");
console.log(find('ativacao'));
console.log("\n");
console.log(find('asdhfu asd ofaisd foias dfj asdf asd fasd f'));
