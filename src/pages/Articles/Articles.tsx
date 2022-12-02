import React, {FC, useEffect, useState} from "react";
import './articles.css';
import {Article, TablePaginationActionsProps} from "../../Interfaces";
// @ts-ignore
import {Link, useHistory} from "react-router-dom";
import {
    Box, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination,
    TableRow, useTheme
} from "@mui/material";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";

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

const Articles: FC = () => {
    const history = useHistory();
    const [page, setPage] = useState<number>(1);
    const [articles, setArticles] = useState<Array<Article>>([]);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    useEffect(() => {
        getArticles().then((res) => {
            setArticles(res.data)
            setRowsPerPage(res.total)
        });
    }, [])

    const getArticles = async() => {
        return await fetch(`http://18.192.182.140/api/articles?page=${page}`).then((res) => res.json());
    }

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleArticleClicked = (id: number) => {
        history.push(`/article/${id}`);
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableBody>
                    {articles.map((article) => (
                        <TableRow className={"cursor-pointer"} key={article.id} onClick={() => handleArticleClicked(article.id)}>
                            <TableCell component="th" scope="row">
                                {article.title}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {article.body}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {article.created_at}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {article.updated_at}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={articles.length}
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
    )
}

export default Articles;