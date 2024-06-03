import { useEffect, useRef, useState } from "react"
import { Grafica, Restriccion, FuncionObjetivo } from '../helpers'
import { Input } from "../components/"
import { Select } from '../components/graphics/Select'
import { Link } from "react-router-dom"
import { eval2 } from "../helpers/utils"

export const Graphic = () => {
    const canvasRef = useRef(null);
    const [foX, setFotX] = useState('');
    const [foY, setFotY] = useState('');
    const [foOp, setFotOp] = useState('+');
    const [foObj, setFoObj] = useState('+');

    const [nrestX, setNrestX] = useState('');
    const [nrestY, setNrestY] = useState('');
    const [nrestOp, setNrestOp] = useState('+');
    const [nrestSigno, setNrestSigno] = useState('<=');
    const [nrestLimite, setNrestLimite] = useState('');

    const [restricciones, setRestricciones] = useState([]);
    const [ejes, setEjes] = useState(10)
    const g00 = useRef(null);

    const limpiarDatos = () => {
        setFotX('');
        setFotY('');
        setFotOp('+');
        setFoObj('+');

        setNrestX('');
        setNrestY('');
        setNrestOp('+');
        setNrestSigno('<=');
        setNrestLimite('');

        g00.current.clearRestricciones();
        setRestricciones([])
        g00.current.clearFuncionObjetivo();

    }
    const alejarGrafica = () => {
        setEjes(ejes + 10);
        g00.current.changeEjes(ejes + 10)
    }
    const acercarGrafica = () => {
        if (ejes > 10) {

            setEjes(ejes - 10);
            g00.current.changeEjes(ejes - 10)
        }
    }
    const parsearRestriccion = (objeto) => {
        return objeto.x + "x" + objeto.op + objeto.y + "y" + objeto.signo + objeto.limite;
    }
    const nuevaRestriccion = () => {
        const nrest = {
            x: nrestX,
            y: nrestY,
            op: nrestOp,
            signo: nrestSigno,
            limite: nrestLimite,
            mostrable: true, // Assuming this is always true for simplicity
        };

        setRestricciones([...restricciones, nrest]);
        // Clear the inputs after adding the restriction
        setNrestX('');
        setNrestY('');
        setNrestLimite('');
        const newRest = new Restriccion(nrest.x, eval2(nrest.op + nrest.y), nrest.signo, nrest.limite, nrest.mostrable);
        if (g00.current) {
            g00.current.addRestriccion(newRest);
        }
    };

    const eliminarRestriccion = (index) => {
        const res = restricciones[index]
        const newRestricciones = [...restricciones];
        newRestricciones.splice(index, 1);
        setRestricciones(newRestricciones);
        g00.current.delRestriccion(parsearRestriccion(res))
    };
    const nuevaFuncionObjetivo = () => {
        let fo = new FuncionObjetivo(foObj, foX, eval2(foOp + foY));
        g00.current.setFuncionObjetivo(fo);
    }

    useEffect(() => {
        g00.current = new Grafica();
        g00.current.set("lienzo", 0.1, 0, ejes + 4, 0, ejes, 10, 1, true, true, 0, 0);
        g00.current.dibujar();
        // Manejar el evento mousemove del canvas
        const handleCanvasMousemove = (event) => {
            if (g00.current) {
                g00.current.dibujarDatos(event);
            }
        };

        const canvasElement = document.getElementById("lienzo");
        if (canvasElement) {
            canvasElement.addEventListener('mousemove', handleCanvasMousemove);
        }

        // Remover el event listener cuando el componente se desmonta
        return () => {
            if (canvasElement) {
                canvasElement.removeEventListener('mousemove', handleCanvasMousemove);
            }
        };
    }, [])

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full md:w-1/2 h-5/6">
                <Link to={'/'}>
                    <h1 className="text-3xl font-bold mb-8 text-gray-700 dark:text-gray-300">Método Gráfico</h1>
                </Link>
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-300">Función Objetivo</h2>
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div >
                                <label htmlFor="objective-type" className="text-gray-600 dark:text-gray-300">
                                    Tipo
                                </label>
                                <Select id="fo_obj" options={[{ value: 'max', label: 'MAX' }, { value: 'min', label: 'MIN' }]}
                                    value={foObj} onChange={(e) => { setFoObj(e.target.value) }}
                                />
                                <Input id="fo_x" label="X1" type={false}
                                    value={foX} onChange={(e) => setFotX(e.target.value)}
                                />
                                <Select id="fo_op" options={[{ value: '+', label: '+' }, { value: '-', label: '-' }]}
                                    value={foOp} onChange={(e) => setFotOp(e.target.value)}
                                />

                                <Input id="fo_y" label="X2" type={false}
                                    value={foY} onChange={(e) => setFotY(e.target.value)}
                                />
                                <input
                                    type="button"
                                    value="Establecer"
                                    onClick={nuevaFuncionObjetivo}
                                    className="bg-gray-800 text-white font-semibold py-1.5 px-4 border rounded-md shadow-sm"
                                />
                            </div>

                        </div>
                        {/* <Button className="bg-blue-500 hover:bg-blue-600 text-white">Establecer</Button> */}
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-300">Restricciones</h2>
                        <div className="grid grid-cols-1 gap-4 mb-4">
                            <div >
                                <Input id="nrest_x" label="X1"
                                    value={nrestX} onChange={(e) => setNrestX(e.target.value)}
                                />
                                <Select id="nres_op" options={[{ value: '+', label: '+' }, { value: '-', label: '-' }]}
                                    value={nrestOp}
                                    onChange={(e) => setNrestOp(e.target.value)}
                                />

                                <Input id="nrest_y" label="X2"
                                    value={nrestY} onChange={(e) => setNrestY(e.target.value)}
                                />
                                <Select id="nres_op" options={[{ value: '<=', label: '<=' }, { value: '>=', label: '>=' }]}
                                    value={nrestSigno}
                                    onChange={(e) => setNrestSigno(e.target.value)}
                                />

                                <Input id="nrest_limite" label=""
                                    value={nrestLimite} onChange={(e) => setNrestLimite(e.target.value)}
                                />
                                <input
                                    type="button"
                                    value="+"
                                    onClick={nuevaRestriccion}
                                    className="bg-gray-800 text-white font-semibold  py-1.5 px-4 border rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                {restricciones.map((rest, index) => (
                                    <div key={index} className="flex items-center p-1">
                                        <button
                                            className="mr-2 border border-black rounded-md py-0 px-2 font-semibold hover:bg-gray-800 hover:text-white"
                                            type="button"
                                            // value="-"
                                            onClick={() => eliminarRestriccion(index)}
                                        ><XIcon className="w-4 h-5" /></button>
                                        <span>{rest.x}X<sub>1</sub> {rest.op} {rest.y}X<sub>2</sub> {rest.signo + ' ' + rest.limite}</span>
                                    </div>
                                ))}
                                <div className="flex items-center p-1">
                                    <span>X<sub>1</sub>, X <sub>2</sub>	&ge; 0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6 md:mt-0 md:ml-6 w-full md:w-1/2 h-5/6">
                <h2 className="text-xl font-semibold mb-4 text-gray-600 dark:text-gray-300">Gráfico</h2>
                <div className="grid grid-cols-1 gap-2">
                    <div className="" >
                        <canvas ref={canvasRef} id="lienzo" width="700" height="500"></canvas>
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="bg-gray-900 text-white rounded-md px-3 mx-2"
                            onClick={alejarGrafica}
                        >
                            Alejar
                        </button>
                        <button
                            className="bg-gray-900 text-white rounded-md px-3 mx-2"
                            onClick={acercarGrafica}
                        >
                            Acercar
                        </button>

                        <button
                            className="bg-gray-900 text-white rounded-md px-3 mx-2"
                            type="button"
                            onClick={limpiarDatos}
                        >Borrar Gráfico</button>

                    </div>
                </div>
            </div>
        </div>
    )
}

function XIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}