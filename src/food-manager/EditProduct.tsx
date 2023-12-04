import { Autocomplete, Box, Button, createFilterOptions, FilterOptionsState, Grid, Input, TextField, Typography } from "@mui/material";
import { random, times, toNumber } from "lodash";
import { useState } from "react";
import { Product, Store, UpdateProduct, UpdateStore } from "./common-types";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export function EditProduct(
    { currentProduct,
        updateProductData,
        stores,
        updateStoreData,
        setEditProductModalOpen
    }: {
        currentProduct: Product | null,
        updateProductData: (product: UpdateProduct) => void, stores: Store[],
        updateStoreData: (product: UpdateStore) => void,
        setEditProductModalOpen: React.Dispatch<React.SetStateAction<Product | null | undefined>>
    }
) {
    const initialStoreName = currentProduct !== null && currentProduct.storeId !== null ? stores.find(s => s.id === currentProduct.storeId)?.name ?? "Error" : "";
    // States
    const [nameValue, setNameValue] = useState(currentProduct?.name ?? "");
    const [storeValue, setStoreValue] = useState(initialStoreName);
    const [notesValue, setNotesValue] = useState(currentProduct?.notes ?? "");
    const [setStoredValue, setSetStoredValue] = useState(currentProduct?.setStored.toString() ?? "0");
    const [realStoredValue, setRealStoredValue] = useState(currentProduct?.realStored.toString() ?? "0");


    const title = (
        <Typography variant="h4">
            {currentProduct === null ? ("Add") : ("Edit")} Product
        </Typography>
    );

    const nameInput = (
        <Box>
            <TextField
                value={nameValue}
                onChange={(event) => { setNameValue(event.target.value) }}
                fullWidth
                variant="outlined"
                label="Name"
                error={nameValue === ""}
                helperText={nameValue === "" ? "required" : ""}
            />
        </Box>
    );

    function filterOptions(options: string[], state: FilterOptionsState<string>): string[] {
        let normalOptions = createFilterOptions<string>({})(options, state)
        if (normalOptions.length === 0)
            return [state.inputValue]
        return normalOptions;
    }

    const storeInput = (
        <Autocomplete
            value={storeValue}
            onInputChange={(event, newValue) => {
                console.log("Change");
                setStoreValue(newValue ?? "");
            }}

            freeSolo
            fullWidth
            options={stores.length === 0 ? ["Rewe"] : stores.map((store) => store.name)}
            filterOptions={filterOptions}
            renderInput={
                (params) => <TextField {...params} label="Store" variant="outlined" />
            } />
    );

    const notesInput = (
        <Box>
            <TextField
                value={notesValue}
                onChange={(event) => { setNotesValue(event.target.value) }}
                fullWidth
                variant="outlined"
                label="Notes"
                multiline
                rows={6} />
        </Box>
    );

    function forceNumber(value: string): number {
        const n = toNumber(value);
        if (isNaN(n))
            return 0;
        return n;
    }

    const arrowButtonStyle = { height: "100%", padding: "0px", width: "100%" }
    const setRealStoredInput = (
        <Grid container spacing={2}>
            <Grid item xs={2} md={1} />
            <Grid item xs={2} md={1}>
                <Button
                    onClick={() => { setSetStoredValue((forceNumber(setStoredValue) - 1).toString()) }}
                    variant="outlined"
                    style={arrowButtonStyle}>
                    <ArrowBackIosNewIcon fontSize="large" style={{ textAnchor: "middle" }} />
                </Button>
            </Grid>
            <Grid item xs={4} md={2}>
                <TextField
                    value={setStoredValue}
                    onChange={(event) => { setSetStoredValue(event.target.value) }}
                    error={isNaN(toNumber(setStoredValue))}
                    helperText={isNaN(toNumber(setStoredValue)) ? "Must be a number" : ""}
                    fullWidth
                    variant="outlined"
                    label="Set Stored" />
            </Grid>
            <Grid item xs={2} md={1}>
                <Button
                    onClick={() => { setSetStoredValue((forceNumber(setStoredValue) + 1).toString()) }}
                    variant="outlined"
                    style={arrowButtonStyle}>
                    <ArrowForwardIosIcon fontSize="large" />
                </Button>
            </Grid>
            <Grid item xs={2} md={1} />
            <Grid item xs={2} md={1} />
            <Grid item xs={2} md={1}>
                <Button
                    onClick={() => { setRealStoredValue((forceNumber(realStoredValue) - 1).toString()) }}
                    variant="outlined"
                    style={arrowButtonStyle}>
                    <ArrowBackIosNewIcon fontSize="large" />
                </Button>
            </Grid>
            <Grid item xs={4} md={2}>
                <TextField
                    value={realStoredValue}
                    onChange={(event) => { setRealStoredValue(event.target.value) }}
                    error={isNaN(toNumber(realStoredValue))}
                    helperText={isNaN(toNumber(realStoredValue)) ? "Must be a number" : ""}
                    fullWidth
                    variant="outlined"
                    label="Real Stored" />
            </Grid>
            <Grid item xs={2} md={1}>
                <Button
                    onClick={() => { setRealStoredValue((forceNumber(realStoredValue) + 1).toString()) }}
                    variant="outlined"
                    style={arrowButtonStyle}>
                    <ArrowForwardIosIcon fontSize="large" />
                </Button>
            </Grid>
            <Grid item xs={2} md={1} />
        </Grid>
    );

    function validate(): boolean {
        if (nameValue === "") {
            return false;
        }
        return true;
    }

    const confirmButton = (
        <Button
            onClick={() => {
                // validate
                if (!validate()) {
                    return;
                }

                // find or make store id
                let storeId
                if (storeValue === "") {
                    storeId = null
                } else {
                    storeId = stores.find((store) => store.name === storeValue)?.id ?? undefined;
                }
                if (storeId === undefined) {
                    storeId = times(20, () => random(35).toString(36)).join('');
                    updateStoreData({ id: storeId, name: storeValue });
                }

                updateProductData({
                    id: currentProduct?.id,
                    name: nameValue,
                    storeId: storeId,
                    notes: notesValue,
                    setStored: forceNumber(setStoredValue),
                    realStored: forceNumber(realStoredValue)
                });

                setEditProductModalOpen(undefined);
            }}
            variant="contained"
            fullWidth
            color="success"
            size="large"
            disabled={!validate()}>
            {currentProduct === null ? ("Add") : ("Save")}
        </Button>
    );


    return (
        <Box>
            <br />
            {title}
            <br />
            {nameInput}
            <br />
            {storeInput}
            <br />
            {notesInput}
            <br />
            {setRealStoredInput}
            <br />
            {confirmButton}
        </Box>

    )
}