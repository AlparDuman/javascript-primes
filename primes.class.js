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

class Primes {

    constructor() { }



    /* ---------- IS PRIME ---------- */



    isPrime(number) {
        return this.isPrimeTrialDivision(number);
    }

    isPrimeTrialDivision(number) {
        if (!Number.isInteger(number) || number < 2 || number != 2 && number % 2 == 0)
            return false;
        const limit = Math.floor(Math.sqrt(number));
        for (let divisor = 3; divisor <= limit; divisor += 2)
            if (number % divisor == 0)
                return false;
        return true;
    }

    isPrimeSieveEratosthenes(number) {
        return this.getPrimesSieveEratosthenes(number, number).includes(number);
    }

    isPrimeBucketSieve(number) {
        if (!Number.isInteger(number) || number < 2 || number != 2 && number % 2 == 0)
            return false;
        const smallPrimes = this.getPrimesSieveEratosthenes(Math.floor(Math.sqrt(number)));
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
        return this.getPrimesTrialDivision(range, start).length;
    }

    countPrimesSieveEratosthenes(range, start = 0) {
        return this.getPrimesSieveEratosthenes(range, start).length;
    }

    countPrimesBucketSieve(range, start = 0) {
        return this.getPrimesBucketSieve(range, start).length;
    }



    /* ---------- GET PRIMES ---------- */



    getPrimes(range, start = 0) {
        return this.getPrimesTrialDivision(range, start);
    }

    getPrimesTrialDivision(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start) || start + range < 2)
            return [];
        const end = start + range;
        let primes = start <= 2 && end >= 2 ? [2] : [];
        for (let number = start % 2 == 1 ? start : ++start; number <= end; number += 2)
            if (this.isPrimeTrialDivision(number))
                primes.push(number);
        return primes;
    }

    getPrimesSieveEratosthenes(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start) || start + range < 2)
            return [];
        const end = start + range;
        const field = new Array(end + 1).fill(true);
        let primes = start <= 2 && end >= 2 ? [2] : [];
        for (let candidate = 3; candidate <= end; candidate += 2)
            if (field[candidate]) {
                if (candidate >= start)
                    primes.push(candidate);
                for (let multiple = candidate * 2; multiple <= end; multiple += candidate)
                    field[multiple] = false;
            }
        return primes;
    }/* every even candidate is unused -> field can be compressed */

    getPrimesBucketSieve(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start) || start + range < 2)
            return [];
        console.error('Not implemented yet');
        return [];



    static BitArray = class {
        #mask;
        #field;
        #size;

        constructor(size) {
            if (!Number.isInteger(size) || size < 1)
                throw new Error(`Integer above 1 expected but ${size} of type ${typeof size} given`);
            this.#mask = [0, 0x1, 0, 0, 0, 0, 0, 0x2, 0, 0, 0, 0x4, 0, 0x8, 0, 0, 0, 0x10, 0, 0x20, 0, 0, 0, 0x40, 0, 0, 0, 0, 0, 0x80];
            this.#field = new Uint8Array(Math.floor(size / 30) + 1);
            this.#size = size;
        }

        set(number, do_checks = true) {
            if (do_checks) {
                if (!Number.isInteger(number))
                    throw new Error(`Integer expected but ${typeof size} given`);
                if (number % 2 == 0 || number < 0 || number > this.#size)
                    return;
            }
            const mask = this.#mask[number % 30];
            if (mask != 0)
                this.#field[Math.floor(number / 30)] |= mask;
        }

        get(number, do_checks = true) {
            if (do_checks) {
                if (!Number.isInteger(number))
                    throw new Error(`Integer expected but ${typeof size} given`);
                if (number % 2 == 0 || number < 7 || number > this.#size)
                    return false;
            }
            const mask = this.#mask[number % 30];
            if (mask != 0)
                return (this.#field[Math.floor(number / 30)] & mask) == 0;
            return false;
        }
    }
    }



    /* ---------- SELF TEST ---------- */



    selfTest() {
        const start = parseInt(Math.random() * 1e4);
        const range = parseInt(Math.random() * 1e4);
        const end = start + range;

        let results = {
            trialDivision: {
                is: [],
                count: 0,
                get: []
            },
            sieveEratosthenes: {
                is: [],
                count: 0,
                get: []
            },
            bucketSieve: {
                is: [],
                count: 0,
                get: []
            }
        };

        console.log('[primes] testing methods of trial division ...');
        console.time('exec');
        for (let i = start; i < end; i++)
            results['trialDivision']['is'].push(this.isPrimeTrialDivision(i));
        results['trialDivision']['count'] = this.countPrimesTrialDivision(range, start);
        results['trialDivision']['get'] = this.getPrimesTrialDivision(range, start);
        console.timeEnd('exec');

        console.log('[primes] testing methods of sieve eratosthenes ...');
        console.time('exec');
        for (let i = start; i < end; i++)
            results['sieveEratosthenes']['is'].push(this.isPrimeSieveEratosthenes(i));
        results['sieveEratosthenes']['count'] = this.countPrimesSieveEratosthenes(range, start);
        results['sieveEratosthenes']['get'] = this.getPrimesSieveEratosthenes(range, start);
        console.timeEnd('exec');

        console.log('[primes] testing methods of bucket sieve ...');
        console.time('exec');
        for (let i = start; i < end; i++)
            results['bucketSieve']['is'].push(this.isPrimeBucketSieve(i));
        results['bucketSieve']['count'] = this.countPrimesBucketSieve(range, start);
        results['bucketSieve']['get'] = this.getPrimesBucketSieve(range, start);
        console.timeEnd('exec');

        console.log('[primes] testing results:', results);

        if (results['trialDivision']['count'] !== results['sieveEratosthenes']['count'] || results['sieveEratosthenes']['count'] !== results['bucketSieve']['count'])
            console.error(`[primes] trialDivision:${results['trialDivision']['count']}, sieveEratosthenes:${results['sieveEratosthenes']['count']}, bucketSieve:${results['bucketSieve']['count']}`);

        for (let key in { is: null, get: null })
            for (let i = start; i < end; i++)
                if (results['trialDivision'][key][i] !== results['sieveEratosthenes'][key][i] || results['sieveEratosthenes'][key][i] !== results['bucketSieve'][key][i])
                    console.error(`[primes] trialDivision:${results['trialDivision'][key][i]}, sieveEratosthenes:${results['sieveEratosthenes'][key][i]}, bucketSieve:${results['bucketSieve'][key][i]}`);
    }

}