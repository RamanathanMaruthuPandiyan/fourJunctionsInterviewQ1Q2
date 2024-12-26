function maxProfit(n) {
    const times = [5, 4, 10];
    const earnings = [1500, 1000, 3000];
    const propertyNames = ["T", "P", "C"];

    const dp = Array(n + 1).fill(0);
    const choices = Array.from({ length: n + 1 }, () => [0, 0, 0]);

    for (let time = 1; time <= n; time++) {
        for (let i = 0; i < 3; i++) {
            if (time >= times[i]) {
                let potentialEarnings = dp[time - times[i]] + earnings[i];
                if (potentialEarnings > dp[time]) {
                    dp[time] = potentialEarnings;
                    choices[time] = [...choices[time - times[i]]];
                    choices[time][i]++;
                }
            }
        }
    }

    // Backtrack to find the optimal solution
    const result = {};
    propertyNames.forEach((name, index) => {
        result[name] = choices[n][index];
    });

    // Output results
    console.log(`Maximum Earnings: $${dp[n]}`);
    console.log(`Solution: T: ${result.T} P: ${result.P} C: ${result.C}`);
    return { maxEarnings: dp[n], solution: result };
}

maxProfit(13)
maxProfit(7)
maxProfit(8)