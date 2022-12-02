import React from "react";

export interface Article {
    body: string;
    category_id: number;
    created_at: string;
    id: number;
    title: string;
    updated_at: string;
    user_id: number;
}
export interface ArticleComments {
    id: number;
    title: string;
    description: string,
    article_id: number,
    user_id: number,
    created_at: string;
    updated_at: string;
}
export interface Category {
    id: number;
    name: string,
    description: string,
    created_at: string;
    updated_at: string;
}

export interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}