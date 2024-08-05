import parse from 'html-react-parser'
import { useState } from 'react';
const useTransportMethods = () => {
    const [resultados, setResultados] = useState('');
    const balanceProblema = (costoMatriz, oferta, demanda) => {
        const totalSupply = oferta.reduce((acc, val) => acc + val, 0);
        const totalDemand = demanda.reduce((acc, val) => acc + val, 0);

        if (totalSupply > totalDemand) {
            // Add dummy column
            const dummyColumn = Array(oferta.length).fill(0);
            for (let i = 0; i < costoMatriz.length; i++) {
                costoMatriz[i].push(0); // Cost for dummy column is 0
            }
            demanda.push(totalSupply - totalDemand);
        } else if (totalDemand > totalSupply) {
            // Add dummy row
            const dummyRow = Array(demanda.length).fill(0);
            costoMatriz.push(dummyRow);
            oferta.push(totalDemand - totalSupply);
        }
    }
    function printMatrix(costMatrix, supply, demand) {
        let matrixHTML = '<table  className="w-full border border-gray-300 dark:border-gray-600">';
        matrixHTML += '<thead><tr class="bg-gray-800 text-white">';
        matrixHTML += '<th className="p-2 border border-gray-300 dark:border-gray-600">Origen / Destino</th>';
        for (let i = 0; i < demand.length; i++) {
            matrixHTML += `<th className="p-2 border border-gray-300 dark:border-gray-600">D${i + 1}</th>`;
        }
        matrixHTML += '<th className="p-2 border border-gray-300 dark:border-gray-600">Oferta</th>';
        matrixHTML += '</tr></thead>';
        for (let i = 0; i < costMatrix.length; i++) {
            matrixHTML += '<tr className="hover:bg-gray-100 dark:hover:bg-gray-700">';
            matrixHTML += `<td className="bg-gray-100 dark:bg-gray-700 font-bold p-2 border border-gray-300 dark:border-gray-600">O${i + 1}</td>`;
            for (let j = 0; j < costMatrix[i].length; j++) {
                matrixHTML += `<td className="text-center p-2 border border-gray-300 dark:border-gray-600">${costMatrix[i][j]}</td>`;
            }
            matrixHTML += `<td className="bg-gray-100 dark:bg-gray-700 font-bold text-center p-2 border border-gray-300 dark:border-gray-600">${supply[i]}</td>`;
            matrixHTML += '</tr>';
        }
        matrixHTML += '<tr>';
        matrixHTML += `<td className="p-2 border border-gray-300 dark:border-gray-600">Total Demanda</td>`;
        for (let j = 0; j < demand.length; j++) {
            matrixHTML += `<td className="text-center p-2 border border-gray-300 dark:border-gray-600">${demand[j]}</td>`;
        }
        matrixHTML += '<td class="p-2 border border-gray-300 dark:border-gray-600">-</td>';
        matrixHTML += '</tr>';
        matrixHTML += '</table>';
        return matrixHTML;
    }
    function northWestCorner(costMatrix, supply, demand) {
        const tablaInicial = `<p>Tabla Inicial</p>${printMatrix(costMatrix, supply, demand)}<br>`
        let totalCost = 0;
        let i = 0, j = 0;
        let steps = '';
        while (i < supply.length && j < demand.length) {
            const minVal = Math.min(supply[i], demand[j]);
            totalCost += minVal * costMatrix[i][j];
            supply[i] -= minVal;
            demand[j] -= minVal;
            steps += `Asigne ${minVal} unidades de O${i + 1} a D${j + 1} a un costo de ${costMatrix[i][j]}. La oferta restante en O${i + 1} es ${supply[i]} y la demanda restante en D${j + 1} es ${demand[j]}.<br>`;
            steps += `Matriz en este paso:<br>${printMatrix(costMatrix, supply, demand)}<br>`;
            if (supply[i] === 0) i++;
            if (demand[j] === 0) j++;
        }
        return `<p class="mt-4 text-lg">Costo total de transporte utilizando el método de la esquina noroeste:<strong class="font-bold"> ${totalCost}</strong></p><br><h2 className="block mr-4 w-20 text-gray-900 font-bold dark:text-gray-400">Pasos</h2>${tablaInicial}${steps}`;
    }

    const leastCost = (costMatrix, supply, demand) => {
        const tablaInicial = `<p>Tabla Inicial</p>${printMatrix(costMatrix, supply, demand)}<br>`
        let totalCost = 0;
        const rows = supply.length;
        const cols = demand.length;
        let steps = '';
        while (true) {
            let minVal = Infinity;
            let minI = -1;
            let minJ = -1;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (costMatrix[i][j] < minVal && supply[i] > 0 && demand[j] > 0) {
                        minVal = costMatrix[i][j];
                        minI = i;
                        minJ = j;
                    }
                }
            }

            if (minVal === Infinity) break;

            const quantity = Math.min(supply[minI], demand[minJ]);
            totalCost += quantity * costMatrix[minI][minJ];
            supply[minI] -= quantity;
            demand[minJ] -= quantity;
            steps += `Asigne ${quantity} unidades de O${minI + 1} a D${minJ + 1} a un costo de ${costMatrix[minI][minJ]}. La oferta restante en O${minI + 1} es ${supply[minI]} y la demanda restante en D${minJ + 1} es ${demand[minJ]}.<br>`;
            steps += `Matriz en este paso:<br>${printMatrix(costMatrix, supply, demand)}<br>`;
        }

        return `<p class="mt-4 text-lg">Costo total de transporte utilizando el método de Costo Mínimo:<strong class="font-bold"> ${totalCost}</strong></p><br><h2 className="block mr-4 w-20 text-gray-900 font-bold dark:text-gray-400">Pasos</h2>${tablaInicial}${steps}`;
    }

    const vogel = () => {
        const tablaInicial = `<p>Tabla Inicial</p>${printMatrix(costMatrix, supply, demand)}<br>`
        let totalCost = 0;
        let rows = supply.length;
        let cols = demand.length;
        let steps = '';

        while (rows > 0 && cols > 0) {
            const penalties = [];

            for (let i = 0; i < supply.length; i++) {
                if (supply[i] > 0) {
                    let min1 = Infinity, min2 = Infinity;
                    for (let j = 0; j < demand.length; j++) {
                        if (demand[j] > 0) {
                            if (costMatrix[i][j] < min1) {
                                min2 = min1;
                                min1 = costMatrix[i][j];
                            } else if (costMatrix[i][j] < min2) {
                                min2 = costMatrix[i][j];
                            }
                        }
                    }
                    penalties.push({ index: i, type: 'row', penalty: min2 - min1 });
                }
            }

            for (let j = 0; j < demand.length; j++) {
                if (demand[j] > 0) {
                    let min1 = Infinity, min2 = Infinity;
                    for (let i = 0; i < supply.length; i++) {
                        if (supply[i] > 0) {
                            if (costMatrix[i][j] < min1) {
                                min2 = min1;
                                min1 = costMatrix[i][j];
                            } else if (costMatrix[i][j] < min2) {
                                min2 = costMatrix[i][j];
                            }
                        }
                    }
                    penalties.push({ index: j, type: 'column', penalty: min2 - min1 });
                }
            }

            penalties.sort((a, b) => b.penalty - a.penalty);
            const highestPenalty = penalties[0];

            if (highestPenalty.type === 'row') {
                const i = highestPenalty.index;
                let minCost = Infinity;
                let minCol = -1;

                for (let j = 0; j < demand.length; j++) {
                    if (demand[j] > 0 && costMatrix[i][j] < minCost) {
                        minCost = costMatrix[i][j];
                        minCol = j;
                    }
                }

                const allocation = Math.min(supply[i], demand[minCol]);
                totalCost += allocation * minCost;
                supply[i] -= allocation;
                demand[minCol] -= allocation;

                steps += `Asigne ${allocation} unidades de O${i + 1} a D${minCol + 1} a un costo de ${minCost}. La oferta restante en O${i + 1} es ${supply[i]} y la demanda restante en D${minCol + 1} es ${demand[minCol]}.<br>`;
                steps += `Matriz en este paso:<br>${printMatrix(costMatrix, supply, demand)}<br>`;

                if (supply[i] === 0) {
                    rows--;
                }
                if (demand[minCol] === 0) {
                    cols--;
                }
            } else if (highestPenalty.type === 'column') {
                const j = highestPenalty.index;
                let minCost = Infinity;
                let minRow = -1;

                for (let i = 0; i < supply.length; i++) {
                    if (supply[i] > 0 && costMatrix[i][j] < minCost) {
                        minCost = costMatrix[i][j];
                        minRow = i;
                    }
                }

                const allocation = Math.min(supply[minRow], demand[j]);
                totalCost += allocation * minCost;
                supply[minRow] -= allocation;
                demand[j] -= allocation;

                steps += `Allocate ${allocation} units from S${minRow + 1} to D${j + 1} at a cost of ${minCost}. Remaining supply at S${minRow + 1} is ${supply[minRow]} and remaining demand at D${j + 1} is ${demand[j]}.<br><br>`;
                steps += `Matrix at this step:<br>${printMatrix(costMatrix, supply, demand)}<br>`;

                if (supply[minRow] === 0) {
                    rows--;
                }
                if (demand[j] === 0) {
                    cols--;
                }
            }
        }

        return `<p class="mt-4 text-lg">Costo total de transporte utilizando el método de aproximación de Vogel:<strong class="font-bold"> ${totalCost}</strong></p><br><h2 className="block mr-4 w-20 text-gray-900 font-bold dark:text-gray-400">Pasos</h2>${tablaInicial}${steps}`;
    }
    const solveProblem = (data, type) => {
        const { costMatrix: costoMatriz, supply: oferta, demand: demanda } = data;
        balanceProblema(costoMatriz, oferta, demanda);
        switch (type) {
            case 1:
                setResultados(parse(northWestCorner(costoMatriz, oferta, demanda)))
                break;
            case 2:
                setResultados(parse(leastCost(costoMatriz, oferta, demanda)))
                break;
            case 3:
                setResultados(parse(vogel(costoMatriz, oferta, demanda)))
                break;

            default:
                break;
        }

    }
    return {
        solveProblem,
        resultados,
        leastCost,
        setResultados
    }
}

export default useTransportMethods