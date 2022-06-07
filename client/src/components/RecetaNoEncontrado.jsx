import React from "react";
import styles from './RecetaNoEncontrado.module.css'
import { useNavigate } from "react-router-dom";
export default function RecetaCardNoEncontrado(){
    const navigate = useNavigate()
    const reload = () => {
       navigate('/recipes')
    }
        return(
            <div className={styles.divRecetaCard}>
                <img src={"https://media.ambito.com/p/ab2a83915e3c3e9fdc127a9f5cae866e/adjuntos/239/imagenes/038/976/0038976244/1200x1200/smart/dogejpg.jpg"} alt="No tiene imagen" />
                
                <h2>No recipe found</h2>
                <form onSubmit={reload}>
                    <input className={styles.btnRecargar} type='submit' value={'Reload recipes'}/>
                </form>

            </div>
        )
    }
