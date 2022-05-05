import React from "react";
import styles from './RecetaNoEncontrado.module.css'
import { NavLink } from "react-router-dom";
export default function RecetaCardNoEncontrado(){
    const reload = () => {
        alert('ok')
    }
        return(
            <div className={styles.divRecetaCard}>
                <img src={"https://media.ambito.com/p/ab2a83915e3c3e9fdc127a9f5cae866e/adjuntos/239/imagenes/038/976/0038976244/1200x1200/smart/dogejpg.jpg"} alt="No tiene imagen" />
                
                <h2>No se encontro una receta con lo especificado</h2>
                <form onSubmit={reload}>
                    <input className={styles.btnRecargar} type='submit' value={'Recargar recetas'}/>
                </form>

            </div>
        )
    }
