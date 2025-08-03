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
        return this.getPrimesSieveEratosthenes(number).includes(number);
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

    selfTestIsPrime(range = 20, start = 0) {
        console.log('Self test is prime');
        const end = start + range;

        let resultsTD = [];
        console.time('exec');
        for (let i = start; i < end; i++)
            resultsTD.push(this.isPrimeTrialDivision(i));
        console.timeEnd('exec');
        console.log('Test isPrimeTrialDivision()', resultsTD);

        let resultsSE = [];
        console.time('exec');
        for (let i = start; i < end; i++)
            resultsSE.push(this.isPrimeSieveEratosthenes(i));
        console.timeEnd('exec');
        console.log('Test isPrimeSieveEratosthenes()', resultsSE);

        let resultsBS = [];
        console.time('exec');
        for (let i = start; i < end; i++)
            resultsBS.push(this.isPrimeBucketSieve(i));
        console.timeEnd('exec');
        console.log('Test isPrimeBucketSieve()', resultsBS);

        for (let i = start; i < end; i++)
            if (resultsTD[i] !== resultsSE[i] || resultsSE[i] !== resultsBS[i])
                console.error(`Found issue for ${i}: {trial: ${resultsTD[i]}, sieve: ${resultsSE[i]}, bucket: ${resultsBS[i]}}`);
    }



    /* ---------- COUNT PRIMES ---------- */



    countPrimes(range, start = 0) {
        return this.countPrimesTrialDivision(range, start);
    }

    countPrimesTrialDivision(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start))
            return 0;
        return this.getPrimesTrialDivision(range, start).length;
    }

    countPrimesSieveEratosthenes(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start))
            return 0;
        return this.getPrimesSieveEratosthenes(range, start).length;
    }

    countPrimesBucketSieve(range, start = 0) {
        if (!Number.isInteger(range) || !Number.isInteger(start))
            return 0;
        return this.getPrimesBucketSieve(range, start).length;
    }

    selfTestCountPrimes(range = 20, start = 0) {
        console.log('Self test count primes');

        console.time('exec');
        let resultsTD = this.countPrimesTrialDivision(range, start);
        console.timeEnd('exec');
        console.log('Test countPrimesTrialDivision()', resultsTD);

        console.time('exec');
        let resultsSE = this.countPrimesSieveEratosthenes(range, start);
        console.timeEnd('exec');
        console.log('Test countPrimesSieveEratosthenes()', resultsSE);

        console.time('exec');
        let resultsBS = this.countPrimesBucketSieve(range, start);
        console.timeEnd('exec');
        console.log('Test countPrimesBucketSieve()', resultsBS);

        for (let i = start; i < range; i++)
            if (resultsTD[i] !== resultsSE[i] || resultsSE[i] !== resultsBS[i])
                console.error(`Found issue for ${i}: {trial: ${resultsTD[i]}, sieve: ${resultsSE[i]}, bucket: ${resultsBS[i]}}`);
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
        const field = new Array(start + range + 1).fill(true);
        const end = start + range;
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
    }

    selfTestGetPrimes(range = 20, start = 0) {
        console.log('Self test get primes');

        console.time('exec');
        let resultsTD = this.getPrimesTrialDivision(range, start);
        console.timeEnd('exec');
        console.log('Test getPrimesTrialDivision()', resultsTD);

        console.time('exec');
        let resultsSE = this.getPrimesSieveEratosthenes(range, start);
        console.timeEnd('exec');
        console.log('Test getPrimesSieveEratosthenes()', resultsSE);

        console.time('exec');
        let resultsBS = this.getPrimesBucketSieve(range, start);
        console.timeEnd('exec');
        console.log('Test getPrimesBucketSieve()', resultsBS);

        for (let i = start; i < range; i++)
            if (resultsTD[i] !== resultsSE[i] || resultsSE[i] !== resultsBS[i])
                console.error(`Found issue for ${i}: {trial: ${resultsTD[i]}, sieve: ${resultsSE[i]}, bucket: ${resultsBS[i]}}`);
    }

}