import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import assign from '../../scripts/assign';

import './editor.style.scss';

export default function Editor(){

    const defaultLayout = [
        {
            id: '0',
        },
        {
            id: '1',
        },
        {
            id: '2',
        },
        {
            id: '3',
        }

    ]

    const [config, setConfig] = useState();
    const [savedLayout, setSavedLayout] = useState([]);
    const [actionTarget, setActionTarget] = useState();
    let layoutList = [];
    const addTarget = (event) => {
        setActionTarget(event.target.id);   
    }

    const handleFirstSplit = (split) =>{        
        if (split.mode){
        return(
            <Grid container id={split.id} direction={split.mode==='vertical'?'row':'column'} key={`box${split.id}`} className='editor__box-row'>
                <Grid container direction={split.mode==='vertical'?'row':'column'} tabindex='0' item xs id={split.split0?split.split0.id:split.id+'0'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                    {handleSplit0(split.split0)}
                </Grid>
                <Grid container direction={split.mode==='vertical'?'row':'column'} tabindex='0' item xs id={split.split1?split.split1.id:split.id+'1'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                    {handleSplit1(split.split1)}
                </Grid>
            </Grid>
        )   
        }
        return(
            <Grid container id={split.id} direction={split.mode==='vertical'?'row':'column'} key={`box${split.id}`} className='editor__box-row'>
                <Grid container direction={split.mode==='vertical'?'row':'column'} tabindex='0' item xs id={split.split0?split.split0.id:split.id+'0'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                </Grid>
            </Grid>
        ) 
    }

    const handleSplit0 = (split) =>{
        if(typeof split !== 'undefined'){
        return(
            <Grid container item direction={split.mode==='vertical'?'row':'column'} key={`box${split.id}`} className={split.mode==='vertical'?'editor__box':'editor__box__col'}>
                <Grid  tabindex='0' item xs id={split.split0?split.split0.id:split.id+'0'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                    {handleSplit0(split.split0)}
                </Grid>
                <Grid  tabindex='0' item xs id={split.split1?split.split1.id:split.id+'1'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                    {handleSplit1(split.split1)}
                </Grid>
            </Grid>
        )
        }
        return(
            <>
                
            </>
        )
    }

    const handleSplit1 = (split) =>{
        if(typeof split !== 'undefined'){
            return(
                <Grid container item direction={split.mode==='vertical'?'row':'column'} key={`box${split.id}`} className={split.mode==='vertical'?'editor__box':'editor__box__col'}>
                    <Grid  tabindex='0' item xs id={typeof split.split0 !== 'undefined' ?split.split0.id:split.id+'0'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                        {handleSplit0(split.split0)}
                    </Grid>
                    <Grid  tabindex='0' item xs id={typeof split.split1 !== 'undefined' ?split.split1.id:split.id+'1'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                        {handleSplit1(split.split1)}
                    </Grid>
                </Grid>
            )
        }

        return(
            <>
                
            </>
        )
    }
 
    const split = (mode) => {
        const id = actionTarget[0];
        let newLayout = config;
        let keyPath = [];
        let newId = id;
        
        console.log(actionTarget);
        for (var i = 1; i < actionTarget.length; i++){
           if (actionTarget[i] === '0'){
               keyPath.push('split0')
               newId += actionTarget[i];
           } else if (actionTarget[i] === '1'){
               keyPath.push('split1')
               newId += actionTarget[i];
           } else {
               break;
           }
        }

        if (typeof newLayout[id].mode === 'undefined'){
            newLayout[id].mode = mode
        } else {
            if (keyPath[keyPath.length-1] === 'split0'){
                assign(newLayout[id], keyPath, {id: `${newId}`, mode: mode})
            } else {
                assign(newLayout[id], keyPath, {id: `${newId}`, mode: mode})
            }
        }
        setConfig([...newLayout]);
    }

    const saveLayout = (currentConfig) => {
        // honestly does not make any sense to me but this will do for now
        layoutList = [...JSON.parse(JSON.stringify(savedLayout))];
        layoutList.push(JSON.parse(JSON.stringify(currentConfig)));    
        alert(`Saved as: Save Item ${layoutList.length}`)
        setSavedLayout(layoutList);
    }


    const handleSavedLayout = () => {
        return(
        <>
            {savedLayout.map((item,i)=>{
                return(
                <button className='editor__load-button' key={`${i}+${item}`} onClick={()=>setConfig([...item])}>Saved Item {i+1}</button>
                )
            })} 
        </>
        )
    }

    useEffect(()=>{
        setConfig(defaultLayout)
    },[])


    return(
        <Container id='main__container' className='editor__container' maxWidth="sm">
            <div className='editor__action'>
                <Grid container className='editor__action-row' justify='center'>
                    <Grid item className='editor__action-item' xs={2} onClick={()=>split('vertical')}>
                        SPLIT VERTICALLY
                    </Grid>
                    <Grid item className='editor__action-item' xs={2} onClick={()=>split('horizontal')}>
                        SPLIT HORIZONTALLY
                    </Grid>
                    <Grid item className='editor__action-item' xs={2} onClick={()=>saveLayout(config)}>
                        SAVE
                    </Grid>
                    <Grid item className='editor__action-item' xs={2}>
                        LOAD
                        {savedLayout.length !== 0 &&
                        <>
                        {handleSavedLayout()}
                        </>}
                    </Grid>

                </Grid>
            </div>

            
            {config &&
           
            <section className='editor__box-section'>
                {config.map((box)=>{
                    
                    return(      
                        <>
                            {handleFirstSplit(box)} 
                        </> 
                    )
                 })}

            </section>  }
        </Container>
        
    )
}