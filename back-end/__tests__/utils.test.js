const {
    toNestedArr,
    createLookup,
    replaceProperty,
    createLeagueTables,
} = require("../db/utils.js");
const { describe, test } = require("@jest/globals");

describe("Tests for toNestedArr", () => {
    test("Should return a new array", () => {
        const input = [
            {
                shop_name: "Dibbert Inc",
                owner: "Aaliyah",
                slogan: "Implemented motivating customer loyalty",
            },
            {
                shop_name: "Feeney Inc",
                owner: "Elta",
                slogan: "Function-based intermediate secured line",
            },
            {
                shop_name: "Kshlerin, Koch and Monahan",
                owner: "Daphney",
                slogan: "Persevering web-enabled hardware",
            },
        ];
        const actual = toNestedArr(input);
        expect(actual).not.toBe(input);
    });
    test("Should not mutate input array or its objects", () => {
        const input = [
            {
                shop_name: "Dibbert Inc",
                owner: "Aaliyah",
                slogan: "Implemented motivating customer loyalty",
            },
            {
                shop_name: "Feeney Inc",
                owner: "Elta",
                slogan: "Function-based intermediate secured line",
            },
            {
                shop_name: "Kshlerin, Koch and Monahan",
                owner: "Daphney",
                slogan: "Persevering web-enabled hardware",
            },
        ];
        const inputCopy = [
            {
                shop_name: "Dibbert Inc",
                owner: "Aaliyah",
                slogan: "Implemented motivating customer loyalty",
            },
            {
                shop_name: "Feeney Inc",
                owner: "Elta",
                slogan: "Function-based intermediate secured line",
            },
            {
                shop_name: "Kshlerin, Koch and Monahan",
                owner: "Daphney",
                slogan: "Persevering web-enabled hardware",
            },
        ];
        toNestedArr(input);
        expect(input).toEqual(inputCopy);
    });
    test("Should return an empty array when passed an empty array", () => {
        const input = [];
        const expected = [];
        const actual = toNestedArr(input);
        expect(actual).toEqual(expected);
    });
    test("Should the correct single nested array when passed an array containing a single object", () => {
        const input = [
            {
                shop_name: "Dibbert Inc",
                owner: "Aaliyah",
                slogan: "Implemented motivating customer loyalty",
            },
        ];
        const expected = [
            [
                "Dibbert Inc",
                "Aaliyah",
                "Implemented motivating customer loyalty",
            ],
        ];
        const actual = toNestedArr(input);
        expect(actual).toEqual(expected);
    });
    test("Should the correct nested arrays when passed an array containing a multiple objects", () => {
        const input = [
            {
                shop_name: "Dibbert Inc",
                owner: "Aaliyah",
                slogan: "Implemented motivating customer loyalty",
            },
            {
                shop_name: "Feeney Inc",
                owner: "Elta",
                slogan: "Function-based intermediate secured line",
            },
            {
                shop_name: "Kshlerin, Koch and Monahan",
                owner: "Daphney",
                slogan: "Persevering web-enabled hardware",
            },
        ];
        const expected = [
            [
                "Dibbert Inc",
                "Aaliyah",
                "Implemented motivating customer loyalty",
            ],
            ["Feeney Inc", "Elta", "Function-based intermediate secured line"],
            [
                "Kshlerin, Koch and Monahan",
                "Daphney",
                "Persevering web-enabled hardware",
            ],
        ];
        const actual = toNestedArr(input);
        expect(actual).toEqual(expected);
    });
});

describe("Tests for createLookup", () => {
    test("Should not mutate input array or its objects", () => {
        const input = [
            {
                shop_id: 1,
                shop_name: "Dibbert Inc",
                owner: "Aaliyah",
                slogan: "Implemented motivating customer loyalty",
            },
            {
                shop_id: 2,
                shop_name: "Feeney Inc",
                owner: "Elta",
                slogan: "Function-based intermediate secured line",
            },
            {
                shop_id: 3,
                shop_name: "Kshlerin, Koch and Monahan",
                owner: "Daphney",
                slogan: "Persevering web-enabled hardware",
            },
        ];
        const copyInput = [
            {
                shop_id: 1,
                shop_name: "Dibbert Inc",
                owner: "Aaliyah",
                slogan: "Implemented motivating customer loyalty",
            },
            {
                shop_id: 2,
                shop_name: "Feeney Inc",
                owner: "Elta",
                slogan: "Function-based intermediate secured line",
            },
            {
                shop_id: 3,
                shop_name: "Kshlerin, Koch and Monahan",
                owner: "Daphney",
                slogan: "Persevering web-enabled hardware",
            },
        ];
        createLookup(input, "shop_name", "shop_id");
        expect(input).toEqual(copyInput);
    });
    test("Should return an empty object when passed an empty array", () => {
        expect(createLookup([], "shop_name", "shop_id")).toEqual({});
    });
    test("Should return the correct lookup object when passed an array containing a single object", () => {
        const input = [
            {
                shop_id: 1,
                shop_name: "Dibbert Inc",
                owner: "Aaliyah",
                slogan: "Implemented motivating customer loyalty",
            },
        ];
        const expected = { "Dibbert Inc": 1 };
        expect(createLookup(input, "shop_name", "shop_id")).toEqual(expected);
    });
    test("Should return the correct lookup object when passed an array containing multiple objects", () => {
        const input = [
            {
                shop_id: 1,
                shop_name: "Dibbert Inc",
                owner: "Aaliyah",
                slogan: "Implemented motivating customer loyalty",
            },
            {
                shop_id: 2,
                shop_name: "Feeney Inc",
                owner: "Elta",
                slogan: "Function-based intermediate secured line",
            },
            {
                shop_id: 3,
                shop_name: "Kshlerin, Koch and Monahan",
                owner: "Daphney",
                slogan: "Persevering web-enabled hardware",
            },
        ];

        const expected = {
            "Dibbert Inc": 1,
            "Feeney Inc": 2,
            "Kshlerin, Koch and Monahan": 3,
        };
        const actual = createLookup(input, "shop_name", "shop_id");
        expect(actual).toEqual(expected);
    });
});

describe("Tests for replaceProperty", () => {
    let testLookup;
    beforeEach(() => {
        testLookup = {
            "Hand - Considine": 1,
            "Bradtke - Harris": 2,
            "Tillman - Hickle": 3,
        };
    });
    test("Should not mutate the input array or its objects", () => {
        const input = [
            {
                treasure_name: "Implemented Sleek Steel Computer",
                colour: "blue",
                age: 195,
                cost_at_auction: "835.06",
                shop: "Hand - Considine",
            },
            {
                treasure_name: "Up-sized Awesome Soft Pizza",
                colour: "turquoise",
                age: 47,
                cost_at_auction: "221.70",
                shop: "Bradtke - Harris",
            },
            {
                treasure_name: "Pre-emptive Licensed Frozen Bacon",
                colour: "azure",
                age: 249,
                cost_at_auction: "380.50",
                shop: "Tillman - Hickle",
            },
        ];
        const expected = [
            {
                treasure_name: "Implemented Sleek Steel Computer",
                colour: "blue",
                age: 195,
                cost_at_auction: "835.06",
                shop: "Hand - Considine",
            },
            {
                treasure_name: "Up-sized Awesome Soft Pizza",
                colour: "turquoise",
                age: 47,
                cost_at_auction: "221.70",
                shop: "Bradtke - Harris",
            },
            {
                treasure_name: "Pre-emptive Licensed Frozen Bacon",
                colour: "azure",
                age: 249,
                cost_at_auction: "380.50",
                shop: "Tillman - Hickle",
            },
        ];
        replaceProperty(input, "shop", "shop_id", testLookup);
        expect(input).toEqual(expected);
    });
    test("Should not mutate the lookup array", () => {
        const input = [
            {
                treasure_name: "Implemented Sleek Steel Computer",
                colour: "blue",
                age: 195,
                cost_at_auction: "835.06",
                shop: "Hand - Considine",
            },
            {
                treasure_name: "Up-sized Awesome Soft Pizza",
                colour: "turquoise",
                age: 47,
                cost_at_auction: "221.70",
                shop: "Bradtke - Harris",
            },
            {
                treasure_name: "Pre-emptive Licensed Frozen Bacon",
                colour: "azure",
                age: 249,
                cost_at_auction: "380.50",
                shop: "Tillman - Hickle",
            },
        ];
        const lookup = {
            "Hand - Considine": 1,
            "Bradtke - Harris": 2,
            "Tillman - Hickle": 3,
        };
        const copyLookup = {
            "Hand - Considine": 1,
            "Bradtke - Harris": 2,
            "Tillman - Hickle": 3,
        };
        replaceProperty(input, "shop", "shop_id", lookup);
        expect(lookup).toEqual(copyLookup);
    });
    test("Should return a new array", () => {
        const input = [
            {
                treasure_name: "Implemented Sleek Steel Computer",
                colour: "blue",
                age: 195,
                cost_at_auction: "835.06",
                shop: "Hand - Considine",
            },
            {
                treasure_name: "Up-sized Awesome Soft Pizza",
                colour: "turquoise",
                age: 47,
                cost_at_auction: "221.70",
                shop: "Bradtke - Harris",
            },
            {
                treasure_name: "Pre-emptive Licensed Frozen Bacon",
                colour: "azure",
                age: 249,
                cost_at_auction: "380.50",
                shop: "Tillman - Hickle",
            },
        ];

        const actual = replaceProperty(
            input,
            "shop_name",
            "shop_id",
            testLookup
        );
        expect(actual).not.toBe(input);
    });
    test("Should return an array of new objects", () => {
        const input = [
            {
                treasure_name: "Implemented Sleek Steel Computer",
                colour: "blue",
                age: 195,
                cost_at_auction: "835.06",
                shop: "Hand - Considine",
            },
            {
                treasure_name: "Up-sized Awesome Soft Pizza",
                colour: "turquoise",
                age: 47,
                cost_at_auction: "221.70",
                shop: "Bradtke - Harris",
            },
            {
                treasure_name: "Pre-emptive Licensed Frozen Bacon",
                colour: "azure",
                age: 249,
                cost_at_auction: "380.50",
                shop: "Tillman - Hickle",
            },
        ];

        const actual = replaceProperty(
            input,
            "shop_name",
            "shop_id",
            testLookup
        );

        expect(input[0]).not.toBe(actual[0]);
        expect(input[1]).not.toBe(actual[1]);
        expect(input[2]).not.toBe(actual[2]);
    });
    test("Should return an empty array when passed an empty array", () => {
        const input = [];
        const expected = [];
        const actual = replaceProperty(
            input,
            "shop_name",
            "shop_id",
            testLookup
        );
        expect(actual).toEqual(expected);
    });
    test("Should return the correct array when passed an array containing a single object", () => {
        const input = [
            {
                treasure_name: "Implemented Sleek Steel Computer",
                colour: "blue",
                age: 195,
                cost_at_auction: "835.06",
                shop: "Hand - Considine",
            },
        ];
        const expected = [
            {
                treasure_name: "Implemented Sleek Steel Computer",
                colour: "blue",
                age: 195,
                cost_at_auction: "835.06",
                shop_id: 1,
            },
        ];
        const actual = replaceProperty(input, "shop", "shop_id", testLookup);
        expect(actual).toEqual(expected);
    });
    test("Should return the correct array when passed an array containing multiple objects", () => {
        const input = [
            {
                treasure_name: "Implemented Sleek Steel Computer",
                colour: "blue",
                age: 195,
                cost_at_auction: "835.06",
                shop: "Hand - Considine",
            },
            {
                treasure_name: "Up-sized Awesome Soft Pizza",
                colour: "turquoise",
                age: 47,
                cost_at_auction: "221.70",
                shop: "Bradtke - Harris",
            },
            {
                treasure_name: "Pre-emptive Licensed Frozen Bacon",
                colour: "azure",
                age: 249,
                cost_at_auction: "380.50",
                shop: "Tillman - Hickle",
            },
        ];
        const expected = [
            {
                treasure_name: "Implemented Sleek Steel Computer",
                colour: "blue",
                age: 195,
                cost_at_auction: "835.06",
                shop_id: 1,
            },
            {
                treasure_name: "Up-sized Awesome Soft Pizza",
                colour: "turquoise",
                age: 47,
                cost_at_auction: "221.70",
                shop_id: 2,
            },
            {
                treasure_name: "Pre-emptive Licensed Frozen Bacon",
                colour: "azure",
                age: 249,
                cost_at_auction: "380.50",
                shop_id: 3,
            },
        ];
        const actual = replaceProperty(input, "shop", "shop_id", testLookup);
        expect(actual).toEqual(expected);
    });
});
