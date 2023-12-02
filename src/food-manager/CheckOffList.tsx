import { Typography } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Grid } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { FoodItem, FoodManagerModel } from './model/Data';
import CheckIcon from '@mui/icons-material/Check';
import { Divider } from '@mui/material';

function CheckOff({ model, setModel }: { model: FoodManagerModel, setModel: React.Dispatch<React.SetStateAction<FoodManagerModel>> }) {
    return (
        <Box>
            <Typography variant="h4">
                Shopping List
            </Typography>
            <br />
            <Box>
                <Button variant="contained" onClick={() => console.log("Clicked")}>
                    Test
                </Button>
            </Box>
            <br />
            <CheckOffList model={model} setModel={setModel} />
        </Box>
    )
}

function CheckOffList({ model, setModel }: { model: FoodManagerModel, setModel: React.Dispatch<React.SetStateAction<FoodManagerModel>> }) {
    let items = model.getShoppingList();

    return (
        <Grid container spacing={2}>
            {
                items.map((_, index) => (
                    <BuyItem key={index} index={index} model={model} setModel={setModel} />
                ))
            }
        </Grid>
    )
}

const Item = styled(ListItemButton)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.h5,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function BuyItem({ index, model, setModel }: { index: number, model: FoodManagerModel, setModel: React.Dispatch<React.SetStateAction<FoodManagerModel>> }) {
    let item = model.getShoppingList()[index];
    
    return (
        <Grid item xs={12} md={6}>
            <Item onClick={() => {setModel( model.updateFoodItem(index,item.setChecked(!item.checked)))}} style={{}}>
                <ListItemIcon style={{minWidth:32}}>
                    {item.checked ? (<CheckIcon />) : ""}
                </ListItemIcon>
                <Divider orientation="vertical" flexItem />
                <ListItemText primary={item.name} />
            </Item>
        </Grid>
    )
}

export default CheckOff;