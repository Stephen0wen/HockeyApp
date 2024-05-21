const treasures = require("./data/dev-data/treasures");

exports.toNestedArr = (objArr) => {
    return objArr.map((obj) => {
        return Object.values(obj);
    });
};

exports.createLookup = (objArr, lookupKey, lookupValue) => {
    const lookup = {};
    objArr.forEach((obj) => {
        lookup[obj[lookupKey]] = obj[lookupValue];
    });
    return lookup;
};

exports.replaceProperty = (objArr, property, newProperty, lookup) => {
    return objArr.map((obj) => {
        const newObj = {};
        Object.keys(obj).forEach((key) => {
            if (key !== property) {
                newObj[key] = obj[key];
            }
        });
        newObj[newProperty] = lookup[obj[property]];
        return newObj;
    });
};

exports.compareMoney = (a, b) => {
    const first = Number(a.slice(1).replace(",", ""));
    const second = Number(b.slice(1).replace(",", ""));

    return first - second;
};
