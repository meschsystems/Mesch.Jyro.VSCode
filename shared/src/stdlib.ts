/**
 * Jyro Standard Library Function Registry
 * Contains all 57 built-in functions with their signatures and documentation
 */

import { JyroType } from './types';

export interface FunctionParameter {
    name: string;
    type: JyroType | JyroType[];
    optional?: boolean;
    description: string;
}

export interface FunctionSignature {
    name: string;
    category: string;
    parameters: FunctionParameter[];
    returnType: JyroType | JyroType[];
    description: string;
    examples?: string[];
}

/**
 * Complete standard library function registry
 */
export const STDLIB_FUNCTIONS: FunctionSignature[] = [
    // ===== String Functions (10) =====
    {
        name: 'Upper',
        category: 'String',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The string to convert' }
        ],
        returnType: JyroType.String,
        description: 'Converts a string to uppercase',
        examples: ['Upper("hello") # Returns "HELLO"']
    },
    {
        name: 'Lower',
        category: 'String',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The string to convert' }
        ],
        returnType: JyroType.String,
        description: 'Converts a string to lowercase',
        examples: ['Lower("HELLO") # Returns "hello"']
    },
    {
        name: 'Trim',
        category: 'String',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The string to trim' }
        ],
        returnType: JyroType.String,
        description: 'Removes leading and trailing whitespace from a string',
        examples: ['Trim("  hello  ") # Returns "hello"']
    },
    {
        name: 'Replace',
        category: 'String',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The input string' },
            { name: 'search', type: JyroType.String, description: 'The substring to search for' },
            { name: 'replace', type: JyroType.String, description: 'The replacement string' }
        ],
        returnType: JyroType.String,
        description: 'Replaces all occurrences of a substring with another string',
        examples: ['Replace("hello world", "world", "there") # Returns "hello there"']
    },
    {
        name: 'Contains',
        category: 'String',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The string to search in' },
            { name: 'search', type: JyroType.String, description: 'The substring to search for' }
        ],
        returnType: JyroType.Boolean,
        description: 'Checks if a string contains a substring',
        examples: ['Contains("hello", "ell") # Returns true']
    },
    {
        name: 'StartsWith',
        category: 'String',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The string to check' },
            { name: 'prefix', type: JyroType.String, description: 'The prefix to check for' }
        ],
        returnType: JyroType.Boolean,
        description: 'Checks if a string starts with a specific prefix',
        examples: ['StartsWith("hello", "hel") # Returns true']
    },
    {
        name: 'EndsWith',
        category: 'String',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The string to check' },
            { name: 'suffix', type: JyroType.String, description: 'The suffix to check for' }
        ],
        returnType: JyroType.Boolean,
        description: 'Checks if a string ends with a specific suffix',
        examples: ['EndsWith("hello", "lo") # Returns true']
    },
    {
        name: 'Split',
        category: 'String',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The string to split' },
            { name: 'delimiter', type: JyroType.String, description: 'The delimiter to split on' }
        ],
        returnType: JyroType.Array,
        description: 'Splits a string into an array using a delimiter',
        examples: ['Split("a,b,c", ",") # Returns ["a", "b", "c"]']
    },
    {
        name: 'Join',
        category: 'String',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to join' },
            { name: 'separator', type: JyroType.String, description: 'The separator between elements' }
        ],
        returnType: JyroType.String,
        description: 'Joins an array into a string with a separator',
        examples: ['Join(["a", "b", "c"], ",") # Returns "a,b,c"']
    },
    {
        name: 'ToNumber',
        category: 'String',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The string to convert' }
        ],
        returnType: JyroType.Number,
        description: 'Converts a string to a number',
        examples: ['ToNumber("42") # Returns 42', 'ToNumber("3.14") # Returns 3.14']
    },
    {
        name: 'RandomString',
        category: 'String',
        parameters: [
            { name: 'length', type: JyroType.Number, description: 'The length of the string to generate' },
            { name: 'characterSet', type: JyroType.String, description: 'The set of characters to select from (defaults to alphanumeric)', optional: true }
        ],
        returnType: JyroType.String,
        description: 'Generates a cryptographically secure random string of specified length from a character set',
        examples: ['RandomString(8) # Returns "aB3xK9mP"', 'RandomString(6, "0123456789") # Returns "483921"']
    },

    // ===== Array Functions (20) =====
    {
        name: 'Length',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to measure' }
        ],
        returnType: JyroType.Number,
        description: 'Returns the number of elements in an array',
        examples: ['Length([1, 2, 3]) # Returns 3']
    },
    {
        name: 'First',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to get first element from' }
        ],
        returnType: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array],
        description: 'Returns the first element of an array, or null if empty',
        examples: ['First([1, 2, 3]) # Returns 1']
    },
    {
        name: 'Last',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to get last element from' }
        ],
        returnType: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array],
        description: 'Returns the last element of an array, or null if empty',
        examples: ['Last([1, 2, 3]) # Returns 3']
    },
    {
        name: 'Append',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to append to' },
            { name: 'value', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'The value to append' }
        ],
        returnType: JyroType.Array,
        description: 'Adds a value to the end of an array and returns the modified array',
        examples: ['Append([1, 2], 3) # Returns [1, 2, 3]']
    },
    {
        name: 'Pop',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to remove from' }
        ],
        returnType: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array],
        description: 'Removes and returns the last element from an array',
        examples: ['Pop([1, 2, 3]) # Returns 3 and modifies array to [1, 2]']
    },
    {
        name: 'IndexOf',
        category: 'Array',
        parameters: [
            { name: 'source', type: [JyroType.String, JyroType.Array], description: 'The string or array to search' },
            { name: 'search', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'The value to find' }
        ],
        returnType: JyroType.Number,
        description: 'Returns the index of the first occurrence of a value in a string or array, or -1 if not found',
        examples: ['IndexOf("Hello", "ell") # Returns 1', 'IndexOf([1, 2, 3], 2) # Returns 1']
    },
    {
        name: 'Insert',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to insert into' },
            { name: 'index', type: JyroType.Number, description: 'The index to insert at' },
            { name: 'value', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'The value to insert' }
        ],
        returnType: JyroType.Array,
        description: 'Inserts a value at a specific index in an array',
        examples: ['Insert([1, 3], 1, 2) # Returns [1, 2, 3]']
    },
    {
        name: 'RemoveAt',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to remove from' },
            { name: 'index', type: JyroType.Number, description: 'The index to remove' }
        ],
        returnType: JyroType.Array,
        description: 'Removes the element at a specific index from an array',
        examples: ['RemoveAt([1, 2, 3], 1) # Returns [1, 3]']
    },
    {
        name: 'RemoveLast',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to remove from' }
        ],
        returnType: JyroType.Array,
        description: 'Removes the last element from an array and returns the modified array',
        examples: ['RemoveLast([1, 2, 3]) # Returns [1, 2]']
    },
    {
        name: 'Clear',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to clear' }
        ],
        returnType: JyroType.Array,
        description: 'Removes all elements from an array',
        examples: ['Clear([1, 2, 3]) # Returns []']
    },
    {
        name: 'Filter',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to filter' },
            { name: 'field', type: JyroType.String, description: 'The field name to check' },
            { name: 'operator', type: JyroType.String, description: 'The comparison operator (==, !=, <, >, <=, >=)' },
            { name: 'value', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean], description: 'The value to compare against' }
        ],
        returnType: JyroType.Array,
        description: 'Filters array elements based on a field condition',
        examples: ['Filter(Data.users, "age", ">=", 18) # Returns users 18 or older']
    },
    {
        name: 'CountIf',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to count' },
            { name: 'field', type: JyroType.String, description: 'The field name to check' },
            { name: 'operator', type: JyroType.String, description: 'The comparison operator' },
            { name: 'value', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean], description: 'The value to compare against' }
        ],
        returnType: JyroType.Number,
        description: 'Counts array elements that match a field condition',
        examples: ['CountIf(Data.users, "active", "==", true) # Returns count of active users']
    },
    {
        name: 'Sort',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to sort' }
        ],
        returnType: JyroType.Array,
        description: 'Sorts an array in ascending order (numbers or strings)',
        examples: ['Sort([3, 1, 2]) # Returns [1, 2, 3]']
    },
    {
        name: 'SortByField',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array of objects to sort' },
            { name: 'field', type: JyroType.String, description: 'The field name to sort by' },
            { name: 'direction', type: JyroType.String, description: 'Sort direction ("asc" or "desc")' }
        ],
        returnType: JyroType.Array,
        description: 'Sorts an array of objects by a specific field',
        examples: ['SortByField(Data.users, "age", "desc") # Sorts by age descending']
    },
    {
        name: 'Reverse',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to reverse' }
        ],
        returnType: JyroType.Array,
        description: 'Reverses the order of elements in an array',
        examples: ['Reverse([1, 2, 3]) # Returns [3, 2, 1]']
    },
    {
        name: 'MergeArrays',
        category: 'Array',
        parameters: [
            { name: 'arrays', type: JyroType.Array, description: 'Multiple arrays to merge (variadic)' }
        ],
        returnType: JyroType.Array,
        description: 'Merges multiple arrays into a single array, concatenating all elements in order',
        examples: ['MergeArrays([1, 2], [3, 4], [5]) # Returns [1, 2, 3, 4, 5]']
    },
    {
        name: 'Take',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The source array to take elements from' },
            { name: 'count', type: JyroType.Number, description: 'The number of elements to take from the beginning' }
        ],
        returnType: JyroType.Array,
        description: 'Returns a new array containing the first n elements from a source array without modifying the original',
        examples: ['Take([1, 2, 3, 4, 5], 3) # Returns [1, 2, 3]']
    },
    {
        name: 'GroupBy',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array of objects to group' },
            { name: 'fieldName', type: JyroType.String, description: 'The field name or nested path to group by (e.g., "status" or "address.city")' }
        ],
        returnType: JyroType.Object,
        description: 'Groups an array of objects by a specified field, returning an object where keys are the distinct field values and values are arrays of matching items',
        examples: ['GroupBy(orders, "status") # Returns { "pending": [...], "completed": [...] }']
    },
    {
        name: 'RandomChoice',
        category: 'Array',
        parameters: [
            { name: 'arr', type: JyroType.Array, description: 'The array to select a random element from' }
        ],
        returnType: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array],
        description: 'Selects a random element from an array, or returns null if empty',
        examples: ['RandomChoice(["red", "blue", "green"]) # Returns a random color']
    },

    // ===== Math Functions (9) =====
    {
        name: 'Min',
        category: 'Math',
        parameters: [
            { name: 'values', type: [JyroType.Number, JyroType.Array], description: 'Numbers to compare (variadic or single array)' }
        ],
        returnType: [JyroType.Number, JyroType.Null],
        description: 'Returns the minimum numeric value, or null if no numeric arguments provided',
        examples: ['Min(5, 10, 3) # Returns 3', 'Min([5, 10, 3]) # Returns 3']
    },
    {
        name: 'Max',
        category: 'Math',
        parameters: [
            { name: 'values', type: [JyroType.Number, JyroType.Array], description: 'Numbers to compare (variadic or single array)' }
        ],
        returnType: [JyroType.Number, JyroType.Null],
        description: 'Returns the maximum numeric value, or null if no numeric arguments provided',
        examples: ['Max(5, 10, 3) # Returns 10', 'Max([5, 10, 3]) # Returns 10']
    },
    {
        name: 'Sum',
        category: 'Math',
        parameters: [
            { name: 'values', type: [JyroType.Number, JyroType.Array], description: 'Numbers to sum (variadic or single array)' }
        ],
        returnType: [JyroType.Number, JyroType.Null],
        description: 'Returns the sum of all numeric values, or null if no numeric arguments provided',
        examples: ['Sum(1, 2, 3, 4) # Returns 10', 'Sum([1, 2, 3, 4]) # Returns 10']
    },
    {
        name: 'Average',
        category: 'Math',
        parameters: [
            { name: 'values', type: [JyroType.Number, JyroType.Array], description: 'Numbers to average (variadic or single array)' }
        ],
        returnType: [JyroType.Number, JyroType.Null],
        description: 'Returns the arithmetic mean of all numeric values, or null if no numeric arguments provided',
        examples: ['Average(10, 20, 30) # Returns 20', 'Average([10, 20, 30]) # Returns 20']
    },
    {
        name: 'Median',
        category: 'Math',
        parameters: [
            { name: 'values', type: [JyroType.Number, JyroType.Array], description: 'Numbers to find median of (variadic or single array)' }
        ],
        returnType: [JyroType.Number, JyroType.Null],
        description: 'Returns the median (middle value) of all numeric values, or null if no numeric arguments provided',
        examples: ['Median(1, 3, 5) # Returns 3', 'Median([1, 3, 5, 7]) # Returns 4']
    },
    {
        name: 'Mode',
        category: 'Math',
        parameters: [
            { name: 'values', type: [JyroType.Number, JyroType.Array], description: 'Numbers to find mode of (variadic or single array)' }
        ],
        returnType: [JyroType.Number, JyroType.Null],
        description: 'Returns the most frequently occurring value, or null if no numeric arguments provided',
        examples: ['Mode(1, 2, 2, 3) # Returns 2', 'Mode([1, 2, 2, 3, 3, 3]) # Returns 3']
    },
    {
        name: 'Abs',
        category: 'Math',
        parameters: [
            { name: 'num', type: JyroType.Number, description: 'The number' }
        ],
        returnType: JyroType.Number,
        description: 'Returns the absolute value of a number',
        examples: ['Abs(-5) # Returns 5']
    },
    {
        name: 'Round',
        category: 'Math',
        parameters: [
            { name: 'num', type: JyroType.Number, description: 'The number to round' },
            { name: 'decimals', type: JyroType.Number, description: 'Number of decimal places' }
        ],
        returnType: JyroType.Number,
        description: 'Rounds a number to a specified number of decimal places',
        examples: ['Round(3.14159, 2) # Returns 3.14']
    },
    {
        name: 'RandomInt',
        category: 'Math',
        parameters: [
            { name: 'min', type: JyroType.Number, description: 'The inclusive lower bound (or exclusive upper bound if only one argument)', optional: true },
            { name: 'max', type: JyroType.Number, description: 'The exclusive upper bound' }
        ],
        returnType: JyroType.Number,
        description: 'Generates a cryptographically secure random integer. RandomInt(max) returns [0, max). RandomInt(min, max) returns [min, max).',
        examples: ['RandomInt(10) # Returns 0-9', 'RandomInt(1, 7) # Returns 1-6 (dice roll)']
    },

    // ===== Date/Time Functions (7) =====
    {
        name: 'Now',
        category: 'DateTime',
        parameters: [],
        returnType: JyroType.String,
        description: 'Returns the current UTC date and time in ISO 8601 format',
        examples: ['Now() # Returns "2025-11-17T12:00:00Z"']
    },
    {
        name: 'Today',
        category: 'DateTime',
        parameters: [],
        returnType: JyroType.String,
        description: 'Returns the current UTC date at midnight in ISO 8601 format',
        examples: ['Today() # Returns "2025-11-17T00:00:00Z"']
    },
    {
        name: 'ParseDate',
        category: 'DateTime',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The date string to parse' }
        ],
        returnType: JyroType.String,
        description: 'Parses a date string and returns it in ISO 8601 format',
        examples: ['ParseDate("2025-11-17") # Returns ISO 8601 date']
    },
    {
        name: 'FormatDate',
        category: 'DateTime',
        parameters: [
            { name: 'date', type: JyroType.String, description: 'The date in ISO format' },
            { name: 'format', type: JyroType.String, description: '.NET date format pattern' }
        ],
        returnType: JyroType.String,
        description: 'Formats a date using a .NET format pattern',
        examples: ['FormatDate(Now(), "yyyy-MM-dd") # Returns "2025-11-17"']
    },
    {
        name: 'DateAdd',
        category: 'DateTime',
        parameters: [
            { name: 'date', type: JyroType.String, description: 'The date in ISO format' },
            { name: 'amount', type: JyroType.Number, description: 'Amount to add (can be negative)' },
            { name: 'unit', type: JyroType.String, description: 'Unit: days, weeks, months, years, hours, minutes, seconds' }
        ],
        returnType: JyroType.String,
        description: 'Adds a time interval to a date',
        examples: ['DateAdd(Today(), 7, "days") # Adds 7 days']
    },
    {
        name: 'DateDiff',
        category: 'DateTime',
        parameters: [
            { name: 'endDate', type: JyroType.String, description: 'The end date' },
            { name: 'startDate', type: JyroType.String, description: 'The start date' },
            { name: 'unit', type: JyroType.String, description: 'Unit to return difference in' }
        ],
        returnType: JyroType.Number,
        description: 'Calculates the difference between two dates',
        examples: ['DateDiff("2025-12-31", "2025-01-01", "days") # Returns 364']
    },
    {
        name: 'DatePart',
        category: 'DateTime',
        parameters: [
            { name: 'date', type: JyroType.String, description: 'The date in ISO format' },
            { name: 'part', type: JyroType.String, description: 'Part: year, month, day, hour, minute, second, dayofweek, dayofyear' }
        ],
        returnType: JyroType.Number,
        description: 'Extracts a specific part from a date',
        examples: ['DatePart(Now(), "year") # Returns 2025']
    },

    // ===== Utility Functions (11) =====
    {
        name: 'TypeOf',
        category: 'Utility',
        parameters: [
            { name: 'value', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'The value to check' }
        ],
        returnType: JyroType.String,
        description: 'Returns the type name of a value',
        examples: ['TypeOf(42) # Returns "number"', 'TypeOf([1, 2]) # Returns "array"']
    },
    {
        name: 'IsNull',
        category: 'Utility',
        parameters: [
            { name: 'value', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'The value to check' }
        ],
        returnType: JyroType.Boolean,
        description: 'Returns true if the value is null',
        examples: ['IsNull(null) # Returns true']
    },
    {
        name: 'Exists',
        category: 'Utility',
        parameters: [
            { name: 'value', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'The value to check' }
        ],
        returnType: JyroType.Boolean,
        description: 'Returns true if the value is not null',
        examples: ['Exists(Data.user) # Returns true if user exists']
    },
    {
        name: 'Equal',
        category: 'Utility',
        parameters: [
            { name: 'a', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'First value' },
            { name: 'b', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'Second value' }
        ],
        returnType: JyroType.Boolean,
        description: 'Performs deep equality comparison',
        examples: ['Equal([1, 2], [1, 2]) # Returns true']
    },
    {
        name: 'NotEqual',
        category: 'Utility',
        parameters: [
            { name: 'a', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'First value' },
            { name: 'b', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'Second value' }
        ],
        returnType: JyroType.Boolean,
        description: 'Returns true if values are not deeply equal',
        examples: ['NotEqual([1, 2], [1, 3]) # Returns true']
    },
    {
        name: 'Base64Encode',
        category: 'Utility',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The string to encode' }
        ],
        returnType: JyroType.String,
        description: 'Encodes a string to Base64',
        examples: ['Base64Encode("hello") # Returns "aGVsbG8="']
    },
    {
        name: 'Base64Decode',
        category: 'Utility',
        parameters: [
            { name: 'str', type: JyroType.String, description: 'The Base64 string to decode' }
        ],
        returnType: JyroType.String,
        description: 'Decodes a Base64 string',
        examples: ['Base64Decode("aGVsbG8=") # Returns "hello"']
    },
    {
        name: 'NewGuid',
        category: 'Utility',
        parameters: [],
        returnType: JyroType.String,
        description: 'Generates a new GUID string',
        examples: ['NewGuid() # Returns "a1b2c3d4-e5f6-7890-abcd-ef1234567890"']
    },
    {
        name: 'CallScript',
        category: 'Utility',
        parameters: [
            { name: 'source', type: JyroType.String, description: 'The script source code' },
            { name: 'data', type: JyroType.Object, description: 'The data object to pass' }
        ],
        returnType: JyroType.Object,
        description: 'Executes a child script with cycle detection',
        examples: ['CallScript("Data.result = Data.value * 2", { "value": 5 })']
    },
    {
        name: 'Keys',
        category: 'Utility',
        parameters: [
            { name: 'obj', type: JyroType.Object, description: 'The object to extract keys from' }
        ],
        returnType: JyroType.Array,
        description: 'Returns an array containing all property names (keys) of an object',
        examples: ['Keys({"name": "Alice", "age": 30}) # Returns ["name", "age"]']
    },
    {
        name: 'InvokeRestMethod',
        category: 'Utility',
        parameters: [
            { name: 'url', type: JyroType.String, description: 'The URL to call' },
            { name: 'method', type: JyroType.String, description: 'HTTP method (GET, POST, PUT, DELETE). Defaults to GET', optional: true },
            { name: 'headers', type: JyroType.Object, description: 'Request headers as key-value pairs', optional: true },
            { name: 'body', type: [JyroType.Null, JyroType.Number, JyroType.String, JyroType.Boolean, JyroType.Object, JyroType.Array], description: 'Request body (automatically JSON-serialized)', optional: true }
        ],
        returnType: JyroType.Object,
        description: 'Executes HTTP REST API calls. Returns object with statusCode, isSuccessStatusCode, content, headers. Must be enabled via .WithRestApi()',
        examples: ['InvokeRestMethod("https://api.example.com/users", "GET")', 'InvokeRestMethod("https://api.example.com/users", "POST", {"Content-Type": "application/json"}, newUser)']
    }
];

/**
 * Get function signature by name
 */
export function getFunctionSignature(name: string): FunctionSignature | undefined {
    return STDLIB_FUNCTIONS.find(f => f.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get all function names
 */
export function getAllFunctionNames(): string[] {
    return STDLIB_FUNCTIONS.map(f => f.name);
}

/**
 * Get functions by category
 */
export function getFunctionsByCategory(category: string): FunctionSignature[] {
    return STDLIB_FUNCTIONS.filter(f => f.category === category);
}

/**
 * All function categories
 */
export const FUNCTION_CATEGORIES = ['String', 'Array', 'Math', 'DateTime', 'Utility'];
