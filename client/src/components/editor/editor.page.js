import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import resolve from '../../scripts/resolve';
import assign from '../../scripts/assign';

import './editor.style.scss';

export default function Editor(){

    let boxStyle = {
        border: '0.1px solid lightgrey',
        height: '50%',
        cursor: 'pointer', 
        // textAlign: 'center',
    }

    let boxStyleV = {
        border: '0.1px solid grey',
        height: '25%',
    }

    /*
    {
            id: '0',
            mode: 'horizontal',
            split0: {
                id: '00',
                mode: 'horizontal',
                split0:{
                    id: '000',
                    mode: 'horizontal',
                },
                split1:{
                    id: '001',
                    mode: 'vertical',
                }
                
            },
            split1:{
                id: '10',
                mode: 'vertical',
                split0:{
                    id: '100',
                    mode: 'vertical',
                    split0:{
                        id: '1000',
                        mode: 'vertical',
                        split0:{
                            id: '10000',
                            mode: 'vertical',
                        }
                    }
                },
                split1:{
                    id: '110',
                    mode: 'vertical',
                }
            }
        },
    */
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

    const [config, setConfig] = useState(defaultLayout);
    const [actionTarget, setActionTarget] = useState();

    const addTarget = (event) => {
        setActionTarget(event.target.id);  
        console.log(event.target.id); 
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

        console.log(newId);

        if (typeof newLayout[id].mode === 'undefined'){
            newLayout[id].mode = mode
        } else {
            if (keyPath[keyPath.length-1] === 'split0'){
                assign(newLayout[id], keyPath, {id: `${newId}`, mode: mode})
            } else {
                assign(newLayout[id], keyPath, {id: `${newId}`, mode: mode})
            }
        }
        console.log(newLayout)
        setConfig([...newLayout]);
    }

    

    useEffect(()=>{
        console.log(config)
    },[config])


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
                    <Grid item className='editor__action-item' xs={2}>
                        SAVE
                    </Grid>
                    <Grid item className='editor__action-item' xs={2}>
                        LOAD
                    </Grid>
                </Grid>
            </div>

            
            {config &&
            <section className='editor__box-section'>
                {config.map((box)=>{
                    return(      
                        // <Grid container key={`box${box.id}`} className='editor__box-row'>
                        //     <Grid container tabindex='0' item xs id={box.id} style={boxStyle} onClick={(e)=>addTarget(e)}>
                        <>
                            {handleFirstSplit(box)} 
                        </> 
                        //     </Grid>    
                                 
                        // </Grid>
                    )
                 })}

            {/* <Grid container direction="column"key={`box2`} className='editor__box-row'>
                <Grid container direction="column" tabindex='0' item xs id={2} style={boxStyle} onClick={(e)=>addTarget(e)}>
                 1
                </Grid>
                <Grid container direction="column" tabindex='0' item xs id={2} style={boxStyle} onClick={(e)=>addTarget(e)}>
                 1
                </Grid>
            </Grid> */}
            </section>  }
        </Container>
        
    )
}