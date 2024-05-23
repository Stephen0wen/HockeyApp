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

describe("Tests for createLeagueTableRows", () => {
    test("Creates correct league table for multiple divisions and multiple games per team", () => {
        const input = [
            {
                team_name: "Leicester Wolves",
                scored: 4,
                conceded: 0,
                division: "2",
            },
            {
                team_name: "Leicester Wolves",
                scored: 2,
                conceded: 1,
                division: "2",
            },
            {
                team_name: "Leicester Oldbags",
                scored: 2,
                conceded: 2,
                division: "2",
            },

            { team_name: "Welford", scored: 2, conceded: 0, division: "1" },
            { team_name: "Welford", scored: 1, conceded: 3, division: "1" },
            {
                team_name: "Sutton Bonington",
                scored: 3,
                conceded: 2,
                division: "1",
            },
            {
                team_name: "Sutton Bonington",
                scored: 0,
                conceded: 2,
                division: "1",
            },
        ];
        const expected = {
            1: [
                {
                    team_name: "Welford",
                    points: 3,
                    wins: 1,
                    draws: 0,
                    losses: 1,
                    goals_for: 3,
                    goals_against: 3,
                    goal_difference: 0,
                },
                {
                    team_name: "Sutton Bonington",
                    points: 3,
                    wins: 1,
                    draws: 0,
                    losses: 1,
                    goals_for: 3,
                    goals_against: 4,
                    goal_difference: -1,
                },
            ],
            2: [
                {
                    team_name: "Leicester Wolves",
                    points: 6,
                    wins: 2,
                    draws: 0,
                    losses: 0,
                    goals_for: 6,
                    goals_against: 1,
                    goal_difference: 5,
                },
                {
                    team_name: "Leicester Oldbags",
                    points: 1,
                    wins: 0,
                    draws: 1,
                    losses: 0,
                    goals_for: 2,
                    goals_against: 2,
                    goal_difference: 0,
                },
            ],
        };

        const actual = createLeagueTables(input);
        expect(actual).toEqual(expected);
    });
    test("Tests for larger dataset", () => {
        const input = [
            {
                team_name: "Leicester Wolves",
                scored: 4,
                conceded: 0,
                division: "2",
            },
            {
                team_name: "Leicester Wolves",
                scored: 6,
                conceded: 4,
                division: "2",
            },
            {
                team_name: "Leicester Wolves",
                scored: 3,
                conceded: 0,
                division: "2",
            },
            {
                team_name: "Leicester Wolves",
                scored: 2,
                conceded: 1,
                division: "2",
            },
            {
                team_name: "Leicester Oldbags",
                scored: 0,
                conceded: 1,
                division: "2",
            },
            {
                team_name: "Leicester Oldbags",
                scored: 3,
                conceded: 1,
                division: "2",
            },
            {
                team_name: "Leicester Oldbags",
                scored: 2,
                conceded: 2,
                division: "2",
            },
            { team_name: "Welford", scored: 1, conceded: 0, division: "1" },
            { team_name: "Welford", scored: 2, conceded: 0, division: "1" },
            { team_name: "Welford", scored: 1, conceded: 3, division: "1" },
            {
                team_name: "Sutton Bonington",
                scored: 3,
                conceded: 2,
                division: "1",
            },
            {
                team_name: "Sutton Bonington",
                scored: 0,
                conceded: 2,
                division: "1",
            },
            { team_name: "Phoenix", scored: 1, conceded: 4, division: "2" },
            { team_name: "Phoenix", scored: 1, conceded: 2, division: "2" },
            { team_name: "Phoenix", scored: 4, conceded: 2, division: "2" },
            { team_name: "Panthers", scored: 1, conceded: 1, division: "2" },
            { team_name: "Panthers", scored: 3, conceded: 2, division: "2" },
            {
                team_name: "Leicester Medics",
                scored: 2,
                conceded: 4,
                division: "2",
            },
            { team_name: "Rangers", scored: 5, conceded: 4, division: "2" },
            { team_name: "Syston Town", scored: 0, conceded: 0, division: "2" },
            {
                team_name: "Leicester Police",
                scored: 2,
                conceded: 0,
                division: "2",
            },
            {
                team_name: "Leicester Oldbags",
                scored: 1,
                conceded: 2,
                division: "2",
            },
            {
                team_name: "South Wigston Tigers",
                scored: 4,
                conceded: 1,
                division: "2",
            },
            {
                team_name: "South Wigston Tigers",
                scored: 2,
                conceded: 1,
                division: "2",
            },
            {
                team_name: "South Wigston Tigers",
                scored: 2,
                conceded: 4,
                division: "2",
            },
            {
                team_name: "Sutton Bonington",
                scored: 3,
                conceded: 1,
                division: "1",
            },
            {
                team_name: "Leicester Thursday",
                scored: 2,
                conceded: 0,
                division: "1",
            },
            {
                team_name: "Leicester Thursday",
                scored: 0,
                conceded: 2,
                division: "1",
            },
            {
                team_name: "Rutland Horseshoes",
                scored: 2,
                conceded: 3,
                division: "1",
            },
            {
                team_name: "Rutland Horseshoes",
                scored: 0,
                conceded: 1,
                division: "1",
            },
            { team_name: "Panthers", scored: 2, conceded: 2, division: "2" },
            {
                team_name: "Leicester Medics",
                scored: 1,
                conceded: 3,
                division: "2",
            },
            {
                team_name: "Leicester Medics",
                scored: 2,
                conceded: 3,
                division: "2",
            },
            {
                team_name: "LoughBorough Carillon A",
                scored: 1,
                conceded: 0,
                division: "2",
            },
            {
                team_name: "LoughBorough Carillon A",
                scored: 4,
                conceded: 2,
                division: "2",
            },
            {
                team_name: "LoughBorough Carillon A",
                scored: 1,
                conceded: 1,
                division: "2",
            },
            { team_name: "Rangers", scored: 0, conceded: 2, division: "2" },
            { team_name: "Rangers", scored: 0, conceded: 4, division: "2" },
            { team_name: "Syston Town", scored: 4, conceded: 5, division: "2" },
            { team_name: "Syston Town", scored: 4, conceded: 6, division: "2" },
            {
                team_name: "Leicester Police",
                scored: 0,
                conceded: 0,
                division: "2",
            },
            {
                team_name: "Leicester Police",
                scored: 0,
                conceded: 3,
                division: "2",
            },
        ];

        const actual = createLeagueTables(input);
        console.log(actual);
        // You can see that it is working by looking at this console log
        expect(actual).not.toBeUndefined();
    });
});
