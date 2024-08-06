import parse from 'html-react-parser'
import { useState } from 'react';
const useTransportMethods = () => {
    const [resultados, setResultados] = useState('');

    const balanceProblema = (costoMatriz, oferta, demanda) => {
        console.log("oferta",oferta)
        console.log("demanda",demanda)
        const totalOferta = oferta.reduce((acc, val) => acc + val, 0);
        const totalDemanda = demanda.reduce((acc, val) => acc + val, 0);

        if (totalOferta > totalDemanda) {
            const dummyColumn = Array(oferta.length).fill(0);
            for (let i = 0; i < costoMatriz.length; i++) {
                costoMatriz[i].push(0); // Cost for dummy column is 0
            }
            demanda.push(totalOferta - totalDemanda);
        } else if (totalDemanda > totalOferta) {
            // Add dummy row
            const dummyRow = Array(demanda.length).fill(0);
            costoMatriz.push(dummyRow);
            oferta.push(totalDemanda - totalOferta);
        }
    }
    function printMatriz(costoMatriz, oferta, demanda) {
        let matrizHTML = '<table  className="w-full border border-gray-300 dark:border-gray-600">';
        matrizHTML += '<thead><tr class="bg-gray-800 text-white">';
        matrizHTML += '<th className="p-2 border border-gray-300 dark:border-gray-600">Origen / Destino</th>';
        for (let i = 0; i < demanda.length; i++) {
            matrizHTML += `<th className="p-2 border border-gray-300 dark:border-gray-600">D${i + 1}</th>`;
        }
        matrizHTML += '<th className="p-2 border border-gray-300 dark:border-gray-600">Oferta</th>';
        matrizHTML += '</tr></thead>';
        for (let i = 0; i < costoMatriz.length; i++) {
            matrizHTML += '<tr className="hover:bg-gray-100 dark:hover:bg-gray-700">';
            matrizHTML += `<td className="bg-gray-100 dark:bg-gray-700 font-bold p-2 border border-gray-300 dark:border-gray-600">O${i + 1}</td>`;
            for (let j = 0; j < costoMatriz[i].length; j++) {
                matrizHTML += `<td className="text-center p-2 border border-gray-300 dark:border-gray-600">${costoMatriz[i][j]}</td>`;
            }
            matrizHTML += `<td className="bg-gray-100 dark:bg-gray-700 font-bold text-center p-2 border border-gray-300 dark:border-gray-600">${oferta[i]}</td>`;
            matrizHTML += '</tr>';
        }
        matrizHTML += '<tr>';
        matrizHTML += `<td className="p-2 border border-gray-300 dark:border-gray-600">Total Demanda</td>`;
        for (let j = 0; j < demanda.length; j++) {
            matrizHTML += `<td className="text-center p-2 border border-gray-300 dark:border-gray-600">${demanda[j]}</td>`;
        }
        matrizHTML += '<td class="p-2 border border-gray-300 dark:border-gray-600">-</td>';
        matrizHTML += '</tr>';
        matrizHTML += '</table>';
        return matrizHTML;
    }
    function northWestCorner(costoMatriz, oferta, demanda) {
        const tablaInicial = `<p>Tabla Inicial</p>${printMatriz(costoMatriz, oferta, demanda)}<br>`
        let totalCost = 0;
        let i = 0, j = 0;
        let steps = '';
        while (i < oferta.length && j < demanda.length) {
            const minVal = Math.min(oferta[i], demanda[j]);
            totalCost += minVal * costoMatriz[i][j];
            oferta[i] -= minVal;
            demanda[j] -= minVal;
            steps += `Asigne ${minVal} unidades de O${i + 1} a D${j + 1} a un costo de ${costoMatriz[i][j]}. La oferta restante en O${i + 1} es ${oferta[i]} y la demanda restante en D${j + 1} es ${demanda[j]}.<br>`;
            steps += `Matriz en este paso:<br>${printMatriz(costoMatriz, oferta, demanda)}<br>`;
            if (oferta[i] === 0) i++;
            if (demanda[j] === 0) j++;
        }
        return `<p class="mt-4 text-lg">Costo total de transporte utilizando el método de la esquina noroeste:<strong class="font-bold"> ${totalCost}</strong></p><br><h2 className="block mr-4 w-20 text-gray-900 font-bold dark:text-gray-400">Pasos</h2>${tablaInicial}${steps}`;
    }

    const leastCost = (costoMatriz, oferta, demanda) => {
        const tablaInicial = `<p>Tabla Inicial</p>${printMatriz(costoMatriz, oferta, demanda)}<br>`
        let totalCost = 0;
        const rows = oferta.length;
        const cols = demanda.length;
        let steps = '';
        while (true) {
            let minVal = Infinity;
            let minI = -1;
            let minJ = -1;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (costoMatriz[i][j] < minVal && oferta[i] > 0 && demanda[j] > 0) {
                        minVal = costoMatriz[i][j];
                        minI = i;
                        minJ = j;
                    }
                }
            }

            if (minVal === Infinity) break;

            const cantidad = Math.min(oferta[minI], demanda[minJ]);
            totalCost += cantidad * costoMatriz[minI][minJ];
            oferta[minI] -= cantidad;
            demanda[minJ] -= cantidad;
            steps += `Asigne ${cantidad} unidades de O${minI + 1} a D${minJ + 1} a un costo de ${costoMatriz[minI][minJ]}. La oferta restante en O${minI + 1} es ${oferta[minI]} y la demanda restante en D${minJ + 1} es ${demanda[minJ]}.<br>`;
            steps += `Matriz en este paso:<br>${printMatriz(costoMatriz, oferta, demanda)}<br>`;
        }

        return `<p class="mt-4 text-lg">Costo total de transporte utilizando el método de Costo Mínimo:<strong class="font-bold"> ${totalCost}</strong></p><br><h2 className="block mr-4 w-20 text-gray-900 font-bold dark:text-gray-400">Pasos</h2>${tablaInicial}${steps}`;
    }

    const vogel = (costoMatriz, oferta, demanda) => {
        const tablaInicial = `<p>Tabla Inicial</p>${printMatriz(costoMatriz, oferta, demanda)}<br>`
        let totalCost = 0;
        let rows = oferta.length;
        let cols = demanda.length;
        let steps = '';

        while (rows > 0 && cols > 0) {
            const penalidad = [];

            for (let i = 0; i < oferta.length; i++) {
                if (oferta[i] > 0) {
                    let min1 = Infinity, min2 = Infinity;
                    for (let j = 0; j < demanda.length; j++) {
                        if (demanda[j] > 0) {
                            if (costoMatriz[i][j] < min1) {
                                min2 = min1;
                                min1 = costoMatriz[i][j];
                            } else if (costoMatriz[i][j] < min2) {
                                min2 = costoMatriz[i][j];
                            }
                        }
                    }
                    penalidad.push({ index: i, type: 'row', penalty: min2 - min1 });
                }
            }

            for (let j = 0; j < demanda.length; j++) {
                if (demanda[j] > 0) {
                    let min1 = Infinity, min2 = Infinity;
                    for (let i = 0; i < oferta.length; i++) {
                        if (oferta[i] > 0) {
                            if (costoMatriz[i][j] < min1) {
                                min2 = min1;
                                min1 = costoMatriz[i][j];
                            } else if (costoMatriz[i][j] < min2) {
                                min2 = costoMatriz[i][j];
                            }
                        }
                    }
                    penalidad.push({ index: j, type: 'column', penalty: min2 - min1 });
                }
            }

            penalidad.sort((a, b) => b.penalty - a.penalty);
            const penalidadAlta = penalidad[0];

            if (penalidadAlta.type === 'row') {
                const i = penalidadAlta.index;
                let minCost = Infinity;
                let minCol = -1;

                for (let j = 0; j < demanda.length; j++) {
                    if (demanda[j] > 0 && costoMatriz[i][j] < minCost) {
                        minCost = costoMatriz[i][j];
                        minCol = j;
                    }
                }

                const asignacion = Math.min(oferta[i], demanda[minCol]);
                totalCost += asignacion * minCost;
                oferta[i] -= asignacion;
                demanda[minCol] -= asignacion;

                steps += `Asigne ${asignacion} unidades de O${i + 1} a D${minCol + 1} a un costo de ${minCost}. La oferta restante en O${i + 1} es ${oferta[i]} y la demanda restante en D${minCol + 1} es ${demanda[minCol]}.<br>`;
                steps += `Matriz en este paso:<br>${printMatriz(costoMatriz, oferta, demanda)}<br>`;

                if (oferta[i] === 0) {
                    rows--;
                }
                if (demanda[minCol] === 0) {
                    cols--;
                }
            } else if (penalidadAlta.type === 'column') {
                const j = penalidadAlta.index;
                let minCost = Infinity;
                let minRow = -1;

                for (let i = 0; i < oferta.length; i++) {
                    if (oferta[i] > 0 && costoMatriz[i][j] < minCost) {
                        minCost = costoMatriz[i][j];
                        minRow = i;
                    }
                }

                const asignacion = Math.min(oferta[minRow], demanda[j]);
                totalCost += asignacion * minCost;
                oferta[minRow] -= asignacion;
                demanda[j] -= asignacion;

                steps += `Asigne ${asignacion} unidades de O${minRow + 1} a D${j + 1} a un costo de  ${minCost}. La oferta restante en O${minRow + 1} es ${oferta[minRow]} y la demanda restante en D${j + 1} es ${demanda[j]}.<br>`;
                steps += `Matriz en este paso:<br>${printMatriz(costoMatriz, oferta, demanda)}<br>`;

                if (oferta[minRow] === 0) {
                    rows--;
                }
                if (demanda[j] === 0) {
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