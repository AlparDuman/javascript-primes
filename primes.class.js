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

    isPrime(number) { }

    isPrimeTrialDivision(number) { }
    isPrimeSieveEratosthenes(number) { }
    isPrimeBucketSieve(number) { }

    /* ---------- COUNT PRIMES ---------- */

    countPrimes(range, start = 0) { }

    countPrimesTrialDivision(range, start = 0) { }
    countPrimesSieveEratosthenes(range, start = 0) { }
    countPrimesBucketSieve(range, start = 0) { }

    /* ---------- GET PRIMES ---------- */

    getPrimes(range, start = 0) { }

    getPrimesTrialDivision(range, start = 0) { }
    getPrimesSieveEratosthenes(range, start = 0) { }
    getPrimesBucketSieve(range, start = 0) { }

}