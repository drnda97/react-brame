import React, {FC, useEffect, useState} from "react";
import './article.css';
// @ts-ignore
import {useParams} from "react-router-dom";
import {Article, ArticleComments, Category} from "../../Interfaces";

const ArticlePage: FC = () => {
    const { id } = useParams();

    const [article, setArticle] = useState<Article>();
    const [articleComments, setArticleComments] = useState<Array<ArticleComments>>([]);
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        getArticleByID().then((res) => {
            setArticle(res.data);
            getCategoryByID(res.data.category_id).then((res) => setCategory(res.data));
        })
        getArticleComments().then((res) => setArticleComments(res.data));
    }, [])

    const getArticleByID = async () => {
        return await fetch(`http://18.192.182.140/api/articles/${id}`).then((res) => res.json());
    }

    const getArticleComments = async () => {
        return await fetch(`http://18.192.182.140/api/articles/${id}/comments`).then((res) => res.json());
    }

    const getCategoryByID = async (cat_id: number) => {
        return await fetch(`http://18.192.182.140/api/categories/${cat_id}`).then((res) => res.json());
    }

    let articleData = null;
    if(article) {
        articleData = (<div className={"my-3"}>
            <h1 className={"text-center"}>Article Data: </h1>
            <h2 className={"text-center"}>{article.title}</h2>
            <h4 className={"text-center"}>{article.body}</h4>
        </div>)
    }

    let categoryData = null;
    if(category) {
        categoryData = (<div className={"my-3"}>
            <h1 className={"text-center"}>Category Data: </h1>
            <h2 className={"text-center"}>{category.name}</h2>
            <h4 className={"text-center"}>{category.description}</h4>
        </div>)
    }

    let commentsData = null;
    if(articleComments.length > 1) {
        commentsData = <div className="container">
            <h1 className={"text-center my-3"}>Comment Data: </h1>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-2">Comment Title</div>
                    <div className="col col-3">Comment Description</div>
                </li>
                {articleComments.map((article: ArticleComments) => (
                    <li className="table-row" key={article.id}>
                        <div className="col col-3" data-label="Article Title">{article.title}</div>
                        <div className="col col-2" data-label="Article Body">{article.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    }

    return (
        <div>
            {articleData}
            {categoryData}
            {commentsData}
        </div>
    )
}

export default ArticlePage;