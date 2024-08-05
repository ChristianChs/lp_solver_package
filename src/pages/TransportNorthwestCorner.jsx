import { useState } from "react";
import { Link } from "react-router-dom";
import useTransportMethods from "../hooks/useTransportMethods"

export const TransportNorthwestCorner = () => {

    const { solveProblem ,resultados,setResultados} = useTransportMethods()
    const [numOrigen, setNumOrigen] = useState(1);
    const [numDestino, setNumDestino] = useState(1);
    const [origenes, setOrigenes] = useState([]);
    const [destinos, setDestinos] = useState([]);
    const [rutas, setRutas] = useState([]);

    const [ofertaOrigen, setOfertaOrigen] = useState('');

    const [demandaDestino, setDemandaDestino] = useState('');

    const [rutaDesde, setRutaDesde] = useState('');
    const [rutaHacia, setRutaHacia] = useState('');
    const [rutaCosto, setRutaCosto] = useState('');
    const handleReset = () => {
        setNumOrigen(1);
        setNumDestino(1);
        setOrigenes([]);
        setDestinos([]);
        setRutas([]);
        setResultados('');
    }
    const addOrigen = () => {
        const nO = numOrigen;
        if (ofertaOrigen) {
            // setOrigenes([...origenes, { name: nombreOrigen, supply: Number(ofertaOrigen) }]);
            setOrigenes([...origenes, { name: `O${nO}`, supply: Number(ofertaOrigen) }]);
            setNumOrigen(numOrigen+1);
            // setNombreOrigen(`O${numOrigen+1}`);
            setOfertaOrigen('');
        }
    };

    const addDestino = () => {
        const nD = numDestino;
        if ( demandaDestino) {
            // setDestinos([...destinos, { name: nombreDestino, demand: Number(demandaDestino) }]);
            setDestinos([...destinos, { name: `D${nD}`, demand: Number(demandaDestino) }]);
            setNumDestino(numDestino+1);
            // setNombreDestino(`D${numDestino+1}`);
            setDemandaDestino('');
        }
    };
    const addRuta = () => {
        if (rutaDesde && rutaHacia && rutaCosto) {
            const rutaExiste = rutas.find(route => route.from === rutaDesde);

            if (rutaExiste) {
                const destinoExiste = rutaExiste.to.find(dest => dest.destination === rutaHacia);

                if (destinoExiste) {
                    destinoExiste.cost = Number(rutaCosto);
                } else {
                    rutaExiste.to.push({ destination: rutaHacia, cost: Number(rutaCosto) });
                }

                setRutas([...rutas]);
            } else {
                setRutas([
                    ...rutas,
                    { from: rutaDesde, to: [{ destination: rutaHacia, cost: Number(rutaCosto) }] }
                ]);
            }

            setRutaDesde('');
            setRutaHacia('');
            setRutaCosto('');
        }
    };
    const getCosto = (nombreOrigen, nombreDestino) => {
        const route = rutas.find(route => route.from === nombreOrigen);
        if (route) {
            const destination = route.to.find(dest => dest.destination === nombreDestino);
            return destination ? destination.cost : '-';
        }
        return '-';
    };
    const convertToMatrices=(data)=> {
        const costMatrix = data.routes.map(route => {
            const costs = data.destinations.map(destination => {
                const routeToDestination = route.to.find(dest => dest.destination === destination.name);
                return routeToDestination ? routeToDestination.cost : 0;
            });
            return costs;
        });
    
        const supply = data.originations.map(origination => origination.supply);
    
        const demand = data.destinations.map(destination => destination.demand);
    
        return {
            costMatrix,
            supply,
            demand
        };
    }

    const handleSubmit = async () => {
        const transportationData = {
            originations: origenes,
            destinations: destinos,
            routes: rutas,
        };
        solveProblem(convertToMatrices(transportationData),1);
    }

    
    return (
        <div className="flex flex-col items-center justify-center  bg-gray-50">
            <Link to={'/'}>
                <h1 className="text-3xl font-bold mb-8 mt-6 text-gray-700">Método Transporte Noroeste</h1>
            </Link>
            <div className="grid grid-cols-1 gap-6 w-full max-w-6xl mb-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col">
                    
                    <h3 className="text-xl font-semibold mb-2 text-gray-600">Planteamiento</h3>
                    <div className="mb-4 flex items-center">
                        <label className="block mr-4 w-20 text-gray-500 dark:text-gray-400">
                            Origen:
                        </label>
                        {/* <input
                            type="text"
                            placeholder="Nombre Origen"
                            value={nombreOrigen}
                            readOnly
                            // value={`O${numOrigen}`}
                            className="w-40 text-center border rounded-md border-gray-300 animate-none"
                            // onChange={(e) => setNombreOrigen(e.target.value)}
                        /> */}
                        <input
                            type="number"
                            placeholder="Oferta"
                            value={ofertaOrigen}
                            className="w-40 text-center border rounded-md border-gray-300 animate-none ml-2"
                            onChange={(e) => setOfertaOrigen(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={addOrigen}
                            className="ml-2 border rounded-md px-2 bg-gray-900 text-gray-50 hover:bg-gray-100 hover:text-black transition-colors"
                        >Añadir</button>
                    </div>
                    <div className="mb-4 flex items-center">
                        <label className="block mr-4 w-20 text-gray-500 dark:text-gray-400">
                            Destino:
                        </label>
                        {/* <input
                            type="text"
                            placeholder="Nombre Destino"
                            value={nombreDestino}
                            // disabled
                            // value={`D${numOrigen}`}
                            className="w-40 text-center border rounded-md border-gray-300 animate-none"
                            onChange={(e) => setNombreDestino(e.target.value)}
                        /> */}
                        <input
                            type="number"
                            placeholder="Demanda"
                            value={demandaDestino}
                            className="w-40 text-center border rounded-md border-gray-300 animate-none ml-2"
                            onChange={(e) => setDemandaDestino(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={addDestino}
                            className="ml-2 border rounded-md px-2 bg-gray-900 text-gray-50 hover:bg-gray-100 hover:text-black transition-colors"
                        >Añadir</button>
                    </div>
                    <div className="mb-4 flex items-center">
                        <p className="block mr-4 w-20 text-gray-500 dark:text-gray-400">Rutas</p>
                        <select
                            value={rutaDesde}
                            onChange={(e) => setRutaDesde(e.target.value)}
                            className="mr-2 p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Selecciona Origen</option>
                            {origenes.map((origin, index) => (
                                <option key={index} value={origin.name}>{origin.name}</option>
                            ))}
                        </select>
                        <select
                            value={rutaHacia}
                            onChange={(e) => setRutaHacia(e.target.value)}
                            className="mr-2 p-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Selecciona Destino</option>
                            {destinos.map((destination, index) => (
                                <option key={index} value={destination.name}>{destination.name}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Costo"
                            value={rutaCosto}
                            className="w-20 p-0.5 text-center border rounded-md border-gray-300 animate-none ml-2"
                            onChange={(e) => setRutaCosto(e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={addRuta}
                            className="ml-2 border rounded-md px-2 bg-gray-900 text-gray-50 hover:bg-gray-100 hover:text-black transition-colors"
                        >Añadir</button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col">
                    <h3 className="text-xl font-semibold mb-2 text-gray-600">Tabla Inicial</h3>
                    <div className="mb-4 flex items-center">
                        <table className="w-full border border-gray-300 dark:border-gray-600">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-2 border border-gray-300 dark:border-gray-600">Origen / Destino</th>
                                    {destinos.map((destination, index) => (
                                        <th key={index} className="p-2 border border-gray-300 dark:border-gray-600">
                                            {destination.name}
                                        </th>
                                    ))}
                                    <th className="p-2 border border-gray-300 dark:border-gray-600">Oferta</th>
                                </tr>
                            </thead>
                            <tbody>
                                {origenes.map((origin, index) => (
                                    <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="bg-gray-100 dark:bg-gray-700 font-bold p-2 border border-gray-300 dark:border-gray-600">
                                            {origin.name}
                                        </td>
                                        {destinos.map((destination, destIndex) => (
                                            <td key={destIndex} className="text-center p-2 border border-gray-300 dark:border-gray-600">
                                                {getCosto(origin.name, destination.name)}
                                            </td>
                                        ))}
                                        <td className="bg-gray-100 dark:bg-gray-700 font-bold text-center p-2 border border-gray-300 dark:border-gray-600">
                                            {origin.supply}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-200 dark:bg-gray-600 font-bold">
                                    <td className="p-2 border border-gray-300 dark:border-gray-600">Total Demanda</td>
                                    {destinos.map((destination, index) => (
                                        <td key={index} className="text-center p-2 border border-gray-300 dark:border-gray-600">
                                            {destination.demand}
                                        </td>
                                    ))}
                                    <td className="p-2 border border-gray-300 dark:border-gray-600">-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <button
                            type="button"
                            className="border rounded-md w-36 bg-gray-900 text-gray-50"
                            onClick={handleSubmit}
                        >Resolver</button>
                        <button
                            className="ml-2 border rounded-md px-2 bg-gray-900 text-gray-50 hover:bg-gray-100 hover:text-black transition-colors"
                            onClick={handleReset}
                        >
                            Nuevo Problema
                        </button>
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col">
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2 text-gray-600">Resultado</h2>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                            <div>
                                <div>
                                    {resultados}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

