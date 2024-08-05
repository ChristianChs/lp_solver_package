import { Link } from "react-router-dom"

export const Main = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 ">
                <div className="px-12">
                    <h1 className=" text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200 text-center">Proyecto de Investigación Operativa</h1>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-8xl">
                        <Link
                            to='graphic'
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center"
                        >
                            <GitGraphIcon className="w-12 h-12 text-gray-600 dark:text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">Método Gráfico</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Visualiza y resuelve problemas de programación lineal con dos variables usando el Método Gráfico.
                            </p>
                        </Link>
                        <Link
                            to='simplex'
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center"
                        >
                            <CalculatorIcon className="w-12 h-12 text-gray-600 dark:text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">Método Simplex</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Resuelve problemas de programación lineal utilizando el Método Simplex, incluyendo variantes como el Método de 2 Fases y Gran M.
                            </p>
                        </Link>
                        <Link
                            to='northwest-corner'
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center"
                        >
                            <Truck className="w-12 h-12 text-gray-600 dark:text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">Método Transporte - Noroeste</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Encuentra una solución inicial comenzando desde la celda superior izquierda y avanzando para cumplir con las demandas.
                            </p>
                        </Link>
                        <Link
                            to='least-cost'
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center"
                        >
                            <Truck className="w-12 h-12 text-gray-600 dark:text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">Método Transporte - Costo Mínimo</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Asigna suministros seleccionando rutas de menor costo, minimizando el costo total de transporte desde el inicio.
                            </p>
                        </Link>
                        <Link
                            to='vogel'
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center"
                        >
                            <Truck className="w-12 h-12 text-gray-600 dark:text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">Método Vogel</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Calcula penalizaciones para encontrar una solución eficiente priorizando asignaciones en celdas con las mayores penalizaciones.
                            </p>
                        </Link>
                        <Link
                            to='critical-route'
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center"
                        >
                            <TrendingDown className="w-12 h-12 text-gray-600 dark:text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">Método de la Ruta Crítica CPM</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Determina la secuencia más larga de tareas críticas identificando el tiempo mínimo necesario para completar el proyecto.
                            </p>
                        </Link>
                        <Link
                            to='pert'
                            className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center"
                        >
                            <Clock className="w-12 h-12 text-gray-600 dark:text-gray-400 mb-4" />
                            <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300 text-center">Método PERT</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-center">
                                Evalúa la duración de tareas en proyectos utilizando estimaciones optimistas, probables y pesimistas para gestionar incertidumbres.
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
function CalculatorIcon(props) {
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
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <line x1="8" x2="16" y1="6" y2="6" />
            <line x1="16" x2="16" y1="14" y2="18" />
            <path d="M16 10h.01" />
            <path d="M12 10h.01" />
            <path d="M8 10h.01" />
            <path d="M12 14h.01" />
            <path d="M8 14h.01" />
            <path d="M12 18h.01" />
            <path d="M8 18h.01" />
        </svg>
    )
}


function GitGraphIcon(props) {
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
            <circle cx="5" cy="6" r="3" />
            <path d="M5 9v6" />
            <circle cx="5" cy="18" r="3" />
            <path d="M12 3v18" />
            <circle cx="19" cy="6" r="3" />
            <path d="M16 15.7A9 9 0 0 0 19 9" />
        </svg>
    )
}

function Truck(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" {...props}>
        <rect height="13" width="15" x="1" y="3" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    );
  }
  

function TrendingDown(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" {...props}>
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    );
  }

function Clock(props) {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="main-grid-item-icon" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    );
  }
  