import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import assign from '../../scripts/assign';

import './editor.style.scss';

const imageList = [
    'https://static5.depositphotos.com/1000350/432/i/950/depositphotos_4327684-stock-photo-doctor-with-stethoscope-fixing-laptop.jpg',
    'https://mk0knowtechie1qof48y.kinstacdn.com/wp-content/uploads/2019/11/dark-stock-photos-main-kt.jpg',
    'https://pbs.twimg.com/media/EW8GhG_XkAEOyAh.jpg',
    'https://www.fodors.com/wp-content/uploads/2020/04/BizarreStockPhotos__HERO_shutterstock_1308961057.jpg',
    'https://www.adweek.com/files/2015_May/iStock-Unfinished-Business-6.jpg',
    'https://st2.depositphotos.com/1912933/7560/i/950/depositphotos_75608753-stock-photo-angry-old-woman-with-an.jpg',
]

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

let layoutList = [];

export default function Editor(){

    const [config, setConfig] = useState();
    const [savedLayout, setSavedLayout] = useState([]);
    const [actionTarget, setActionTarget] = useState();

    const addTarget = (ev) => {
        setActionTarget(ev.target.id);   
    }

    const allowDrop = (ev) => {
        ev.preventDefault();
    }
      
    const drag = (ev) => {
        ev.dataTransfer.setData("text", ev.target.id);
        const source = ev.target.id ? document.getElementById(ev.target.id).id : '';
        const sourceParent = ev.target.id ? document.getElementById(ev.target.id).parentNode.id : '';
        ev.dataTransfer.setData("source", source)
        ev.dataTransfer.setData("sourceParent", sourceParent);
    }
      
    const drop = (ev) => {
        ev.preventDefault();
        const source = ev.dataTransfer.getData("source");
        const sourceParent = ev.dataTransfer.getData("sourceParent");
        const targetDiv = document.getElementById(ev.target.id)
        const sourceDiv = document.getElementById(source);
        
        const targetClone = targetDiv.innerHTML
        const targetImageString = targetClone.split('&quot;'); 

        if (targetDiv.childNodes.length !== 0){
            targetDiv.removeChild(targetDiv.childNodes[0])
        }

        if (document.getElementById(sourceParent) !== null){
            const sourceImg = sourceDiv.childNodes[0] || null;

            var imgDivSource = document.createElement('img');
            imgDivSource.style=`background-image: url(${targetImageString[1]})` 
            imgDivSource.classList.add('editor__drag-image')

            if (sourceImg !== null){
                if (sourceImg.style.backgroundImage === 'url("undefined")'){
                    console.log('undefined stuff')
                    sourceDiv.removeChild(sourceDiv.childNodes[0])
                    ev.target.appendChild(imgDivSource); 
                } else {
                    const background = sourceImg.style.backgroundImage
                    var imgDiv = document.createElement('img')
                    imgDiv.style=`background-image: ${background}`
                    imgDiv.setAttribute('id', `image${ev.target.id}`)
                    imgDiv.classList.add('editor__drag-image')

                    targetDiv.appendChild(imgDiv)
                    sourceDiv.removeChild(sourceImg);
                    sourceDiv.appendChild(imgDivSource); 
                }
            } else {
                var imgDivDummy = document.createElement('img')
                imgDivDummy.style=`background-image: url("undefined")}`
                imgDivDummy.classList.add('editor__drag-image')
                sourceDiv.appendChild(imgDivDummy)
                ev.target.appendChild(imgDivSource);
            }

        } else {
            var data = ev.dataTransfer.getData("text");
            var img = document.createElement('img'); 
            img.style=`background-image: url(${data})`
            img.classList.add('editor__drag-image')
            ev.target.appendChild(img);
        }
    }


    const handleFirstSplit = (split) =>{        
        if (split.mode){
        return(
            <Grid container id={split.id} direction={split.mode==='vertical'?'row':'column'} key={`box${split.id}`} className='editor__box-row'>
                <Grid onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)} draggable="true" onDragStart={(e)=>drag(e)} container direction={split.mode==='vertical'?'row':'column'} tabindex='0' item xs id={split.split0?split.split0.id:split.id+'0'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                    {handleSplit0(split.split0)}
                </Grid>   
                <Grid onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)} draggable="true" onDragStart={(e)=>drag(e)} container direction={split.mode==='vertical'?'row':'column'} tabindex='0' item xs id={split.split1?split.split1.id:split.id+'1'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>        
                    {handleSplit1(split.split1)}
                </Grid>   
            </Grid>
        )   
        }
        return(
            <Grid container id={split.id} direction={split.mode==='vertical'?'row':'column'} key={`box${split.id}`} className='editor__box-row'>
                <Grid onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)} draggable="true" onDragStart={(e)=>drag(e)} container direction={split.mode==='vertical'?'row':'column'} tabindex='0' item xs id={split.split0?split.split0.id:split.id+'0'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                </Grid>
            </Grid>
        ) 
    }

    const handleSplit0 = (split) =>{
        if(typeof split !== 'undefined'){
        return(
            <Grid container item id={`id${split.id}`} direction={split.mode==='vertical'?'row':'column'} key={`box${split.id}`} className={split.mode==='vertical'?'editor__box':'editor__box__col'}>
                <Grid onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)} draggable="true" onDragStart={(e)=>drag(e)} tabindex='0' item xs id={split.split0?split.split0.id:split.id+'0'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                    {handleSplit0(split.split0)}
                </Grid>
                <Grid onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)} draggable="true" onDragStart={(e)=>drag(e)} tabindex='0' item xs id={split.split1?split.split1.id:split.id+'1'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                    {handleSplit1(split.split1)}
                </Grid>
            </Grid>
        )
        }
        return(
            <></>
        )
    }

    const handleSplit1 = (split) =>{
        if(typeof split !== 'undefined'){
            return(
                <Grid container item id={`id${split.id}`} direction={split.mode==='vertical'?'row':'column'} key={`box${split.id}`} className={split.mode==='vertical'?'editor__box':'editor__box__col'}>
                    <Grid onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)} draggable="true" onDragStart={(e)=>drag(e)} tabindex='0' item xs id={typeof split.split0 !== 'undefined' ?split.split0.id:split.id+'0'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                        {handleSplit0(split.split0)}
                    </Grid>
                    <Grid onDrop={(e)=>drop(e)} onDragOver={(e)=>allowDrop(e)} draggable="true" onDragStart={(e)=>drag(e)} tabindex='0' item xs id={typeof split.split1 !== 'undefined' ?split.split1.id:split.id+'1'} style={{border: '0.1px solid lightgrey'}} onClick={(e)=>addTarget(e)}>
                        {handleSplit1(split.split1)}
                    </Grid>
                </Grid>
            )
        }
        return(    
            <></>
        )
    }
 
    const split = (mode) => {

        if (actionTarget){
        const id = actionTarget[0];
        let newLayout = config;
        let keyPath = [];
        let newId = id;
        var targetDiv = document.getElementById(actionTarget)

        if (targetDiv.childNodes.length !== 0){
        targetDiv.removeChild(targetDiv.childNodes[0])
        }

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
    }

    const saveLayout = (currentConfig) => {
        // honestly does not make any sense to me but this will do for now
        layoutList = JSON.parse(JSON.stringify([...savedLayout]));
        layoutList.push(JSON.parse(JSON.stringify(currentConfig)));    
        alert(`Saved as: Save Item ${layoutList.length}`)
        setSavedLayout(JSON.parse(JSON.stringify(layoutList)));
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
            <Grid container justify="center">
                <Grid item xs={4}>
                    <section className='editor__image-section'> 
                    {imageList.map((image)=>{
                        return(
                        <img 
                            className='editor__pallet-image' 
                            src = {image}
                            key = {image}
                            draggable="true" onDragStart={(e)=>drag(e)}
                        ></img>
                        )
                    })}
                    </section>
                </Grid>
            <Grid item xs={5}>
                <section className='editor__box-section'>
                    {config.map((box)=>{
                        return(      
                            <>
                                {handleFirstSplit(box)} 
                            </> 
                        )
                    })}
                </section>
            </Grid>
            </Grid>}
        </Container>  
    )
}