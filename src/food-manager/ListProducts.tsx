import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Product, Store } from "./common-types";

export function ListProducts({ products, setEditProductModalOpen, stores }: { products: Product[], setEditProductModalOpen: React.Dispatch<React.SetStateAction<Product | null | undefined>>, stores: Store[] }) {
    return (
        <Box>
            <Typography variant="h4">
                Products
            </Typography>
            <br />
            <TableContainer component={Paper}>
                <Table sx={{}} >
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Store</TableCell>
                            <TableCell>Stored (Target)</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            products.map((product, index) => (
                                <TableRow key={index}>
                                    <TableCell >{product.name}</TableCell>
                                    <TableCell>{stores.find(s=>s.id === product.storeId)?.name??""}</TableCell>
                                    <TableCell>{product.setStored !== 0 ? `${product.realStored} (${product.setStored})` : product.realStored}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" onClick={() => { setEditProductModalOpen(product) }}>
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>


        </Box>
    )
}