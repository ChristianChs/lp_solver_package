import { useEffect, useRef, useState } from "react"
import { Grafica, Restriccion, FuncionObjetivo } from '../helpers'
import { Input, Select } from '../components/index'
export const GraphicMethod = () => {
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
  const [isChecked, setIsChecked] = useState(true); // true si quieres que esté marcado por defecto
  const g00 = useRef(null);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

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

    const newRest = new Restriccion(nrest.x, eval(nrest.op + nrest.y), nrest.signo, nrest.limite, nrest.mostrable);
    console.log(newRest)
    if (g00.current) {
      g00.current.addRestriccion(newRest);
    }
  };

  const eliminarRestriccion = (index) => {
    const res = restricciones[index]
    console.log("reseliminar ")
    console.log(res)
    const newRestricciones = [...restricciones];
    newRestricciones.splice(index, 1);
    setRestricciones(newRestricciones);
    g00.current.delRestriccion(parsearRestriccion(res))
  };
  const nuevaFuncionObjetivo = () => {
    let fo = new FuncionObjetivo(foObj,foX,eval(foOp+foY));
    g00.current.setFuncionObjetivo(fo);
  }

  useEffect(() => {
    g00.current = new Grafica();
    // g00.current.set("lienzo", 0.1, 0, 10, 0, 10, 100, 10, true, true, 0, 0);
    g00.current.set("lienzo", 0.1, 0, 100, 0, 100, 100, 10, true, true, 0, 0);
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
    <section className="pt-3">
      <h1 className="text-xl text-white">Metodo Grafico</h1>
      <div>
        <div className="bg-white grid grid-cols-2 gap-4">
          <div className="p-5">
            <h2>Problema</h2>
            <div className="p-3 border">

              <Select id="fo_obj" options={[{ value: 'max', label: 'MAX' }, { value: 'min', label: 'MIN' }]}
                value={foObj} onChange={(e) => setFoObj(e.target.value)}
              />
              <Input id="fo_x" label="X" type={false}
                value={foX} onChange={(e) => setFotX(e.target.value)}
              />

              <Select id="fo_op" options={[{ value: '+', label: '+' }, { value: '-', label: '-' }]}
                value={foOp} onChange={(e) => setFotOp(e.target.value)}
              />

              <Input id="fo_y" label="Y" type={false}
                value={foY} onChange={(e) => setFotY(e.target.value)}
              />

              <input 
              type="button" 
              value="Establecer" 
              onClick={nuevaFuncionObjetivo} 
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              />
            </div>

            <div className="p-3 border">

              <Input id="nrest_x" label="X"
                value={nrestX} onChange={(e) => setNrestX(e.target.value)}
              />
              <Select id="nres_op" options={[{ value: '+', label: '+' }, { value: '-', label: '-' }]}
                value={nrestOp}
                onChange={(e) => setNrestOp(e.target.value)}
              />

              <Input id="nrest_y" label="Y"
                value={nrestY} onChange={(e) => setNrestY(e.target.value)}
              />
              <Select id="nres_op" options={[{ value: '<=', label: '<=' }, { value: '>=', label: '>=' }]}
                value={nrestSigno}
                onChange={(e) => setNrestSigno(e.target.value)}
              />

              <Input id="nrest_limite" label=""
                value={nrestLimite} onChange={(e) => setNrestLimite(e.target.value)}
              />

              <input type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                hidden
              />
              <input 
              type="button" 
              value="+" 
              onClick={nuevaRestriccion} 
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              />
            </div>

            <div id="restricciones">
              <h1>Restricciones </h1>
              {restricciones.map((rest, index) => (
                <div key={index} className="flex items-center p-1">
                  <input
                    className="mr-2 border rounded-md py-0 px-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border-blue-500 hover:border-transparent"
                    type="button"
                    value="-"
                    onClick={() => eliminarRestriccion(index)}
                  />
                  <span>{` ${rest.x} ${rest.op} ${rest.y} ${rest.signo} ${rest.limite}`}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="">
            <canvas id="lienzo" width="600" height="600">
            </canvas>
          </div>
        </div>
      </div>
    </section>
  )
}

