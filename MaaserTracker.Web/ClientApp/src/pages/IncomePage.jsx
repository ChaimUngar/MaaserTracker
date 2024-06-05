import React, { useState, useEffect } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';

const IncomePage = () => {

    const [groupBySource, setGroupBySource] = useState(false);
    const [incomes, setIncomes] = useState([])
    const [sources, setSources] = useState([])

    const groupedIncomes = [...sources.map(source => {
        return {
            source: source.title,
            incomes: [...incomes.filter(i => i.source === source.title)]
        }
    })]

    useEffect(() => {
        const loadIncomes = async () => {
            const { data } = await axios.get('/api/income/getall')
            setIncomes(data)
        }

        const loadSources = async () => {
            const { data } = await axios.get('/api/source/getallsources')
            setSources(data)
        }

        loadIncomes()
        loadSources()
    }, [])

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant="h2" gutterBottom component="div">
                Income History
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={groupBySource}
                        onChange={event => setGroupBySource(event.target.checked)}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Group by source"
            />

            {!groupBySource ? (
                <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
                    <Table sx={{ minWidth: 650 }}>

                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {incomes.map((income) => (
                                <TableRow key={income.id}>
                                    <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                        {income.source}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>{income.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </TableContainer>
            ) : (
                groupedIncomes.map(({ source, incomes }) => (
                    <div key={source} sx={{ width: '80%', maxWidth: '80%' }}>
                        <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
                            {source}
                        </Typography>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>

                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {incomes.map((income) => (
                                        <TableRow key={income.id}>
                                            <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                                {source}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{income.date}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </div>
                ))
            )}
        </Container>
    );
}

export default IncomePage;
