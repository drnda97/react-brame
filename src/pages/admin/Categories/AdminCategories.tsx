import React, {FC, useEffect, useState} from "react";
import Sidebar from "../../../components/uiElements/Sidebar/Sidebar";
import {Category, TablePaginationActionsProps} from "../../../Interfaces";
import {
    Box,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableFooter,
    TablePagination,
    Paper,
    useTheme,
    IconButton,
    Button,
} from '@mui/material';
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";

import UpgradeIcon from '@mui/icons-material/Upgrade';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

import "./categories.css";
import CreateCategory from "./modules/CreateCategory";
import UpdateCategory from "./modules/UpdateCategory";

function LastPageIcon() {
    return null;
}

function FirstPageIcon() {
    return null;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}


const AdminCategories: FC = () => {
    const [showModal, setShowModal] = useState<any>(false);
    const [showModalUpdate, setShowModalUpdate] = useState<any>(false);
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [page, setPage] = useState<number>(1);
    const [ID, setID] = useState<number | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleDelete = (id: number):void => {
        console.log("DELETE ARTICLE WITH ID: " + id);
    }

    const handleOpenModal = ():void => {
        setShowModal(true);
    }

    useEffect(() => {
        getArticles().then((res) => {
            setCategories(res.data)
            setRowsPerPage(res.per_page)
        });
    }, [])

    const getArticles = async() => {
        return await fetch(`http://18.192.182.140/api/categories?page=${page}`).then((res) => res.json());
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <main>
                <div className={"button-wrapper d-flex"}>
                    <h1 className={"mr-3"}>Categories</h1>
                    <Button variant="outlined" endIcon={<CreateIcon />} onClick={handleOpenModal}>Create </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableBody>
                            {categories.map((category) => (
                                <TableRow key={category.id}>
                                    <TableCell component="th" scope="row">
                                        {category.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {category.description}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {category.created_at}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {category.updated_at}
                                    </TableCell>
                                    <TableCell style={{ width: 60 }} align="right">
                                        <UpgradeIcon onClick={() => {
                                            setID(category.id);
                                            setShowModalUpdate(true);
                                        }}/>
                                    </TableCell>
                                    <TableCell style={{ width: 60 }} align="right">
                                        <DeleteIcon onClick={() => handleDelete(category.id)}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={categories.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </main>
            {showModal ? <CreateCategory showModal={showModal} setShowModal={setShowModal} /> : null}
            {showModalUpdate ? <UpdateCategory showModalUpdate={showModalUpdate} setShowModalUpdate={setShowModalUpdate} id={ID} /> : null}
        </div>
    )
}

export default AdminCategories