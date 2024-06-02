import { Link } from "react-router-dom"

export const Main = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">Proyecto de Investigación Operativa</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
                <Link
                    to='graphic'
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center"
                >
                    <GitGraphIcon className="w-12 h-12 text-gray-600 dark:text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Método Gráfico</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                        Resuelve problemas de programación lineal utilizando el método gráfico.
                    </p>
                </Link>
                <Link
                    to='simplex'
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center justify-center"
                >
                    <CalculatorIcon className="w-12 h-12 text-gray-600 dark:text-gray-400 mb-4" />
                    <h2 className="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">Método Simplex</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-center">
                        Resuelve problemas de programación lineal utilizando el método simplex.
                    </p>
                </Link>
            </div>
        </div>
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