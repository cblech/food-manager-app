import { Typography } from '@mui/material';
import { ListItemButton } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Grid } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Divider } from '@mui/material';
import { AppDataStruct } from './common-types';
import { FoodItem } from './model/Data';

function CheckOff({ appDataStruct }: { appDataStruct: AppDataStruct }) {
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
            <CheckOffList appDataStruct={appDataStruct} />
        </Box>
    )
}

function CheckOffList({ appDataStruct }: { appDataStruct: AppDataStruct }) {
    let items = appDataStruct.appData.getShoppingList();

    return (
        <Grid container spacing={2}>
            {
                items.map((item, index) => (
                    <BuyItem key={index} item={item} setChecked={appDataStruct.setChecked} />
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

function BuyItem({ item, setChecked }: { item: FoodItem, setChecked: (item: FoodItem, checked: boolean) => void }) {
    return (
        <Grid item xs={12} md={6}>
            <Item onClick={() => { setChecked(item,!item.checked) }} style={{}}>
                <ListItemIcon style={{ minWidth: 32 }}>
                    {item.checked ? (<CheckIcon />) : ""}
                </ListItemIcon>
                <Divider orientation="vertical" flexItem />
                <ListItemText primary={item.name} />
            </Item>
        </Grid>
    )
}

export default CheckOff;