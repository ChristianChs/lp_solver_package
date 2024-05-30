import { useEffect, useState } from "react"
import parse from 'html-react-parser'
import { Radio, RadioGroup } from "../components"
import { jsx_funcionObjetivo, jsx_matriz, jsx_problema, jsx_restriccion } from "../helpers/simplex/";

export const SimplexMethod = () => {
    let jsx_pr = new jsx_problema();
    const [obj, setObj] = useState("max");
    const [numvar, setNumvar] = useState(2);
    const [variables, setVariables] = useState([{ sign: '+', value: '' }, { sign: '+', value: '' }]);
    const [restricciones, setRestricciones] = useState([{ sign: '+', value: '' }, { sign: '+', value: '' }]);
    const [desigualdad, setDesigualdad] = useState('<=');
    const [limite, setLimite] = useState('');
    const [hiddenMethod, setHiddenMethod] = useState(true);
    const [selectedMethod, setSelectedMethod] = useState('dosfases');
    const [jsx_arrayRestricciones, setJsx_arrayRestricciones] = useState([])
    const [jsx_arrayRestriccionesActivas, setJsx_arrayRestriccionesActivas] = useState([])
    const [addElementProblema, setAddElementProblema] = useState([])
    const [jsx_pro_p1, setJsx_pro_p1] = useState('');
    const [jsx_pro_p2, setJsx_pro_p2] = useState('');
    const increment = () => {
        if (numvar < 8) {
            setNumvar(numvar + 1);
            setVariables([...variables, { sign: '+', value: '' }]);
            setRestricciones([...restricciones, { sign: '+', value: '' }]);
        }
    }
    const decrement = () => {
        if (numvar > 2) {
            setNumvar(numvar > 2 ? numvar - 1 : 2);
            setVariables(variables.slice(0, -1));
            setRestricciones(restricciones.slice(0, -1));

        }
    }
    const addElement = (numItems) => {
        // console.log(numItems)
        const newList = (
            <li key={addElementProblema.length}>
                {numItems.map((item, index) => {
                    return (
                        <p key={index} className="inline-block">
                            {((index + 1) % 3 === 0)
                                ? <span>X<sub>{item}</sub></span>
                                : <span>{item}</span>
                            }
                        </p>
                    );
                })}
            </li>
        );

        setAddElementProblema([...addElementProblema, newList]);
    };
    const handleVariableChange = (index, field, value) => {
        const newVariables = [...variables];
        newVariables[index][field] = value;
        setVariables(newVariables);
        jxs_actualizar()
    }
    const handleRestriccionChange = (index, field, value) => {
        const newRestricciones = [...restricciones];
        newRestricciones[index][field] = value;
        setRestricciones(newRestricciones);
    }
    const handleLimiteChange = (value) => {
        // console.log(value)
        setLimite(value)
    }
    const handleChangeMethod = (event) => {
        setSelectedMethod(event.target.id);
        jsx_actualizarProblema();
    }
    const handleAddRestriccion = () => {
        let cadena = "";
        let cadenaaux = [];
        let equis = [];
        let distintocero = false;
        restricciones.forEach((restriccion, index) => {
            const signo = restriccion.sign === '+' ? '+' : '-';
            const valor = isNaN(parseFloat(restriccion.value)) ? 0 : restriccion.value;
            equis.push(parseFloat(signo + valor));
            if (parseFloat(valor) !== 0) {
                distintocero = true;
                cadena += `${signo}${valor}X<sub>${index + 1}</sub>`;
                cadenaaux.push(signo)
                cadenaaux.push(valor)
                cadenaaux.push(index + 1)
            }
        });

        if (!distintocero) return;
        // console.log("desigualdad : ", desigualdad)
        let sign = desigualdad === '<=' ? "&le;" : desigualdad === '=' ? "=" : "&ge;";
        // console.log("limite : ", limite)
        let limiteParsed = isNaN(parseFloat(limite)) ? 0 : limite;
        // console.log("EQUIS : ", equis)
        cadena += `${sign}${limiteParsed}`;
        cadenaaux.push(desigualdad)
        cadenaaux.push(limiteParsed)
        if (cadena[0] === '+') {
            cadena = cadena.substring(1);
        }
        addElement(cadenaaux);
        const nuevaRestriccion = {
            cadena,
            equis,
            desigualdad,
            limite: limiteParsed
        };
        // console.log("exis ",equis)
        const re01 = new jsx_restriccion(equis, desigualdad, limiteParsed);
        setJsx_arrayRestricciones(prevArray => [...prevArray, re01]);
        setJsx_arrayRestriccionesActivas(prevArray => [...prevArray, true]);

        jxs_actualizar();
        setDesigualdad('<=');//Limpia datos
        setLimite('');//Limpia datos
    }
    const jxs_actualizar = () => {
        const foDatos = variables.map(item => item.value === "" ? 0 : `${item.sign}${item.value}`);
        // console.log(obj)
        // console.log(foDatos)
        const fo01 = new jsx_funcionObjetivo(obj, foDatos)
        // console.log("f001: ",fo01);
        // jsx_pr = new jsx_problema();
        jsx_pr.setFuncionObjetivo(fo01)

        console.log("jsxarrayrestric :", jsx_arrayRestricciones)
        console.log("jsxarrayactivas :", jsx_arrayRestriccionesActivas);
        for (let i = 0; i < jsx_arrayRestricciones.length; i++) {
            if (jsx_arrayRestriccionesActivas[i] === true) {
                console.log("testo ", jsx_arrayRestricciones[i])
                jsx_pr.addRestriccion(jsx_arrayRestricciones[i])
            }
        }
        jsx_actualizarProblema()
    }

    const jsx_actualizarProblema = () => {
        const antiguo = jsx_pr.clone();
        console.log("antiguo ", antiguo)
        antiguo.procesar();
        const tam = antiguo.toString()
        if (tam.trim().length > 3) {
            setJsx_pro_p1(parse(antiguo.toHTML()))
        }
        var problemArt;
        if (selectedMethod === 'dosfases') {
            problemArt = antiguo.clone().dosfases();
        } else {
            problemArt = antiguo.clone().mgrande();
        }
        if (!problemArt) {
            problemArt = antiguo.clone()
            setHiddenMethod(true);
        } else {
            setHiddenMethod(false);
        }
        if (problemArt.toString().trim().length > 3) {
            setJsx_pro_p2(parse(problemArt.toHTML()))
        }


    }
    const jsx_resolver_matriz = (ma, it, es, fa) => {
        let ma01 = ma;
        let iteracion = it;
        let tieneartificiales = es;
        let tituloCadOld = 'Matriz inicial';
        if (fa == 1) {
            tituloCadOld = 'Matriz primera fase';
        } else if (fa == 2) {
            tituloCadOld = 'Matriz segunda fase';
        }
        let finmsg = '';
        do {
            if (ma01.quienEntra() != null && ma01.quienSale() != null) {
                let entra = ma01.quienEntraX();
                let sale = ma01.quienSaleX();
                let tituloCad = 'Iteración ' + ((iteracion++) + 1) + ': entra ' + entra + ' y sale ' + sale;
            } else {
                let tituloCad = '';
                if (!tieneartificiales) {
                    tituloCad = 'Iteración ' + (iteracion++) + ': no hay mas iteraciones';
                    if (ma01.quienEntra() != null && ma01.esMultiple() == false) {
                        finmsg = '<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;La soluci&oacute;n es ilimitada, la variable " + ma01.quienEntraX() + " debe entrar a la base pero ninguna puede salir.';
                    }
                    if (ma01.esMultiple() == true) {
                        finmsg = '<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;La soluci&oacute;n es m&uacute;ltiple, nos encontramos en un punto &oacute;ptimo y hay variables no b&aacute;sicas con coste reducido igual a 0.';
                    }
                } else {
                    if (selectedMethod === 'dosfases') {
                        tituloCad = 'Iteraci&oacute;n " + (iteracion++) + ": fin de la primera fase';
                        let comotermino = ma01.finPrimeraFase();
                        if (comotermino == 0) {
                            finmsg = '<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Se han expulsado todas las variables artificiales de la base.'
                        } else if (comotermino == 1) {
                            finmsg = '<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Las variables artificiales que no se han expulsado de la base valen 0, son linealmente dependientes.';
                        } else if (comotermino == 2) {
                            finmsg = '<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Existe una variable artificial en la base extrictamente mayor que 0, el problema es infactible.';
                        }
                    } else {
                        tituloCad = 'Iteraci&oacute;n " + (iteracion++) + ": no hay m&aacute;s iteraciones';
                        if (ma01.finMgrande() == true) {
                            finmsg = '<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Las variables artificiales que no se han expulsado de la base valen 0, son linealmente dependientes.';
                        }
                    }
                }
            }
            var titulo = $("<h3></h3>");
            var enlace = $("<a></a>").attr("href", "#").html(tituloCadOld);
            tituloCadOld = tituloCad;
            titulo.append(enlace);
            var contenido = $("<div></div>").html(ma01.toString() + finmsg);
            cont.append(titulo);
            cont.append(contenido);
        } while (ma01.avanzar())
    }
    const handleResolverProblema = () => {
        let antiguo = jsx_pr.clone();
        antiguo.procesar();
        let antiguocopia;
        let tieneartificiales = false;
        let fase = 0
        if (selectedMethod === 'dosfases') {
            antiguocopia = antiguo.clone().dosfases();
            fase = 1;
        }
        else {
            antiguocopia = antiguo.clone().mgrande();
        }
        if (antiguocopia != false) {
            tieneartificiales = true;
            antiguo = antiguocopia;
        } else {
            fase = 0;
        }
        let ma01 = new jsx_matriz(antiguo);
        jsx_resolver_matriz(ma01, 0, tieneartificiales, fase);//terminar la function
        if(tieneartificiales){
            if(selectedMethod==='dosfases'){
                if(ma01.finPrimeraFase()!=2){
                    let temp = jsx_pr.clone();
                    temp.procesar();
                    fase=2;
                    let ma02 =ma01.getSegundaFase(temp.getFuncionObjetivo());
                    jsx_resolver_matriz(ma02,0,false,fase);
                }
            }else{}
        }
        // cont.accordion({collapsible:false});

    }
    useEffect(() => {
        if (jsx_arrayRestricciones.length > 0) {
            jxs_actualizar();
        }
    }, [jsx_arrayRestricciones, selectedMethod])
    return (
        <div className="bg-white p-2.5">
            <div id="jsx_funcion_objetivo" className="border shadow-lg p-2.5 grid gap-3">
                Funcion Objetivo
                <div id="jsx_fo_tipo" >
                    <RadioGroup value={obj} onChange={e => setObj(e.target.value)}>
                        <div className="flex gap-4">
                            <Radio value="max">Maximizar</Radio>
                            <Radio value="min">Minimizar</Radio>
                        </div>
                    </RadioGroup>
                </div>
                <div id="jsx_fo_numvar">
                    <div className="flex items-center space-x-2">
                        <p>Num. variables: </p>
                        <input
                            type="number"
                            className="w-10 text-right rounded py-1 border-none bg-slate-200/100"
                            value={numvar}
                            readOnly
                        />
                        <button onClick={decrement} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">
                            -
                        </button>
                        <button onClick={increment} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">
                            +
                        </button>
                    </div>
                </div>
                <div id="jsx_fo_fo">
                    <div id="jsx_fo_fo_content" className="grid grid-cols-10">
                        {variables.map((variable, index) => (
                            <div key={index} className="">

                                <input
                                    type="radio"
                                    name={`jsx_fo_${index}`}
                                    id={`jsx_fo_${index}_pos`}
                                    checked={variable.sign === '+'}
                                    onChange={() => handleVariableChange(index, 'sign', '+')}
                                />
                                <label htmlFor={`jsx_fo_${index}_pos`}>+</label>
                                <input
                                    type="radio"
                                    name={`jsx_fo_${index}`}
                                    id={`jsx_fo_${index}_neg`}
                                    checked={variable.sign === '-'}
                                    onChange={() => handleVariableChange(index, 'sign', '-')}
                                />
                                <label htmlFor={`jsx_fo_${index}_neg`}>-</label>
                                <input
                                    type="text"
                                    value={variable.value}
                                    className="border border-black w-10"
                                    onChange={(e) => handleVariableChange(index, 'value', e.target.value)}
                                /> X
                                <sub>{index + 1}</sub>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div id="jsx_restricciones" className="border shadow-lg  p-2.5 grid gap-3">
                Restricciones
                <div id="jsx_res">
                    <div id="jsx_res_nueva">
                        <div id="jsx_res_fo_cont" className="grid grid-cols-10">
                            {restricciones.map((restriccion, index) => (
                                <div key={index} >

                                    <input
                                        type="radio"
                                        name={`jsx_res_${index}`}
                                        id={`jsx_res_${index}_pos`}
                                        checked={restriccion.sign === '+'}
                                        onChange={() => handleRestriccionChange(index, 'sign', '+')}
                                    />
                                    <label htmlFor={`jsx_res_${index}_pos`}>+</label>
                                    <input
                                        type="radio"
                                        name={`jsx_res_${index}`}
                                        id={`jsx_res_${index}_neg`}
                                        checked={restriccion.sign === '-'}
                                        onChange={() => handleRestriccionChange(index, 'sign', '-')}
                                    />
                                    <label htmlFor={`jsx_res_${index}_neg`}>-</label>
                                    <input
                                        type="text"
                                        value={restriccion.value}
                                        className="border border-black w-10"
                                        onChange={(e) => handleRestriccionChange(index, 'value', e.target.value)}
                                    /> X
                                    <sub>{index + 1}</sub>

                                </div>
                            ))}
                        </div>
                        <div id="jsx_res_fo_signo">
                            <div id="jsx_res_fo_signo_opt">
                                {/* <input type="radio" checked="checked" id="jsx_res_fo_signo_opt_lt"
                                    name="jsx_res_fo_signo_opt" />
                                <label htmlFor="jsx_res_fo_signo_opt_lt">&le;</label>
                                <input
                                    type="radio" id="jsx_res_fo_signo_opt_eq" name="jsx_res_fo_signo_opt" />
                                <label
                                    htmlFor="jsx_res_fo_signo_opt_eq">=</label>
                                <input type="radio" id="jsx_res_fo_signo_opt_gt"
                                    name="jsx_res_fo_signo_opt" />
                                <label htmlFor="jsx_res_fo_signo_opt_gt">&ge;</label> */}
                                <select
                                    value={desigualdad}
                                    onChange={(e) => setDesigualdad(e.target.value)}
                                >
                                    <option value="<=">&le;</option>
                                    <option value="=">=</option>
                                    <option value=">=">&ge;</option>
                                </select>
                            </div>
                            <input
                                type="text"
                                id="jsx_res_fo_limite"
                                value={limite}
                                onChange={(e) => handleLimiteChange(e.target.value)}
                                className="border border-black"
                            />
                        </div>
                        <div id="jsx_res_fo_nombre">
                            <button
                                id="jsx_res_fo_boton"
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                                onClick={handleAddRestriccion}
                            >A&ntilde;adir</button>
                            <input type="text" id="jsx_res_fo_nom" />
                        </div>
                    </div>
                    <div id="jsx_res_cont">
                        <div >
                            Restricciones actuales
                        </div>
                        <ul id="jsx_res_act">
                            {addElementProblema}
                        </ul>
                    </div>
                </div>
            </div>
            <div id="jsx_problema" className="border shadow-lg  p-2.5 grid gap-3">
                Planteamiento
                <div className="grid grid-cols-2">
                    <div>
                        <div>Quitando desigualdades</div>
                        <div>
                            {jsx_pro_p1}
                        </div>
                    </div>
                    <div>
                        <div id="jsx_segundo1">
                            <div id="metodoartificial" className={hiddenMethod ? `hidden` : 'visible'}>
                                <input
                                    type="radio"
                                    id="dosfases"
                                    name="metodoartificial"
                                    checked={selectedMethod === "dosfases"}
                                    onChange={handleChangeMethod}
                                />
                                <label htmlFor="dosfases">2 fases</label>
                                <input
                                    type="radio"
                                    id="mgrande"
                                    name="metodoartificial"
                                    checked={selectedMethod === 'mgrande'}
                                    onChange={handleChangeMethod}
                                />
                                <label htmlFor="mgrande">M grande</label>
                            </div>
                        </div>
                        <div id="jsx_segundo2" className={hiddenMethod ? `hidden` : 'visible'}>
                            {jsx_pro_p2}
                        </div>
                    </div>

                </div>
                <div id="jsx_pro_botones">
                    <button
                        id="jsx_res_fo_boton"
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
                        onClick={handleResolverProblema}
                    >Resolver</button>
                </div>
            </div>
            <div className="border shadow-lg  p-2.5 grid gap-3">
                Solución
            </div>
        </div>
    )
}
