import React, {FC, useEffect, useState} from "react";
import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem, Modal,
	Select,
	TextareaAutosize,
	TextField,
	Typography
} from "@mui/material";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import {Category} from "../../../../Interfaces";

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 500,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

type Props = {
	setShowModalUpdate: (showModal: boolean) => void;
	showModalUpdate: boolean;
	id?: number | null
}

const Update:FC<Props> = ({setShowModalUpdate, showModalUpdate, id}) => {
	const [category, setCategory] = useState<Category>();
	const [categories, setCategories] = useState<Array<Category>>([]);
	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");

	const handleSaveArticle = async () => {
		if(title.trim() && body.trim() && category) {
			const params = JSON.stringify({title: title, body: body, category_id: category.id});
			const options = {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'api-token': '9aK4W3D7NpbWwPzJmUOIcyPmyehl0PHZLWP14rzQqKzUPtcFCo0Tn051CvwN',
				},
				body: params
			}
			await fetch(`http://18.192.182.140/api/articles/${id}`,  options);
		}
		alert("Populate fields correctly!");
	}

	const handleTitleChange = (event: any):void => {
		setTitle(event.target.value);
	}

	const handleBodyChange = (event: any):void => {
		setBody(event.target.value);
	}

	const handleCategorySelectChange = (event: any):void => {
		setCategory(categories.find(cat => cat.id === event.target.value));
	}

	const handleCloseModal = ():void => {
		setShowModalUpdate(false);
	}

	useEffect(() => {
		getCategories().then((res) => setCategories(res.data))
		getArticleByID().then((res) => {
			setTitle(res.data.title);
			setBody(res.data.body);
			console.log(categories)
		})
	}, [])

	const getArticleByID = async () => {
		return await fetch(`http://18.192.182.140/api/articles/${id}`).then((res) => res.json());
	}

	const getCategories = async() => {
		return await fetch(`http://18.192.182.140/api/categories`).then((res) => res.json());
	}

	return (
		<Modal
			open={showModalUpdate}
			onClose={handleCloseModal}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography id="modal-modal-title" variant="h6" component="h2">
					Update Article
				</Typography>
				<TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={handleTitleChange} className={"w-100 mb-3"}/>
				<TextareaAutosize
					className={"mb-3 text-area"}
					aria-label="empty textarea"
					placeholder="Empty"
					value={body}
					onChange={handleBodyChange}
				/>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">Category</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={category}
						label="Category"
						onChange={handleCategorySelectChange}
					>
						{categories.map(cat => (
							<MenuItem value={cat.id}>{cat.name}</MenuItem>
						))}
					</Select>
				</FormControl>
				<div className={"mt-3"}>
					<Button variant="outlined" endIcon={<SaveAltIcon />} onClick={handleSaveArticle}>Save </Button>
				</div>
			</Box>
		</Modal>
	)
}

export default Update;