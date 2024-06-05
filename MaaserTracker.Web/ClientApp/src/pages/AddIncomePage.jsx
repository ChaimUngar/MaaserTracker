import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddIncomePage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sources, setSources] = useState([])
    const [amount, setAmount] = useState()
    const [selectedSource, setSelectedSource] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        const loadSources = async () => {
            const { data } = await axios.get('/api/source/getallsources')
            setSources(data)
        }

        loadSources()
    }, [])

    const handleAddIncome = async () => {
        await axios.post('/api/income/add', { date: selectedDate, sourceId: selectedSource.id, amount: amount })
        navigate('/income')
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                value={selectedSource}
                onChange={(e, source) => setSelectedSource(source)}
                options={sources}
                getOptionLabel={(source) => source.title}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button variant="contained" color="primary" onClick={handleAddIncome}>Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
