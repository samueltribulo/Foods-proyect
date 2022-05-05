import React from 'react';
import styles from './Pagination.module.css'

export default function Pagination ({paginado, recipesPerPage, allRecipes, currentPage}){
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i+1);
    }
    return (
        <div className={styles.conteiner}>
            <nav className={styles.conteiner2}>
                {
                    pageNumbers && pageNumbers.map(number => {
                        return  <button className={styles.btnPag} onClick={() => paginado(number) }>{number}</button>
                    })
                }
            </nav>
        </div>

    )
}