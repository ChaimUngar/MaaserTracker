import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const OverviewPage = () => {
    const [incomes, setIncomes] = useState([])
    const [maaserPayments, setMaaserPayments] = useState([])

    let totalIncome = 0
    let totalMaaserGiven = 0
    let obligatedMaaser = 0

    useEffect(() => {
        const loadIncomes = async () => {
            const { data } = await axios.get('/api/income/getall')
            setIncomes(data)
        }

        const loadPayments = async () => {
            const { data } = await axios.get('/api/maaser/getallpayments')
            setMaaserPayments(data)
        }

        loadIncomes()
        loadPayments()

        
    }, [])

    incomes.forEach(i => totalIncome += i.amount)
    console.log({totalIncome})
    maaserPayments.forEach(p => totalMaaserGiven += p.amount)
    obligatedMaaser = totalIncome * .10

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                textAlign: 'center'
            }}
        >
            <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
                <Typography variant="h2" gutterBottom>
                    Overview
                </Typography>
                <Box sx={{ marginBottom: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Total Income: ${totalIncome}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Total Maaser Given: ${totalMaaserGiven}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="h5" gutterBottom>
                        Total Maaser Obligated: ${obligatedMaaser}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                        Remaining Maaser obligation: ${obligatedMaaser - totalMaaserGiven}
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default OverviewPage;
