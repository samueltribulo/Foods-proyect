import React, { useState } from 'react';
import styles from './Pagination.module.css'

export default function Pagination ({paginado, recipesPerPage, allRecipes,currentNumber, setCurrentNumber}){
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i+1);
    }
    return (
        <div className={styles.conteiner}>
            <nav className={styles.conteiner2}>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return  <input 
                            type='button' 
                            value={number} 
                            className={currentNumber === number ? styles.currentBtnPag : styles.btnPag} 
                            onClick={() =>{
                                paginado(number);
                                setCurrentNumber(number);
                            } } 
                        />
                    })
                }
            </nav>
        </div>

    )
}