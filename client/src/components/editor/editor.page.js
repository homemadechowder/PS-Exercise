import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import './editor.style.scss';

export default function Editor(){


    return(
        <Container className='editor__container' maxWidth="sm">
            <div className='editor__action'>
                Action bar
            </div>
            <section className='editor__box-section'>
                <Grid container className='editor__box' spacing={2}>
                    <Grid item xs={12}>
                        1
                    </Grid>
                </Grid>
                <Grid container className='editor__box' spacing={2}>
                    <Grid item xs={12}>
                        2
                    </Grid>
                </Grid>
                <Grid container className='editor__box' spacing={2}>
                    <Grid item xs={12}>
                        3
                    </Grid>
                </Grid>
                <Grid container className='editor__box' spacing={2}>
                    <Grid item xs={12}>
                        4
                    </Grid>
                </Grid>
            </section>
        </Container>
        
    )
}