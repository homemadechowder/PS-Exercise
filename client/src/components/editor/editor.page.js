import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import './editor.style.scss';

export default function Editor(){

    let boxStyle = {
        border: '0.1px solid grey',
        // height: '100%',
        fontSize: '30px',
        cursor: 'pointer', 
    }
    let count = 80;
    const [config, setConfig] = useState([0,1,2,3]);
    const [actionTarget, setActionTarget] = useState();
    const [addedGrid, setAddedGrid] = useState([]);
    const [mode, setMode] = useState();

    const addTarget = (event) => {
        console.dir(event.target)
        setActionTarget(event.target.id);     
    }


    const addDiv = (item, mode) =>{
        if (mode === 'vertical') {
            setAddedGrid([
                <Grid key='key' container direction='column' item xs id={item} style={boxStyle} onClick={(e)=>addTarget(e)}>
                    <Grid tabindex='0' item xs id={item} style={boxStyle} onClick={(e)=>addTarget(e)}>
                        {item}
                    </Grid>                        
                </Grid>
            ]
            )
            console.log(item);
        }

        return(
            <Grid container item xs id={item} style={boxStyle} onClick={(e)=>addTarget(e)}>
                <Grid tabindex='0' item xs id={item} style={boxStyle} onClick={(e)=>addTarget(e)}>
                    {item}
                </Grid>                         
            </Grid> 
        )
    }



    return(
        <Container id='main__container' className='editor__container' maxWidth="sm">
            <div className='editor__action'>
                <Grid container className='editor__action-row' justify='center'>
                    <Grid item className='editor__action-item' xs={2} onClick={()=>addDiv(actionTarget,'vertical')}>
                        SPLIT VERTICALLY
                    </Grid>
                    <Grid item className='editor__action-item' xs={2} onClick={()=>setMode('horizontal')}>
                        SPLIT HORIZONTALLY
                    </Grid>
                    <Grid item className='editor__action-item' xs={2}>
                        SAVE
                    </Grid>
                    <Grid item className='editor__action-item' xs={2}>
                        LOAD
                    </Grid>
                </Grid>
            </div>

            

            <section className='editor__box-section'>
                {config.map((item)=>{
                    return(      
                        <Grid container key={`box${item}`} className='editor__box-row'>
                            <Grid container tabindex='0' item xs id={item} style={boxStyle} onClick={(e)=>addTarget(e)}>
                                {item}
                            </Grid>    
                            {item === parseInt(actionTarget) &&
                            <>
                            {addedGrid.map((grid)=>{
                                return(
                                    <>
                                    {grid}
                                    </>
                                )
                            })}  
                            </>  }         
                        </Grid>
                    )
                 })}
            </section>  
        </Container>
        
    )
}