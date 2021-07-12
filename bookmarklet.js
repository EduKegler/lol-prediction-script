(function () {
    const bestWinPercent = 10;
    const bestTowerPercent = 8;

    const getTeamStatusPercentage = () => {
        const statList = document.querySelectorAll('#summaryPast30Days .stats > li');
        const leftTowerPercent = Number(statList[7].children[0].innerText.replace('%', ''));
        const rightTowerPercent = Number(statList[7].children[2].innerText.replace('%', ''));
        const leftRHPercent = Number(statList[6].children[0].innerText.replace('%', ''));
        const rightRHPercent = Number(statList[6].children[2].innerText.replace('%', ''));
        return { leftTowerPercent, rightTowerPercent, leftRHPercent, rightRHPercent };
    }
    
    const getRelativeFRHPercentage = (leftRHPercent, rightRHPercent) => {
        const leftTrueRHPercent = (leftRHPercent / (leftRHPercent + rightRHPercent));
        const rightTrueRHPercent = (rightRHPercent / (rightRHPercent + leftRHPercent));
        return { leftTrueRHPercent, rightTrueRHPercent };
    }
    
    const getBoostedPercentage = (towerPercent, riftHeraldPercent) => {
        const riftHeraldModifier = (riftHeraldPercent - 0.5) * 0.25;
        return riftHeraldPercent > 0.55 ? (towerPercent / 100) + riftHeraldModifier : (towerPercent / 100);
    }
    
    const teams = document.querySelectorAll('.team > h2');
    const wins = document.querySelectorAll('.single-result .team .prediction .percentage');
    const leftWin = Number(wins[1].innerText.replace('%', ''));
    const rightWin = Number(wins[4].innerText.replace('%', ''));
    
    const leftTeamName = teams[0].innerText;
    const rightTeamName = teams[1].innerText;
    
    const { leftTowerPercent, rightTowerPercent, leftRHPercent, rightRHPercent } = getTeamStatusPercentage();
    const { leftTrueRHPercent, rightTrueRHPercent } = getRelativeFRHPercentage(leftRHPercent, rightRHPercent);
    
    const leftBooster = getBoostedPercentage(leftTowerPercent, leftTrueRHPercent);
    const rightBooster = getBoostedPercentage(rightTowerPercent, rightTrueRHPercent);
    
    const leftTeamFT = Math.round(leftBooster / (leftBooster + rightBooster) * 100);
    const rightTeamFT = Math.round(rightBooster / (rightBooster + leftBooster) * 100);
    
    const winnerTowerPercent = leftTeamFT >= rightTeamFT ? leftTeamFT : rightTeamFT;
    const winnerTowerName = leftTeamFT >= rightTeamFT ? leftTeamName : rightTeamName;
    
    const winnerPercent = leftWin >= rightWin ? leftWin : rightWin;
    const winnerName = leftWin >= rightWin ? leftTeamName : rightTeamName;

    const bestOddWin = 1/((winnerPercent / 100) - (bestWinPercent / 100));
    console.log(winnerPercent / 100, bestWinPercent / 100)
    const bestOddTower = 1/((winnerTowerPercent / 100) - (bestTowerPercent / 100));
    console.log(winnerPercent / 100, bestWinPercent / 100)

    alert(`${leftTeamName} VS. ${rightTeamName}

        ${winnerName} has ${winnerPercent}% to win this match, 
        the best odd is greater than ${bestOddWin.toFixed(2)}.

        ${winnerTowerName} has ${winnerTowerPercent}% to destroy the first tower, 
        the best odd is greater than ${bestOddTower.toFixed(2)}.`);
})();
    