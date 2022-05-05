import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllRecipes, getAllDiets, postNewRecipe } from '../redux/actions';
import {NavLink ,useNavigate} from 'react-router-dom';
import styles from './CreateRecipe.module.css'

function validate (input){
    let errors = {};
    if (!input.name) errors.name = 'Please enter a name.';
    else if (input.name.length < 8) errors.name = 'The name must have at least 8 characters.'
    else if(!input.score) errors.score = 'Please enter a score.';
    else if(Number(input.score) > 100 || Number(input.score) < 1 || ! Number.isInteger(Number(input.score)) && typeof input.score != 'number') errors.score = 'The score must be an integer number from 1 to 100';
    else if(!input.healthScore) errors.healthScore = 'Please enter a healthScore';
    else if(Number(input.healthScore) > 100 || Number(input.healthScore) < 1 ) errors.healthScore = 'The health score must be a number from 1 to 100';
    else if(!input.summary) errors.summary = 'Please enter a summary';
    else if(input.summary.length < 40) errors.summary = 'The summary must be at least 40 characters';
    else if(!input.instructions) errors.instructions = 'Please enter instructions';
    else if(input.instructions.length < 40) errors.instructions = 'The instructions must be at least 40 characters';
    else if(input.image && !input.image.match(/((ftp|http|https):\/\/)?([A-z]+)\.([A-z]{2,})/gm)) errors.image = 'The image must be an URL.';
    else if(!input.diet.length) errors.diet = 'Please enter at least one type of diet';
    return errors;
}

export default function CreateRecipe(){
    const dispatch = useDispatch(); 
     const navigate = useNavigate()
    const allDiets = useSelector(state => state.diets)
    let [errors, setErrors] = useState({});
    let [reRender, setRerender] = useState('');

    let [input, setInput] = useState({
        name: '',
        summary: '',
        score: null,
        healthScore:null,
        instructions: '',
        image:'',
        diet:[],
    });
    console.log(errors)
    console.log(input)


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        setRerender(`ultimo cambio ${e.target.value}`)
    }

    const handleSelected = (e) => {
        if(!input.diet.includes(e.target.value) && e.target.value !== '-'){
            setInput({
                ...input,
                diet: [...input.diet, e.target.value]
            })
            setErrors(validate({
                ...input,
                diet: [...input.diet, e.target.value]
            }))
        }
    }
    const handleDelete = (el) =>{
        setInput({
            ...input,
            diet: input.diet.filter(d => d !== el)
        })
    }

    const handleSubmit = (e) => {
        if( !input.name || errors.name || errors.summary || errors.score || errors.healthScore || errors.instructions || errors.diet){
            e.preventDefault()
            alert('Please complete all fields')
        }else{
                e.preventDefault();
                dispatch(postNewRecipe(input));
                alert('Created');
                setInput({
                    name: '',
                    summary: '',
                    score: null,
                    healthScore:null,
                    instructions: '',
                    image:'',
                    diet:[],
                })
                navigate('/recipes');
            }
    }

    useEffect(() => {
        dispatch(getAllRecipes());
        dispatch(getAllDiets());
    }, [])

    return(
        <div className={styles.conteiner}>
            <div className={styles.divNav}>
                <NavLink to={'/recipes'}>Back</NavLink>
            </div>
            <div className={styles.divEntero}>
                <form className={styles.conteiner2} onSubmit={(e) => handleSubmit(e)} >
                <div className={styles.divTitle}>
                    <h2>New Recipe</h2>
                </div>
                    <div className={styles.divLabel}>
                        <label >Name:</label>
                        <input type="text" value={input.name} name="name" onChange={handleChange} />
                    </div>
                    <div className={styles.divError}>
                    {errors.name && (<div >{errors.name}</div>)}
                    </div>
                    <div className={styles.divLabel}>
                        <label >Score:</label>
                        <input type="text" value={input.score} name="score" onChange={handleChange} />
                    </div>
                    <div className={styles.divError}>
                        {errors.score && (<div>{errors.score}</div>)}
                    </div>
                    <div className={styles.divLabel}>
                        <label >Health Score: </label>
                        <input type="text" value={input.healthScore} name="healthScore" onChange={handleChange}/>
                    </div>
                    <div className={styles.divError}>
                        {errors.healthScore && (<div>{errors.healthScore}</div>)}
                    </div>
                    <div className={styles.divLabel}>
                        <label >Summary:</label>
                        <textarea value={input.summary} name="summary" onChange={handleChange}></textarea>
                    </div>
                    <div className={styles.divError}>
                        {errors.summary && (<div>{errors.summary}</div>)}
                    </div>
                    <div className={styles.divLabel}>
                        <label >Instructions:</label>
                        <textarea value={input.instructions} name="instructions" onChange={handleChange}></textarea>
                    </div>
                    <div className={styles.divError}>
                        {errors.instructions && (<div>{errors.instructions}</div>)}
                    </div>
                    <div className={styles.divLabel}>
                        <label >Image:</label>
                        <input type="text" value={input.image} name="image" onChange={handleChange}/>
                    </div>
                    <div className={styles.divError}>
                        {errors.image && (<div>{errors.image}</div>)}
                    </div>
                    <div className={styles.divLabel}>
                        <label >Diets:</label>
                        <select onChange={handleSelected} >
                            {
                                allDiets?.map((d, i) => (
                                    <option id={i} value={d}>{d}</option>
                                ))
                            }
                        </select >
                    </div>
                    <div>
                        <ul>{input.diet.map(d => <><li><label>{d} </label><button onClick={(e) =>{
                            e.preventDefault();
                            handleDelete(d)
                            }}>x</button> </li></>)}
                        </ul>
                    </div>
                    <div className={styles.divError}>
                    {errors.diet && (<div>{errors.diet}</div>)}
                    </div>
                    <div className={styles.divBtn}>
                        <button >Create recipe</button>
                    </div>
                </form>
            </div>
        </div>
    )
}