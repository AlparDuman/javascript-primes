/*
    Copyright (C) 2025 Alpar Duman
    This file is part of javascript-primes.

    javascript-primes is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License version 3 as
    published by the Free Software Foundation.

    javascript-primes is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with javascript-primes. If not, see
    <https://github.com/AlparDuman/javascript-primes/blob/main/LICENSE>
    else <https://www.gnu.org/licenses/>.
*/

class primes {

    constructor() { }



    /* ---------- IS PRIME ---------- */



    isPrime(number) {
        return this.isPrimeTrialDivision(number);
    }

    isPrimeTrialDivision(number) {
        if (!Number.isInteger(number) || number < 2 || number != 2 && number % 2 == 0)
            return false;
        const sqrt = Math.floor(Math.sqrt(number));
        for (let divisor = 3; divisor <= sqrt; divisor += 2)
            if (number % divisor == 0)
                return false;
        return true;
    }

    isPrimeSieveEratosthenes(number) {
        if (!Number.isInteger(number) || number < 2 || number != 2 && number % 2 == 0)
            return false;
        const field = new Array(number + 1).fill(true), end = Math.floor(Math.sqrt(number));
        for (let candidate = 3; candidate <= end; candidate += 2)
            if (field[candidate])
                for (let multiple = candidate * 2; multiple <= number; multiple += candidate)
                    field[multiple] = false;
        return field[number];
    }/* every even candidate is unused -> field can be compressed */

    isPrimeBucketSieve(number) {
        if (!Number.isInteger(number) || number < 2)
            return false;
        const limit = Math.floor(Math.sqrt(number));
        const smallPrimes = this.getPrimesSieveEratosthenes(Math.floor(Math.sqrt(limit)));
        for (const prime of smallPrimes)
            if (number % prime == 0)
                return number == prime;
        return true;
    }



    /* ---------- COUNT PRIMES ---------- */



    countPrimes(range, start = 0) {
        return this.countPrimesTrialDivision(range, start);
    }

    countPrimesTrialDivision(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start))
            return 0;
        let count = start < 2 ? 0 : 1;
        const end = start + range;
        for (let number = start % 2 == 1 ? start : start++; number <= end; number += 2)
            if (this.isPrimeTrialDivision(number))
                count++;
        return count;
    }

    countPrimesSieveEratosthenes(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start))
            return 0;
        let count = start < 2 ? 0 : 1;
        const field = new Array(start + range + 1).fill(true), end = Math.floor(Math.sqrt(start + range));
        for (let candidate = 3; candidate <= end; candidate += 2)
            if (field[candidate]) {
                count++;
                for (let multiple = candidate * 2; multiple <= end; multiple += candidate)
                    field[multiple] = false;
            }
        return count;
    }/* every even candidate is unused -> field can be compressed */

    countPrimesBucketSieve(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start))
            return [];
        console.error('Not implemented yet');
        return [];
    }



    /* ---------- GET PRIMES ---------- */



    getPrimes(range, start = 0) {
        return this.getPrimesTrialDivision(range, start);
    }

    getPrimesTrialDivision(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start))
            return [];
        let primes = start < 2 ? [] : [2];
        const end = start + range;
        for (let number = start % 2 == 1 ? start : start++; number <= end; number += 2)
            if (this.isPrimeTrialDivision(number))
                primes.push(number);
        return primes;
    }

    getPrimesSieveEratosthenes(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start))
            return 0;
        let primes = start < 2 ? [] : [2];
        const field = new Array(start + range + 1).fill(true), end = Math.floor(Math.sqrt(start + range));
        for (let candidate = 3; candidate <= end; candidate += 2)
            if (field[candidate]) {
                primes.push(candidate);
                for (let multiple = candidate * 2; multiple <= end; multiple += candidate)
                    field[multiple] = false;
            }
        return primes;
    }/* every even candidate is unused -> field can be compressed */

    getPrimesBucketSieve(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start))
            return [];
        console.error('Not implemented yet');
        return [];
    }

}