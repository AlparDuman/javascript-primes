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
        console.error('Not implemented yet');
        return false;
    }

    isPrimeBucketSieve(number) {
        console.error('Not implemented yet');
        return false;
    }

    /* ---------- COUNT PRIMES ---------- */

    countPrimes(range, start = 0) {
        return this.countPrimesTrialDivision(range, start);
    }

    countPrimesTrialDivision(range, start = 0) {
        console.error('Not implemented yet');
        return [];
    }

    countPrimesSieveEratosthenes(range, start = 0) {
        console.error('Not implemented yet');
        return [];
    }

    countPrimesBucketSieve(range, start = 0) {
        console.error('Not implemented yet');
        return [];
    }

    /* ---------- GET PRIMES ---------- */

    getPrimes(range, start = 0) {
        return this.getPrimesTrialDivision(range, start);
    }

    getPrimesTrialDivision(range, start = 0) {
        console.error('Not implemented yet');
        return [];
    }

    getPrimesSieveEratosthenes(range, start = 0) {
        console.error('Not implemented yet');
        return [];
    }

    getPrimesBucketSieve(range, start = 0) {
        console.error('Not implemented yet');
        return [];
    }

}