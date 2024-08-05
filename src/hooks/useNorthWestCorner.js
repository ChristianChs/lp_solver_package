import parse from 'html-react-parser'
import { useState } from 'react';
const useNorthWest = () => {
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
        return `<p class="mt-4 text-lg">Costo total de transporte utilizando el método de la esquina noroeste:<strong class="font-bold"> ${totalCost}</strong></p><br><h2 className="block mr-4 w-20 text-gray-900 font-bold dark:text-gray-400">Pasos</h2>${steps}`;
    }
    const solveProblem = (data) => {
        const { costMatrix: costoMatriz, supply: oferta, demand: demanda } = data;
        balanceProblema(costoMatriz, oferta, demanda);
        const result = northWestCorner(costoMatriz, oferta, demanda);
        setResultados(parse(result))
        return
    }
    return {
        solveProblem,
        resultados
    }
}

export default useNorthWest