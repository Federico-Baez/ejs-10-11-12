/* 
--En este ejercicio tendréis que crear un componente el cual contenga un elemento, puede ser un rectángulo, cuadrado.
--Las dimensiones del elemento serán de ancho 255px y de alto 255px y su color inicial tiene que ser negro.
--Dentro del componente crearéis varios métodos de captura del ratón que harán lo siguiente para que el color del elemento cambie:
    -Un método para que cuando el ratón entre en el contenedor, se dará un valor aleatorio (color RGB entre 0 y 255) para cambiar el  color del componente.
    -Un método para que cuando salga el ratón del componente se detenga por completo el cambio de color.
    -Por último, un método en el que cuando se pulsa dos veces en el componente, se tiene que detener el cambio de color.
*/
import React, {useState} from 'react';

/* elemento principal */
const FigureComponent = () => {
    
    /* useState que nos permite manejar el color, que se usará para el bg-color del cuadrado */
    const [color, setColor] = useState("#000000");

    /* useState con el que se maneja en intervalo entre los cambios de color del bg-color */
    const [manageInterval, setManageInterval] = useState(0);
    
    /* función que nos devuelve un numero pseudo-aleatorio ente el 0 y el 255 */
    const getRandomRGB = () => Math.floor(Math.random() * 256);
  
    /* función que transforma un color en formato RGB a Hexadecimal */
    const getHex = (red, green, blue) => {
      return (
        '#' +
        [red, green, blue]
          .map((c) => {
            const hex = c.toString(16);
            /* verifico que los valores sean menores que 16, ya que en ese caso es necesario concatenar un 0 adelante para que el color este expresado correctamente en Hexa */
            return ((c < 16) ? ('0'+hex) : hex);
          })
          .join('')
      );
    };

    /* función que retorna un color en hexadecimal, partiendo de 3 valores RGB generados aleatoriamente (getRandomRGB), y transformandolo a Hexadecimal (con la funcion getHex)*/
    const generateHex = () => {
        const rgb = {
            r: getRandomRGB(),
            g: getRandomRGB(),
            b: getRandomRGB(),
        };
        return setColor(getHex(rgb.r, rgb.g, rgb.b));
    };

    /* función utilizada en el onMouseOver, setea un intervalo(setInterval) en maganeInterval que ejecuta la funcion generateHex(nuevo color hexa) cada 500ms,  */
    const onChangeColor = () => {
        return setManageInterval(setInterval(generateHex, 500));
    };
    
    /* funcion utilizada para frenar el intervalo manageInterval al sacar el mouse(onMouseLeave) del componente cuadrado, mediante el uso del clearInterval */
    const onStopChangeColor = () => {
        return clearInterval(manageInterval);
    };
    
    /* funcion utilizada para frenar el intervalo manageInterval al dar doble click(onDoubleClick) en el componente cuadrado, mediante el uso del clearInterval */
    const onClickChangeColor = () => {
        return clearInterval(manageInterval);
    };

    /* retorno del Figure Component*/
    return (
        <div>
            <div
                id="square"
                onMouseOver={onChangeColor}
                onMouseLeave={onStopChangeColor}
                onDoubleClick={onClickChangeColor}
                style={{ width: '255px', height: '255px', backgroundColor: color, margin: 'auto' }}
                >
            </div>{' '}
            <p style={{ color: 'black' }}>Color: {color} </p>
        </div>
    );
}

export default FigureComponent;
